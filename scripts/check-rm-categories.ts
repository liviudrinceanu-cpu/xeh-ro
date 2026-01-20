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
    .select('id')
    .eq('slug', 'rm')
    .single()

  if (!brand) {
    console.log('Brand not found')
    return
  }

  // Get top-level RM categories (depth 1)
  const { data: categories } = await supabase
    .from('categories')
    .select('name, name_ro, depth')
    .eq('brand_id', brand.id)
    .eq('depth', 1)
    .order('name')

  console.log('RM Top-Level Categories (depth=1):')
  console.log('─'.repeat(60))
  categories?.forEach(c => {
    console.log(`EN: ${c.name}`)
    console.log(`RO: ${c.name_ro || '(NULL)'}`)
    console.log('---')
  })
  console.log(`\nTotal: ${categories?.length || 0}`)
}

check()
