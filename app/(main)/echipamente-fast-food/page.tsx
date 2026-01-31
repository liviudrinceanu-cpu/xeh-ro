import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, Flame, Timer, ThermometerSun, Sparkles, UtensilsCrossed } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Echipamente Fast Food Profesionale | Friteuze, Gratar, Toaster | XEH.ro',
  description: 'Echipamente fast food pentru restaurante cu servire rapida. Friteuze profesionale, gratare contact, toastere, incalzitoare hot dog, kebab. Livrare in toata Romania.',
  keywords: [
    'echipamente fast food',
    'friteuse profesionale',
    'gratar restaurant',
    'toaster profesional',
    'hot dog',
    'kebab',
    'echipamente servire rapida',
    'friteuza electrica profesionala',
    'gratar contact profesional',
    'vitrina calda',
  ],
  openGraph: {
    title: 'Echipamente Fast Food Profesionale | XEH.ro',
    description: 'Friteuze, gratare, toastere si echipamente pentru restaurante fast food. Viteza si eficienta pentru ore de varf.',
    url: 'https://www.xeh.ro/echipamente-fast-food',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente Fast Food&subtitle=Friteuze, gratare, toastere pentru restaurante cu servire rapida&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente Fast Food Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente Fast Food Profesionale | XEH.ro',
    description: 'Friteuze, gratare, toastere si echipamente pentru restaurante fast food.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente Fast Food&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-fast-food',
  },
}

const faqs = [
  {
    question: 'Cat de repede pregateste o friteusa profesionala o portie de cartofi?',
    answer: 'O friteusa profesionala buna incalzeste uleiul in 10-15 minute la pornire si mentine temperatura constanta intre portii. Cartofii ies in 3-4 minute cand uleiul e la temperatura optima. In orele de varf, diferenta o face capacitatea - o friteusa de 8-10 litri poate pregati 2-3 portii simultan fara sa scada temperatura.',
  },
  {
    question: 'Gratar contact sau gratar neted pentru un fast food?',
    answer: 'Depinde ce prepari mai des. Gratarul contact (cu doua placi) e ideal pentru sandwich-uri, panini si burgeri - preseaza si gateste de ambele parti simultan, deci reduce timpul la jumatate. Gratarul neted e mai versatil pentru carne, legume, oua. Multe fast food-uri au ambele - contact pentru sandwich-uri, neted pentru restul.',
  },
  {
    question: 'Ce capacitate de friteusa am nevoie pentru un fast food cu 50 de comenzi pe ora?',
    answer: 'Pentru 50 de comenzi pe ora unde cartofii apar in 70% din comenzi, ai nevoie de minim 2 friteuze de 8 litri fiecare. Asa poti roti - una pregateste, una se incalzeste pentru urmatoarea portie. In zilele aglomerate nu vei ramane niciodata fara cartofi proaspeti. Multi clienti iau 3 pentru siguranta.',
  },
  {
    question: 'Cat de greu se curata echipamentele fast food la sfarsit de zi?',
    answer: 'Echipamentele moderne sunt gandite pentru curatare rapida. Friteuza se goleste, se sterge cu prosop, se clateste cuva - 15 minute maxim. Gratarele cu placi detasabile sunt cele mai usor de curatat, le scoti si le speli separat. Incalzitoarele si vitrinele calde au tavite detasabile. Daca alegi echipamente cu suprafete anti-aderente, curatarea e si mai simpla.',
  },
  {
    question: 'Merita sa iau echipamente pe gaz sau electrice pentru fast food?',
    answer: 'Electricele sunt mai practici pentru fast food din mai multe motive: nu ai nevoie de instalatie de gaz, le poti muta usor daca reconfigurezi bucataria, si controlul temperaturii e mai precis. Gazul e mai economic la functionare pentru volume foarte mari, dar investitia in instalatie si verificarile anuale adauga costuri ascunse.',
  },
  {
    question: 'Ce garantie au echipamentele si cat dureaza pana primesc piese de schimb?',
    answer: 'Echipamentele RM Gastro si REDFOX au garantie standard de producator. Dar mai important pentru un fast food e timpul de raspuns la probleme. Avem piese de schimb pentru cele mai solicitate componente - rezistente, termostate, butoane. Pentru fast food, fiecare ora de inactivitate inseamna bani pierduti, deci support-ul rapid e esential.',
  },
  {
    question: 'Cum aleg vitrina calda potrivita pentru un fast food?',
    answer: 'Vitrina calda trebuie sa tina produsele la temperatura sigura (peste 65°C) dar sa nu le usuce. Pentru fast food, alege vitrine cu umiditate controlata si mai multe rafturi. Calculeaza cat produs vrei sa ai expus - pentru un fast food mediu, o vitrina de 80-100cm latime e suficienta. Iluminarea LED face produsele sa arate apetisant si consuma putin.',
  },
]

