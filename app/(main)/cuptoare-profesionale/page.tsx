import Link from 'next/link'
import { ArrowRight, CheckCircle2, Flame, Zap, ThermometerSun, Timer } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuptoare Profesionale HoReCa | Cuptor Convecție, Pizza, Combi Steamer',
  description: 'Cuptoare profesionale pentru restaurante și bucătării comerciale. Cuptoare cu convecție, combi steamer, cuptoare pizza de la RM Gastro și REDFOX. Livrare în toată România.',
  keywords: [
    'cuptoare profesionale',
    'cuptor convectie profesional',
    'cuptor pizza profesional',
    'combi steamer',
    'cuptor restaurant',
    'cuptor horeca',
    'echipamente gatit profesional',
  ],
  openGraph: {
    title: 'Cuptoare Profesionale HoReCa | XEH.ro',
    description: 'Gamă completă de cuptoare profesionale pentru restaurante. Cuptor convecție, pizza, combi steamer.',
    url: 'https://www.xeh.ro/cuptoare-profesionale',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Cuptoare Profesionale HoReCa&subtitle=Cuptor convecție, pizza, combi steamer pentru restaurante&type=category',
      width: 1200,
      height: 630,
      alt: 'Cuptoare Profesionale pentru Restaurante - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuptoare Profesionale HoReCa | XEH.ro',
    description: 'Gamă completă de cuptoare profesionale pentru restaurante. Cuptor convecție, pizza, combi steamer.',
    images: ['https://www.xeh.ro/api/og?title=Cuptoare Profesionale HoReCa&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/cuptoare-profesionale',
  },
  other: {
    'article:modified_time': '2026-02-12',
  },
}

const faqs = [
  {
    question: 'Ce tip de cuptor profesional este potrivit pentru restaurantul meu?',
    answer: 'Alegerea depinde de meniul și volumul de preparare. Cuptoarele cu convecție sunt ideale pentru panificație și patiserie, combi steamer-ele oferă versatilitate maximă (abur + aer cald), iar cuptoarele pentru pizza sunt esențiale pentru pizzerii. Pentru bucătării cu volum mare, recomandăm cuptoare cu mai multe niveluri.',
  },
  {
    question: 'Care este diferența dintre un cuptor cu convecție și un combi steamer?',
    answer: 'Cuptorul cu convecție folosește doar aer cald circulat pentru gătire uniformă, ideal pentru coacere. Combi steamer-ul combină aer cald cu abur, permițând gătire la abur, coacere, și combinații. Combi steamer-ul este mai versatil dar și mai scump.',
  },
  {
    question: 'Cât consumă un cuptor profesional?',
    answer: 'Consumul variază: cuptoarele cu convecție mici (4-6 tăvi) consumă 3-6 kW, cele mari 10-20 kW. Combi steamer-ele consumă 6-40 kW. Cuptoarele pe gaz sunt mai economice la operare dar necesită instalație de gaz. Majoritatea sunt disponibile în variante electrice și pe gaz.',
  },
  {
    question: 'Ce garanție au cuptoarele profesionale?',
    answer: 'Cuptoarele RM Gastro și REDFOX beneficiază de garanție standard de la producător. Oferim suport tehnic și piese de schimb pentru toate echipamentele comercializate. Contactați-ne pentru detalii specifice despre garanție și service.',
  },
  {
    question: 'Livrați și instalați cuptoarele profesionale?',
    answer: 'Da, livrăm în toată România. Pentru echipamente mari oferim servicii de instalare și punere în funcțiune la cerere. Echipa noastră vă poate consilia și pentru racordarea la utilități (electric, gaz, apă pentru combi steamer).',
  },
]

