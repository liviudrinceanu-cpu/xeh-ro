#!/usr/bin/env node

/**
 * Optimized Web Scraper for RM Gastro and REDFOX products
 * Uses efficient crawling with deduplication and depth limits
 */

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  brands: [
    {
      name: 'RM',
      slug: 'rm',
      baseUrl: 'https://rm.rmgastro.com',
      groupUrl: 'https://rm.rmgastro.com/Group/rm',
      displayName: 'RM Gastro'
    },
    {
      name: 'REDFOX',
      slug: 'redfox',
      baseUrl: 'https://redfox.rmgastro.com',
      groupUrl: 'https://redfox.rmgastro.com/Group/redfox',
      displayName: 'REDFOX'
    }
  ],
  outputFile: path.join(__dirname, '../data/scraped-products.json'),
  delay: 300,
  maxRetries: 3,
  timeout: 30000,
  maxDepth: 4 // Maximum category depth to traverse
};

// Global tracking
const visitedUrls = new Set();
const productUrls = new Set();

// Utility functions
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = CONFIG.maxRetries) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        }
      });

      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(1000 * (i + 1));
    }
  }
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

// Extract all product links from a page
function extractProductLinks($, baseUrl) {
  const links = new Set();

  // Product detail page patterns
  $('a[href*="/Product/"], a[href*="/Detail/"], a[href*="/Item/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
      links.add(fullUrl);
    }
  });

  return Array.from(links);
}

// Extract category/subcategory links from a page
function extractCategoryLinks($, baseUrl, currentUrl) {
  const links = [];

  $('a[href*="/Group/"]').each((_, el) => {
    const href = $(el).attr('href');
    const name = $(el).text().trim();

    if (href && name && name.length > 1 && name.length < 100) {
      const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;

      // Skip if same as current or already visited
      if (fullUrl !== currentUrl && !visitedUrls.has(fullUrl)) {
        links.push({ name, url: fullUrl });
      }
    }
  });

  return links;
}

// Get product details from product page
async function getProductDetails(brand, url) {
  if (productUrls.has(url)) return null;
  productUrls.add(url);

  try {
    const html = await fetchWithRetry(url);
    const $ = cheerio.load(html);

    const product = {
      url,
      brandSlug: brand.slug,
      brandName: brand.displayName,
      name: '',
      description: '',
      shortDescription: '',
      specifications: [],
      features: [],
      images: [],
      priceEUR: 0,
      sku: '',
      model: '',
      categoryName: ''
    };

    // Extract name
    const nameSelectors = ['h1', '.product-title', '.product-name', '.detail-title', '.product-detail h1'];
    for (const sel of nameSelectors) {
      const text = $(sel).first().text().trim();
      if (text && text.length > 2 && text.length < 200) {
        product.name = text;
        break;
      }
    }

    if (!product.name) return null;

    // Extract description
    const descSelectors = ['.product-description', '.description', '.detail-description', '.product-text', '.content'];
    for (const sel of descSelectors) {
      const text = $(sel).first().text().trim();
      if (text && text.length > 20) {
        product.description = text.substring(0, 2000);
        product.shortDescription = text.substring(0, 200);
        break;
      }
    }

    // Extract specifications from tables
    $('table tr').each((_, row) => {
      const $row = $(row);
      const cells = $row.find('td, th');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        const value = $(cells[cells.length - 1]).text().trim();
        if (label && value && label !== value && label.length < 100 && value.length < 200) {
          product.specifications.push({ label, value });
        }
      }
    });

    // Extract from definition lists
    $('dl dt').each((_, dt) => {
      const label = $(dt).text().trim();
      const value = $(dt).next('dd').text().trim();
      if (label && value && label.length < 100) {
        product.specifications.push({ label, value });
      }
    });

    // Extract features from lists
    $('.features li, .product-features li, ul li').each((_, li) => {
      const text = $(li).text().trim();
      if (text && text.length > 3 && text.length < 200 && product.features.length < 20) {
        product.features.push(text);
      }
    });

    // Extract images
    const imageSelectors = ['.product-image img', '.gallery img', '.product-gallery img', '.main-image img', 'img[src*="product"]'];
    const imageUrls = new Set();

    for (const sel of imageSelectors) {
      $(sel).each((_, img) => {
        const src = $(img).attr('src') || $(img).attr('data-src');
        if (src && !src.includes('logo') && !src.includes('icon')) {
          const fullUrl = src.startsWith('http') ? src : `${brand.baseUrl}${src.startsWith('/') ? '' : '/'}${src}`;
          imageUrls.add(fullUrl);
        }
      });
    }
    product.images = Array.from(imageUrls).slice(0, 5);

    // Extract SKU/model
    const skuPattern = /\b([A-Z]{1,4}[-\s]?[A-Z0-9]{2,10}(?:[-\s][A-Z0-9]+)*)\b/;
    const pageText = $('body').text();
    const skuMatch = product.name.match(skuPattern) || pageText.match(skuPattern);
    if (skuMatch) {
      product.sku = skuMatch[1].trim();
      product.model = product.sku;
    }

    // Extract price
    const pricePattern = /(\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d{2})?)\s*(?:EUR|€)/i;
    const priceMatch = pageText.match(pricePattern);
    if (priceMatch) {
      product.priceEUR = parseFloat(priceMatch[1].replace(/\s/g, '').replace(',', '.'));
    }

    // Extract category from breadcrumb or URL
    const breadcrumb = $('.breadcrumb, .breadcrumbs, nav[aria-label*="bread"]').text();
    if (breadcrumb) {
      const parts = breadcrumb.split(/[›>\/]/).filter(p => p.trim());
      if (parts.length > 1) {
        product.categoryName = parts[parts.length - 2].trim();
      }
    }

    return product;
  } catch (error) {
    console.error(`    Error fetching ${url}: ${error.message}`);
    return null;
  }
}

