import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getBrandBySlug, getAllBrands } from '@/data/brands'
import { getRootCategoriesByBrand } from '@/data/categories'
import { getProductsByBrand } from '@/data/products'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const brands = getAllBrands()
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug)

  if (!brand) {
    return {
      title: 'Brand negăsit',
    }
  }

  return {
    title: `${brand.name} - Echipamente HoReCa | XEH.ro`,
    description: brand.description,
  }
}

export default function BrandPage({ params }: Props) {
  const brand = getBrandBySlug(params.slug)

  if (!brand) {
    notFound()
  }

  const categories = getRootCategoriesByBrand(brand.slug)
  const products = getProductsByBrand(brand.slug)

  const breadcrumbs = [
    { label: 'Branduri', href: '/branduri' },
    { label: brand.name },
  ]

  return (
    <>
      {/* Hero Section with brand color */}
      <section
        className="text-white py-16"
        style={{ backgroundColor: brand.color }}
      >
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} light />

          <div className="max-w-4xl mt-8">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: brand.accentColor }}
            >
              {brand.tagline}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {brand.name}
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mb-6">
              {brand.description}
            </p>
            <div className="flex items-center gap-6 text-gray-200">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {products.length} produse
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
                {categories.length} categorii
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Categorii de Echipamente {brand.shortName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorează gama completă de echipamente profesionale disponibile
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              // Count products in this category for this brand
              const categoryProducts = products.filter(p => p.categorySlug === category.slug)

              return (
                <Link
                  key={category.slug}
                  href={`/categorii/${category.slug}?brand=${brand.slug}`}
                  className="card group"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <div
                      className="absolute inset-0 flex items-end p-4"
                      style={{
                        background: `linear-gradient(to top, ${brand.color}cc, transparent)`,
                      }}
                    >
                      <span className="text-white font-semibold text-lg">
                        {category.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {categoryProducts.length > 0
                          ? `${categoryProducts.length} produse ${brand.shortName}`
                          : `${category.productCount} produse`}
                      </span>
                      <span
                        className="font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                        style={{ color: brand.color }}
                      >
                        Vezi produse
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Produse {brand.shortName} Recomandate
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cele mai populare echipamente din gama {brand.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.slug} className="card">
                <div className="aspect-square bg-gray-100 relative">
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-white text-xs font-semibold px-2 py-1 rounded"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.shortName}
                    </span>
                  </div>
                  {product.isNew && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        NOU
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <Link
                    href={`/categorii/${product.categorySlug}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: brand.color }}
                  >
                    {product.categoryName}
                  </Link>
                  <h3 className="font-semibold text-primary mt-1 mb-2 line-clamp-2">
                    <Link href={`/produse/${product.slug}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold" style={{ color: brand.color }}>
                      {product.priceEUR.toLocaleString('ro-RO')} EUR
                    </span>
                    <span className="text-xs text-gray-500 block">(fără TVA)</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/produse/${product.slug}`}
                      className="flex-1 text-center text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: brand.color }}
                    >
                      Detalii
                    </Link>
                    <Link
                      href={`/cerere-oferta?produs=${product.slug}`}
                      className="flex-1 text-center border-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                      style={{ borderColor: brand.color, color: brand.color }}
                    >
                      Cere Ofertă
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length > 4 && (
            <div className="text-center mt-10">
              <Link
                href={`/categorii?brand=${brand.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: brand.color,
                  color: '#ffffff',
                }}
              >
                Vezi toate produsele {brand.shortName}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16"
        style={{ backgroundColor: brand.color }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interesat de echipamentele {brand.shortName}?
            </h2>
            <p className="text-lg text-gray-100 mb-8">
              Contactează-ne pentru o ofertă personalizată sau pentru informații
              suplimentare despre gama {brand.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+40123456789"
                className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                style={{ color: brand.color }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +40 123 456 789
              </a>
              <Link
                href="/cerere-oferta"
                className="px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Cere Ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
