import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.trim()
  const limit = Math.min(parseInt(searchParams.get('limit') || '8'), 20)

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [], categories: [] })
  }

  const supabase = await createClient()

  // Search products
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      sap_code,
      model,
      title_en,
      price_amount,
      price_currency,
      stock_status,
      brand:brands(name, slug),
      product_images(cloudinary_url, is_primary)
    `)
    .or(`title_en.ilike.%${query}%,title_ro.ilike.%${query}%,model.ilike.%${query}%,sap_code.ilike.%${query}%`)
    .order('price_amount', { ascending: false, nullsFirst: false })
    .limit(limit)

  // Search categories (by English or Romanian name)
  const { data: categories } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      name_ro,
      slug,
      path,
      product_count,
      brand:brands(name, slug)
    `)
    .or(`name.ilike.%${query}%,name_ro.ilike.%${query}%`)
    .order('product_count', { ascending: false, nullsFirst: false })
    .limit(4)

  // Transform products for response
  const transformedProducts = (products || []).map(p => ({
    id: p.id,
    sapCode: p.sap_code,
    model: p.model,
    title: p.title_en,
    price: p.price_amount,
    currency: p.price_currency,
    stockStatus: p.stock_status,
    brand: p.brand,
    image: p.product_images?.find((img: { is_primary: boolean }) => img.is_primary)?.cloudinary_url
      || p.product_images?.[0]?.cloudinary_url
      || null
  }))

  // Transform categories for response
  const transformedCategories = (categories || []).map(c => ({
    id: c.id,
    name: c.name,
    name_ro: c.name_ro,
    slug: c.slug,
    path: c.path,
    productCount: c.product_count,
    brand: c.brand
  }))

  return NextResponse.json({
    products: transformedProducts,
    categories: transformedCategories
  })
}
