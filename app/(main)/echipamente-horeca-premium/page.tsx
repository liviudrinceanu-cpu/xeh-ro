import Link from 'next/link'
import { ArrowRight, CheckCircle2, Crown, Star, Award, Gem, Shield, Sparkles } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipamente HoReCa Premium 15000+ EUR | Fine Dining & Hoteluri | XEH.ro',
  description: 'Echipamente profesionale de top pentru restaurante fine dining, hoteluri și lanțuri HoReCa. Combi steamere mari, linii complete de gătit, sisteme de refrigerare industriale.',
  keywords: [
    'echipamente horeca premium',
    'echipamente fine dining',
    'echipamente hotel restaurant',
    'combi steamer mare',
    'echipamente bucatarie industriala',
    'linie gatit profesionala',
    'echipamente horeca lux',
    'RM Gastro premium',
  ],
  openGraph: {
    title: 'Echipamente HoReCa Premium | Buget 15.000+ EUR | XEH.ro',
    description: 'Echipamente de top pentru restaurante fine dining și hoteluri. Performanță maximă și durabilitate excepțională.',
    url: 'https://www.xeh.ro/echipamente-horeca-premium',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente HoReCa Premium&subtitle=Buget 15.000+ EUR | Fine Dining și Hoteluri&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente HoReCa Premium - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente HoReCa Premium | XEH.ro',
    description: 'Echipamente de top pentru fine dining și hoteluri.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente HoReCa Premium&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-horeca-premium',
  },
}

const faqs = [
  {
    question: 'De ce să investesc în echipamente premium?',
    answer: 'Echipamentele premium (RM Gastro) oferă: durabilitate excepțională (15-20+ ani), performanță constantă la volum mare, funcții avansate (self-cleaning, programe AI, monitorizare cloud), consum energetic optimizat, garanție extinsă și valoare reziduală ridicată. Pentru restaurante fine dining și hoteluri, calitatea echipamentelor se reflectă direct în calitatea preparatelor.',
  },
  {
    question: 'Ce echipamente premium pot cumpăra cu peste 15.000 EUR?',
    answer: 'În acest buget ai acces la: combi steamere de capacitate mare (10-20 tăvi) cu tehnologii avansate, linii complete de gătit cu multiple posturi, sisteme de refrigerare industriale, mașini de spălat vase tip tunel, blast chillere/freezere de mare capacitate, și pachete complete pentru echiparea unei bucătării profesionale.',
  },
  {
    question: 'Care sunt avantajele RM Gastro față de branduri mai ieftine?',
    answer: 'RM Gastro oferă: construcție premium din inox AISI 304/316, componente industriale de top (compresoare, motoare), design ergonomic dezvoltat cu bucătari profesioniști, eficiență energetică superioară, garanție extinsă disponibilă, și suport tehnic pe întreaga durată de viață a echipamentului.',
  },
  {
    question: 'Pot finanța echipamente premium prin fonduri europene?',
    answer: 'Da, programele PNRR și alte scheme de finanțare acoperă și echipamente premium. De fapt, echipamentele mai scumpe dar cu eficiență energetică superioară pot primi punctaj mai mare la evaluare. Oferim consultanță completă pentru aplicare și pregătim documentația necesară.',
  },
  {
    question: 'Cum se justifică investiția în echipamente scumpe?',
    answer: 'ROI-ul echipamentelor premium: economie de energie (20-30% consum mai mic), durabilitate (15-20 ani vs 8-10 ani la entry-level), consistență în preparate (păstrarea standardelor), timp redus de pregătire, costuri de service mai mici pe termen lung, și valoare reziduală ridicată la revânzare.',
  },
]

const premiumFeatures = [
  {
    title: 'Construcție Premium',
    description: 'Materiale de cea mai înaltă calitate pentru durabilitate excepțională',
    icon: Gem,
    features: ['Inox AISI 304/316L', 'Suduri TIG profesionale', 'Izolație termică superioară', 'Componente industriale de top'],
  },
  {
    title: 'Tehnologii Avansate',
    description: 'Funcții inteligente pentru eficiență și consistență',
    icon: Sparkles,
    features: ['Control digital precis', 'Programe AI adaptive', 'Self-cleaning automat', 'Monitorizare cloud (opțional)'],
  },
  {
    title: 'Garanție Extinsă',
    description: 'Protecție pe termen lung pentru investiția ta',
    icon: Shield,
    features: ['Garanție standard generoasă', 'Opțiuni extindere 3-5 ani', 'Service prioritar', 'Piese de schimb garantate 15 ani'],
  },
  {
    title: 'Performanță Maximă',
    description: 'Echipamente pentru cele mai exigente bucătării',
    icon: Crown,
    features: ['Volum mare de producție', 'Consistență perfectă', 'Eficiență energetică A+', 'Nivel de zgomot redus'],
  },
]

