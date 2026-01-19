import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Share2 } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProductGrid from '@/components/product/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import ProductGallery from '@/components/product/ProductGallery'
import ProductSpecs from '@/components/product/ProductSpecs'
import ProductDocs from '@/components/product/ProductDocs'
import CategoryCard from '@/components/category/CategoryCard'
import FavoriteButton from '@/components/product/FavoriteButton'
import { getBrandBySlug, getCategoryByPath, getCategoryChildren, getCategoryBreadcrumb, getProductCountByCategory } from '@/lib/queries/categories'
import { getProducts, getProductBySapCode, getRelatedProducts } from '@/lib/queries/products'
import { formatPrice, getStockStatusLabel, getStockStatusColor, extractProductTitle } from '@/lib/utils'

interface DynamicPageProps {
  params: Promise<{
    brand: string
    slug: string[]
  }>
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { brand: brandSlug, slug } = await params

  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  // Check if this is a product page (/brand/produs/sap-code)
  if (slug[0] === 'produs' && slug[1]) {
    return <ProductPage brandSlug={brandSlug} sapCode={slug[1]} />
  }

  // Otherwise, treat as category page
  const categoryPath = `/Group/${brandSlug}/${slug.join('/')}`
  return <CategoryPage brandSlug={brandSlug} categoryPath={categoryPath} />
}

// ============================================================
// PRODUCT PAGE
// ============================================================

async function ProductPage({ brandSlug, sapCode }: { brandSlug: string; sapCode: string }) {
  const product = await getProductBySapCode(sapCode)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, 4)

  const title = extractProductTitle(product.title_en, product.title_ro, product.model)
  const brandName = product.brand?.name || brandSlug.toUpperCase()

  // Build breadcrumb from categories
  const primaryCategory = product.product_categories?.find(pc => pc.is_primary)?.category
  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: brandName, href: `/${brandSlug}` },
  ]
  if (primaryCategory) {
    breadcrumbItems.push({ label: primaryCategory.name, href: `/${brandSlug}${primaryCategory.path.replace(`/Group/${brandSlug}`, '')}` })
  }
  breadcrumbItems.push({ label: product.model })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Gallery */}
            <ProductGallery
              images={product.product_images || []}
              productTitle={title}
            />

            {/* Info */}
            <div className="flex flex-col">
              {/* Title */}
              <div className="mb-6">
                <Badge variant={brandSlug === 'rm' ? 'rm' : 'redfox'} className="mb-3">
                  {brandName}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-600 mb-2">
                  {title}
                </h1>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Cod: {product.sap_code}</span>
                  <span>Model: {product.model}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 w-fit ${getStockStatusColor(product.stock_status)}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                <span className="text-sm font-medium">
                  {getStockStatusLabel(product.stock_status)}
                </span>
              </div>

              {/* Key Features */}
              {product.product_features && product.product_features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Caracteristici Principale
                  </h3>
                  <ul className="space-y-2">
                    {product.product_features.slice(0, 5).map((feature) => (
                      <li key={feature.id} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-crimson font-bold">✓</span>
                        {feature.label}: {feature.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="text-xs text-gray-500 mb-1">Preț catalog</div>
                <div className="text-3xl font-bold text-crimson">
                  {formatPrice(product.price_amount, product.price_currency)}
                </div>
                {product.price_amount && (
                  <div className="text-xs text-gray-400">fără TVA</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button href={`/cerere-oferta?produs=${product.sap_code}`} size="lg" className="flex-1">
                  Cere Oferta
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
                <FavoriteButton productId={product.id} size="lg" />
              </div>

              {/* Source Link */}
              {product.source_url && (
                <a
                  href={product.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-crimson transition-colors"
                >
                  Vezi pe site-ul producătorului
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="px-6 md:px-10 py-8">
              <h2 className="text-xl font-bold text-gray-600 mb-6">
                Specificații Tehnice
              </h2>
              <ProductSpecs specifications={product.product_specifications || []} />
            </div>

            {product.product_documents && product.product_documents.length > 0 && (
              <div className="px-6 md:px-10 py-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-600 mb-6">
                  Documentație
                </h2>
                <ProductDocs documents={product.product_documents} />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-6">
              Produse Similare
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// CATEGORY PAGE
// ============================================================

async function CategoryPage({ brandSlug, categoryPath }: { brandSlug: string; categoryPath: string }) {
  const [category, children, breadcrumb, productCounts] = await Promise.all([
    getCategoryByPath(categoryPath),
    getCategoryChildren('').then(() => []), // We'll get children differently
    getCategoryBreadcrumb(categoryPath),
    getProductCountByCategory(brandSlug),
  ])

  // If no category found, try to find products in this path
  const productsData = await getProducts({ categoryPath, pageSize: 24 })
  const { data: products, count } = productsData

  // Get subcategories for this path
  const subcategories = await getCategoryChildren(category?.id || '')

  // Build breadcrumb
  const breadcrumbItems = breadcrumb.map((cat, index) => ({
    label: cat.name,
    href: index < breadcrumb.length - 1 ? `/${brandSlug}${cat.path.replace(`/Group/${brandSlug}`, '')}` : undefined,
  }))

  const pageTitle = category?.name || breadcrumb[breadcrumb.length - 1]?.name || 'Categorie'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-gray-600 mt-4">
            {pageTitle}
          </h1>
          <p className="text-gray-500 mt-2">
            {count} produse
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-600 mb-4">
              Subcategorii
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map((subcat) => (
                <CategoryCard
                  key={subcat.id}
                  category={subcat}
                  productCount={productCounts[subcat.id] || 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
