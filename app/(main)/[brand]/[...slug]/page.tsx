import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
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
import AddToCartButton from '@/components/product/AddToCartButton'
import { ProductJsonLd, BreadcrumbJsonLd, CategoryJsonLd } from '@/components/seo/JsonLd'
import { getBrandBySlug, getCategoryByPath, getCategoryChildren, getCategoryBreadcrumb, getProductCountByCategory } from '@/lib/queries/categories'
import { getProducts, getProductBySlug, getRelatedProducts } from '@/lib/queries/products'
import { formatPrice, getStockStatusLabel, getStockStatusColor, extractProductTitle, getCategoryName, getBaseUrl } from '@/lib/utils'
import { getCategoryDescription, getCategoryKeywords, getCategorySeoData } from '@/lib/seo/categoryDescriptions'

interface DynamicPageProps {
  params: Promise<{
    brand: string
    slug: string[]
  }>
  searchParams: Promise<{
    page?: string
  }>
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { brand: brandSlug, slug } = await params
  const baseUrl = getBaseUrl()

  // Product page
  if (slug[0] === 'produs' && slug[1]) {
    const product = await getProductBySlug(slug[1])
    if (!product) return {}

    const title = extractProductTitle(product.title_en, product.title_ro, product.model)
    const brandName = product.brand?.name || brandSlug.toUpperCase()
    const description = `${title} - ${brandName}. Cod: ${product.sap_code}. ${product.price_amount ? `Preț: ${formatPrice(product.price_amount, product.price_currency)}` : 'Preț la cerere'}. Echipamente HoReCa profesionale de la XEH.ro.`
    const image = product.product_images?.find(img => img.is_primary)?.cloudinary_url || product.product_images?.[0]?.cloudinary_url

    // Use SEO-friendly slug_ro if available
    const productSlugForUrl = product.slug_ro || product.sap_code

    return {
      title: `${title} | ${brandName}`,
      description,
      keywords: [title, brandName, product.model, product.sap_code, 'echipamente horeca', 'bucatarie profesionala'].filter(Boolean),
      openGraph: {
        title: `${title} | ${brandName}`,
        description,
        url: `${baseUrl}/${brandSlug}/produs/${productSlugForUrl}`,
        siteName: 'XEH.ro',
        locale: 'ro_RO',
        type: 'website',
        images: image ? [{ url: image, width: 800, height: 600, alt: title }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | ${brandName}`,
        description,
        images: image ? [image] : undefined,
      },
      alternates: {
        canonical: `${baseUrl}/${brandSlug}/produs/${productSlugForUrl}`,
      },
    }
  }

  // Category page
  const categoryPath = `/Group/${brandSlug}/${slug.join('/')}`
  const category = await getCategoryByPath(categoryPath)
  const brand = await getBrandBySlug(brandSlug)

  if (category) {
    const categoryName = getCategoryName(category.name, category.name_ro)
    const brandName = brand?.name || brandSlug.toUpperCase()

    // Get SEO-optimized description and keywords
    const seoData = getCategorySeoData(categoryPath)
    const seoTitle = seoData?.title || categoryName
    const description = getCategoryDescription(categoryPath, categoryName, brandName)
    const keywords = getCategoryKeywords(categoryPath, categoryName, brandName)

    return {
      title: `${seoTitle} | ${brandName}`,
      description,
      keywords,
      openGraph: {
        title: `${seoTitle} | ${brandName}`,
        description,
        url: `${baseUrl}/${brandSlug}${categoryPath.replace(`/Group/${brandSlug}`, '')}`,
        siteName: 'XEH.ro',
        locale: 'ro_RO',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/${brandSlug}${categoryPath.replace(`/Group/${brandSlug}`, '')}`,
      },
    }
  }

  return {}
}

export default async function DynamicPage({ params, searchParams }: DynamicPageProps) {
  const { brand: brandSlug, slug } = await params
  const queryParams = await searchParams

  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  // Check if this is a product page (/brand/produs/slug-or-sap-code)
  if (slug[0] === 'produs' && slug[1]) {
    return <ProductPage brandSlug={brandSlug} productSlug={slug[1]} />
  }

  // Otherwise, treat as category page
  const categoryPath = `/Group/${brandSlug}/${slug.join('/')}`
  const page = parseInt(queryParams.page || '1')
  return <CategoryPage brandSlug={brandSlug} categoryPath={categoryPath} page={page} />
}

// ============================================================
// PRODUCT PAGE
// ============================================================

async function ProductPage({ brandSlug, productSlug }: { brandSlug: string; productSlug: string }) {
  const product = await getProductBySlug(productSlug)

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
    const catPathToUse = primaryCategory.path_ro || primaryCategory.path
    breadcrumbItems.push({ label: primaryCategory.name, href: `/${brandSlug}${catPathToUse.replace(`/Group/${brandSlug}`, '')}` })
  }
  breadcrumbItems.push({ label: product.model })