const ovenTypes = [
  {
    title: 'Cuptoare cu Convecție',
    description: 'Circulație uniformă a aerului cald pentru coacere perfectă',
    icon: Flame,
    features: ['Distribuție uniformă a căldurii', 'Ideal pentru patiserie', 'Multiple niveluri', 'Control digital temperatură'],
  },
  {
    title: 'Combi Steamer',
    description: 'Combinația perfectă între abur și aer cald',
    icon: ThermometerSun,
    features: ['Gătire la abur', 'Mod combinat', 'Control umiditate', 'Programe automate'],
  },
  {
    title: 'Cuptoare Pizza',
    description: 'Temperaturi înalte pentru pizza autentică',
    icon: Timer,
    features: ['Temperatură până la 500°C', 'Podea din piatră', 'Coacere rapidă', 'Design compact'],
  },
  {
    title: 'Cuptoare Salamandru',
    description: 'Gratinare și finishing rapid',
    icon: Zap,
    features: ['Încălzire rapidă', 'Gratinare perfectă', 'Înălțime reglabilă', 'Compact'],
  },
]

async function getOvenProducts() {
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
    .or('title_en.ilike.%oven%,title_en.ilike.%convection%,title_en.ilike.%steamer%,title_en.ilike.%pizza%,title_ro.ilike.%cuptor%,title_ro.ilike.%convecție%,title_ro.ilike.%abur%,title_ro.ilike.%pizza%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function CuptoareProfesionalePage() {
  const products = await getOvenProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Cuptoare Profesionale' }]}
            className="mb-8 text-gray-300"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cuptoare Profesionale pentru Restaurante
            </h1>
            <p className="text-xl text-gray-300 mb-6 article-summary">
              Cuptoarele profesionale pentru restaurante costă între 2.500-25.000 EUR. XEH.ro oferă cuptoare cu convecție, combi steamer, cuptoare pizza și patiserie de la RM Gastro și REDFOX. Livrare în toată România, garanție producător.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Gamă completă de cuptoare profesionale HoReCa: convecție, combi steamer, pizza și salamandru pentru bucătării comerciale de orice dimensiune.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=cuptor"
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Toate Cuptoarele
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
              Tipuri de Cuptoare Profesionale
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Alegem împreună cuptorul potrivit pentru nevoile bucătăriei tale profesionale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ovenTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-crimson" />
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
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tip Cuptor</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Preț Orientativ</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Capacitate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Putere</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Cuptor Convecție 4 tăvi</td>
                  <td className="px-4 py-3 text-gray-600">2.500 - 4.500 EUR</td>
                  <td className="px-4 py-3 text-gray-600">4 GN 1/1</td>
                  <td className="px-4 py-3 text-gray-600">3,5 - 6 kW</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Cuptor Convecție 6-10 tăvi</td>
                  <td className="px-4 py-3 text-gray-600">4.500 - 12.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">6-10 GN 1/1</td>
                  <td className="px-4 py-3 text-gray-600">6 - 18 kW</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Combi Steamer</td>
                  <td className="px-4 py-3 text-gray-600">8.000 - 25.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">6-20 GN 1/1</td>
                  <td className="px-4 py-3 text-gray-600">10 - 40 kW</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Cuptor Pizza</td>
                  <td className="px-4 py-3 text-gray-600">3.000 - 15.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">4-12 pizza</td>
                  <td className="px-4 py-3 text-gray-600">6 - 18 kW</td>
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
              Avantaje și Dezavantaje pe Tipuri de Cuptoare
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Compară punctele forte și limitările fiecărui tip de cuptor pentru a face cea mai bună alegere
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cuptor cu Convecție */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Cuptor cu Convecție</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Distribuție uniformă a căldurii pe toate nivelurile</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ideal pentru patiserie și produse de panificație</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Coacere simultană pe multiple niveluri</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Control digital precis al temperaturii</span>
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
                    <span>Consum energetic ridicat (6-18 kW)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită spațiu dedicat în bucătărie</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Timp de preîncălzire 30-45 minute</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cuptor Combi Steamer */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Cuptor Combi Steamer</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Versatilitate maximă (abur + aer cald)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Programe automate pentru preparate complexe</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Reduce pierderile de greutate cu 20-30%</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Menține textura și nutrienții alimentelor</span>
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
                    <span>Investiție inițială mare (8.000-25.000 EUR)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Complexitate în operare - necesită training</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Curățare mai dificilă decât cuptorul clasic</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cuptor Pizza */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Cuptor Pizza</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Temperaturi foarte înalte (până la 500°C)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Coacere rapidă (60-90 secunde pentru pizza)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Design compact - economisește spațiu</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Rezultate autentice pentru pizza și focaccia</span>
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
                    <span>Utilizare limitată la pizza și focaccia</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Consum ridicat de gaz sau curent electric</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită experiență în operare pentru rezultate optime</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Salamandru/Grill */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Salamandru/Grill</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Încălzire rapidă - gata în 5-10 minute</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Gratinare perfectă și finishing profesional</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Dimensiuni compacte - montare pe perete</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Foarte ușor de utilizat și întreținut</span>
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
                    <span>Capacitate limitată - suprafață mică de lucru</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Nu este versatil - doar gratinare și finishing</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Utilizat doar pentru ultimele faze de preparare</span>
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
                Cuptoare Recomandate
              </h2>
              <Link
                href="/catalog?search=cuptor"
                className="text-crimson hover:text-crimson-dark font-semibold text-sm flex items-center gap-1"
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

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-crimson to-crimson-dark rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                De ce să alegi cuptoare de la XEH.ro?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold">2,600+</div>
                  <div className="text-white/80">Produse în catalog</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-white/80">Branduri premium</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-white/80">Livrare România</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-crimson hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contactează un Expert
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Quote - GEO Signal */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                MP
              </div>
              <div>
                <blockquote className="text-gray-600 text-lg italic mb-3">
                  &bdquo;Alegerea cuptorului profesional este cea mai importantă decizie pentru o bucătărie comercială. Un cuptor cu convecție de calitate reduce timpul de gătire cu 25-30% și consumul de energie cu până la 40% față de un cuptor clasic. Recomand întotdeauna clienților să investească în cuptoare cu convecție sau combi steamer &mdash; se amortizează în primul an.&rdquo;
                </blockquote>
                <div className="flex items-center gap-2">
                  <cite className="text-gray-600 font-semibold not-italic">M.P.</cite>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">Director Tehnic, Specialist Echipamente Termice, XEH.ro</span>
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
              Întrebări Frecvente despre Cuptoare Profesionale
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                  <Link href="/blog/cum-alegi-cuptor-profesional-perfect" className="text-crimson hover:underline">
                    Cum Alegi Cuptorul Profesional Perfect pentru Restaurantul Tău
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cuptor-convectie-vs-cuptor-clasic-diferente" className="text-crimson hover:underline">
                    Cuptor cu Convecție vs Cuptor Clasic - Diferențe și Avantaje
                  </Link>
                </li>
                <li>
                  <Link href="/blog/top-10-cuptoare-profesionale-restaurante-2026" className="text-crimson hover:underline">
                    Top 10 Cuptoare Profesionale pentru Restaurante în 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ghid-complet-echipamente-horeca-restaurant" className="text-crimson hover:underline">
                    Ghid Complet: Echipamente HoReCa pentru Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-600 mb-4">🔗 Echipamente Conexe</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/echipamente-pizzerie" className="text-crimson hover:underline">
                    Echipamente Pizzerie - Cuptoare Pizza Profesionale
                  </Link>
                </li>
                <li>
                  <Link href="/echipamente-patiserie" className="text-crimson hover:underline">
                    Echipamente Patiserie - Cuptoare cu Convecție
                  </Link>
                </li>
                <li>
                  <Link href="/frigidere-industriale" className="text-crimson hover:underline">
                    Frigidere Industriale și Blast Chiller
                  </Link>
                </li>
                <li>
                  <Link href="/mobilier-inox-bucatarie" className="text-crimson hover:underline">
                    Mobilier Inox pentru Bucătărie Profesională
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nu ești sigur ce cuptor să alegi?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Consultanții noștri te pot ajuta să alegi cuptorul perfect pentru bucătăria ta profesională.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
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
          <p className="text-xs text-gray-400 text-center mt-12">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>
    </div>
  )
}
