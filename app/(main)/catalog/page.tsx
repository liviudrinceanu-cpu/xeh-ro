import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductGrid from '@/components/product/ProductGrid'
import { getProducts, type SortOption, type StockFilter } from '@/lib/queries/products'
import { getBrands, getTopLevelCategories } from '@/lib/queries/categories'
import CatalogFilters from '@/components/catalog/CatalogFilters'
import { getCategoryName } from '@/lib/utils'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog Echipamente HoReCa Profesionale | XEH.ro',
  description: 'Explorează catalogul complet de echipamente HoReCa profesionale. Peste 2600 produse de la brandurile RM Gastro și REDFOX. Cuptoare, frigidere, mașini spălat vase.',
  keywords: ['catalog echipamente horeca', 'echipamente profesionale restaurant', 'catalog RM Gastro', 'catalog REDFOX'],
  openGraph: {
    title: 'Catalog Echipamente HoReCa Profesionale | XEH.ro',
    description: 'Peste 2600 echipamente profesionale HoReCa de la RM Gastro și REDFOX.',
    url: 'https://xeh.ro/catalog',
    images: [{
      url: 'https://xeh.ro/api/og?title=Catalog Echipamente HoReCa&subtitle=Peste 2600 produse profesionale de la RM Gastro și REDFOX&type=category',
      width: 1200,
      height: 630,
      alt: 'Catalog Echipamente HoReCa - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catalog Echipamente HoReCa | XEH.ro',
    description: 'Peste 2600 echipamente profesionale HoReCa.',
    images: ['https://xeh.ro/api/og?title=Catalog Echipamente HoReCa&type=category'],
  },
  alternates: {
    canonical: 'https://xeh.ro/catalog',
  },
}

interface CatalogPageProps {
  searchParams: Promise<{
    brand?: string
    category?: string
    page?: string
    search?: string
    sort?: string
    stock?: string
    priceMin?: string
    priceMax?: string
  }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const sort = (params.sort as SortOption) || 'newest'
  const stockFilter = (params.stock as StockFilter) || 'all'
  const priceMin = params.priceMin ? parseInt(params.priceMin) : undefined
  const priceMax = params.priceMax ? parseInt(params.priceMax) : undefined

  const [productsData, brands, rmCategories, redfoxCategories] = await Promise.all([
    getProducts({
      brandSlug: params.brand,
      page,
      pageSize: 24,
      search: params.search,
      sort,
      stockFilter,
      priceMin,
      priceMax,
    }),
    getBrands(),
    getTopLevelCategories('rm'),
    getTopLevelCategories('redfox'),
  ])

  const { data: products, count, totalPages } = productsData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: 'Catalog' },
            ]}
          />
          <h1 className="text-3xl font-bold text-gray-600 mt-4">
            Catalog Produse
          </h1>
          <p className="text-gray-500 mt-2">
            {count} produse disponibile
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-600 mb-3">Brand</h3>
                <div className="space-y-2">
                  <Link
                    href="/catalog"
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !params.brand ? 'bg-crimson-bg text-crimson font-medium' : 'hover:bg-gray-100'
                    }`}
                  >
                    Toate brandurile
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/catalog?brand=${brand.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        params.brand === brand.slug ? 'bg-crimson-bg text-crimson font-medium' : 'hover:bg-gray-100'
                      }`}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* RM Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-600 mb-3">Categorii RM</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {rmCategories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/rm${cat.path.replace('/Group/rm', '')}`}
                      className="block px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors truncate"
                    >
                      {getCategoryName(cat.name, cat.name_ro)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* REDFOX Categories */}
              <div>
                <h3 className="font-semibold text-gray-600 mb-3">Categorii REDFOX</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {redfoxCategories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/redfox${cat.path.replace('/Group/redfox', '')}`}
                      className="block px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors truncate"
                    >
                      {getCategoryName(cat.name, cat.name_ro)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar: Search Info + Sort */}
            <div className="mb-6 p-4 bg-white rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {params.search ? (
                  <p className="text-gray-600">
                    Rezultate pentru: <strong>&ldquo;{params.search}&rdquo;</strong>
                    <span className="text-gray-400 ml-2">({count} produse)</span>
                  </p>
                ) : (
                  <p className="text-gray-600">{count} produse</p>
                )}
              </div>
              <CatalogFilters
                currentSort={sort}
                currentStock={stockFilter}
                currentPriceMin={priceMin}
                currentPriceMax={priceMax}
                currentBrand={params.brand}
                currentSearch={params.search}
              />
            </div>

            {/* Products Grid */}
            <ProductGrid products={products} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((pageNum) => {
                  const queryParams = new URLSearchParams()
                  queryParams.set('page', String(pageNum))
                  if (params.brand) queryParams.set('brand', params.brand)
                  if (params.search) queryParams.set('search', params.search)
                  if (sort !== 'newest') queryParams.set('sort', sort)
                  if (stockFilter !== 'all') queryParams.set('stock', stockFilter)
                  if (priceMin) queryParams.set('priceMin', String(priceMin))
                  if (priceMax) queryParams.set('priceMax', String(priceMax))

                  return (
                    <Link
                      key={pageNum}
                      href={`/catalog?${queryParams.toString()}`}
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
      </div>
    </div>
  )
}
