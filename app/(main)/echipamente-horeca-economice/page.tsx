import Link from 'next/link'
import { ArrowRight, CheckCircle2, Wallet, TrendingUp, Shield, Clock, Calculator, PiggyBank } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipamente HoReCa Economice 2000-5000 EUR | XEH.ro',
  description: 'Echipamente profesionale HoReCa la prețuri accesibile. Cuptoare, frigidere și mașini spălat vase între 2000-5000 EUR. REDFOX și RM Gastro cu raport calitate-preț excelent.',
  keywords: [
    'echipamente horeca ieftine',
    'echipamente horeca economice',
    'echipamente restaurant buget mic',
    'cuptoare profesionale ieftine',
    'frigidere industriale preturi',
    'echipamente horeca sub 5000 euro',
    'REDFOX echipamente',
  ],
  openGraph: {
    title: 'Echipamente HoReCa Economice | Buget 2000-5000 EUR | XEH.ro',
    description: 'Echipamente profesionale HoReCa la prețuri accesibile. Perfect pentru startup-uri și buget optimizat.',
    url: 'https://www.xeh.ro/echipamente-horeca-economice',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente HoReCa Economice&subtitle=Buget 2000-5000 EUR | Raport calitate-preț excelent&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente HoReCa Economice - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente HoReCa Economice | XEH.ro',
    description: 'Echipamente profesionale HoReCa la prețuri accesibile.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente HoReCa Economice&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-horeca-economice',
  },
}

const faqs = [
  {
    question: 'Sunt echipamentele economice de calitate inferioară?',
    answer: 'Nu neapărat. Echipamentele din gama economică (precum REDFOX) oferă aceeași fiabilitate și durabilitate, dar cu finish-uri mai simple și fără unele funcții avansate. Pentru majoritatea afacerilor, raportul calitate-preț este excelent.',
  },
  {
    question: 'Ce pot cumpăra cu un buget de 2000-5000 EUR?',
    answer: 'Cu acest buget poți achiziționa: un cuptor cu convecție profesional (2000-3500 EUR), un frigider vertical industrial (1500-3000 EUR), o mașină de spălat vase (2500-4500 EUR), sau o combinație de echipamente mai mici.',
  },
  {
    question: 'REDFOX sau RM Gastro pentru buget limitat?',
    answer: 'Pentru buget optimizat, recomandăm REDFOX. Oferă aceeași fiabilitate ca RM Gastro (sunt produse de același producător) dar la prețuri cu 20-30% mai mici. Perfect pentru startup-uri și afaceri în creștere.',
  },
  {
    question: 'Există garanție pentru echipamentele economice?',
    answer: 'Da, toate echipamentele beneficiază de garanție standard indiferent de preț. REDFOX și RM Gastro au aceeași perioadă de garanție și acces la service autorizat și piese de schimb.',
  },
  {
    question: 'Pot plăti în rate echipamentele HoReCa?',
    answer: 'Da, oferim opțiuni de finanțare și leasing pentru echipamente. De asemenea, poți aplica pentru fonduri europene (Start-Up Nation, PNRR) care acoperă până la 90% din investiție.',
  },
]

const budgetTips = [
  {
    title: 'Prioritizează Esențialul',
    description: 'Începe cu echipamentele critice și adaugă pe măsură ce crești',
    icon: TrendingUp,
    tips: ['Cuptor/aragaz mai întâi', 'Refrigerare esențială', 'Spălare vase', 'Restul ulterior'],
  },
  {
    title: 'Alege REDFOX',
    description: 'Linia economică cu același producător ca RM Gastro',
    icon: Wallet,
    tips: ['20-30% mai ieftin', 'Aceeași fiabilitate', 'Garanție identică', 'Service autorizat'],
  },
  {
    title: 'Cere Ofertă Pachet',
    description: 'Discounturi semnificative pentru comenzi complete',
    icon: Calculator,
    tips: ['Reduceri volum', 'Livrare gratuită', 'Instalare inclusă', 'Consultanță gratuită'],
  },
  {
    title: 'Accesează Fonduri',
    description: 'Finanțări disponibile pentru HoReCa',
    icon: PiggyBank,
    tips: ['Start-Up Nation', 'PNRR Turism', 'Leasing echipamente', 'Până la 90% grant'],
  },
]

