import Link from 'next/link'
import { ArrowRight, CheckCircle2, Droplets, Zap, Clock, Sparkles } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mașini de Spălat Vase Profesionale HoReCa | Industriale Restaurant',
  description: 'Mașini de spălat vase profesionale pentru restaurante și bucătării comerciale. Mașini front-loading, hood-type, tunnel și pahare de la RM Gastro și REDFOX. Livrare în toată România.',
  keywords: [
    'masina spalat vase profesionala',
    'masina spalat vase industriala',
    'masina spalat vase restaurant',
    'masina spalat pahare',
    'echipamente spalatorie horeca',
    'dishwasher profesional',
  ],
  openGraph: {
    title: 'Mașini de Spălat Vase Profesionale pentru Restaurante | XEH.ro',
    description: 'Gamă completă de mașini de spălat vase industriale pentru HoReCa. Front-loading, hood-type, tunnel.',
    url: 'https://www.xeh.ro/masini-spalat-vase-profesionale',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Mașini de Spălat Vase Profesionale&subtitle=Echipamente industriale de spălare pentru restaurante&type=category',
      width: 1200,
      height: 630,
      alt: 'Mașini de Spălat Vase Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mașini de Spălat Vase Profesionale | XEH.ro',
    description: 'Gamă completă de mașini de spălat vase industriale pentru HoReCa.',
    images: ['https://www.xeh.ro/api/og?title=Mașini de Spălat Vase Profesionale&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/masini-spalat-vase-profesionale',
  },
  other: {
    'article:modified_time': '2026-02-12',
  },
}

const faqs = [
  {
    question: 'Ce tip de mașină de spălat vase este potrivită pentru restaurantul meu?',
    answer: 'Depinde de volumul de vase și spațiul disponibil. Pentru restaurante mici (până la 50 locuri), o mașină front-loading sau under-counter este suficientă. Restaurante medii (50-150 locuri) au nevoie de mașini hood-type. Pentru hoteluri și restaurante mari, recomandăm mașini tunnel sau rack conveyor.',
  },
  {
    question: 'Cât durează un ciclu de spălare la o mașină profesională?',
    answer: 'Mașinile profesionale sunt mult mai rapide decât cele casnice. Un ciclu standard durează 2-3 minute, iar ciclurile intensive 4-5 minute. Mașinile hood-type pot procesa 40-80 de coșuri pe oră, iar cele tunnel peste 200 de coșuri pe oră.',
  },
  {
    question: 'Care este diferența dintre mașina de spălat vase și cea de pahare?',
    answer: 'Mașinile de pahare (glasswashers) sunt mai mici, optimizate pentru spălarea delicată a paharelor cu cicluri scurte și temperatură controlată pentru a evita spargerea. Mașinile de vase sunt mai mari, cu presiune mai mare și temperatură mai ridicată pentru curățare intensivă.',
  },
  {
    question: 'Ce temperatură trebuie să aibă apa pentru spălare igienică?',
    answer: 'Pentru igienizare conform normelor HACCP, apa de clătire trebuie să atingă minimum 82°C. Mașinile profesionale au boiler separat pentru clătire care asigură această temperatură. Faza de spălare folosește apă la 55-65°C cu detergent.',
  },
  {
    question: 'Cât consumă o mașină de spălat vase industrială?',
    answer: 'Consumul variază: mașinile under-counter consumă 2-4 litri de apă pe ciclu și 3-6 kW electric. Mașinile hood-type consumă 2-3 litri pe ciclu și 6-15 kW. Mașinile moderne au sisteme de recuperare a căldurii și recirculare a apei pentru eficiență maximă.',
  },
]

