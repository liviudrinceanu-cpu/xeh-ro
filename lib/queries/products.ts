import { createClient } from '@/lib/supabase/server'
import type { Product, ProductWithDetails, PaginatedResponse } from '@/types/database'

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'
export type StockFilter = 'all' | 'in_stock' | 'on_request'

export async function getProducts(options?: {
  brandSlug?: string
  categoryPath?: string
  page?: number
  pageSize?: number
  search?: string
  sort?: SortOption
  stockFilter?: StockFilter
  priceMin?: number
  priceMax?: number
}): Promise<PaginatedResponse<Product>> {
  const supabase = await createClient()
  const page = options?.page || 1
  const pageSize = options?.pageSize || 24
  const offset = (page - 1) * pageSize

  let query = supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*)
    `, { count: 'exact' })

  // Filter by brand
  if (options?.brandSlug) {
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', options.brandSlug)
      .single()

    if (brand) {
      query = query.eq('brand_id', brand.id)
    }
  }

  // Filter by category
  if (options?.categoryPath) {
    const { data: productIds } = await supabase
      .from('product_categories')
      .select('product_id, category:categories!inner(path)')
      .like('category.path', `${options.categoryPath}%`)

    if (productIds && productIds.length > 0) {
      query = query.in('id', productIds.map(p => p.product_id))
    }
  }

  // Search (includes Romanian titles)
  if (options?.search) {
    query = query.or(`title_en.ilike.%${options.search}%,title_ro.ilike.%${options.search}%,model.ilike.%${options.search}%,sap_code.ilike.%${options.search}%`)
  }

  // Filter by stock status
  if (options?.stockFilter && options.stockFilter !== 'all') {
    query = query.eq('stock_status', options.stockFilter)
  }

  // Filter by price range
  if (options?.priceMin !== undefined && options.priceMin > 0) {
    query = query.gte('price_amount', options.priceMin)
  }
  if (options?.priceMax !== undefined && options.priceMax > 0) {
    query = query.lte('price_amount', options.priceMax)
  }

  // Sorting (default: price high to low)
  const sort = options?.sort || 'price_desc'
  switch (sort) {
    case 'price_asc':
      query = query.order('price_amount', { ascending: true, nullsFirst: false })
      break
    case 'price_desc':
      query = query.order('price_amount', { ascending: false, nullsFirst: false })
      break
    case 'name_asc':
      query = query.order('title_en', { ascending: true, nullsFirst: false })
      break
    case 'name_desc':
      query = query.order('title_en', { ascending: false, nullsFirst: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  // Pagination
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return { data: [], count: 0, page, pageSize, totalPages: 0 }
  }

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  }
}

export async function getProductByModel(model: string): Promise<ProductWithDetails | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*),
      product_specifications(*),
      product_features(*),
      product_documents(*),
      product_categories(*, category:categories(*)),
      product_accessories(*),
      product_icons(*)
    `)
    .eq('model', model)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithDetails
}

export async function getProductBySapCode(sapCode: string): Promise<ProductWithDetails | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*),
      product_specifications(*),
      product_features(*),
      product_documents(*),
      product_categories(*, category:categories(*)),
      product_accessories(*),
      product_icons(*)
    `)
    .eq('sap_code', sapCode)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithDetails
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const supabase = await createClient()

  // First try to find by slug_ro (SEO-friendly URL)
  let { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*),
      product_specifications(*),
      product_features(*),
      product_documents(*),
      product_categories(*, category:categories(*)),
      product_accessories(*),
      product_icons(*)
    `)
    .eq('slug_ro', slug)
    .single()

  // If not found by slug_ro, try sap_code (for backward compatibility)
  if (error || !data) {
    // Extract SAP code from slug (format: something-SAPCODE or just SAPCODE)
    const sapCode = slug.includes('-') ? slug.split('-').pop() : slug

    const result = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        product_images(*),
        product_specifications(*),
        product_features(*),
        product_documents(*),
        product_categories(*, category:categories(*)),
        product_accessories(*),
        product_icons(*)
      `)
      .eq('sap_code', sapCode)
      .single()

    data = result.data
    error = result.error
  }

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithDetails
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*)
    `)
    .not('price_amount', 'is', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  const supabase = await createClient()

  // Get the product's category
  const { data: productCategory } = await supabase
    .from('product_categories')
    .select('category_id')
    .eq('product_id', productId)
    .eq('is_primary', true)
    .single()

  if (!productCategory) return []

  // Get products from the same category
  const { data: categoryProducts } = await supabase
    .from('product_categories')
    .select('product_id')
    .eq('category_id', productCategory.category_id)
    .neq('product_id', productId)
    .limit(limit)

  if (!categoryProducts || categoryProducts.length === 0) return []

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      product_images(*)
    `)
    .in('id', categoryProducts.map(p => p.product_id))

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data || []
}
