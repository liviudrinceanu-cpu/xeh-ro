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

async function test() {
  // Test with explicit fields
  const { data, error } = await supabase
    .from('categories')
    .select(`
      id,
      brand_id,
      parent_id,
      name,
      name_ro,
      slug,
      slug_ro,
      path,
      path_ro,
      depth,
      created_at,
      updated_at,
      brand:brands(*)
    `)
    .eq('depth', 1)
    .limit(3)

  console.log('Error:', error)
  console.log('Data count:', data?.length)
  if (data && data.length > 0) {
    console.log('Sample:', JSON.stringify(data[0], null, 2))
    console.log('Brand type:', typeof data[0].brand, Array.isArray(data[0].brand))
  }
}

test()
