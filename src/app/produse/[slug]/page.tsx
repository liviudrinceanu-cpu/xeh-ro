import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getProductBySlug, getAllProducts, getProductsByCategory } from '@/data/products'
import { getCategoryBySlug } from '@/data/categories'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Produs negăsit',
    }
  }

  return {
    title: `${product.name} - ${product.categoryName}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | XEH.ro`,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img })),
      type: 'website',
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const category = getCategoryBySlug(product.categorySlug)
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  const breadcrumbs = [
    { label: 'Categorii', href: '/categorii' },
    { label: product.categoryName, href: `/categorii/${product.categorySlug}` },
    { label: product.name },
  ]

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0] || '',
    brand: {
      '@type': 'Brand',
      name: product.brand || 'XEH Pro',
    },
    sku: product.sku,
    mpn: product.model,
    category: product.categoryName,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'RON',
      seller: {
        '@type': 'Organization',
        name: 'XEH.ro - eXpert Echipamente Horeca',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
              {product.brand && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-accent text-white text-sm font-semibold px-3 py-1 rounded-lg">
                    {product.brand}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Link
              href={`/categorii/${product.categorySlug}`}
              className="text-accent font-medium hover:underline"
            >
              {product.categoryName}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
              {product.name}
            </h1>

            {(product.model || product.sku) && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                {product.model && <span>Model: <strong>{product.model}</strong></span>}
                {product.sku && <span>SKU: <strong>{product.sku}</strong></span>}
              </div>
            )}

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href={`/cerere-oferta?produs=${product.slug}`}
                className="btn-accent text-lg px-8 py-4 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Cere Ofertă
              </Link>
              <a
                href="tel:+40123456789"
                className="btn-outline text-lg px-8 py-4 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Sună pentru Detalii
              </a>
            </div>

            {/* Quick Features */}
            {product.features.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-4">Caracteristici principale</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Specifications */}
          {product.specifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Specificații Tehnice</h2>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-3 ${
                      index !== product.specifications.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-medium text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Features */}
          {product.features.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Caracteristici Complete</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary mb-6">Produse Similare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.slug} className="card">
                  <div className="aspect-square bg-gray-100 relative">
                    {relatedProduct.brand && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                          {relatedProduct.brand}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                      <Link
                        href={`/produse/${relatedProduct.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedProduct.shortDescription}
                    </p>
                    <Link
                      href={`/produse/${relatedProduct.slug}`}
                      className="text-accent font-medium text-sm hover:underline inline-flex items-center gap-1"
                    >
                      Vezi detalii
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interesat de {product.name}?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Contactează-ne pentru o ofertă personalizată, informații despre disponibilitate
            sau pentru orice întrebări tehnice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/cerere-oferta?produs=${product.slug}`}
              className="bg-accent hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Solicită Ofertă
            </Link>
            <a
              href="tel:+40123456789"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +40 123 456 789
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