const equipmentTypes = [
  {
    title: 'Friteuze Profesionale',
    description: 'Cartofi aurii si crocanti in 3-4 minute, gata pentru ore de varf',
    icon: Flame,
    features: ['Incalzire rapida 10-15 min', 'Termostat precis', 'Cuva detasabila', 'Capacitate 6-20 litri'],
  },
  {
    title: 'Gratare Contact',
    description: 'Sandwich-uri si burgeri gatiti de ambele parti simultan',
    icon: UtensilsCrossed,
    features: ['Placi superioare/inferioare', 'Temperatura reglabila', 'Placi striate sau netede', 'Curatare usoara'],
  },
  {
    title: 'Toastere Profesionale',
    description: 'Paine prajita uniform, gata in secunde pentru fiecare comanda',
    icon: Timer,
    features: ['Banda continua', 'Capacitate mare', 'Temperatura ajustabila', 'Design compact'],
  },
  {
    title: 'Vitrine Calde',
    description: 'Expunere atractiva, produse calde si sigure pentru clienti',
    icon: ThermometerSun,
    features: ['Umiditate controlata', 'LED iluminare', 'Temperatura 65-85°C', 'Mai multe rafturi'],
  },
  {
    title: 'Incalzitoare Hot Dog',
    description: 'Hot dog-uri gatite uniform, cu chiflele incalzite perfect',
    icon: Sparkles,
    features: ['Role rotative', 'Zona chifle', 'Capacitate 8-30 buc', 'Vedere 360°'],
  },
  {
    title: 'Echipamente Kebab',
    description: 'Frigarui verticale pentru shaorma si gyros autentic',
    icon: Zap,
    features: ['Arzatoare pe gaz', 'Rotire automata', 'Capacitate 25-80 kg', 'Constructie inox'],
  },
]