const premiumCategories = [
  {
    name: 'Combi Steamere Mari',
    priceRange: '15.000 - 35.000 EUR',
    capacity: '10-20 GN 1/1',
    description: 'Tehnologie de top pentru bucătării cu volum mare',
    href: '/catalog?search=combi+steamer',
  },
  {
    name: 'Linii Complete Gătit',
    priceRange: '20.000 - 50.000 EUR',
    capacity: '4-8 posturi',
    description: 'Soluții modulare pentru bucătării profesionale',
    href: '/rm/gatit',
  },
  {
    name: 'Sisteme Refrigerare',
    priceRange: '15.000 - 40.000 EUR',
    capacity: '1000-2000L+',
    description: 'Frigidere și congelatoare de capacitate industrială',
    href: '/frigidere-industriale',
  },
  {
    name: 'Mașini Spălat Tunel',
    priceRange: '18.000 - 45.000 EUR',
    capacity: '100-200 coșuri/oră',
    description: 'Soluții pentru hoteluri și catering de volum',
    href: '/masini-spalat-vase-profesionale',
  },
]

const idealFor = [
  { name: 'Restaurante Fine Dining', icon: '🍽️' },
  { name: 'Hoteluri 4-5 Stele', icon: '🏨' },
  { name: 'Lanțuri de Restaurante', icon: '🔗' },
  { name: 'Centre de Conferințe', icon: '🎪' },
  { name: 'Catering de Volum', icon: '🚚' },
  { name: 'Bucătării Centrale', icon: '👨‍🍳' },
]

async function getPremiumProducts() {
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
    .gte('price_amount', 15000)
    .order('price_amount', { ascending: false, nullsFirst: false })
    .limit(8)

  return products || []
}

export default async function EchipamenteHorecaPremiumPage() {
  const products = await getPremiumProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Echipamente HoReCa Premium' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente HoReCa Premium' }]}
            className="mb-8 text-gray-400"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-400/30">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-200">Buget 15.000+ EUR</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente HoReCa Premium
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Echipamente de top pentru restaurante fine dining, hoteluri de lux și operațiuni HoReCa de volum.
              Investiție în excelență cu RM Gastro - brandul ales de bucătarii profesioniști din întreaga lume.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?minPrice=15000"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-300 hover:to-yellow-400 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Vezi Echipamente Premium
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors border border-white/20"
              >
                Consultanță Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats */}
      <section className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">15.000€+</div>
              <div className="text-gray-400 text-sm">Valoare Investiție</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">15-20</div>
              <div className="text-gray-400 text-sm">Ani Durabilitate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">30%</div>
              <div className="text-gray-400 text-sm">Economie Energie</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">Premium</div>
              <div className="text-gray-400 text-sm">RM Gastro Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-600">Ideal Pentru</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {idealFor.map((item) => (
              <div
                key={item.name}
                className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-gray-600"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              De Ce Echipamente Premium?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Investiția în echipamente de top se reflectă în calitatea preparatelor, eficiență operațională și durabilitate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Categories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Categorii Premium
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {premiumCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-600 group-hover:text-yellow-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500">{category.description}</p>
                  </div>
                  <Crown className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-yellow-600 font-bold">{category.priceRange}</div>
                    <div className="text-gray-400 text-sm">Capacitate: {category.capacity}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                  Echipamente Premium 15.000+ EUR
                </h2>
                <p className="text-gray-500 mt-2">Cele mai performante echipamente din catalog</p>
              </div>
              <Link
                href="/catalog?minPrice=15000"
                className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm flex items-center gap-1"
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

      {/* RM Gastro CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl" />
            <div className="relative max-w-3xl">
              <Award className="w-16 h-16 text-yellow-400 mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                RM Gastro - Standardul Premium
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Cu peste 30 de ani de experiență, RM Gastro este alegerea bucătărilor profesioniști din întreaga lume.
                Fiecare echipament este proiectat pentru performanță maximă și durabilitate excepțională.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/rm"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-300 hover:to-yellow-400 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Explorează RM Gastro
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/distribuitor-rm-gastro-romania"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Despre Distribuitor
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
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-yellow-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-yellow-500 group-open:rotate-180 transition-transform">
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Investiție în Excelență
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Discută cu echipa noastră de experți despre cele mai bune soluții pentru bucătăria ta profesională.
            Consultanță completă, de la planificare la instalare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-300 hover:to-yellow-400 px-8 py-4 rounded-xl font-semibold transition-all text-lg"
            >
              Solicită Consultanță Premium
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg border border-white/20"
            >
              Sună: 0724 256 250
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