const dishwasherTypes = [
  {
    title: 'Front-Loading / Under-Counter',
    description: 'Compacte, ideale pentru spații mici și volume moderate',
    icon: Droplets,
    features: ['Coș 500x500mm', '20-40 coșuri/oră', 'Ciclu 2-3 minute', 'Spațiu redus'],
  },
  {
    title: 'Hood-Type / Pass-Through',
    description: 'Capacitate mare pentru restaurante active',
    icon: Zap,
    features: ['Capotă rabatabilă', '40-80 coșuri/oră', 'Dublu perete izolat', 'Încărcare ușoară'],
  },
  {
    title: 'Mașini de Pahare',
    description: 'Spălare delicată pentru bar și cafenea',
    icon: Sparkles,
    features: ['Coș mic 400x400mm', 'Temperatură controlată', 'Cicluri scurte', 'Fără pete'],
  },
  {
    title: 'Tunnel / Conveyor',
    description: 'Capacitate industrială pentru volume foarte mari',
    icon: Clock,
    features: ['100-300 coșuri/oră', 'Funcționare continuă', 'Zone multiple', 'Uscare inclusă'],
  },
]

async function getDishwasherProducts() {
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
    .or('title_en.ilike.%dishwasher%,title_en.ilike.%glasswasher%,title_en.ilike.%washing%,title_ro.ilike.%mașină spălat%,title_ro.ilike.%spălare%,title_ro.ilike.%vase%,title_ro.ilike.%pahare%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function MasiniSpalatVasePage() {
  const products = await getDishwasherProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Mașini Spălat Vase Profesionale' }]}
            className="mb-8 text-teal-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mașini de Spălat Vase Profesionale pentru Restaurante
            </h1>
            <p className="text-xl text-teal-100 mb-6 article-summary">
              Mașinile de spălat vase profesionale costă între 2.500-15.000 EUR. XEH.ro oferă mașini front-loading (20-40 coșuri/oră), hood-type (60-80 coșuri/oră), glasswashers și tunnel de la RM Gastro și REDFOX. Cicluri 2-3 minute, igienizare 82°C, livrare în toată România.
            </p>
            <p className="text-lg text-teal-200 mb-8">
              Echipamente profesionale de spălare pentru bucătării comerciale - de la bistrouri mici la hoteluri mari.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=dishwasher"
                className="inline-flex items-center gap-2 bg-white text-teal-800 hover:bg-teal-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Toate Mașinile
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
              Tipuri de Mașini de Spălat Vase Profesionale
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De la baruri mici la bucătării industriale - avem soluția potrivită pentru orice volum
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishwasherTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-teal-600" />
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
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Tip Mașină</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Preț Orientativ</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Capacitate</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Ciclu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Front-loading</td>
                  <td className="px-4 py-3 text-gray-600">2.500 - 5.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">20-40 coșuri/oră</td>
                  <td className="px-4 py-3 text-gray-600">2-3 min</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Hood-type</td>
                  <td className="px-4 py-3 text-gray-600">5.000 - 10.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">60-80 coșuri/oră</td>
                  <td className="px-4 py-3 text-gray-600">1-2 min</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Glasswasher</td>
                  <td className="px-4 py-3 text-gray-600">2.000 - 4.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">15-25 coșuri/oră</td>
                  <td className="px-4 py-3 text-gray-600">2 min</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-600">Tunnel</td>
                  <td className="px-4 py-3 text-gray-600">10.000 - 25.000 EUR</td>
                  <td className="px-4 py-3 text-gray-600">100-200 coșuri/oră</td>
                  <td className="px-4 py-3 text-gray-600">Continuu</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            * Prețurile sunt orientative și pot varia în funcție de model și specificații
          </p>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Mașini de Spălat Recomandate
              </h2>
              <Link
                href="/catalog?search=dishwasher"
                className="text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center gap-1"
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

      {/* Capacity Calculator */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
              Ghid Alegere: Capacitate vs. Locuri Restaurant
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-teal-50 rounded-2xl">
                <div className="text-3xl font-bold text-teal-600 mb-2">20-40</div>
                <div className="font-semibold text-gray-600 mb-1">Coșuri/oră</div>
                <div className="text-sm text-gray-500">Bistrou, cafenea<br />până la 30 locuri</div>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-2xl">
                <div className="text-3xl font-bold text-teal-600 mb-2">40-60</div>
                <div className="font-semibold text-gray-600 mb-1">Coșuri/oră</div>
                <div className="text-sm text-gray-500">Restaurant mic<br />30-60 locuri</div>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-2xl">
                <div className="text-3xl font-bold text-teal-600 mb-2">60-100</div>
                <div className="font-semibold text-gray-600 mb-1">Coșuri/oră</div>
                <div className="text-sm text-gray-500">Restaurant mediu<br />60-150 locuri</div>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-2xl">
                <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
                <div className="font-semibold text-gray-600 mb-1">Coșuri/oră</div>
                <div className="text-sm text-gray-500">Hotel, cantină<br />150+ locuri</div>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">
              * Calculul se bazează pe o rotație medie de 2 seturi de veselă pe loc pe zi
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Avantajele Mașinilor de Spălat Profesionale
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Viteză</h3>
              <p className="text-gray-500">
                Cicluri de doar 2-3 minute față de 60+ minute la mașinile casnice.
                Procesează sute de coșuri pe oră.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Igienă HACCP</h3>
              <p className="text-gray-500">
                Temperatură de clătire de 82°C pentru dezinfecție completă.
                Conformitate cu normele de siguranță alimentară.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Eficiență</h3>
              <p className="text-gray-500">
                Consum redus de apă și detergent per ciclu.
                Recuperare căldură și recirculare pentru economii.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Quote - GEO Signal */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                ES
              </div>
              <div>
                <blockquote className="text-gray-600 text-lg italic mb-3">
                  „În proiectele de echipare completă, mașina de spălat vase este adesea subestimată. Dar o mașină profesională spală un coș complet în 60-120 secunde versus 30-60 minute la una casnică. Pentru un restaurant cu 50+ de locuri, recomand modele cu sistem de recuperare căldură — economisesc până la 20% din costul energetic lunar."
                </blockquote>
                <div className="flex items-center gap-2">
                  <cite className="text-gray-600 font-semibold not-italic">Elena Stanciu</cite>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">Specialist Proiecte, Consultant Echipare Restaurante, XEH.ro</span>
                </div>
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
              Întrebări Frecvente despre Mașini de Spălat Vase
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-teal-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-teal-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Articole și Resurse Utile
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-600 mb-4">📚 Ghiduri din Blog</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/masini-spalat-vase-industriale-ghid-alegere" className="text-teal-600 hover:underline">
                    Mașini de Spălat Vase Industriale - Ghid Complet de Alegere
                  </Link>
                </li>
                <li>
                  <Link href="/blog/checklist-haccp-echipamente-obligatorii" className="text-teal-600 hover:underline">
                    Checklist HACCP: Echipamente Obligatorii pentru Restaurant
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ghid-complet-echipamente-horeca-restaurant" className="text-teal-600 hover:underline">
                    Ghid Complet: Echipamente HoReCa pentru Restaurant
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cost-echipare-restaurant-complet-2026" className="text-teal-600 hover:underline">
                    Cât Costă Echiparea Completă a unui Restaurant în 2026
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-600 mb-4">🔗 Echipamente Conexe</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/frigidere-industriale" className="text-teal-600 hover:underline">
                    Frigidere Industriale și Echipamente Refrigerare
                  </Link>
                </li>
                <li>
                  <Link href="/cuptoare-profesionale" className="text-teal-600 hover:underline">
                    Cuptoare Profesionale pentru Restaurante
                  </Link>
                </li>
                <li>
                  <Link href="/mobilier-inox-bucatarie" className="text-teal-600 hover:underline">
                    Mobilier Inox - Chiuvete Profesionale
                  </Link>
                </li>
                <li>
                  <Link href="/echipamente-bar-cafenea" className="text-teal-600 hover:underline">
                    Echipamente Bar și Cafenea
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-teal-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nu ești sigur ce mașină de spălat să alegi?
          </h2>
          <p className="text-teal-200 text-lg mb-8">
            Consultanții noștri te pot ajuta să calculezi capacitatea necesară și să alegi echipamentul potrivit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 hover:bg-teal-50 px-6 py-3 rounded-xl font-semibold transition-all"
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
          <p className="text-xs text-teal-400 text-center mt-12">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>
    </div>
  )
}
