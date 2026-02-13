import Link from 'next/link'
import { ArrowRight, CheckCircle2, Snowflake, ThermometerSnowflake, Box, Gauge } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frigidere Industriale & Echipamente Refrigerare HoReCa | XEH.ro',
  description: 'Frigidere industriale și echipamente de refrigerare profesionale pentru restaurante. Frigidere verticale, congelatoare, vitrine frigorifice, blast chiller de la RM Gastro și REDFOX.',
  keywords: [
    'frigidere industriale',
    'frigider profesional restaurant',
    'congelator industrial',
    'vitrina frigorifica',
    'blast chiller',
    'echipamente refrigerare horeca',
    'frigider inox profesional',
  ],
  openGraph: {
    title: 'Frigidere Industriale & Refrigerare Profesională | XEH.ro',
    description: 'Echipamente de refrigerare profesionale pentru bucătării comerciale. Frigidere, congelatoare, vitrine, blast chiller.',
    url: 'https://www.xeh.ro/frigidere-industriale',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Frigidere Industriale&subtitle=Echipamente de refrigerare profesionale pentru HoReCa&type=category',
      width: 1200,
      height: 630,
      alt: 'Frigidere Industriale pentru Restaurante - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frigidere Industriale & Refrigerare Profesională | XEH.ro',
    description: 'Echipamente de refrigerare profesionale pentru bucătării comerciale.',
    images: ['https://www.xeh.ro/api/og?title=Frigidere Industriale&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/frigidere-industriale',
  },
  other: {
    'article:modified_time': '2026-02-12',
  },
}

const faqs = [
  {
    question: 'Ce capacitate ar trebui să aibă frigiderul industrial pentru restaurantul meu?',
    answer: 'Capacitatea depinde de volumul zilnic de preparare și tipul de meniu. Pentru restaurante mici (30-50 locuri), un frigider de 400-700L este suficient. Restaurante medii (50-100 locuri) au nevoie de 700-1400L. Pentru hoteluri și restaurante mari, recomandăm frigidere walk-in sau multiple unități. Consultanții noștri vă pot ajuta cu calculul exact.',
  },
  {
    question: 'Care este diferența dintre un frigider și un blast chiller?',
    answer: 'Frigiderul menține alimentele la temperatură constantă (0-8°C). Blast chiller-ul răcește rapid alimentele de la temperatura de gătire la temperatura de refrigerare în minute, păstrând calitatea și prevenind dezvoltarea bacteriilor. Blast chiller-ul este esențial pentru HACCP și bucătării cu volum mare de preparare.',
  },
  {
    question: 'Frigider sau congelator pentru restaurantul meu?',
    answer: 'Ambele sunt necesare în majoritatea bucătăriilor profesionale. Frigiderul (0-8°C) pentru ingrediente proaspete și preparate. Congelatorul (-18 până la -22°C) pentru stocuri pe termen lung și ingrediente congelate. Multe restaurante aleg echipamente combinate sau unități separate pentru flexibilitate maximă.',
  },
  {
    question: 'Ce clasă energetică recomandați pentru frigidere industriale?',
    answer: 'Recomandăm minimum clasa B sau mai bună. Frigiderele eficiente energetic au un cost inițial mai mare dar economisesc semnificativ la energie pe termen lung. La funcționare continuă 24/7, diferența de consum se simte în facturile lunare.',
  },
  {
    question: 'Oferiți service și piese de schimb pentru frigiderele industriale?',
    answer: 'Da, oferim suport tehnic și piese de schimb pentru toate echipamentele RM Gastro și REDFOX. Recomandăm mentenanță preventivă regulată pentru prelungirea duratei de viață și eficiență energetică optimă.',
  },
]

const refrigerationTypes = [
  {
    title: 'Frigidere Verticale',
    description: 'Clasicele frigidere profesionale pentru depozitare zilnică',
    icon: Box,
    features: ['Interior inox', 'Uși solide sau cu geam', 'Control digital', 'Picioare reglabile'],
  },
  {
    title: 'Congelatoare Industriale',
    description: 'Temperaturi scăzute pentru stocuri pe termen lung',
    icon: Snowflake,
    features: ['Temperatură -18/-22°C', 'Izolație groasă', 'Alarme temperatură', 'Funcție super-frost'],
  },
  {
    title: 'Blast Chiller',
    description: 'Răcire rapidă pentru siguranță alimentară',
    icon: ThermometerSnowflake,
    features: ['Răcire în minute', 'Conformitate HACCP', 'Mod blast/shock', 'Control sondă'],
  },
  {
    title: 'Vitrine Frigorifice',
    description: 'Expunere și păstrare pentru front-of-house',
    icon: Gauge,
    features: ['Design atractiv', 'LED iluminare', 'Uși glisante', 'Umiditate controlată'],
  },
]

