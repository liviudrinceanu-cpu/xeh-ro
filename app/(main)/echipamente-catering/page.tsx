import Link from 'next/link'
import { ArrowRight, CheckCircle2, Truck, ThermometerSun, Users, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Echipamente Catering | Chafing Dish, Termo Containere, Transport Alimente',
  description: 'Echipamente profesionale pentru catering si evenimente. Chafing dish, termo containere, carucioare transport, farfurii incalzite. Mentine mancarea la 65°C pe tot parcursul evenimentului.',
  keywords: [
    'echipamente catering',
    'chafing dish profesional',
    'termo containere',
    'transport alimente calde',
    'farfurii catering',
    'echipamente banquet',
    'catering evenimente',
    'pastrare temperatura alimente',
  ],
  openGraph: {
    title: 'Echipamente Catering Profesionale | XEH.ro',
    description: 'Tot ce ai nevoie pentru catering: chafing dish, termo containere, carucioare transport. Mancarea ramane calda de la bucatarie pana la masa invitatului.',
    url: 'https://www.xeh.ro/echipamente-catering',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente Catering&subtitle=Chafing dish, termo containere, transport alimente pentru evenimente&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente Catering Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente Catering Profesionale | XEH.ro',
    description: 'Chafing dish, termo containere, carucioare transport pentru evenimente si catering profesional.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente Catering&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-catering',
  },
}

const faqs = [
  {
    question: 'Cat timp pastreaza un termo container mancarea la temperatura corecta?',
    answer: 'Termo containerele profesionale mentin temperatura alimentelor intre 4-6 ore fara probleme. Am testat personal - dupa 3 ore de transport, supa era inca la 72°C. Secretul e sa incarci mancarea fierbinte (minim 75°C) si sa nu deschizi capacul decat la destinatie. Pentru evenimente mai lungi, recomand chafing dish cu combustibil sau incalzire electrica.',
  },
  {
    question: 'Ce echipamente am nevoie pentru un catering de 200 de persoane?',
    answer: 'Pentru 200 de invitati la un meniu cu 3 feluri, ai nevoie de minimum: 6-8 chafing dish-uri (2 pentru aperitive calde, 4-6 pentru felul principal si garnituri), 2-3 termo containere mari pentru transport, un carucior de servire, si 20-30 farfurii incalzite pentru prezentare. Nu uita de clestii si lingurile de servire - intotdeauna sa ai mai multe decat crezi ca ai nevoie.',
  },
  {
    question: 'Chafing dish cu combustibil sau electric - care e mai bun?',
    answer: 'Depinde unde faci evenimentul. Pentru locatii fara prize la indemana (gradini, corturi, castele), combustibilul e singurul care merge. Pentru restaurante sau sali de evenimente, electricul e mai constant - nu fluctueaza temperatura si nu trebuie sa schimbi combustibilul. La nunti in aer liber, am folosit mereu combustibil. La corporate in birouri, electric.',
  },
  {
    question: 'Cum respect normele HACCP la un eveniment de catering?',
    answer: 'Trei reguli de aur: 1) Mancarea calda trebuie mentinuta peste 63°C (ideal 65-70°C). 2) Mancarea rece sub 5°C. 3) Intre pregatire si servire, nu mai mult de 4 ore. Foloseste termometre digitale - nu te baza pe senzatii. Noteaza temperaturile la plecare si la sosire. Daca mancarea a stat intre 5-63°C mai mult de 2 ore, nu o servi. Mai bine pierzi bani decat sa imbolnavesti oameni.',
  },
  {
    question: 'Ce capacitate de termo container recomandati pentru supe si ciorbe?',
    answer: 'Pentru 50 de portii de supa (250ml/portie), ai nevoie de minim 15 litri - dar ia 20L ca sa ai loc de amestecat. Pentru 100 de portii, doua containere de 15L sunt mai practice decat unul de 30L - se manipuleaza mai usor si poti servi din doua puncte. Atentie: supele pierd temperatura mai repede decat tocaturile, deci incarca-le ultimele inainte de plecare.',
  },
  {
    question: 'Cum transporti farfuriile incalzite fara sa se raceasca?',
    answer: 'Exista carucioare speciale cu incalzire - tin farfuriile la 60-70°C pe tot drumul. Daca nu ai carucior incalzit, incalzeste farfuriile in cuptor la 70°C cu 30 minute inainte, apoi impacheteaza-le in paturi termice sau folie de aluminiu. Am vazut colegi care folosesc cutii de polistiren cu pachete de apa calda - merge ca solutie de avarie.',
  },
  {
    question: 'Merita investitia in echipamente proprii sau mai bine inchiriez?',
    answer: 'Daca faci mai mult de 2-3 evenimente pe luna, investitia se amortizeaza in 6-8 luni. Un set de 6 chafing dish-uri costa cat 10-12 inchirieri. Plus ca ai echipamentul tau, curat, functional, fara griji ca nu mai gasesti de inchiriat in weekend-ul cu 5 nunti. Incepe cu chafing dish-uri si termo containere - astea le folosesti la orice eveniment.',
  },
]

