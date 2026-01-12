#!/usr/bin/env node

/**
 * Image Downloader for scraped products
 * Fetches product pages and extracts real image URLs from data-src attributes
 * Downloads all product images and saves them with slug-based names
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  inputFile: path.join(__dirname, '../data/scraped-products.json'),
  outputDir: path.join(__dirname, '../public/images/products'),
  concurrency: 3, // Number of parallel downloads (reduced to be polite)
  timeout: 30000, // 30 seconds timeout
  retries: 3,
  delay: 500 // Delay between batches
};

// Utility: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch HTML content from URL
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: CONFIG.timeout
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        fetchHtml(response.headers.location).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Extract main product image URL from HTML
function extractImageUrl(html, baseUrl) {
  // Look for data-src with /Files/ path (main product images - highest quality)
  const filesMatch = html.match(/data-src="(\/Files\/[^"]+\.webp)"/);
  if (filesMatch) {
    return new URL(filesMatch[1], baseUrl).href;
  }

  // Fallback: look for any product image in data-src
  const dataSrcMatch = html.match(/data-src="([^"]+Product-photo[^"]+\.webp)"/);
  if (dataSrcMatch) {
    return new URL(dataSrcMatch[1], baseUrl).href;
  }

  return null;
}

// Download a single image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
        'Referer': 'https://rm.rmgastro.com/'
      },
      timeout: CONFIG.timeout
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      // Check content type
      const contentType = response.headers['content-type'] || '';
      if (!contentType.startsWith('image/')) {
        reject(new Error(`Not an image: ${contentType}`));
        return;
      }

      // Create write stream
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete partial file
        reject(err);
      });
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Download with retry
async function downloadWithRetry(url, filepath, retries = CONFIG.retries) {
  for (let i = 0; i < retries; i++) {
    try {
      return await downloadImage(url, filepath);
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(1000 * (i + 1));
    }
  }
}

// Get file extension from URL or content
function getExtension(url) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  if (validExtensions.includes(ext)) {
    return ext;
  }

  // Default to jpg
  return '.jpg';
}

// Generate image filename from product slug
function getImageFilename(product, imageIndex = 0) {
  const ext = product.images[imageIndex] ? getExtension(product.images[imageIndex]) : '.jpg';
  const suffix = imageIndex > 0 ? `-${imageIndex + 1}` : '';
  return `${product.slug}${suffix}${ext}`;
}

// Process images in batches
async function processBatch(items, batchSize, processor) {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(batch.map(processor));
    results.push(...batchResults);

    // Progress update
    const completed = Math.min(i + batchSize, items.length);
    process.stdout.write(`\r  Progress: ${completed}/${items.length} (${Math.round(completed/items.length*100)}%)`);

    if (i + batchSize < items.length) {
      await sleep(CONFIG.delay);
    }
  }

  console.log(); // New line after progress
  return results;
}

// Process a single product: fetch page, extract image, download
async function processProduct(product, index, total) {
  const { originalUrl, slug } = product;
  const filename = `${slug}.webp`;
  const filepath = path.join(CONFIG.outputDir, filename);

  // Skip if already downloaded
  if (fs.existsSync(filepath)) {
    process.stdout.write(`\r[${index + 1}/${total}] SKIP (exists): ${slug.substring(0, 40)}...`);
    return { slug, status: 'exists', imagePath: `/images/products/${filename}` };
  }

  try {
    // Fetch product page
    process.stdout.write(`\r[${index + 1}/${total}] Fetching: ${slug.substring(0, 40)}...          `);
    const html = await fetchHtml(originalUrl);

    // Extract image URL
    const baseUrl = new URL(originalUrl).origin;
    const imageUrl = extractImageUrl(html, baseUrl);

    if (!imageUrl) {
      console.log(`\n[${index + 1}/${total}] NO IMAGE: ${slug}`);
      return { slug, status: 'no_image', imagePath: null };
    }

    // Download image
    process.stdout.write(`\r[${index + 1}/${total}] Downloading: ${slug.substring(0, 40)}...       `);
    await downloadWithRetry(imageUrl, filepath);

    console.log(`\n[${index + 1}/${total}] SUCCESS: ${slug}`);
    return { slug, status: 'downloaded', imagePath: `/images/products/${filename}` };

  } catch (error) {
    console.log(`\n[${index + 1}/${total}] ERROR: ${slug} - ${error.message}`);
    return { slug, status: 'error', error: error.message, imagePath: null };
  }
}

// Main function
async function main() {
  console.log('Product Image Downloader');
  console.log('========================\n');

  // Check if input file exists
  if (!fs.existsSync(CONFIG.inputFile)) {
    console.error(`Error: Input file not found: ${CONFIG.inputFile}`);
    console.error('Please run scraper.js first to generate the products JSON.');
    process.exit(1);
  }

  // Load products
  console.log(`Loading products from: ${CONFIG.inputFile}`);
  const data = JSON.parse(fs.readFileSync(CONFIG.inputFile, 'utf-8'));
  const products = data.products || [];

  if (products.length === 0) {
    console.log('No products found in the input file.');
    process.exit(0);
  }

  console.log(`Found ${products.length} products`);

  // Create output directory
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`Created output directory: ${CONFIG.outputDir}`);
  }

  // Count how many need downloading
  const toDownload = products.filter(p => {
    const filepath = path.join(CONFIG.outputDir, `${p.slug}.webp`);
    return !fs.existsSync(filepath);
  });

  console.log(`Products to process: ${toDownload.length}`);
  console.log(`Already downloaded: ${products.length - toDownload.length}`);

  if (toDownload.length === 0) {
    console.log('\nAll images already downloaded.');
  }

  // Process all products
  console.log('\nProcessing products...\n');
  const startTime = Date.now();
  const results = [];

  // Process in batches
  for (let i = 0; i < products.length; i += CONFIG.concurrency) {
    const batch = products.slice(i, i + CONFIG.concurrency);
    const batchResults = await Promise.all(
      batch.map((p, j) => processProduct(p, i + j, products.length))
    );
    results.push(...batchResults);

    // Small delay between batches
    if (i + CONFIG.concurrency < products.length) {
      await sleep(CONFIG.delay);
    }
  }

  // Count results
  const downloaded = results.filter(r => r.status === 'downloaded').length;
  const exists = results.filter(r => r.status === 'exists').length;
  const noImage = results.filter(r => r.status === 'no_image').length;
  const errors = results.filter(r => r.status === 'error').length;

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(50));
  console.log('DOWNLOAD COMPLETE');
  console.log('='.repeat(50));
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Already existed: ${exists}`);
  console.log(`No image available: ${noImage}`);
  console.log(`Errors: ${errors}`);
  console.log(`Duration: ${duration} seconds`);
  console.log(`Output directory: ${CONFIG.outputDir}`);

  // Update products JSON with local image paths
  console.log('\nUpdating product data with local image paths...');

  const updatedProducts = products.map(product => {
    const result = results.find(r => r.slug === product.slug);
    const imagePath = result?.imagePath || '/images/products/placeholder.jpg';

    return {
      ...product,
      images: [imagePath]
    };
  });

  // Save updated products
  const updatedData = {
    ...data,
    products: updatedProducts,
    imagesDownloadedAt: new Date().toISOString()
  };

  fs.writeFileSync(CONFIG.inputFile, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log(`Updated products saved to: ${CONFIG.inputFile}`);

  // Save detailed results
  const resultsFile = path.join(__dirname, '../data/image-download-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify({
    downloadedAt: new Date().toISOString(),
    summary: { downloaded, exists, noImage, errors },
    results
  }, null, 2));
  console.log(`Detailed results saved to: ${resultsFile}`);
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
