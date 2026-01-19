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

  // If brandSlug is provided, we need to filter products by brand via categories
  if (brandSlug) {
    // First get the brand
    const brand = await getBrandBySlug(brandSlug)
    if (!brand) return {}

    // Get all categories for this brand
    const { data: brandCategories, error: catError } = await supabase
      .from('categories')
      .select('id, path')
      .eq('brand_id', brand.id)

    if (catError) {
      console.error('Error fetching brand categories:', catError)
      return {}
    }

    const categoryIds = new Set(brandCategories?.map(c => c.id) || [])

    // Get product counts only for these categories
    const { data, error } = await supabase
      .from('product_categories')
      .select('category_id')
      .in('category_id', Array.from(categoryIds))

    if (error) {
      console.error('Error fetching product counts:', error)
      return {}
    }

    // Count products per category
    const counts: Record<string, number> = {}
    for (const item of data || []) {
      counts[item.category_id] = (counts[item.category_id] || 0) + 1
    }

    // Also add hierarchical counting - parent categories should include children's products
    // Build a map of category paths to IDs
    const categoryPathMap = new Map<string, string>()
    for (const cat of brandCategories || []) {
      categoryPathMap.set(cat.path, cat.id)
    }

    // For each category, sum up products from all its descendants
    const hierarchicalCounts: Record<string, number> = {}
    for (const cat of brandCategories || []) {
      let totalCount = counts[cat.id] || 0

      // Find all child categories (categories whose path starts with this one)
      for (const otherCat of brandCategories || []) {
        if (otherCat.path !== cat.path && otherCat.path.startsWith(cat.path + '/')) {
          totalCount += counts[otherCat.id] || 0
        }
      }

      hierarchicalCounts[cat.id] = totalCount
    }

    return hierarchicalCounts
  }

  // Default behavior (no brand filter)
  const { data, error } = await supabase
    .from('product_categories')
    .select('category_id')

  if (error) {
    console.error('Error fetching product counts:', error)
    return {}
  }

  const counts: Record<string, number> = {}
  for (const item of data || []) {
    counts[item.category_id] = (counts[item.category_id] || 0) + 1
  }

  return counts
}
