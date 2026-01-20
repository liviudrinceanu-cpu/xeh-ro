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
  const { data } = await supabase
    .from('categories')
    .select('name, name_ro')
    .limit(15)

  console.log('Sample categories:')
  data?.forEach(c => {
    const ro = c.name_ro || '(not set)'
    console.log(`  EN: ${c.name}`)
    console.log(`  RO: ${ro}`)
    console.log('  ---')
  })

  // Count stats
  const { data: all } = await supabase
    .from('categories')
    .select('name, name_ro')

  let translated = 0
  let same = 0
  let missing = 0

  all?.forEach(c => {
    if (!c.name_ro) {
      missing++
    } else if (c.name === c.name_ro) {
      same++
    } else {
      translated++
    }
  })

  console.log('\n📊 Category Translation Stats:')
  console.log('─'.repeat(40))
  console.log(`✅ Properly translated: ${translated}`)
  console.log(`⚠️  Same as English: ${same}`)
  console.log(`❌ Missing: ${missing}`)
  console.log('─'.repeat(40))
  console.log(`Total: ${(all || []).length}`)
}

check()
