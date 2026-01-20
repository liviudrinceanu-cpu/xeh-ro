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

// Common category translations (EN -> RO)
const CATEGORY_TRANSLATIONS: Record<string, string> = {
  // Main categories
  'Cooking Equipment': 'Echipamente de Gătit',
  'Cooking': 'Gătit',
  'Refrigeration': 'Refrigerare',
  'Refrigeration Equipment': 'Echipamente de Refrigerare',
  'Food Preparation': 'Preparare Alimente',
  'Food Prep': 'Preparare',
  'Dishwashing': 'Spălare Vase',
  'Dishwashing Equipment': 'Echipamente de Spălat Vase',
  'Warewashing': 'Spălare',
  'Beverage': 'Băuturi',
  'Beverage Equipment': 'Echipamente Băuturi',
  'Coffee': 'Cafea',
  'Hot Beverages': 'Băuturi Calde',
  'Cold Beverages': 'Băuturi Reci',
  'Storage': 'Depozitare',
  'Storage Equipment': 'Echipamente Depozitare',
  'Furniture': 'Mobilier',
  'Kitchen Furniture': 'Mobilier Bucătărie',
  'Stainless Steel': 'Inox',
  'Stainless Steel Furniture': 'Mobilier Inox',
  'Ventilation': 'Ventilație',
  'Ventilation Equipment': 'Echipamente Ventilație',
  'Hoods': 'Hote',

  // Cooking subcategories
  'Ovens': 'Cuptoare',
  'Convection Ovens': 'Cuptoare cu Convecție',
  'Combi Ovens': 'Cuptoare Combi',
  'Pizza Ovens': 'Cuptoare Pizza',
  'Deck Ovens': 'Cuptoare cu Vatră',
  'Microwave Ovens': 'Cuptoare cu Microunde',
  'Fryers': 'Friteuse',
  'Electric Fryers': 'Friteuse Electrice',
  'Gas Fryers': 'Friteuse pe Gaz',
  'Grills': 'Grătare',
  'Contact Grills': 'Grătare Contact',
  'Water Grills': 'Grătare pe Apă',
  'Lava Stone Grills': 'Grătare cu Piatră Lavică',
  'Salamanders': 'Salamandre',
  'Griddles': 'Plite',
  'Fry Tops': 'Plite de Prăjit',
  'Ranges': 'Mașini de Gătit',
  'Cookers': 'Aragaze',
  'Hobs': 'Plite',
  'Induction': 'Inducție',
  'Induction Hobs': 'Plite cu Inducție',
  'Boiling Pans': 'Marmite',
  'Tilting Pans': 'Tigăi Basculante',
  'Bratt Pans': 'Tigăi Basculante',
  'Pasta Cookers': 'Fierbătoare Paste',
  'Bain Maries': 'Băi Maria',
  'Food Warmers': 'Încălzitoare',
  'Hot Cupboards': 'Dulapuri Calde',
  'Heat Lamps': 'Lămpi cu Infraroșu',
  'Toasters': 'Toastere',

  // Refrigeration subcategories
  'Refrigerators': 'Frigidere',
  'Freezers': 'Congelatoare',
  'Refrigerated Counters': 'Bancuri Frigorifice',
  'Refrigerated Cabinets': 'Dulapuri Frigorifice',
  'Display Cases': 'Vitrine',
  'Display Cabinets': 'Vitrine',
  'Blast Chillers': 'Răcitoare Rapide',
  'Blast Freezers': 'Congelatoare Rapide',
  'Ice Makers': 'Mașini de Gheață',
  'Ice Machines': 'Mașini de Gheață',
  'Wine Coolers': 'Vinoteci',
  'Bottle Coolers': 'Răcitoare Sticle',
  'Salad Bars': 'Salad Bar',
  'Cold Buffet': 'Bufet Rece',

  // Food prep subcategories
  'Mixers': 'Mixere',
  'Planetary Mixers': 'Mixere Planetare',
  'Spiral Mixers': 'Mixere Spirală',
  'Blenders': 'Blendere',
  'Cutters': 'Cuttere',
  'Food Processors': 'Roboți de Bucătărie',
  'Slicers': 'Feliatoare',
  'Meat Grinders': 'Mașini de Tocat Carne',
  'Vacuum Packers': 'Aparate de Vidat',
  'Peelers': 'Mașini de Curățat',
  'Vegetable Cutters': 'Mașini de Tăiat Legume',

  // Dishwashing subcategories
  'Dishwashers': 'Mașini de Spălat Vase',
  'Glasswashers': 'Mașini de Spălat Pahare',
  'Hood Type': 'Cu Capotă',
  'Undercounter': 'Sub Blat',
  'Conveyor': 'Cu Bandă',
  'Rack Conveyor': 'Cu Transport Coșuri',

  // Furniture subcategories
  'Tables': 'Mese',
  'Work Tables': 'Mese de Lucru',
  'Sinks': 'Chiuvete',
  'Shelves': 'Rafturi',
  'Shelving': 'Rafturi',
  'Racks': 'Suporturi',
  'Trolleys': 'Cărucioare',
  'Carts': 'Cărucioare',
  'Cabinets': 'Dulapuri',

  // Modifiers
  'Electric': 'Electric',
  'Gas': 'Pe Gaz',
  'Professional': 'Profesional',
  'Commercial': 'Comercial',
  'Heavy Duty': 'Rezistent',
  'Compact': 'Compact',
  'Modular': 'Modular',
}