async function getFastFoodProducts() {
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
    .or('title_en.ilike.%fryer%,title_en.ilike.%grill%,title_en.ilike.%toaster%,title_en.ilike.%hot dog%,title_en.ilike.%kebab%,title_en.ilike.%contact%,title_en.ilike.%griddle%,title_ro.ilike.%friteuz%,title_ro.ilike.%gratar%,title_ro.ilike.%toaster%,title_ro.ilike.%vitrin%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function EchipamenteFastFoodPage() {
  const products = await getFastFoodProducts()

  const breadcrumbItems = [
    { name: 'Acasa', url: 'https://www.xeh.ro' },
    { name: 'Echipamente Fast Food', url: 'https://www.xeh.ro/echipamente-fast-food' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente Fast Food' }]}
            className="mb-8 text-orange-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente Fast Food pentru Restaurante cu Servire Rapida
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Stii cum e cand ai 50 de comenzi simultan si fiecare client asteapta cartofii
              proaspeti? Echipamentele potrivite fac diferenta intre haos si o linie de productie
              care merge ca unsul. Friteuze care tin temperatura, gratare care nu te lasa la greu,
              vitrine care pastreaza produsele calde si apetisante.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=friteusa"
                className="inline-flex items-center gap-2 bg-white text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Friteuze
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Oferta pentru Dotare Completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600">3-4 min</div>
              <div className="text-gray-500 text-sm">Cartofi prajiti</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600">2 min</div>
              <div className="text-gray-500 text-sm">Sandwich la gratar contact</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600">15 min</div>
              <div className="text-gray-500 text-sm">Curatare la sfarsit de zi</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600">65°C+</div>
              <div className="text-gray-500 text-sm">Temperatura sigura vitrine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Echipamente Esentiale pentru Fast Food
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Am echipat zeci de fast food-uri si stim ce merge si ce nu. Aici sunt
              echipamentele care nu trebuie sa lipseasca din nicio bucatarie de servire rapida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-orange-600" />
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

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Recomandate pentru Fast Food
              </h2>
              <Link
                href="/catalog?search=friteusa gratar toaster"
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
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

      {/* Rush Hour Tips Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Sfaturi pentru Orele de Varf
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-2">Dubleaza echipamentele critice</h3>
                  <p className="text-orange-100 text-sm">
                    Doua friteuze mici sunt mai bune decat una mare. Daca una se strica sau
                    trebuie curatata, nu ramai blocat.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-2">Pregateste inainte de ora de varf</h3>
                  <p className="text-orange-100 text-sm">
                    Incalzeste echipamentele cu 20 de minute inainte. Cand incepe valul de
                    clienti, totul trebuie sa fie la temperatura optima.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-2">Vitrina calda e prietenul tau</h3>
                  <p className="text-orange-100 text-sm">
                    Pregateste produsele cele mai cerute si tine-le in vitrina. Clientul ia
                    imediat, nu mai asteapta, si tu ai timp pentru comenzile speciale.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-2">Curatarea rapida intre schimburi</h3>
                  <p className="text-orange-100 text-sm">
                    Alege echipamente cu piese detasabile si suprafete anti-aderente. 15 minute
                    de curatare intre pranz si cina fac toata diferenta.
                  </p>
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
              Intrebari despre Echipamente Fast Food
            </h2>
            <p className="text-gray-500">
              Raspunsuri la intrebarile pe care le primim cel mai des de la proprietarii de fast food-uri
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-orange-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-orange-600 group-open:rotate-180 transition-transform">
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
            Articole si Resurse Utile
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-600 mb-4">📚 Ghiduri din Blog</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/ghid-deschidere-restaurant-2026" className="text-orange-600 hover:underline">
                    Ghid Complet Deschidere Restaurant / Fast Food 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cost-echipare-restaurant-complet-2026" className="text-orange-600 hover:underline">
                    Cat Costa Echiparea Completa a unui Fast Food
                  </Link>
                </li>
                <li>
                  <Link href="/blog/checklist-haccp-echipamente-obligatorii" className="text-orange-600 hover:underline">
                    Checklist HACCP: Echipamente Obligatorii
                  </Link>
                </li>
                <li>
                  <Link href="/blog/fonduri-europene-horeca-2026" className="text-orange-600 hover:underline">
                    Fonduri Europene pentru HoReCa 2026
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-600 mb-4">🔗 Echipamente Conexe</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/echipamente-pizzerie" className="text-orange-600 hover:underline">
                    Echipamente Pizzerie
                  </Link>
                </li>
                <li>
                  <Link href="/frigidere-industriale" className="text-orange-600 hover:underline">
                    Frigidere si Vitrine Frigorifice
                  </Link>
                </li>
                <li>
                  <Link href="/masini-spalat-vase-profesionale" className="text-orange-600 hover:underline">
                    Masini de Spalat Vase Profesionale
                  </Link>
                </li>
                <li>
                  <Link href="/mobilier-inox-bucatarie" className="text-orange-600 hover:underline">
                    Mobilier Inox pentru Bucatarie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Deschizi un fast food sau vrei sa upgradezi echipamentele?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Spune-ne ce tip de meniu ai si cate comenzi estimezi pe ora. Te ajutam sa
            alegi echipamentele care chiar fac diferenta cand vine ora de varf.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Oferta pentru Dotare Completa
            </Link>
            <a
              href="tel:+40371232404"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Suna: 0371 232 404
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
