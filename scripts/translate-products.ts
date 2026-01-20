import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// Load environment variables
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Common HORECA equipment terms dictionary (EN -> RO)
const TRANSLATION_DICTIONARY: Record<string, string> = {
  // Equipment types
  'oven': 'cuptor',
  'convection oven': 'cuptor cu convecție',
  'combi oven': 'cuptor combi',
  'pizza oven': 'cuptor pizza',
  'deck oven': 'cuptor cu vatră',
  'baking oven': 'cuptor de patiserie',
  'microwave': 'cuptor cu microunde',
  'fryer': 'friteuză',
  'deep fryer': 'friteuză',
  'pressure fryer': 'friteuză sub presiune',
  'grill': 'grătar',
  'contact grill': 'grătar contact',
  'water grill': 'grătar pe apă',
  'lava stone grill': 'grătar pe piatră lavică',
  'salamander': 'salamandru',
  'griddle': 'plită',
  'fry top': 'plită',
  'solid top': 'plită masivă',
  'range': 'mașină de gătit',
  'cooker': 'mașină de gătit',
  'stove': 'aragaz',
  'hob': 'plită',
  'induction hob': 'plită cu inducție',
  'induction cooker': 'plită cu inducție',
  'boiling pan': 'marmită',
  'tilting pan': 'tigaie basculantă',
  'tilting bratt pan': 'tigaie basculantă',
  'bratt pan': 'tigaie basculantă',
  'braising pan': 'tigaie de prăjit',
  'kettle': 'cazan',
  'stock pot': 'cazan pentru supă',
  'pasta cooker': 'fierbător paste',
  'bain marie': 'baie maria',
  'food warmer': 'încălzitor mâncare',
  'hot cupboard': 'dulap cald',
  'plate warmer': 'încălzitor farfurii',
  'heat lamp': 'lampă cu infraroșu',
  'toaster': 'toaster',
  'conveyor toaster': 'toaster cu bandă',
  'waffle maker': 'aparat vafe',
  'crepe maker': 'aparat clătite',
  'planetary mixer': 'mixer planetar',
  'spiral mixer': 'mixer spiral',
  'blender': 'blender',
  'cutter': 'cutter',
  'food processor': 'robot de bucătărie',
  'slicer': 'feliator',
  'meat grinder': 'mașină de tocat carne',
  'mincer': 'mașină de tocat',
  'vacuum packer': 'aparat de vidat',
  'vacuum machine': 'mașină de vidat',

  // Refrigeration
  'refrigerator': 'frigider',
  'freezer': 'congelator',
  'refrigerated counter': 'banc frigorific',
  'refrigerated cabinet': 'dulap frigorific',
  'reach-in refrigerator': 'frigider vertical',
  'chest freezer': 'ladă frigorifică',
  'display case': 'vitrină',
  'display cabinet': 'vitrină',
  'cold room': 'cameră frigorifică',
  'walk-in cooler': 'cameră frigorifică',
  'blast chiller': 'răcitor rapid',
  'blast freezer': 'congelator rapid',
  'shock freezer': 'congelator șoc',
  'ice maker': 'mașină de gheață',
  'ice machine': 'mașină de gheață',
  'ice cube maker': 'mașină cuburi gheață',
  'flake ice maker': 'mașină gheață fulgi',
  'wine cooler': 'vinotecă',
  'bottle cooler': 'răcitor sticle',
  'beer cooler': 'răcitor bere',
  'salad bar': 'salad bar',
  'buffet display': 'vitrină bufet',

  // Dishwashing
  'dishwasher': 'mașină de spălat vase',
  'glasswasher': 'mașină de spălat pahare',
  'utensil washer': 'mașină de spălat ustensile',
  'pot washer': 'mașină de spălat oale',
  'hood type dishwasher': 'mașină de spălat cu capotă',
  'conveyor dishwasher': 'mașină de spălat cu bandă',
  'undercounter dishwasher': 'mașină de spălat sub blat',
  'rack conveyor': 'mașină cu transport coșuri',

  // Tables and furniture
  'table': 'masă',
  'work table': 'masă de lucru',
  'prep table': 'masă de preparare',
  'sink': 'chiuvetă',
  'double sink': 'chiuvetă dublă',
  'hand wash basin': 'lavoar',
  'shelf': 'raft',
  'shelving': 'rafturi',
  'rack': 'suport',
  'trolley': 'cărucior',
  'cart': 'cărucior',
  'cabinet': 'dulap',
  'cupboard': 'dulap',
  'drawer': 'sertar',
  'hood': 'hotă',
  'exhaust hood': 'hotă de evacuare',
  'ventilation hood': 'hotă de ventilație',

  // Beverage
  'coffee machine': 'espressor',
  'espresso machine': 'espressor',
  'coffee grinder': 'râșniță cafea',
  'water dispenser': 'dozator apă',
  'juice dispenser': 'dozator sucuri',
  'beverage dispenser': 'dozator băuturi',
  'soft serve machine': 'mașină înghețată',
  'ice cream machine': 'mașină înghețată',
  'slush machine': 'mașină slush',
  'granita machine': 'mașină granita',

  // Adjectives and modifiers
  'electric': 'electric',
  'gas': 'pe gaz',
  'commercial': 'profesional',
  'professional': 'profesional',
  'industrial': 'industrial',
  'stainless steel': 'inox',
  'chrome': 'cromat',
  'heated': 'încălzit',
  'refrigerated': 'frigorific',
  'cooled': 'răcit',
  'insulated': 'izolat',
  'mobile': 'mobil',
  'portable': 'portabil',
  'countertop': 'de banc',
  'floor standing': 'pe podea',
  'wall mounted': 'de perete',
  'built-in': 'încorporabil',
  'modular': 'modular',
  'compact': 'compact',
  'heavy duty': 'rezistent',
  'light duty': 'ușor',
  'single': 'simplu',
  'double': 'dublu',
  'triple': 'triplu',
  'left': 'stânga',
  'right': 'dreapta',
  'top': 'sus',
  'bottom': 'jos',
  'front': 'față',
  'rear': 'spate',
  'open': 'deschis',
  'closed': 'închis',
  'with': 'cu',
  'without': 'fără',
  'and': 'și',
  'for': 'pentru',
  'capacity': 'capacitate',
  'power': 'putere',
  'temperature': 'temperatură',
  'timer': 'cronometru',
  'digital': 'digital',
  'manual': 'manual',
  'automatic': 'automat',
  'programmable': 'programabil',
}

