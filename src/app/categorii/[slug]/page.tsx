import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getCategoryBySlug, getAllCategories } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: 'Categorie negăsită',
    }
  }

  return {
    title: `${category.name} - Echipamente HoReCa`,
    description: category.description,
    openGraph: {
      title: `${category.name} | XEH.ro`,
      description: category.description,
      images: [{ url: category.image }],
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(params.slug)

  const breadcrumbs = [
    { label: 'Categorii', href: '/categorii' },
    { label: category.name },
  ]

  const categoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://xeh.ro/categorii/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `https://xeh.ro/produse/${product.slug}`,
          description: product.shortDescription,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary to-primary-800 rounded-2xl p-8 md:p-12 mb-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-gray-200 max-w-2xl">{category.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {products.length} produse disponibile
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.slug} className="card group">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {product.brand && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.brand}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                    <Link
                      href={`/produse/${product.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>
                  {product.model && (
                    <p className="text-xs text-gray-500 mb-3">Model: {product.model}</p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/produse/${product.slug}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Detalii
                    </Link>
                    <Link
                      href={`/cerere-oferta?produs=${product.slug}`}
                      className="flex-1 text-center bg-accent hover:bg-accent-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cere Ofertă
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Produsele vor fi disponibile în curând
            </h3>
            <p className="text-gray-500 mb-6">
              Lucrăm la adăugarea produselor în această categorie.
            </p>
            <Link href="/cerere-oferta" className="btn-accent">
              Cere Ofertă pentru {category.name}
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">
            Ai nevoie de ajutor cu alegerea?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Echipa noastră de experți te poate ajuta să alegi echipamentele potrivite pentru nevoile tale specifice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+40123456789" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Sună Acum
            </a>
            <Link href="/cerere-oferta" className="btn-accent">
              Trimite Cerere Ofertă
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
