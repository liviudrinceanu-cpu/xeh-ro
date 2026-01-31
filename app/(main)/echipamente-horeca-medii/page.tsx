import Link from 'next/link'
import { ArrowRight, CheckCircle2, Building2, Zap, Settings, Users, ChefHat, Thermometer } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipamente HoReCa 5000-15000 EUR | Restaurante Medii | XEH.ro',
  description: 'Echipamente profesionale HoReCa pentru restaurante și hoteluri cu buget 5000-15000 EUR. Combi steamere, blast chillere, linii complete de gătit și refrigerare.',
  keywords: [
    'echipamente restaurant complet',
    'echipamente horeca restaurant mediu',
    'combi steamer pret',
    'blast chiller profesional',
    'linie gatit profesionala',
    'echipamente bucatarie restaurant',
    'echipamente hotel restaurant',
  ],
  openGraph: {
    title: 'Echipamente HoReCa | Buget 5000-15000 EUR | XEH.ro',
    description: 'Echipamente profesionale pentru restaurante medii. Combi steamere, blast chillere, linii de gătit complete.',
    url: 'https://www.xeh.ro/echipamente-horeca-medii',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente HoReCa Restaurante Medii&subtitle=Buget 5000-15000 EUR | Combi steamere, blast chillere&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente HoReCa pentru Restaurante Medii - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente HoReCa pentru Restaurante Medii | XEH.ro',
    description: 'Echipamente profesionale pentru restaurante cu buget 5000-15000 EUR.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente HoReCa Restaurante Medii&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-horeca-medii',
  },
}

const faqs = [
  {
    question: 'Ce echipamente pot cumpăra cu 5000-15000 EUR?',
    answer: 'În această gamă de preț poți achiziționa: combi steamere profesionale (6-10 tăvi), blast chillere, mașini de spălat vase cu capotă de mare capacitate, frigidere profesionale premium, cuptoare cu convecție de capacitate mare, sau pachete complete pentru zone specifice ale bucătăriei.',
  },
  {
    question: 'Merită să investesc într-un combi steamer?',
    answer: 'Da, pentru restaurante cu volum mediu-mare, combi steamerul este investiția cu cel mai mare ROI. Reduce necesitatea mai multor echipamente separate, economisește energie și spațiu, și oferă consistență în preparate. Un combi steamer de 6 tăvi poate înlocui 2-3 echipamente.',
  },
  {
    question: 'Am nevoie de blast chiller pentru restaurant?',
    answer: 'Blast chiller-ul este recomandat pentru: restaurante care fac cook & chill, catering, preparare în avans, conformitate HACCP strictă. Permite răcirea rapidă de la +90°C la +3°C, prevenind dezvoltarea bacteriilor și extinzând termenul de valabilitate.',
  },
  {
    question: 'RM Gastro sau REDFOX pentru restaurant mediu?',
    answer: 'Pentru restaurante medii, recomandăm o combinație: echipamente critice (combi steamer, refrigerare) de la RM Gastro pentru fiabilitate maximă, și echipamente secundare de la REDFOX pentru optimizarea bugetului.',
  },
  {
    question: 'Pot accesa fonduri europene pentru echipamente de această valoare?',
    answer: 'Da, PNRR și alte programe acoperă echipamente HoReCa. Finanțarea poate ajunge la 50-90% din valoarea investiției. Pregătim documentația necesară (oferte detaliate, specificații tehnice) pentru aplicare.',
  },
]

const equipmentCategories = [
  {
    title: 'Combi Steamere',
    description: 'Versatilitate maximă: abur, convecție și combinat',
    icon: ChefHat,
    priceRange: '8.000 - 15.000 EUR',
    features: ['6-10 tăvi GN 1/1', 'Control digital precis', 'Programe automate', 'Self-cleaning', 'Sondă HACCP'],
    href: '/catalog?search=combi+steamer',
  },
  {
    title: 'Blast Chillere',
    description: 'Răcire rapidă pentru siguranță alimentară',
    icon: Thermometer,
    priceRange: '5.000 - 12.000 EUR',
    features: ['Răcire +90°C → +3°C', 'Mod congelare rapidă', 'Capacitate 5-10 tăvi', 'Sondă miez', 'Alarme HACCP'],
    href: '/rm/racitoare-rapide',
  },
  {
    title: 'Mașini Spălat cu Capotă',
    description: 'Capacitate mare pentru restaurante ocupate',
    icon: Zap,
    priceRange: '5.000 - 10.000 EUR',
    features: ['60-80 coșuri/oră', 'Economie apă și detergent', 'Sistem recuperare căldură', 'Igienizare 82°C', 'Dozatoare automate'],
    href: '/masini-spalat-vase-profesionale',
  },
  {
    title: 'Frigidere Premium',
    description: 'Refrigerare fiabilă pentru volume mari',
    icon: Settings,
    priceRange: '5.000 - 12.000 EUR',
    features: ['Capacitate 700-1400L', 'Temperatură constantă', 'Compresor performant', 'Inox AISI 304', 'Rafturi reglabile'],
    href: '/frigidere-industriale',
  },
]

