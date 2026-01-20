import { createClient } from '@/lib/supabase/server'
import type { Category, Brand } from '@/types/database'

// Explicit field selection for all category queries (bypasses Supabase schema cache)
// Note: product_count is NOT a real column - it's computed separately
const CATEGORY_SELECT_FIELDS = `
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
`

// Helper to normalize category data (brand comes as array from Supabase, convert to single object)
function normalizeCategory(cat: Record<string, unknown>): Category {
  return {
    ...cat,
    brand: Array.isArray(cat.brand) ? cat.brand[0] : cat.brand,
  } as Category
}

function normalizeCategories(cats: Record<string, unknown>[]): Category[] {
  return cats.map(normalizeCategory)
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }

  return data || []
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching brand:', error)
    return null
  }

  return data
}

export async function getCategories(brandSlug?: string): Promise<Category[]> {
  const supabase = await createClient()

  let query = supabase
    .from('categories')
    .select(CATEGORY_SELECT_FIELDS)
    .order('depth')
    .order('name')

  if (brandSlug) {
    const brand = await getBrandBySlug(brandSlug)
    if (brand) {
      query = query.eq('brand_id', brand.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return normalizeCategories(data || [])
}

export async function getCategoryByPath(path: string): Promise<Category | null> {
  const supabase = await createClient()

  // First try to find by original path
  let { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_SELECT_FIELDS)
    .eq('path', path)
    .single()

  // If not found, try by path_ro (Romanian SEO-friendly path)
  if (error || !data) {
    const result = await supabase
      .from('categories')
      .select(CATEGORY_SELECT_FIELDS)
      .eq('path_ro', path)
      .single()

    data = result.data
    error = result.error
  }

  // If still not found, try by slug_ro for top-level categories
  // URL like /rm/racitoare-rapide gives path /Group/rm/racitoare-rapide
  // We need to extract the slug and search by slug_ro
  if (error || !data) {
    const pathParts = path.split('/')
    const lastSlug = pathParts[pathParts.length - 1]
    const brandSlug = pathParts[2] // /Group/[brand]/[slug]

    const result = await supabase
      .from('categories')
      .select(CATEGORY_SELECT_FIELDS)
      .eq('slug_ro', lastSlug)
      .single()

    if (result.data) {
      // Verify the brand matches
      // Note: brand comes as array from explicit field selection, so get first element
      const brandData = result.data.brand
      const brand = (Array.isArray(brandData) ? brandData[0] : brandData) as { slug: string } | null
      if (brand?.slug === brandSlug) {
        data = result.data
        error = null
      }
    }
  }

  if (error) {
    // Only log if not a "not found" error
    if (error.code !== 'PGRST116') {
      console.error('Error fetching category:', error)
    }
    return null
  }

  return data ? normalizeCategory(data as Record<string, unknown>) : null
}

export async function getTopLevelCategories(brandSlug?: string): Promise<Category[]> {
  const supabase = await createClient()

  let query = supabase
    .from('categories')
    .select(CATEGORY_SELECT_FIELDS)
    .eq('depth', 1)
    .order('name')

  if (brandSlug) {
    const brand = await getBrandBySlug(brandSlug)
    if (brand) {
      query = query.eq('brand_id', brand.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching top level categories:', error)
    return []
  }

  return normalizeCategories((data || []) as Record<string, unknown>[])
}

export async function getCategoryChildren(parentId: string): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_SELECT_FIELDS)
    .eq('parent_id', parentId)
    .order('name')

  if (error) {
    console.error('Error fetching category children:', error)
    return []
  }

  return normalizeCategories((data || []) as Record<string, unknown>[])
}

export async function getCategoryBreadcrumb(path: string): Promise<Category[]> {
  const supabase = await createClient()

  // Build breadcrumb from path
  const pathParts = path.split('/').filter(Boolean)
  const breadcrumbPaths: string[] = []

  let currentPath = ''
  for (const part of pathParts) {
    currentPath += '/' + part
    breadcrumbPaths.push(currentPath)
  }

  const { data, error } = await supabase
    .from('categories')
    .select(CATEGORY_SELECT_FIELDS)
    .in('path', breadcrumbPaths)
    .order('depth')

  if (error) {
    console.error('Error fetching breadcrumb:', error)
    return []
  }

  return normalizeCategories((data || []) as Record<string, unknown>[])
}

export async function getProductCountByCategory(brandSlug?: string): Promise<Record<string, number>> {
  const supabase = await createClient()

  // Get categories (optionally filtered by brand)
  let categoriesQuery = supabase
    .from('categories')
    .select('id, path')

  if (brandSlug) {
    const brand = await getBrandBySlug(brandSlug)
    if (!brand) return {}
    categoriesQuery = categoriesQuery.eq('brand_id', brand.id)
  }

  const { data: categories, error: catError } = await categoriesQuery

  if (catError || !categories) {
    console.error('Error fetching categories:', catError)
    return {}
  }

  // For each category, count products where the category path starts with this category's path
  // This matches how getProducts() fetches products (using LIKE 'path%')
  const counts: Record<string, number> = {}

  // Get all product_categories with their category paths
  // Supabase has a default limit of 1000, so we need to paginate
  const allProductCategories: Array<{ product_id: string; category: { id: string; path: string } }> = []
  const pageSize = 1000
  let page = 0
  let hasMore = true

  while (hasMore) {
    const { data: chunk, error: pcError } = await supabase
      .from('product_categories')
      .select('product_id, category:categories!inner(id, path)')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (pcError) {
      console.error('Error fetching product categories:', pcError)
      return {}
    }

    if (chunk && chunk.length > 0) {
      // Cast the chunk data properly
      for (const item of chunk) {
        const cat = item.category as unknown as { id: string; path: string }
        if (cat) {
          allProductCategories.push({
            product_id: item.product_id,
            category: cat
          })
        }
      }
      page++
      hasMore = chunk.length === pageSize
    } else {
      hasMore = false
    }
  }

  // For each category, count unique products that belong to it or any descendant
  for (const cat of categories) {
    const productIdsInCategory = new Set<string>()

    for (const pc of allProductCategories) {
      // Check if product's category path starts with this category's path
      // Use startsWith without trailing slash to match both exact and descendants
      if (pc.category.path.startsWith(cat.path)) {
        productIdsInCategory.add(pc.product_id)
      }
    }

    counts[cat.id] = productIdsInCategory.size
  }

  return counts
}
