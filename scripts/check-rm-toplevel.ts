import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.log('Missing env vars')
  process.exit(1)
}

const supabase = createClient(url, key)

async function check() {
  // Get RM brand
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name, slug')
    .eq('slug', 'rm')
    .single()

  if (!brand) {
    console.log('RM brand not found')
    return
  }

  console.log(`\n📊 RM Brand: ${brand.name} (${brand.id})\n`)

  // Get top-level categories for RM
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, name_ro, slug, slug_ro, path, path_ro, depth')
    .eq('brand_id', brand.id)
    .eq('depth', 1)
    .order('name')

  if (error || !categories) {
    console.error('Error:', error)
    return
  }

  console.log(`Found ${categories.length} top-level categories:\n`)
  console.log('═'.repeat(100))

  for (const cat of categories) {
    console.log(`\n📁 ${cat.name}`)
    console.log(`   name_ro: ${cat.name_ro || '(none)'}`)
    console.log(`   slug: ${cat.slug}`)
    console.log(`   slug_ro: ${cat.slug_ro || '(MISSING!)'}`)
    console.log(`   path: ${cat.path}`)
    console.log(`   path_ro: ${cat.path_ro || '(MISSING!)'}`)
    console.log(`   depth: ${cat.depth}`)

    // Check expected Romanian URL
    if (cat.path_ro) {
      const expectedUrl = `/rm${cat.path_ro.replace('/Group/rm', '')}`
      console.log(`   expected URL: ${expectedUrl}`)
    } else {
      console.log(`   ⚠️ WARNING: No path_ro - will use Czech URL!`)
    }
  }
}

check()
