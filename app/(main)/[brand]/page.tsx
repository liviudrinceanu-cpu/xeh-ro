import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryCard from '@/components/category/CategoryCard'
import ProductCard from '@/components/product/ProductCard'
import { getBrandBySlug, getTopLevelCategories, getProductCountByCategory } from '@/lib/queries/categories'
import { getProducts } from '@/lib/queries/products'

interface BrandPageProps {
  params: Promise<{
    brand: string
  }>
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params
  const brand = await getBrandBySlug(brandSlug)

  if (!brand) return {}

  const baseUrl = 'https://www.xeh.ro'
  const title = `${brand.name} - Echipamente Profesionale`
  const description = `Explorează gama completă de echipamente ${brand.name}. Produse profesionale pentru restaurante, hoteluri și bucătării comerciale. Cuptoare, frigidere, mașini spălat vase.`
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(brand.name)}&subtitle=${encodeURIComponent('Echipamente profesionale HoReCa')}&type=category`

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${brandSlug}`,
    },
    openGraph: {
      title: `${title} | XEH.ro`,
      description,
      url: `${baseUrl}/${brandSlug}`,
      siteName: 'XEH.ro',
      locale: 'ro_RO',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: brand.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params

  const [brand, categories, productsData, productCounts] = await Promise.all([
    getBrandBySlug(brandSlug),
    getTopLevelCategories(brandSlug),
    getProducts({ brandSlug, pageSize: 8 }),
    getProductCountByCategory(brandSlug),
  ])

  if (!brand) {
    notFound()
  }

  const { data: featuredProducts } = productsData

  const brandInfo = {
    rm: {
      tagline: 'Linia Premium pentru Profesioniști',
      description: 'Echipamente de înaltă performanță pentru restaurante de top, hoteluri și bucătării profesionale care nu fac compromisuri în ceea ce privește calitatea.',
      color: 'gray-600',
    },
    redfox: {
      tagline: 'Raport Excelent Calitate-Preț',
      description: 'Soluții eficiente și accesibile pentru bistro-uri, fast-food-uri și cafenele care doresc echipamente fiabile la prețuri competitive.',
      color: 'crimson',
    },
  }[brandSlug] || { tagline: '', description: '', color: 'gray-600' }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: brand.name }]} className="mb-8" />

          <div className="max-w-3xl">
            <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 text-${brandInfo.color}`}>
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-4">
              {brandInfo.tagline}
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              {brandInfo.description}
            </p>
          </div>

          <div className="flex gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-gray-600">{brandSlug === 'rm' ? '1228' : '1372'}+</div>
              <div className="text-sm text-gray-400 mt-1">Produse</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-600">{categories.length}</div>
              <div className="text-sm text-gray-400 mt-1">Categorii</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8">
            Categorii {brand.name}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={productCounts[category.id] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
              Produse {brand.name}
            </h2>
            <Link
              href={`/catalog?brand=${brandSlug}`}
              className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold text-sm transition-colors"
            >
              Vezi toate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* External Link */}
      {brand.website_url && (
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 mb-4">
              Vezi informații complete pe site-ul producătorului
            </p>
            <a
              href={brand.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold transition-colors"
            >
              Vizitează {brand.name}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}
    </div>
  )
}