  const baseUrl = getBaseUrl()
  // Use SEO-friendly slug_ro if available, otherwise fallback to sap_code
  const productSlugForUrl = product.slug_ro || product.sap_code
  const productUrl = `${baseUrl}/${brandSlug}/produs/${productSlugForUrl}`
  const productImage = product.product_images?.find(img => img.is_primary)?.cloudinary_url || product.product_images?.[0]?.cloudinary_url || null

  // Map stock status to schema.org availability
  const getSchemaAvailability = (status: string): 'InStock' | 'OutOfStock' | 'PreOrder' => {
    if (status === 'in_stock') return 'InStock'
    if (status === 'out_of_stock') return 'OutOfStock'
    return 'PreOrder'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <ProductJsonLd
        product={{
          name: title,
          sku: product.sap_code,
          model: product.model,
          brand: brandName,
          price: product.price_amount,
          currency: product.price_currency || 'EUR',
          image: productImage,
          url: productUrl,
          availability: getSchemaAvailability(product.stock_status),
        }}
      />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item, index) => ({
          name: item.label,
          url: item.href ? `${baseUrl}${item.href}` : undefined,
        }))}
      />

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
                        {feature.label_ro || feature.label}: {feature.value_ro || feature.value}
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
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <AddToCartButton
                    product={{
                      productId: product.id,
                      sapCode: product.sap_code,
                      title: title,
                      model: product.model,
                      brand: brandName,
                      brandSlug: brandSlug,
                      imageUrl: product.product_images?.find(img => img.is_primary)?.cloudinary_url ||
                               product.product_images?.[0]?.cloudinary_url || null,
                      priceAmount: product.price_amount,
                      priceCurrency: product.price_currency || 'EUR',
                    }}
                    variant="full"
                    size="lg"
                    className="flex-1"
                  />
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <FavoriteButton productId={product.id} size="lg" />
                </div>
                <Button href={`/cerere-oferta?produs=${product.sap_code}`} variant="outline" size="lg" className="w-full">
                  Trimite Cerere Direct
                </Button>
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

async function CategoryPage({ brandSlug, categoryPath, page }: { brandSlug: string; categoryPath: string; page: number }) {
  const [category, children, breadcrumb, productCounts, brand] = await Promise.all([
    getCategoryByPath(categoryPath),
    getCategoryChildren('').then(() => []), // We'll get children differently
    getCategoryBreadcrumb(categoryPath),
    getProductCountByCategory(brandSlug),
    getBrandBySlug(brandSlug),
  ])

  // If no category found, try to find products in this path
  const productsData = await getProducts({ categoryPath, page, pageSize: 24 })
  const { data: products, count, totalPages } = productsData

  // Get subcategories for this path
  const subcategories = await getCategoryChildren(category?.id || '')

  // Build breadcrumb
  const breadcrumbItems = breadcrumb.map((cat, index) => {
    const pathToUse = cat.path_ro || cat.path
    return {
      label: getCategoryName(cat.name, cat.name_ro),
      href: index < breadcrumb.length - 1 ? `/${brandSlug}${pathToUse.replace(`/Group/${brandSlug}`, '')}` : undefined,
    }
  })

  const lastBreadcrumb = breadcrumb[breadcrumb.length - 1]
  const pageTitle = category
    ? getCategoryName(category.name, category.name_ro)
    : lastBreadcrumb
      ? getCategoryName(lastBreadcrumb.name, lastBreadcrumb.name_ro)
      : 'Categorie'

  const brandName = brand?.name || brandSlug.toUpperCase()
  const seoDescription = getCategoryDescription(categoryPath, pageTitle, brandName)
  const seoData = getCategorySeoData(categoryPath)

  const baseUrl = getBaseUrl()
  const categoryUrl = `${baseUrl}/${brandSlug}${categoryPath.replace(`/Group/${brandSlug}`, '')}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <CategoryJsonLd
        category={{
          name: pageTitle,
          url: categoryUrl,
          productCount: count,
        }}
      />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.label,
          url: item.href ? `${baseUrl}${item.href}` : undefined,
        }))}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-gray-600 mt-4">
            {seoData?.title || pageTitle}
          </h1>
          <p className="text-gray-500 mt-2">
            {count} produse
          </p>
          {/* SEO Description */}
          {seoDescription && (
            <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">
              {seoDescription}
            </p>
          )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((pageNum) => {
              const basePath = `/${brandSlug}${categoryPath.replace(`/Group/${brandSlug}`, '')}`
              const href = pageNum === 1 ? basePath : `${basePath}?page=${pageNum}`

              return (
                <Link
                  key={pageNum}
                  href={href}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    pageNum === page
                      ? 'bg-crimson text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
            {totalPages > 10 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
