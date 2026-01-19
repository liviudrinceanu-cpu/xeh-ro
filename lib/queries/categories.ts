import { createClient } from '@/lib/supabase/server'
import type { Category, Brand } from '@/types/database'

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
    .select(`
      *,
      brand:brands(*)
    `)
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

  return data || []
}

export async function getCategoryByPath(path: string): Promise<Category | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      brand:brands(*)
    `)
    .eq('path', path)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

export async function getTopLevelCategories(brandSlug?: string): Promise<Category[]> {
  const supabase = await createClient()

  let query = supabase
    .from('categories')
    .select(`
      *,
      brand:brands(*)
    `)
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

  return data || []
}

export async function getCategoryChildren(parentId: string): Promise<Category[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      brand:brands(*)
    `)
    .eq('parent_id', parentId)
    .order('name')

  if (error) {
    console.error('Error fetching category children:', error)
    return []
  }

  return data || []
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
    .select(`
      *,
      brand:brands(*)
    `)
    .in('path', breadcrumbPaths)
    .order('depth')

  if (error) {
    console.error('Error fetching breadcrumb:', error)
    return []
  }

  return data || []
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
