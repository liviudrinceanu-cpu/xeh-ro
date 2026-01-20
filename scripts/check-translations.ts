import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function check() {
  // Paginate to get all products
  let allProducts: any[] = []
  let page = 0
  const pageSize = 1000

  while (true) {
    const { data } = await supabase
      .from('products')
      .select('title_en, title_ro')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (!data || data.length === 0) break
    allProducts = allProducts.concat(data)
    if (data.length < pageSize) break
    page++
  }

  const all = allProducts

  let proper = 0
  let same = 0

  if (all) {
    for (const p of all) {
      const en = (p.title_en || '').split('|')[0].trim()
      const ro = (p.title_ro || '').trim()
      if (en !== ro && ro.length > 0) {
        proper++
      } else {
        same++
      }
    }
  }

  console.log('📊 Translation Status:')
  console.log('─'.repeat(40))
  console.log('✅ Properly translated:', proper)
  console.log('⚠️  Still same as English:', same)
  console.log('─'.repeat(40))
  console.log('Total:', proper + same)
}

check()
