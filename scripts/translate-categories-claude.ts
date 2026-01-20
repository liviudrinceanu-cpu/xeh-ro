import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function translateWithClaude(names: string[]): Promise<string[]> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Translate these HORECA equipment category names from English to Romanian.
Use proper Romanian diacritics (ă, â, î, ș, ț).
Use industry-standard terminology.
Return ONLY translations, one per line, same order.

Common translations:
- Cooking Equipment → Echipamente de Gătit
- Refrigeration → Refrigerare
- Ovens → Cuptoare
- Fryers → Friteuse
- Grills → Grătare
- Dishwashers → Mașini de Spălat Vase
- Freezers → Congelatoare
- Ice Makers → Mașini de Gheață
- Tables → Mese
- Shelves → Rafturi
- Sinks → Chiuvete
- Cabinets → Dulapuri
- Hoods → Hote
- Mixers → Mixere
- Slicers → Feliatoare
- Display Cases → Vitrine
- Beverage → Băuturi
- Coffee → Cafea
- Storage → Depozitare
- Ventilation → Ventilație
- Accessories → Accesorii
- Preparation → Preparare

Categories to translate:
${names.join('\n')}`
    }],
  })

  const content = response.content[0]
  if (content.type !== 'text') return names

  return content.text
    .split('\n')
    .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(l => l.length > 0)
    .slice(0, names.length)
}

async function translateCategories() {
  console.log('🚀 Translating categories with Claude...\n')

  // Get all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, name_ro')
    .order('path')

  if (!categories || categories.length === 0) {
    console.log('No categories found!')
    return
  }

  // Filter categories that need translation
  const needsTranslation = categories.filter(c => !c.name_ro || c.name_ro === c.name)
  console.log(`📊 Total categories: ${categories.length}`)
  console.log(`📝 Need translation: ${needsTranslation.length}\n`)

  if (needsTranslation.length === 0) {
    console.log('✅ All categories already translated!')
    return
  }

  // Process in batches
  const batchSize = 50
  let translated = 0

  for (let i = 0; i < needsTranslation.length; i += batchSize) {
    const batch = needsTranslation.slice(i, i + batchSize)
    const names = batch.map(c => c.name)

    console.log(`📦 Batch ${Math.floor(i / batchSize) + 1} (${batch.length} categories)...`)

    const translations = await translateWithClaude(names)

    // Update database
    for (let j = 0; j < batch.length; j++) {
      const cat = batch[j]
      const translation = translations[j] || names[j]

      await supabase
        .from('categories')
        .update({ name_ro: translation })
        .eq('id', cat.id)

      translated++
      console.log(`  ✅ "${cat.name}" → "${translation}"`)
    }

    // Small delay
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('\n' + '='.repeat(50))
  console.log(`🏁 Done! Translated ${translated} categories`)
  console.log('='.repeat(50))
}

translateCategories().catch(console.error)