// Crawl a category page and its subcategories
async function crawlCategory(brand, url, categoryName, depth = 0) {
  if (depth > CONFIG.maxDepth || visitedUrls.has(url)) {
    return [];
  }

  visitedUrls.add(url);
  const products = [];

  console.log(`${'  '.repeat(depth)}Crawling: ${categoryName || url}`);

  try {
    await sleep(CONFIG.delay);
    const html = await fetchWithRetry(url);
    const $ = cheerio.load(html);

    // Get product links from this page
    const productLinks = extractProductLinks($, brand.baseUrl);
    console.log(`${'  '.repeat(depth)}  Found ${productLinks.length} product links`);

    // Fetch product details
    for (const productUrl of productLinks) {
      if (!productUrls.has(productUrl)) {
        console.log(`${'  '.repeat(depth)}    Getting: ${productUrl.split('/').pop()}`);
        const product = await getProductDetails(brand, productUrl);
        if (product && product.name) {
          product.categoryName = categoryName || product.categoryName || 'General';
          products.push(product);
        }
        await sleep(CONFIG.delay);
      }
    }

    // Get subcategory links (only if not too deep)
    if (depth < CONFIG.maxDepth) {
      const categoryLinks = extractCategoryLinks($, brand.baseUrl, url);

      for (const cat of categoryLinks.slice(0, 20)) { // Limit subcategories
        const subProducts = await crawlCategory(brand, cat.url, cat.name, depth + 1);
        products.push(...subProducts);
      }
    }
  } catch (error) {
    console.error(`${'  '.repeat(depth)}Error crawling ${url}: ${error.message}`);
  }

  return products;
}