async function getRefrigerationProducts() {
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
    .or('title_en.ilike.%refrigerat%,title_en.ilike.%freezer%,title_en.ilike.%chiller%,title_en.ilike.%cold%,title_en.ilike.%cooling%,title_ro.ilike.%frigider%,title_ro.ilike.%congelator%,title_ro.ilike.%răcire%,title_ro.ilike.%refrigerare%,title_ro.ilike.%vitrină%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function FrigidereIndustrialePage() {
  const products = await getRefrigerationProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Frigidere Industriale' }]}
            className="mb-8 text-blue-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frigidere Industriale și Echipamente de Refrigerare
            </h1>
            <p className="text-xl text-blue-100 mb-6 article-summary">
              Frigiderele industriale pentru restaurante costă între 1.500-15.000 EUR. XEH.ro oferă frigidere verticale (400-1400L), congelatoare (-18°C/-22°C), blast chillere și vitrine frigorifice de la RM Gastro și REDFOX. Livrare în toată România cu garanție.
            </p>
            <p className="text-lg text-blue-200 mb-8">
              Gamă completă de echipamente de refrigerare profesionale pentru restaurante și bucătării comerciale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=frigider"
                className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Toate Frigiderele
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

      {/* Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Tipuri de Echipamente de Refrigerare
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Soluții complete de refrigerare pentru orice tip de bucătărie profesională
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refrigerationTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">{type.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Comparație Prețuri și Specificații
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tip Echipament</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Preț Orientativ</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Capacitate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Temperatură</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Frigider Vertical 400L</td>
                  <td className="px-4 py-3 text-gray-600">1.500 - 3.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">400L</td>
                  <td className="px-4 py-3 text-gray-600">+2°C / +8°C</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Frigider Vertical 700L</td>
                  <td className="px-4 py-3 text-gray-600">2.500 - 5.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">700L</td>
                  <td className="px-4 py-3 text-gray-600">+2°C / +8°C</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Congelator Industrial</td>
                  <td className="px-4 py-3 text-gray-600">2.000 - 6.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">400-700L</td>
                  <td className="px-4 py-3 text-gray-600">-18°C / -22°C</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Blast Chiller</td>
                  <td className="px-4 py-3 text-gray-600">5.000 - 15.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">5-20 tăvi</td>
                  <td className="px-4 py-3 text-gray-600">+70°C → +3°C</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Vitrină Frigorifică</td>
                  <td className="px-4 py-3 text-gray-600">2.000 - 8.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">200-500L</td>
                  <td className="px-4 py-3 text-gray-600">+2°C / +10°C</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            * Prețurile sunt orientative și pot varia în funcție de model și specificații
          </p>
        </div>
      </section>

      {/* Avantaje și Dezavantaje Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Avantaje și Dezavantaje pe Tipuri de Echipamente
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Compară caracteristicile fiecărui tip de echipament de refrigerare pentru decizia potrivită
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frigider Vertical Profesional */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Frigider Vertical Profesional</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Acces ușor la produse - organizare pe rafturi</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Vizibilitate excelentă a conținutului</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Disponibil în diverse capacități (400L-1400L)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Economisește spațiu pe podea - ocupă în înălțime</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">❌</span> Dezavantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Pierdere de frig la deschidere frecventă a ușii</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Capacitate totală mai mică decât modelele orizontale</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită spațiu vertical suficient</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Congelator Industrial */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Congelator Industrial</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Temperaturi foarte joase (-18°C până la -22°C)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Conservare pe termen lung (luni de zile)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Eficient energetic pe unitate de stocare</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ideal pentru aprovizionare în cantități mari</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">❌</span> Dezavantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Timp de recuperare temperatură după deschidere</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Consum energetic constant 24/7</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită defrostare periodică pentru mentenanță</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Blast Chiller */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Blast Chiller</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Răcire rapidă (de la 90°C la 3°C în 90 minute)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Conformitate HACCP - siguranță alimentară maximă</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Prelungește durata de viață a alimentelor cu 50-70%</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Păstrează textura, culoarea și aromele originale</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">❌</span> Dezavantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Investiție semnificativă (3.000-15.000 EUR)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită spațiu dedicat în bucătărie</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Consum energetic ridicat în timpul ciclului de răcire</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vitrină Frigorifică */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Vitrină Frigorifică</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Prezentare atractivă a produselor pentru clienți</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Iluminare LED care evidențiază alimentele</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Acces direct pentru clienți - self-service</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Crește vânzările prin expunere vizuală</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">❌</span> Dezavantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Eficiență energetică mai scăzută (deschidere frecventă)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Temperatură mai puțin stabilă decât frigiderele închise</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită curățare zilnică a geamurilor pentru aspect</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Refrigerare Recomandate
              </h2>
              <Link
                href="/catalog?search=frigider"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
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

      {/* Temperature Guide */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
              Ghid Temperaturi Refrigerare HACCP
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">+2°C/+8°C</div>
                <div className="font-semibold text-gray-600 mb-1">Frigider</div>
                <div className="text-sm text-gray-500">Produse proaspete, lactate, legume</div>
              </div>
              <div className="text-center p-6 bg-cyan-50 rounded-2xl">
                <div className="text-3xl font-bold text-cyan-600 mb-2">0°C/+4°C</div>
                <div className="font-semibold text-gray-600 mb-1">Refrigerare Carne</div>
                <div className="text-sm text-gray-500">Carne proaspătă, pește, fructe de mare</div>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-2xl">
                <div className="text-3xl font-bold text-indigo-600 mb-2">-18°C/-22°C</div>
                <div className="font-semibold text-gray-600 mb-1">Congelator</div>
                <div className="text-sm text-gray-500">Stocare pe termen lung, congelate</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-2xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">+90°C→+3°C</div>
                <div className="font-semibold text-gray-600 mb-1">Blast Chiller</div>
                <div className="text-sm text-gray-500">Răcire rapidă în 90 minute</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Quote - GEO Signal */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                AD
              </div>
              <div>
                <blockquote className="text-gray-600 text-lg italic mb-3">
                  &bdquo;Sistemul de refrigerare este coloana vertebrală a siguranței alimentare în orice bucătărie profesională. Un frigider industrial bun trebuie să mențină temperatura constantă între 0°C și 4°C, chiar și la deschideri frecvente ale ușii. Recomand modele cu compresor inverter &mdash; consumă cu 30% mai puțină energie și au durabilitate de 2-3 ori mai mare.&rdquo;
                </blockquote>
                <div className="flex items-center gap-2">
                  <cite className="text-gray-600 font-semibold not-italic">A.D.</cite>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">Consultant Vânzări, Expert Refrigerare Profesională, XEH.ro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Întrebări Frecvente despre Frigidere Industriale
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-blue-600 group-open:rotate-180 transition-transform">
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

      {/* Related Content Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Articole și Resurse Utile
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-600 mb-4">📚 Ghiduri din Blog</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/top-15-frigidere-industriale-2026" className="text-blue-600 hover:underline">
                    Top 15 Frigidere Industriale pentru Restaurante în 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/blast-chiller-vs-congelator-diferente" className="text-blue-600 hover:underline">
                    Blast Chiller vs Congelator - Diferențe și Când Să Le Folosești
                  </Link>
                </li>
                <li>
                  <Link href="/blog/echipamente-refrigerare-profesionala-tipuri" className="text-blue-600 hover:underline">
                    Echipamente de Refrigerare Profesională - Tipuri și Utilizări
                  </Link>
                </li>
                <li>
                  <Link href="/blog/checklist-haccp-echipamente-obligatorii" className="text-blue-600 hover:underline">
                    Checklist HACCP: Echipamente Obligatorii pentru Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-600 mb-4">🔗 Echipamente Conexe</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/cuptoare-profesionale" className="text-blue-600 hover:underline">
                    Cuptoare Profesionale - Combi Steamer și Convecție
                  </Link>
                </li>
                <li>
                  <Link href="/masini-spalat-vase-profesionale" className="text-blue-600 hover:underline">
                    Mașini de Spălat Vase Profesionale
                  </Link>
                </li>
                <li>
                  <Link href="/echipamente-catering" className="text-blue-600 hover:underline">
                    Echipamente Catering - Termo Containere
                  </Link>
                </li>
                <li>
                  <Link href="/mobilier-inox-bucatarie" className="text-blue-600 hover:underline">
                    Mobilier Inox pentru Bucătărie Profesională
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-blue-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ai nevoie de ajutor cu alegerea echipamentelor de refrigerare?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Experții noștri te pot ghida în alegerea soluției optime de refrigerare pentru bucătăria ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Ofertă Personalizată
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Sună: 0724 256 250
            </a>
          </div>
          <p className="text-xs text-blue-400 text-center mt-12">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>
    </div>
  )
}