const categoryHighlights = [
  {
    name: 'Cuptoare Economice',
    priceRange: '2.000 - 4.500 EUR',
    description: 'Cuptoare cu convecție REDFOX pentru patiserie și restaurant',
    href: '/catalog?search=cuptor&maxPrice=5000',
  },
  {
    name: 'Frigidere Accesibile',
    priceRange: '1.500 - 3.500 EUR',
    description: 'Frigidere verticale și mese refrigerate pentru bucătării',
    href: '/catalog?search=frigider&maxPrice=5000',
  },
  {
    name: 'Mașini Spălat Vase',
    priceRange: '2.500 - 5.000 EUR',
    description: 'Mașini frontale și cu capotă pentru volum mediu',
    href: '/catalog?search=masina+spalat&maxPrice=5000',
  },
  {
    name: 'Echipamente Gătit',
    priceRange: '500 - 3.000 EUR',
    description: 'Plite, friteuze și grătare profesionale',
    href: '/catalog?search=plita&maxPrice=5000',
  },
]

async function getEconomicProducts() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      title_ro,
      title_en,
      model,
      sap_code,
      price_amount,
      price_currency,
      stock_status,
      brand:brands(name, slug),
      images:product_images(url, alt, is_primary)
    `)
    .gte('price_amount', 2000)
    .lte('price_amount', 5000)
    .order('price_amount', { ascending: true, nullsFirst: false })
    .limit(8)

  return products || []
}

export default async function EchipamenteHorecaEconomicePage() {
  const products = await getEconomicProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Echipamente HoReCa Economice' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente HoReCa Economice' }]}
            className="mb-8 text-emerald-200"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Wallet className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Buget 2.000 - 5.000 EUR</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente HoReCa Economice
            </h1>
            <p className="text-xl text-emerald-100 mb-6 article-summary">
              Echipamente HoReCa economice între 2.000-5.000 EUR. REDFOX oferă cuptoare convecție (2.000-4.500 EUR), frigidere verticale (1.500-3.500 EUR), mașini spălat vase (2.500-5.000 EUR). Raport calitate-preț excelent, garanție producător, livrare România.
            </p>
            <p className="text-lg text-emerald-200 mb-8">
              Perfect pentru startup-uri, bistrouri și afaceri cu buget optimizat. Calitate profesională fără compromisuri.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?maxPrice=5000"
                className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Produsele sub 5.000 EUR
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Ofertă Personalizată
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Range Info */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">2.000€</div>
              <div className="text-gray-500 text-sm">Preț Minim</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">5.000€</div>
              <div className="text-gray-500 text-sm">Preț Maxim</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-500 text-sm">Produse Disponibile</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">100%</div>
              <div className="text-gray-500 text-sm">Garanție Producător</div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Tips */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Cum să Economisești Inteligent
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sfaturi practice pentru a obține cele mai bune echipamente la prețuri accesibile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetTips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <tip.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{tip.description}</p>
                <ul className="space-y-2">
                  {tip.tips.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                  Echipamente în Buget 2.000-5.000 EUR
                </h2>
                <p className="text-gray-500 mt-2">Selecție de produse cu cel mai bun raport calitate-preț</p>
              </div>
              <Link
                href="/catalog?maxPrice=5000"
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
              >
                Vezi toate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Highlights */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Categorii cu Prețuri Accesibile
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryHighlights.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="text-emerald-600 font-bold text-lg mb-1 group-hover:text-emerald-700">
                  {category.priceRange}
                </div>
                <h3 className="font-bold text-gray-600 mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.description}</p>
                <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                  Explorează
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REDFOX CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                REDFOX - Alegerea Inteligentă pentru Buget Optimizat
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Gama REDFOX oferă echipamente profesionale la prețuri cu 20-30% mai mici decât RM Gastro,
                cu aceeași fiabilitate și garanție. Perfect pentru afaceri care vor calitate fără compromisuri.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/redfox"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Explorează REDFOX
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog/rm-gastro-vs-redfox-comparatie-branduri"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Citește Comparația
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Întrebări Frecvente
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-emerald-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-emerald-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 md:py-20 bg-emerald-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Buget Limitat? Te Ajutăm!
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Consultanții noștri te pot ghida să alegi echipamentele potrivite pentru bugetul tău. Oferim și consultanță pentru fonduri europene.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-semibold transition-all text-lg"
            >
              Solicită Ofertă Personalizată
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              Sună: 0724 256 250
            </a>
          </div>
          <p className="text-xs text-emerald-400 text-center mt-12">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>
    </div>
  )
}
