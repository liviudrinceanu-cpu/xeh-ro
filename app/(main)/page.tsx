import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/Hero'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BrandCard from '@/components/brand/BrandCard'
import CategoryCard from '@/components/category/CategoryCard'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { getBrands, getTopLevelCategories, getProductCountByCategory } from '@/lib/queries/categories'
import { getFeaturedProducts } from '@/lib/queries/products'

// ISR with 1-hour revalidation for featured products randomization
// Products are fetched fresh every hour while still benefiting from caching
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'eXpert Echipamente Horeca | Distribuitor RM Gastro & REDFOX',
  description: 'Distribuitor autorizat echipamente HoReCa. Cuptoare, mașini spălat vase, refrigerare. Branduri premium RM Gastro și REDFOX.',
  openGraph: {
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX pentru restaurante, hoteluri și cafenele.',
    url: 'https://www.xeh.ro',
    siteName: 'XEH.ro',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=XEH.ro - eXpert Echipamente Horeca&subtitle=Distribuitor autorizat echipamente profesionale HoReCa',
      width: 1200,
      height: 630,
      alt: 'XEH.ro - eXpert Echipamente Horeca',
    }],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa.',
    images: ['https://www.xeh.ro/api/og?title=XEH.ro - eXpert Echipamente Horeca&subtitle=Distribuitor autorizat echipamente profesionale HoReCa'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro',
  },
}

// FAQ data for SEO
const homeFaqs = [
  {
    question: 'Ce echipamente HoReCa profesionale oferă XEH.ro?',
    answer: 'XEH.ro oferă o gamă completă de echipamente profesionale pentru industria HoReCa: cuptoare cu convecție, răcitoare rapide, mașini de spălat vase industriale, echipamente de refrigerare, linii de gătit și multe altele. Distribuim brandurile premium RM Gastro și REDFOX.',
  },
  {
    question: 'Care este diferența dintre RM Gastro și REDFOX?',
    answer: 'RM Gastro este linia premium, destinată restaurantelor și hotelurilor de lux care necesită performanță maximă. REDFOX este linia economică, oferind un raport calitate-preț excelent pentru fast-food, bistrouri și afaceri care caută echipamente fiabile la prețuri competitive.',
  },
  {
    question: 'Cum pot solicita o ofertă pentru echipamente profesionale?',
    answer: 'Puteți solicita o ofertă adăugând produsele dorite în coșul de cerere ofertă și completând formularul. Veți primi o ofertă personalizată în cel mai scurt timp. Alternativ, ne puteți contacta telefonic la 0724 256 250.',
  },
  {
    question: 'Livrați echipamente HoReCa în toată România?',
    answer: 'Da, livrăm în toată România. Pentru comenzi mari sau echipamente voluminoase, oferim transport specializat și instalare la cerere.',
  },
  {
    question: 'Oferiți garanție pentru echipamentele profesionale?',
    answer: 'Toate echipamentele comercializate beneficiază de garanția producătorului. RM Gastro și REDFOX oferă garanție standard și suport tehnic extins pentru toate produsele.',
  },
]

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
      {/* FAQ Schema for SEO */}
      <FAQJsonLd faqs={homeFaqs} />

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

      {/* Stats Section - E-E-A-T Trust Signals */}
      <StatsSection />

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

      {/* Testimonials Section - E-E-A-T Social Proof */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
              Întrebări Frecvente
            </h2>
            <p className="text-gray-500">
              Tot ce trebuie să știi despre echipamentele HoReCa profesionale
            </p>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-crimson transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-crimson group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-500">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
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