const packageSuggestions = [
  {
    title: 'Pachet Zona Gătit',
    budget: '~12.000 EUR',
    items: ['Combi steamer 6 tăvi', 'Masă inox cu spate', 'Hotă de evacuare'],
  },
  {
    title: 'Pachet Refrigerare',
    budget: '~10.000 EUR',
    items: ['Frigider vertical 700L', 'Congelator 500L', 'Masă refrigerată preparare'],
  },
  {
    title: 'Pachet HACCP Complet',
    budget: '~15.000 EUR',
    items: ['Blast chiller 5 tăvi', 'Frigider monitorizat', 'Termometre digitale'],
  },
]

async function getMediumBudgetProducts() {
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
    .gte('price_amount', 5000)
    .lte('price_amount', 15000)
    .order('price_amount', { ascending: false, nullsFirst: false })
    .limit(8)

  return products || []
}

export default async function EchipamenteHorecaMediiPage() {
  const products = await getMediumBudgetProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Echipamente HoReCa 5000-15000 EUR' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente HoReCa 5000-15000 EUR' }]}
            className="mb-8 text-blue-200"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Buget 5.000 - 15.000 EUR</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente pentru Restaurante Medii
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Echipamente profesionale pentru restaurante cu 50-150 locuri. Combi steamere, blast chillere,
              mașini de spălat cu capotă și frigidere de mare capacitate pentru bucătării eficiente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?minPrice=5000&maxPrice=15000"
                className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Produsele 5.000-15.000 EUR
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Ofertă Pachet
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
              <div className="text-3xl font-bold text-blue-600">5.000€</div>
              <div className="text-gray-500 text-sm">Preț Minim</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">15.000€</div>
              <div className="text-gray-500 text-sm">Preț Maxim</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50-150</div>
              <div className="text-gray-500 text-sm">Locuri Restaurant</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">Pro</div>
              <div className="text-gray-500 text-sm">Echipamente Premium</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Echipamente Recomandate în Acest Buget
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Echipamentele cheie care fac diferența într-o bucătărie profesională de restaurant mediu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {equipmentCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-600 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-blue-600 font-semibold text-sm">
                        {category.priceRange}
                      </span>
                    </div>
                    <p className="text-gray-500 mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium justify-end">
                  Explorează categoria
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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
                  Echipamente în Buget 5.000-15.000 EUR
                </h2>
                <p className="text-gray-500 mt-2">Selecție premium pentru restaurante profesionale</p>
              </div>
              <Link
                href="/catalog?minPrice=5000&maxPrice=15000"
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

      {/* Package Suggestions */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Sugestii de Pachete
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Combinații inteligente de echipamente pentru zone specifice ale bucătăriei
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packageSuggestions.map((pkg) => (
              <div key={pkg.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-600">{pkg.title}</h3>
                  <span className="text-blue-600 font-bold">{pkg.budget}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/cerere-oferta"
                  className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Solicită Acest Pachet
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Budget */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                De Ce Bugetul 5.000-15.000 EUR Este Optim?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <Users className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-bold mb-2">Capacitate Reală</h3>
                  <p className="text-blue-100 text-sm">
                    Echipamente dimensionate pentru restaurante cu 50-150 locuri și volum consistent
                  </p>
                </div>
                <div>
                  <Zap className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-bold mb-2">Eficiență Maximă</h3>
                  <p className="text-blue-100 text-sm">
                    Combi steamere și blast chillere reduc consumul și cresc productivitatea
                  </p>
                </div>
                <div>
                  <Settings className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-bold mb-2">Funcții Profesionale</h3>
                  <p className="text-blue-100 text-sm">
                    Acces la tehnologii avansate: self-cleaning, programe automate, monitorizare HACCP
                  </p>
                </div>
              </div>
              <Link
                href="/consultanta-echipamente-horeca"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Consultanță Gratuită
                <ArrowRight className="w-4 h-4" />
              </Link>
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ai un Restaurant în Creștere?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Te ajutăm să alegi echipamentele potrivite pentru volumul tău actual și viitor.
            Consultanță gratuită și oferte personalizate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all text-lg"
            >
              Solicită Ofertă Personalizată
            </Link>
            <a
              href="tel:+40371232404"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              Sună: 0371 232 404
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