async function translateWithOpenAI(names: string[]): Promise<string[]> {
  const systemPrompt = `You are a professional translator specializing in HORECA (Hotel, Restaurant, Catering) equipment terminology.
Translate the following category names from English to Romanian.

Rules:
1. Use proper Romanian diacritics (ă, â, î, ș, ț)
2. Use industry-standard Romanian terminology
3. Keep it concise - these are category names, not descriptions
4. Be consistent with naming conventions
5. Return ONLY the translations, one per line, in the same order as input

Examples:
- Cooking Equipment → Echipamente de Gătit
- Refrigeration → Refrigerare
- Ovens → Cuptoare
- Fryers → Friteuse
- Grills → Grătare
- Dishwashers → Mașini de Spălat Vase
- Work Tables → Mese de Lucru
- Ice Makers → Mașini de Gheață`

  const userPrompt = names.map((n, i) => `${i + 1}. ${n}`).join('\n')

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 2000,
    })

    const content = response.choices[0]?.message?.content || ''
    const translations = content
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)

    return translations
  } catch (error) {
    console.error('OpenAI API error:', error)
    return names
  }
}

async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, name_ro, path, depth')
    .order('path')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

async function updateCategoryTranslation(id: string, nameRo: string) {
  const { error } = await supabase
    .from('categories')
    .update({ name_ro: nameRo })
    .eq('id', id)

  if (error) {
    console.error(`Error updating category ${id}:`, error)
    return false
  }
  return true
}

async function checkNameRoColumn() {
  // Check if name_ro column exists
  const { data, error } = await supabase
    .from('categories')
    .select('name_ro')
    .limit(1)

  if (error && error.message.includes('column "name_ro" does not exist')) {
    console.log('⚠️  The name_ro column does not exist in the categories table.')
    console.log('\nPlease run this SQL in Supabase to add it:')
    console.log('─'.repeat(50))
    console.log(`
ALTER TABLE categories
ADD COLUMN IF NOT EXISTS name_ro TEXT;

COMMENT ON COLUMN categories.name_ro IS 'Romanian translation of category name';
`)
    console.log('─'.repeat(50))
    return false
  }

  return true
}

async function translateCategories() {
  console.log('🚀 Starting category translation...\n')

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local')
    console.log('\nPlease add your OpenAI API key to .env.local:')
    console.log('OPENAI_API_KEY=sk-...')
    return
  }

  // Check if name_ro column exists
  const hasColumn = await checkNameRoColumn()
  if (!hasColumn) {
    return
  }

  const categories = await getAllCategories()
  console.log(`📊 Found ${categories.length} categories\n`)

  if (categories.length === 0) {
    console.log('❌ No categories found!')
    return
  }

  // Filter categories that need translation
  const needsTranslation = categories.filter(c => !c.name_ro || c.name_ro === '')
  console.log(`📝 ${needsTranslation.length} categories need translation\n`)

  if (needsTranslation.length === 0) {
    console.log('✅ All categories are already translated!')
    return
  }

  let translated = 0
  let failed = 0

  // Process in batches
  const batchSize = 30
  for (let i = 0; i < needsTranslation.length; i += batchSize) {
    const batch = needsTranslation.slice(i, i + batchSize)
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}...`)

    // First try dictionary translations
    const names: string[] = []
    const needsAI: number[] = []

    for (let j = 0; j < batch.length; j++) {
      const category = batch[j]
      const dictTranslation = CATEGORY_TRANSLATIONS[category.name]

      if (dictTranslation) {
        names.push(dictTranslation)
      } else {
        names.push(category.name) // placeholder
        needsAI.push(j)
      }
    }

    // Translate remaining with AI
    if (needsAI.length > 0) {
      const aiNames = needsAI.map(idx => batch[idx].name)
      const aiTranslations = await translateWithOpenAI(aiNames)

      for (let k = 0; k < needsAI.length; k++) {
        names[needsAI[k]] = aiTranslations[k] || aiNames[k]
      }
    }

    // Update database
    for (let j = 0; j < batch.length; j++) {
      const category = batch[j]
      const translation = names[j]

      const success = await updateCategoryTranslation(category.id, translation)

      if (success) {
        translated++
        console.log(`  ✅ "${category.name}" → "${translation}"`)
      } else {
        failed++
        console.log(`  ❌ Failed: ${category.name}`)
      }
    }

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n' + '='.repeat(50))
  console.log('🏁 Category translation complete!')
  console.log(`   ✅ Translated: ${translated}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('='.repeat(50))
}

// Also create a function to list all categories (useful for debugging)
async function listCategories() {
  const categories = await getAllCategories()
  console.log('📋 All categories:\n')

  const grouped: Record<string, typeof categories> = {}
  for (const cat of categories) {
    const brand = cat.path.includes('/rm/') ? 'RM Gastro' : 'REDFOX'
    if (!grouped[brand]) grouped[brand] = []
    grouped[brand].push(cat)
  }

  for (const [brand, cats] of Object.entries(grouped)) {
    console.log(`\n${brand}:`)
    console.log('─'.repeat(40))
    for (const cat of cats) {
      const indent = '  '.repeat(cat.depth)
      const roText = cat.name_ro ? ` → ${cat.name_ro}` : ''
      console.log(`${indent}${cat.name}${roText}`)
    }
  }

  console.log(`\nTotal: ${categories.length} categories`)
}

// Command line argument handling
const args = process.argv.slice(2)
if (args.includes('--list')) {
  listCategories().catch(console.error)
} else {
  translateCategories().catch(console.error)
}