// Scrape a brand
async function scrapeBrand(brand) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Starting scrape for ${brand.name}`);
  console.log(`${'='.repeat(60)}`);

  visitedUrls.clear();
  productUrls.clear();

  const products = await crawlCategory(brand, brand.groupUrl, brand.name, 0);

  console.log(`\nTotal products for ${brand.name}: ${products.length}`);
  return products;
}

// Map category names
function mapCategory(categoryName) {
  const categoryMap = {
    'cooking': 'linii-de-gatit',
    'oven': 'cuptoare-profesionale',
    'convection': 'cuptoare-profesionale',
    'combi': 'cuptoare-profesionale',
    'pizza': 'pizzerie',
    'refrigerat': 'refrigerare',
    'freez': 'refrigerare',
    'cool': 'refrigerare',
    'chill': 'refrigerare',
    'ice': 'bar-cafenea',
    'dishwash': 'spalare',
    'wash': 'spalare',
    'fryer': 'echipamente-gatit',
    'grill': 'echipamente-gatit',
    'griddle': 'echipamente-gatit',
    'range': 'linii-de-gatit',
    'stove': 'linii-de-gatit',
    'table': 'mobilier-inox',
    'shelf': 'mobilier-inox',
    'cabinet': 'mobilier-inox',
    'mixer': 'preparare-alimente',
    'blend': 'preparare-alimente',
    'slicer': 'preparare-alimente',
    'cutter': 'preparare-alimente',
    'display': 'distributie-alimente',
    'bain': 'distributie-alimente',
    'buffet': 'distributie-alimente',
    'ventil': 'ventilatie',
    'hood': 'ventilatie',
    'bakery': 'patiserie-brutarie',
    'pastry': 'patiserie-brutarie',
    'dough': 'patiserie-brutarie',
    'knead': 'patiserie-brutarie'
  };

  const lower = (categoryName || '').toLowerCase();
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lower.includes(key)) return value;
  }
  return 'echipamente-gatit';
}

function getCategoryName(slug) {
  const names = {
    'linii-de-gatit': 'Linii de Gatit',
    'cuptoare-profesionale': 'Cuptoare Profesionale',
    'echipamente-gatit': 'Echipamente Gatit',
    'refrigerare': 'Refrigerare',
    'spalare': 'Spalare',
    'mobilier-inox': 'Mobilier Inox',
    'preparare-alimente': 'Preparare Alimente',
    'pizzerie': 'Pizzerie',
    'bar-cafenea': 'Bar & Cafenea',
    'distributie-alimente': 'Distributie Alimente',
    'patiserie-brutarie': 'Patiserie & Brutarie',
    'ventilatie': 'Ventilatie'
  };
  return names[slug] || 'Echipamente HoReCa';
}

// Transform products to final format
function transformProducts(scrapedProducts) {
  return scrapedProducts.map((product, index) => {
    const categorySlug = mapCategory(product.categoryName);
    const slug = `${product.brandSlug}-${slugify(product.name || `product-${index}`)}`;
    const sku = product.sku || `${product.brandSlug.toUpperCase()}-${String(index + 1).padStart(4, '0')}`;

    return {
      id: String(index + 1),
      slug,
      name: product.name,
      shortDescription: product.shortDescription || product.description?.substring(0, 200) || '',
      description: product.description || '',
      categorySlug,
      categoryName: getCategoryName(categorySlug),
      brandSlug: product.brandSlug,
      brand: product.brandName,
      model: product.model || sku,
      sku,
      priceEUR: product.priceEUR || 0,
      images: product.images.length > 0 ? product.images : ['/images/products/placeholder.jpg'],
      specifications: product.specifications || [],
      features: product.features || [],
      isNew: false,
      originalUrl: product.url,
      originalCategory: product.categoryName
    };
  });
}

// Main function
async function main() {
  console.log('RM Gastro & REDFOX Product Scraper (Optimized)');
  console.log('='.repeat(50));

  const startTime = Date.now();
  const allProducts = [];

  for (const brand of CONFIG.brands) {
    const products = await scrapeBrand(brand);
    allProducts.push(...products);
  }

  // Remove duplicates by URL
  const uniqueProducts = [];
  const seenUrls = new Set();
  for (const p of allProducts) {
    if (!seenUrls.has(p.url)) {
      seenUrls.add(p.url);
      uniqueProducts.push(p);
    }
  }

  const transformedProducts = transformProducts(uniqueProducts);

  // Ensure output directory exists
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save to JSON
  const output = {
    scrapedAt: new Date().toISOString(),
    totalProducts: transformedProducts.length,
    brands: {
      rm: transformedProducts.filter(p => p.brandSlug === 'rm').length,
      redfox: transformedProducts.filter(p => p.brandSlug === 'redfox').length
    },
    products: transformedProducts
  };

  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(output, null, 2), 'utf-8');

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total products: ${transformedProducts.length}`);
  console.log(`  - RM Gastro: ${output.brands.rm}`);
  console.log(`  - REDFOX: ${output.brands.redfox}`);
  console.log(`Duration: ${duration} minutes`);
  console.log(`Output: ${CONFIG.outputFile}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
