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
  // Get categories with depth >= 2 (subcategories)
  const { data: subcategories, error } = await supabase
    .from('categories')
    .select('id, name, name_ro, slug, slug_ro, path, path_ro, depth')
    .gte('depth', 2)
    .order('path')
    .limit(20)

  if (error || !subcategories) {
    console.error('Error:', error)
    return
  }

  console.log('\n📊 Sample Subcategories (depth >= 2):')
  console.log('═'.repeat(80))

  for (const cat of subcategories) {
    console.log(`\n📁 ${cat.name}`)
    console.log(`   name_ro: ${cat.name_ro || '(none)'}`)
    console.log(`   slug: ${cat.slug}`)
    console.log(`   slug_ro: ${cat.slug_ro}`)
    console.log(`   path: ${cat.path}`)
    console.log(`   path_ro: ${cat.path_ro}`)
    console.log(`   depth: ${cat.depth}`)

    // Check if slug_ro is different from slug
    if (cat.slug === cat.slug_ro) {
      console.log(`   ⚠️ WARNING: slug_ro same as slug!`)
    }
  }

  // Check how many have slug_ro same as slug
  const { data: all } = await supabase
    .from('categories')
    .select('slug, slug_ro')

  let same = 0
  let different = 0
  all?.forEach(c => {
    if (c.slug === c.slug_ro) {
      same++
    } else {
      different++
    }
  })

  console.log('\n' + '═'.repeat(80))
  console.log('📈 slug vs slug_ro comparison:')
  console.log(`   ✅ Different (properly translated): ${different}`)
  console.log(`   ⚠️  Same (not translated): ${same}`)
}

check()
