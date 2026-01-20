import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

// Load environment variables
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function translateWithClaude(titles: string[]): Promise<string[]> {
  const systemPrompt = `You are a professional translator specializing in HORECA (Hotel, Restaurant, Catering) equipment terminology.
Translate the following product titles from English to Romanian.

Rules:
1. Keep technical specifications unchanged (model numbers, GN sizes like GN1/1, dimensions, temperatures, power ratings)
2. Use proper Romanian diacritics (ă, â, î, ș, ț)
3. Use industry-standard Romanian terminology for equipment names
4. Keep brand names unchanged
5. Be concise and professional
6. Return ONLY the translations, one per line, in the same order as input
7. Do NOT include numbers at the start of lines

Common translations to use:
- Food display → Vitrină
- Chilled → frigorific/refrigerat
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
- Hood → Hotă
- Shelf → Raft
- Cabinet → Dulap
- Heated → încălzit
- Adjustable → reglabil
- Island → insulă`

  const userPrompt = `Translate these ${titles.length} product titles to Romanian (one per line, same order):\n\n${titles.join('\n')}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\n${userPrompt}`
        }
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return titles
    }

    // Parse the response - each line should be a translation
    const translations = content.text
      .split('\n')
      .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(line => line.length > 0)

    // Make sure we have the same number of translations as titles
    if (translations.length !== titles.length) {
      console.warn(`Warning: Got ${translations.length} translations for ${titles.length} titles`)
      // Pad with originals if needed
      while (translations.length < titles.length) {
        translations.push(titles[translations.length])
      }
    }

    return translations.slice(0, titles.length)
  } catch (error) {
    console.error('Claude API error:', error)
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

async function translateProducts(batchSize: number = 25) {
  console.log('🚀 Starting product translation with Claude...\n')

  // Check for Anthropic API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is not set in .env.local')
    console.log('\nPlease add your Anthropic API key to .env.local:')
    console.log('ANTHROPIC_API_KEY=sk-ant-...')
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
    const translations = await translateWithClaude(titles)

    // Update each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const translation = translations[i] || titles[i]

      const success = await updateProductTranslation(product.id, translation)

      if (success) {
        translated++
        console.log(`  ✅ ${product.sap_code}: "${titles[i].substring(0, 40)}..." → "${translation.substring(0, 40)}..."`)
      } else {
        failed++
        console.log(`  ❌ Failed: ${product.sap_code}`)
      }
    }

    // Progress update
    const progress = ((translated + failed) / total * 100).toFixed(1)
    console.log(`\n📈 Progress: ${progress}% (${translated} translated, ${failed} failed)\n`)

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n' + '='.repeat(50))
  console.log('🏁 Translation complete!')
  console.log(`   ✅ Translated: ${translated}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('='.repeat(50))
}

// Run the translation
translateProducts(25).catch(console.error)
