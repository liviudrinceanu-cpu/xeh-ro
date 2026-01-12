#!/usr/bin/env node

/**
 * Import Products to TypeScript
 * Converts scraped JSON data to TypeScript format
 * Includes Romanian translations for SEO
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: path.join(__dirname, '../data/scraped-products.json'),
  outputFile: path.join(__dirname, '../src/data/products.ts'),
  backupSuffix: '.backup'
};

// Romanian translations for common terms
const translations = {
  // Equipment types
  'convection oven': 'Cuptor Convectie',
  'combi oven': 'Cuptor Combi',
  'pizza oven': 'Cuptor Pizza',
  'deck oven': 'Cuptor cu Vatra',
  'microwave oven': 'Cuptor Microunde',
  'salamander': 'Salamander',
  'gas range': 'Aragaz pe Gaz',
  'electric range': 'Aragaz Electric',
  'cooking range': 'Linie de Gatit',
  'fryer': 'Friteuza',
  'deep fryer': 'Friteuza',
  'griddle': 'Plita',
  'grill': 'Gratar',
  'char grill': 'Gratar pe Carbuni',
  'lava stone grill': 'Gratar cu Piatra Vulcanica',
  'contact grill': 'Grill Contact',
  'panini grill': 'Grill Panini',
  'boiling pan': 'Marmita',
  'tilting pan': 'Tigaie Basculanta',
  'bain marie': 'Bain Marie',
  'chafing dish': 'Chafing Dish',
  'heated display': 'Vitrina Calda',
  'cold display': 'Vitrina Rece',
  'refrigerator': 'Frigider',
  'freezer': 'Congelator',
  'refrigerated table': 'Masa Refrigerata',
  'refrigerated counter': 'Banc Refrigerat',
  'blast chiller': 'Racitor Rapid',
  'ice machine': 'Masina de Gheata',
  'ice maker': 'Generator de Gheata',
  'dishwasher': 'Masina de Spalat Vase',
  'glasswasher': 'Masina de Spalat Pahare',
  'hood type': 'Tip Hota',
  'undercounter': 'Sub Blat',
  'work table': 'Masa de Lucru',
  'stainless steel table': 'Masa Inox',
  'sink': 'Chiuveta',
  'shelf': 'Raft',
  'shelving': 'Rafturi',
  'trolley': 'Carucior',
  'cart': 'Carucior',
  'mixer': 'Mixer',
  'planetary mixer': 'Mixer Planetar',
  'blender': 'Blender',
  'food processor': 'Robot de Bucatarie',
  'meat grinder': 'Masina de Tocat Carne',
  'slicer': 'Feliator',
  'cutter': 'Cutter',
  'vacuum packer': 'Masina de Ambalat in Vid',
  'coffee machine': 'Espressor',
  'espresso machine': 'Espressor',
  'toaster': 'Prajitor de Paine',
  'salamander broiler': 'Salamander',
  'pasta cooker': 'Fierbator Paste',
  'steamer': 'Cuptor cu Abur',
  'heated cabinet': 'Dulap Cald',
  'hot cupboard': 'Dulap Cald',
  'warming drawer': 'Sertar Cald',
  'ventilation hood': 'Hota de Ventilatie',
  'extraction hood': 'Hota de Aspiratie',

  // Specifications
  'power': 'Putere',
  'voltage': 'Tensiune',
  'capacity': 'Capacitate',
  'dimensions': 'Dimensiuni',
  'weight': 'Greutate',
  'temperature': 'Temperatura',
  'material': 'Material',
  'stainless steel': 'Otel Inoxidabil',
  'gas type': 'Tip Gaz',
  'water connection': 'Conexiune Apa',
  'drain': 'Scurgere',

  // Features
  'digital control': 'Control Digital',
  'touchscreen': 'Ecran Tactil',
  'timer': 'Cronometru',
  'thermostat': 'Termostat',
  'safety thermostat': 'Termostat de Siguranta',
  'automatic': 'Automat',
  'manual': 'Manual',
  'adjustable': 'Reglabil',
  'removable': 'Detasabil',
  'easy to clean': 'Usor de Curatat',
  'energy efficient': 'Eficient Energetic',
  'ventilated': 'Ventilat',
  'static': 'Static',
  'reversible fan': 'Ventilator Reversibil',
  'humidity control': 'Control Umiditate',
  'self-cleaning': 'Autocuratare',
  'led lighting': 'Iluminare LED'
};

// Translate a string using the dictionary
function translateText(text) {
  if (!text) return text;

  let translated = text;

  // Sort by length descending to match longer phrases first
  const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const regex = new RegExp(key, 'gi');
    translated = translated.replace(regex, translations[key]);
  }

  return translated;
}

// Generate SEO-friendly Romanian name
function generateRomanianName(product) {
  // If name already contains Romanian words, return as is
  const romanianWords = ['Cuptor', 'Masa', 'Frigider', 'Masina', 'Gratar', 'Plita', 'Vitrina'];
  for (const word of romanianWords) {
    if (product.name.includes(word)) {
      return product.name;
    }
  }

  // Try to translate
  const translated = translateText(product.name);

  // Add brand prefix if not present
  const brandPrefix = product.brandSlug === 'rm' ? 'RM' : 'REDFOX';
  if (!translated.toUpperCase().startsWith(brandPrefix)) {
    return `${brandPrefix} ${translated}`;
  }

  return translated;
}

// Clean and format specifications
function formatSpecifications(specs) {
  if (!specs || !Array.isArray(specs)) return [];

  return specs.map(spec => ({
    label: translateText(spec.label) || spec.label,
    value: spec.value
  })).filter(spec => spec.label && spec.value);
}

// Clean and format features
function formatFeatures(features) {
  if (!features || !Array.isArray(features)) return [];

  // Words that indicate navigation/menu items to filter out
  const invalidWords = [
    'brands', 'partner', 'catalog', 'home', 'company', 'products', 'contact',
    'login', 'čeština', 'english', 'français', 'deutsch', 'others', 'menu',
    'navigation', 'search', 'cart', 'account', 'zone', 'about'
  ];

  return features
    .map(f => translateText(f) || f)
    .filter(f => {
      if (!f || f.length < 5 || f.length > 150) return false;
      const lower = f.toLowerCase();
      // Filter out navigation items
      for (const word of invalidWords) {
        if (lower === word || lower.includes(word)) return false;
      }
      // Filter out items that are just single words (likely menu items)
      if (!f.includes(' ') && f.length < 20) return false;
      return true;
    })
    .slice(0, 10); // Limit to 10 features
}

// Better category detection from product data
function detectCategory(product) {
  const name = (product.name || '').toLowerCase();
  const specs = product.specifications || [];
  const originalCategory = (product.originalCategory || '').toLowerCase();

  // Check device type from specifications
  const deviceTypeSpec = specs.find(s => s.label.toLowerCase().includes('device type'));
  const deviceType = deviceTypeSpec ? deviceTypeSpec.value.toLowerCase() : '';

  // Combined text for matching
  const searchText = `${name} ${deviceType} ${originalCategory}`;

  // Check product name for category keywords (order matters - more specific first)
  const categoryPatterns = [
    { patterns: ['pizza'], category: 'pizzerie' },
    { patterns: ['oven', 'convection', 'combi', 'steam oven', 'konvektomat'], category: 'cuptoare-profesionale' },
    { patterns: ['fryer', 'friteuse', 'friteuza', 'fe-', 'fe '], category: 'echipamente-gatit' },
    { patterns: ['grill', 'griddle', 'gratar', 'charcoal', 'lava', 'gl-', 'gl '], category: 'echipamente-gatit' },
    { patterns: ['fry top', 'fry-top', 'ft-', 'ft '], category: 'echipamente-gatit' },
    { patterns: ['range', 'stove', 'cooking line', 'sporák', 'burner', 'sp-', 'sp '], category: 'linii-de-gatit' },
    { patterns: ['refrigerat', 'freezer', 'cool', 'chill', 'ice maker'], category: 'refrigerare' },
    { patterns: ['dishwash', 'glasswash', 'warewash'], category: 'spalare' },
    { patterns: ['table', 'shelf', 'cabinet', 'trolley', 'rack', 'door'], category: 'mobilier-inox' },
    { patterns: ['mixer', 'blend', 'slicer', 'cutter', 'grinder', 'peeler'], category: 'preparare-alimente' },
    { patterns: ['display', 'bain marie', 'bm-', 'buffet', 'warmer', 'heated'], category: 'distributie-alimente' },
    { patterns: ['hood', 'ventil', 'exhaust'], category: 'ventilatie' },
    { patterns: ['bakery', 'pastry', 'dough', 'knead', 'bread'], category: 'patiserie-brutarie' },
    { patterns: ['coffee', 'espresso', 'bar', 'beverage'], category: 'bar-cafenea' },
    { patterns: ['pasta cooker', 'pasta'], category: 'echipamente-gatit' },
    { patterns: ['basket', 'accessory', 'cover', 'strip'], category: 'echipamente-gatit' }
  ];

  for (const { patterns, category } of categoryPatterns) {
    for (const pattern of patterns) {
      if (searchText.includes(pattern)) {
        return category;
      }
    }
  }

  return 'echipamente-gatit';
}

// Format product for TypeScript
function formatProduct(product, index) {
  const name = generateRomanianName(product);
  const shortDesc = product.shortDescription || (product.description ? product.description.substring(0, 200) : '');
  const detectedCategory = detectCategory(product);

  // Get category name for the detected category
  const categoryNames = {
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

  return {
    id: String(index + 1),
    slug: product.slug,
    name,
    shortDescription: shortDesc,
    description: product.description || shortDesc,
    categorySlug: detectedCategory,
    categoryName: categoryNames[detectedCategory] || 'Echipamente HoReCa',
    brandSlug: product.brandSlug,
    images: product.images || ['/images/products/placeholder.jpg'],
    brand: product.brand || (product.brandSlug === 'rm' ? 'RM Gastro' : 'REDFOX'),
    model: product.model || product.sku || '',
    sku: product.sku || '',
    priceEUR: product.priceEUR || 0,
    isNew: product.isNew || false,
    specifications: formatSpecifications(product.specifications),
    features: formatFeatures(product.features)
  };
}

// Generate TypeScript code
function generateTypeScript(products) {
  const formattedProducts = products.map((p, i) => formatProduct(p, i));

  const productLines = formattedProducts.map(product => {
    const specs = product.specifications.map(s =>
      `      { label: ${JSON.stringify(s.label)}, value: ${JSON.stringify(s.value)} }`
    ).join(',\n');

    const features = product.features.map(f =>
      `      ${JSON.stringify(f)}`
    ).join(',\n');

    const images = product.images.map(img =>
      `${JSON.stringify(img)}`
    ).join(', ');

    return `  {
    id: ${JSON.stringify(product.id)},
    slug: ${JSON.stringify(product.slug)},
    name: ${JSON.stringify(product.name)},
    shortDescription: ${JSON.stringify(product.shortDescription)},
    description: ${JSON.stringify(product.description)},
    categorySlug: ${JSON.stringify(product.categorySlug)},
    categoryName: ${JSON.stringify(product.categoryName)},
    brandSlug: ${JSON.stringify(product.brandSlug)},
    images: [${images}],
    brand: ${JSON.stringify(product.brand)},
    model: ${JSON.stringify(product.model)},
    sku: ${JSON.stringify(product.sku)},
    priceEUR: ${product.priceEUR},
    isNew: ${product.isNew},
    specifications: [
${specs}
    ],
    features: [
${features}
    ],
  }`;
  }).join(',\n');

  return `import { Product } from '@/types'

// Auto-generated product data
// Generated at: ${new Date().toISOString()}
// Total products: ${formattedProducts.length}
// RM Gastro: ${formattedProducts.filter(p => p.brandSlug === 'rm').length}
// REDFOX: ${formattedProducts.filter(p => p.brandSlug === 'redfox').length}

export const products: Product[] = [
${productLines}
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((product) => product.brandSlug === brandSlug)
}

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(count: number = 4): Product[] {
  return products.slice(0, count)
}

export function getNewProducts(count: number = 4): Product[] {
  return products.filter((product) => product.isNew).slice(0, count)
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.sku?.toLowerCase().includes(searchTerm) ||
    product.model?.toLowerCase().includes(searchTerm)
  )
}

export function getProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
  return products.filter((product) =>
    product.priceEUR >= minPrice && product.priceEUR <= maxPrice
  )
}
`;
}

// Main function
async function main() {
  console.log('Import Products to TypeScript');
  console.log('=============================\n');

  // Check if input file exists
  if (!fs.existsSync(CONFIG.inputFile)) {
    console.error(`Error: Input file not found: ${CONFIG.inputFile}`);
    console.error('Please run scraper.js first to generate the products JSON.');
    process.exit(1);
  }

  // Load products
  console.log(`Loading products from: ${CONFIG.inputFile}`);
  const data = JSON.parse(fs.readFileSync(CONFIG.inputFile, 'utf-8'));
  let products = data.products || [];

  if (products.length === 0) {
    console.log('No products found in the input file.');
    process.exit(0);
  }

  console.log(`Found ${products.length} products (before deduplication)`);

  // Deduplicate by name (keeping first occurrence)
  const seenNames = new Set();
  products = products.filter(p => {
    const key = p.name.toLowerCase().trim();
    if (seenNames.has(key)) return false;
    seenNames.add(key);
    return true;
  });

  console.log(`After deduplication: ${products.length} unique products`);
  console.log(`  - RM Gastro: ${products.filter(p => p.brandSlug === 'rm').length}`);
  console.log(`  - REDFOX: ${products.filter(p => p.brandSlug === 'redfox').length}`);

  // Backup existing file
  if (fs.existsSync(CONFIG.outputFile)) {
    const backupFile = CONFIG.outputFile + CONFIG.backupSuffix;
    fs.copyFileSync(CONFIG.outputFile, backupFile);
    console.log(`\nBacked up existing file to: ${backupFile}`);
  }

  // Generate TypeScript
  console.log('\nGenerating TypeScript file...');
  const typescript = generateTypeScript(products);

  // Ensure output directory exists
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write file
  fs.writeFileSync(CONFIG.outputFile, typescript, 'utf-8');

  console.log('\n' + '='.repeat(50));
  console.log('IMPORT COMPLETE');
  console.log('='.repeat(50));
  console.log(`Output saved to: ${CONFIG.outputFile}`);
  console.log(`Total products: ${products.length}`);

  // Show category distribution
  const categories = {};
  products.forEach(p => {
    categories[p.categorySlug] = (categories[p.categorySlug] || 0) + 1;
  });

  console.log('\nProducts by category:');
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
