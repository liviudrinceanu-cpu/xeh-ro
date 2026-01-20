import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load .env.local
config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, path, depth, brand_id')
    .order('path')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log(JSON.stringify(data, null, 2))
  console.log(`\nTotal: ${data?.length} categories`)
}

getCategories()
