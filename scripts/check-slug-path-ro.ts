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
  // Get all categories with their fields
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, name_ro, slug, slug_ro, path, path_ro, depth, parent_id')
    .order('path')

  if (error || !categories) {
    console.error('Error:', error)
    return
  }

  // Stats
  let hasSlugRo = 0
  let missingSlugRo = 0
  let hasPathRo = 0
  let missingPathRo = 0

  // By depth
  const depthStats: Record<number, { total: number; hasSlugRo: number; hasPathRo: number }> = {}

  // Sample some missing ones
  const sampleMissing: typeof categories = []

  for (const cat of categories) {
    // Initialize depth stats
    if (!depthStats[cat.depth]) {
      depthStats[cat.depth] = { total: 0, hasSlugRo: 0, hasPathRo: 0 }
    }
    depthStats[cat.depth].total++

    if (cat.slug_ro) {
      hasSlugRo++
      depthStats[cat.depth].hasSlugRo++
    } else {
      missingSlugRo++
      if (sampleMissing.length < 10) {
        sampleMissing.push(cat)
      }
    }

    if (cat.path_ro) {
      hasPathRo++
      depthStats[cat.depth].hasPathRo++
    } else {
      missingPathRo++
    }
  }

  console.log('\n📊 Category Slug/Path RO Stats:')
  console.log('═'.repeat(50))
  console.log(`Total categories: ${categories.length}`)
  console.log('')
  console.log(`slug_ro:`)
  console.log(`  ✅ Has slug_ro: ${hasSlugRo}`)
  console.log(`  ❌ Missing slug_ro: ${missingSlugRo}`)
  console.log('')
  console.log(`path_ro:`)
  console.log(`  ✅ Has path_ro: ${hasPathRo}`)
  console.log(`  ❌ Missing path_ro: ${missingPathRo}`)
  console.log('')

  console.log('📈 Stats by depth (level):')
  console.log('─'.repeat(50))
  for (const depth of Object.keys(depthStats).sort((a, b) => Number(a) - Number(b))) {
    const stats = depthStats[Number(depth)]
    console.log(`  Level ${depth}: ${stats.total} total | slug_ro: ${stats.hasSlugRo}/${stats.total} | path_ro: ${stats.hasPathRo}/${stats.total}`)
  }

  if (sampleMissing.length > 0) {
    console.log('\n📝 Sample categories missing slug_ro:')
    console.log('─'.repeat(50))
    for (const cat of sampleMissing) {
      console.log(`  name: ${cat.name}`)
      console.log(`  name_ro: ${cat.name_ro || '(none)'}`)
      console.log(`  slug: ${cat.slug}`)
      console.log(`  path: ${cat.path}`)
      console.log(`  depth: ${cat.depth}`)
      console.log('  ---')
    }
  }
}

check()