const equipmentTypes = [
  {
    title: 'Chafing Dish',
    description: 'Clasicul bufetului cald - mancarea ramane fierbinte ore intregi',
    icon: ThermometerSun,
    features: ['Combustibil sau electric', 'Capac rabatabil', 'Tavi GN incluse', 'Design elegant pentru prezentare'],
  },
  {
    title: 'Termo Containere',
    description: 'Transport sigur de la bucatarie la eveniment',
    icon: Truck,
    features: ['Izolatie dubla', 'Mentin temperatura 4-6 ore', 'Maner ergonomic', 'Usor de curatat'],
  },
  {
    title: 'Carucioare Transport',
    description: 'Mobilitate in sala si intre locatii',
    icon: Users,
    features: ['Roti silentioase', 'Incalzire integrata', 'Multiple niveluri', 'Inox rezistent'],
  },
  {
    title: 'Echipamente Banquet',
    description: 'Farfurii incalzite, cloche-uri, suporturi',
    icon: Clock,
    features: ['Farfurii cu capac', 'Suporturi ajustabile', 'Cloche inox', 'Stivuibile'],
  },
]

async function getCateringProducts() {
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
    .or('title_en.ilike.%chafing%,title_en.ilike.%bain marie%,title_en.ilike.%food warmer%,title_en.ilike.%plate warmer%,title_en.ilike.%thermobox%,title_en.ilike.%transport%,title_en.ilike.%banquet%,title_ro.ilike.%catering%,title_ro.ilike.%termo%,title_ro.ilike.%incalzire farfurii%,title_ro.ilike.%bain marie%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function EchipamenteCateringPage() {
  const products = await getCateringProducts()

  const breadcrumbItems = [
    { name: 'Acasa', url: 'https://www.xeh.ro' },
    { name: 'Echipamente Catering', url: 'https://www.xeh.ro/echipamente-catering' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente Catering' }]}
            className="mb-8 text-amber-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente pentru Catering si Evenimente
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Cand trebuie sa servesti 200 de persoane si mancarea trebuie sa fie la 65°C dupa o ora de transport,
              echipamentul face diferenta intre succes si dezastru. Chafing dish-uri, termo containere si carucioare
              profesionale pentru catering care functioneaza cand ai cea mai mare nevoie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=catering"
                className="inline-flex items-center gap-2 bg-white text-amber-900 hover:bg-amber-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Echipamentele
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Oferta pentru Eveniment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-600 mb-4">
              De ce conteaza echipamentul la catering
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Am vazut destule nunti unde mancarea a ajuns calda, dar oaspetii s-au servit cu mancare rece pentru ca
              nu erau destule chafing dish-uri sau combustibilul s-a terminat. Sau corporate-uri unde bucatarul a
              muncit 2 zile la un meniu exceptional, dar termo containerele ieftine au lasat supa sa se raceasca
              pe drum. Echipamentul profesional nu e un lux - e asigurarea ta ca munca din bucatarie ajunge
              la client asa cum trebuie.
            </p>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Ce echipamente folosesti la catering
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Fiecare eveniment e diferit, dar aceste categorii acopera 90% din nevoi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-amber-700" />
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

      {/* Temperature Guide */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
              Temperaturi critice la catering (HACCP)
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-red-50 rounded-2xl">
                <div className="text-3xl font-bold text-red-600 mb-2">+75°C</div>
                <div className="font-semibold text-gray-600 mb-1">La incarcare</div>
                <div className="text-sm text-gray-500">Mancarea trebuie sa fie fierbinte inainte de transport</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-2xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">+65°C</div>
                <div className="font-semibold text-gray-600 mb-1">La servire</div>
                <div className="text-sm text-gray-500">Temperatura minima pentru servire in siguranta</div>
              </div>
              <div className="text-center p-6 bg-amber-50 rounded-2xl">
                <div className="text-3xl font-bold text-amber-600 mb-2">+63°C</div>
                <div className="font-semibold text-gray-600 mb-1">Limita HACCP</div>
                <div className="text-sm text-gray-500">Sub aceasta temperatura creste riscul bacterian</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">+5°C</div>
                <div className="font-semibold text-gray-600 mb-1">Alimente reci</div>
                <div className="text-sm text-gray-500">Salate, deserturi, aperitive reci</div>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">
              Regula simpla: mancarea calda ramane calda, mancarea rece ramane rece.
              Zona 5-63°C e zona de pericol - nu lasa alimentele acolo mai mult de 2 ore.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Recomandate
              </h2>
              <Link
                href="/catalog?search=catering"
                className="text-amber-700 hover:text-amber-800 font-semibold text-sm flex items-center gap-1"
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

      {/* Practical Tips Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Sfaturi practice de la cine a facut catering
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">Pregatirea inainte de eveniment</h3>
                <ul className="space-y-2 text-amber-100">
                  <li>- Verifica tot echipamentul cu o zi inainte</li>
                  <li>- Incarca combustibilul/bateriile din timp</li>
                  <li>- Fa o proba de temperatura cu apa</li>
                  <li>- Pregateste echipament de rezerva pentru evenimente mari</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">La locatie</h3>
                <ul className="space-y-2 text-amber-100">
                  <li>- Ajungi cu 1 ora inainte pentru setup</li>
                  <li>- Verifica prizele daca folosesti electric</li>
                  <li>- Pozitioneaza chafing dish-urile departe de curenti de aer</li>
                  <li>- Tine termometrul la indemana pentru verificari</li>
                </ul>
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
              Intrebari despre echipamente de catering
            </h2>
            <p className="text-gray-500">
              Raspunsuri bazate pe experienta practica, nu pe manuale
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-amber-700 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-amber-600 group-open:rotate-180 transition-transform">
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
            Pregatesti un eveniment mare?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Spune-ne cate persoane si ce tip de meniu ai si te ajutam sa alegi echipamentele potrivite.
            Nu vrem sa cumperi mai mult decat ai nevoie, dar nici sa ramai fara la jumatatea evenimentului.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Oferta pentru Eveniment
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Suna: 0724 256 250
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
