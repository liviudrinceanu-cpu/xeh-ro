import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/Hero'
import BrandCard from '@/components/brand/BrandCard'
import CategoryCard from '@/components/category/CategoryCard'
import ProductCard from '@/components/product/ProductCard'
import { getBrands, getTopLevelCategories, getProductCountByCategory } from '@/lib/queries/categories'
import { getFeaturedProducts } from '@/lib/queries/products'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const [brands, rmCategories, redfoxCategories, featuredProducts, rmProductCounts, redfoxProductCounts] = await Promise.all([
    getBrands(),
    getTopLevelCategories('rm'),
    getTopLevelCategories('redfox'),
    getFeaturedProducts(8),
    getProductCountByCategory('rm'),
    getProductCountByCategory('redfox'),
  ])

  // Merge product counts from both brands
  const productCounts = { ...rmProductCounts, ...redfoxProductCounts }

  // Get product counts per brand
  const rmProductCount = 1228
  const redfoxProductCount = 1372

  // Combine and limit categories for display
  const topCategories = [...rmCategories.slice(0, 4), ...redfoxCategories.slice(0, 4)]

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Brands Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
            Alege Brandul
          </h2>
          <p className="text-gray-500">
            Două game complete pentru orice tip de bucătărie profesională
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <BrandCard
            brand="rm"
            productCount={rmProductCount}
            categoryCount={rmCategories.length}
          />
          <BrandCard
            brand="redfox"
            productCount={redfoxProductCount}
            categoryCount={redfoxCategories.length}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
              Categorii Populare
            </h2>
            <p className="text-gray-500">
              Găsește rapid echipamentul de care ai nevoie
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {topCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={productCounts[category.id] || 0}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold transition-colors"
            >
              Vezi toate categoriile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
            Produse Recomandate
          </h2>
          <Link
            href="/catalog"
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
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ai nevoie de ajutor?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Echipa noastră de experți te poate ajuta să alegi echipamentele potrivite pentru afacerea ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-crimson"
            >
              Cere Ofertă Personalizată
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