// Units and technical terms that should remain unchanged
const KEEP_UNCHANGED = [
  /\d+x?GN\d+\/\d+/gi, // GN sizes like GN1/1, 4xGN1/1
  /\d+°?C/gi, // Temperature values
  /\d+V/gi, // Voltage
  /\d+kW/gi, // Power
  /\d+W/gi, // Wattage
  /\d+L/gi, // Liters
  /\d+mm/gi, // Millimeters
  /\d+cm/gi, // Centimeters
  /\d+kg/gi, // Kilograms
  /\d+x\d+/gi, // Dimensions
  /\d+\s*[xX]\s*\d+/gi, // Dimensions with x
]

async function translateWithOpenAI(titles: string[]): Promise<string[]> {
  const systemPrompt = `You are a professional translator specializing in HORECA (Hotel, Restaurant, Catering) equipment terminology.
Translate the following product titles from English to Romanian.

Rules:
1. Keep technical specifications unchanged (model numbers, GN sizes like GN1/1, dimensions, temperatures, power ratings)
2. Use proper Romanian diacritics (ă, â, î, ș, ț)
3. Use industry-standard Romanian terminology for equipment names
4. Keep brand names unchanged
5. Be concise and professional
6. Return ONLY the translations, one per line, in the same order as input

Common translations to use:
- Oven → Cuptor
- Convection Oven → Cuptor cu convecție
- Fryer → Friteuză
- Grill → Grătar
- Refrigerator → Frigider
- Freezer → Congelator
- Dishwasher → Mașină de spălat vase
- Blast Chiller → Răcitor rapid
- Ice Maker → Mașină de gheață
- Salamander → Salamandru
- Griddle/Fry Top → Plită
- Bain Marie → Baie maria
- Range/Cooker → Mașină de gătit
- Work Table → Masă de lucru
- Refrigerated Counter → Banc frigorific
- Display Case → Vitrină
- Hood → Hotă`

  const userPrompt = titles.map((t, i) => `${i + 1}. ${t}`).join('\n')

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    })

    const content = response.choices[0]?.message?.content || ''
    // Parse the response - each line should be a translation
    const translations = content
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)

    return translations
  } catch (error) {
    console.error('OpenAI API error:', error)
    return titles // Return original if translation fails
  }
}

async function getUntranslatedProducts(limit: number = 100) {
  const { data, error, count } = await supabase
    .from('products')
    .select('id, title_en, model, sap_code', { count: 'exact' })
    .not('title_en', 'is', null)
    .or('title_ro.is.null,title_ro.eq.')
    .limit(limit)

  if (error) {
    console.error('Error fetching products:', error)
    return { products: [], total: 0 }
  }

  return { products: data || [], total: count || 0 }
}

async function updateProductTranslation(id: string, titleRo: string) {
  const { error } = await supabase
    .from('products')
    .update({ title_ro: titleRo })
    .eq('id', id)

  if (error) {
    console.error(`Error updating product ${id}:`, error)
    return false
  }
  return true
}

async function translateProducts(batchSize: number = 20) {
  console.log('🚀 Starting product translation...\n')

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local')
    console.log('\nPlease add your OpenAI API key to .env.local:')
    console.log('OPENAI_API_KEY=sk-...')
    return
  }

  let translated = 0
  let failed = 0
  let total = 0

  // Get initial count
  const { total: totalCount } = await getUntranslatedProducts(1)
  total = totalCount
  console.log(`📊 Found ${total} products to translate\n`)

  if (total === 0) {
    console.log('✅ All products are already translated!')
    return
  }

  while (true) {
    const { products, total: remaining } = await getUntranslatedProducts(batchSize)

    if (products.length === 0) {
      break
    }

    console.log(`📦 Processing batch of ${products.length} products (${remaining} remaining)...`)

    // Extract titles for batch translation
    const titles = products.map(p => {
      // Clean up the title - remove brand suffix if present
      const title = p.title_en?.split('|')[0].trim() || p.model
      return title
    })

    // Translate batch
    const translations = await translateWithOpenAI(titles)

    // Update each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const translation = translations[i] || titles[i]

      const success = await updateProductTranslation(product.id, translation)

      if (success) {
        translated++
        console.log(`  ✅ ${product.sap_code}: "${titles[i]}" → "${translation}"`)
      } else {
        failed++
        console.log(`  ❌ Failed: ${product.sap_code}`)
      }
    }

    // Progress update
    const progress = ((translated + failed) / total * 100).toFixed(1)
    console.log(`\n📈 Progress: ${progress}% (${translated} translated, ${failed} failed)\n`)

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(50))
  console.log('🏁 Translation complete!')
  console.log(`   ✅ Translated: ${translated}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('='.repeat(50))
}

// Run the translation
translateProducts(20).catch(console.error)
