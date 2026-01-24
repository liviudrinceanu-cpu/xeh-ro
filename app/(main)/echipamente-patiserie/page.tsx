import Link from 'next/link'
import { ArrowRight, CheckCircle2, Croissant, Thermometer, Fan, Snowflake, Scale, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Echipamente Patiserie Profesionale | Cuptoare, Malaxoare, Vitrine',
  description: 'Echipamente profesionale pentru patiserii si cofetarii. Cuptoare patiserie, malaxoare aluat, vitrine frigorifice, mese refrigerate. Branduri RM Gastro si REDFOX cu livrare nationala.',
  keywords: [
    'echipamente patiserie',
    'cuptor patiserie',
    'cuptor convectie patiserie',
    'malaxor aluat',
    'vitrina patiserie',
    'vitrina frigorifica patiserie',
    'mese refrigerate patiserie',
    'echipamente cofetarie',
    'cuptor profesional patiserie',
    'echipamente brutarie',
  ],
  openGraph: {
    title: 'Echipamente Patiserie Profesionale | XEH.ro',
    description: 'Dotari complete pentru patiserii: cuptoare cu convectie, malaxoare, vitrine frigorifice. RM Gastro si REDFOX.',
    url: 'https://www.xeh.ro/echipamente-patiserie',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente Patiserie Profesionale&subtitle=Cuptoare, malaxoare, vitrine pentru patiserii si cofetarii&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente Profesionale pentru Patiserii - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente Patiserie Profesionale | XEH.ro',
    description: 'Dotari complete pentru patiserii: cuptoare cu convectie, malaxoare, vitrine frigorifice.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente Patiserie Profesionale&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-patiserie',
  },
}

const faqs = [
  {
    question: 'Ce capacitate trebuie sa aiba cuptorul pentru o patiserie mica?',
    answer: 'Pentru o patiserie cu productie zilnica de 50-100 de produse, un cuptor cu convectie de 4-6 tavi (dimensiune 600x400mm sau GN 1/1) este de obicei suficient. Daca ai comenzi mari pentru evenimente sau faci si paine, mergi pe 10 tavi. Important e sa ai si fermentator separat - altfel pierzi timp asteptand sa se ridice aluatul intre sarje.',
  },
  {
    question: 'De ce nu se coace uniform prajitura in cuptorul meu actual?',
    answer: 'Problema e aproape intotdeauna distributia aerului. Cuptoarele cu convectie ieftine au un singur ventilator mic care nu misca aerul uniform. La cuptoarele profesionale RM Gastro ai ventilatoare reversibile care schimba directia la fiecare minut - asa se elimina "punctele moarte". Un alt motiv poate fi etanseitatea usii: daca intra aer rece, partea din fata se coace mai greu.',
  },
  {
    question: 'Malaxor planetar sau malaxor spiral pentru patiserie?',
    answer: 'Depinde ce faci mai mult. Malaxorul planetar (cu paleta, tel si carlig) e versatil - frisca, cremuri, aluaturi moi, bezele. Malaxorul spiral e facut strict pentru aluaturi grele: franzela, cozonac, paine. Daca ai si patiserie fina si produse de panificatie, ideal ai nevoie de amandoua. Daca trebuie sa alegi unul singur si faci multe prajituri, mergi pe planetar.',
  },
  {
    question: 'Cum aleg vitrina frigorifica potrivita pentru prajituri cu crema?',
    answer: 'Cremele sunt sensibile - trebuie sa stea intre 2 si 6 grade, fara fluctuatii. Cauta vitrine cu racire ventilata (nu statica) pentru temperatura uniforma, si cu anti-aburire pe geam. Dimensiunea depinde de cate SKU-uri expui: o vitrina de 1.2m incape cam 20-25 de felii diferite pe 3 rafturi. Pentru torturi intregi, ai nevoie de inaltime libera mai mare intre rafturi.',
  },
  {
    question: 'Ce echipamente sunt esentiale pentru o patiserie la inceput de drum?',
    answer: 'Lista minima: cuptor convectie 4-6 tavi, malaxor planetar 20-30 litri, blat de lucru refrigerat pentru aluaturi, vitrina frigorifica pentru expunere, cantar de precizie. Optional dar foarte util: masina de copt vafe sau clatite daca ai mic dejun, abator pentru racire rapida a cremurilor. Investeste mai mult in cuptor - e inima productiei si diferenta se simte zilnic.',
  },
  {
    question: 'Cat consuma electric echipamentele de patiserie?',
    answer: 'Un cuptor convectie de 10 tavi consuma cam 12-16 kW, dar nu la capacitate maxima tot timpul - realitatea e cam 8-10 kW in medie. Vitrinele frigorifice sunt economice, 0.3-0.8 kW. Malaxorul planetar de 30L trage cam 1-1.5 kW. Per total, o patiserie mica ajunge la 15-20 kW instalat. Verifica ce putere ai disponibila inainte sa comanzi - multe locatii au doar 15 kW pe contract.',
  },
  {
    question: 'Ce garantie si service oferiti pentru echipamentele de patiserie?',
    answer: 'Echipamentele RM Gastro si REDFOX au garantie standard de la producator. Avem piese de schimb in stoc pentru modele curente si oferim suport tehnic telefonic pentru probleme minore. Pentru interventii, lucram cu service-uri autorizate in toata tara. La cuptoare, recomandam un contract de mentenanta anuala - costa putin si previne problemele mari.',
  },
]

const equipmentTypes = [
  {
    title: 'Cuptoare Patiserie',
    description: 'Convectie cu abur pentru coacere uniforma si crusta perfecta',
    icon: Fan,
    features: ['Injectie abur reglabila', 'Tavi 400x600 sau GN', 'Programe automate', 'Ventilatie reversibila'],
  },
  {
    title: 'Malaxoare Aluat',
    description: 'Planetare si spirale pentru orice tip de aluat',
    icon: Scale,
    features: ['Capacitati 10-60 litri', 'Viteze variabile', 'Bol inox detasabil', 'Protectie suprasarcina'],
  },
  {
    title: 'Vitrine Frigorifice',
    description: 'Expunere profesionala cu temperatura controlata',
    icon: Snowflake,
    features: ['Racire ventilata', 'Geam anti-aburire', 'Iluminare LED', 'Rafturi reglabile'],
  },
  {
    title: 'Mese Refrigerate',
    description: 'Blat rece pentru lucru cu aluaturi si creme',
    icon: Thermometer,
    features: ['Suprafata granit sau inox', 'Temperatura 2-8°C', 'Sertare refrigerate', 'Dimensiuni variate'],
  },
  {
    title: 'Fermentatoare',
    description: 'Control precis al temperaturii si umiditatii pentru dospire',
    icon: Clock,
    features: ['Umiditate reglabila', 'Temperatura 20-40°C', 'Capacitate tavi multipla', 'Timer programabil'],
  },
  {
    title: 'Echipamente Specialitate',
    description: 'Masini vafe, clatite, topping, decorare',
    icon: Croissant,
    features: ['Masini vafe profesionale', 'Plite clatite', 'Pistoale decorare', 'Incalzitoare ciocolata'],
  },
]

async function getPastryProducts() {
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
    .or('title_en.ilike.%convection%,title_en.ilike.%bakery%,title_en.ilike.%pastry%,title_en.ilike.%mixer%,title_en.ilike.%dough%,title_en.ilike.%display%,title_en.ilike.%refrigerat%,title_ro.ilike.%patiserie%,title_ro.ilike.%convectie%,title_ro.ilike.%aluat%,title_ro.ilike.%vitrina%,title_ro.ilike.%malaxor%,title_ro.ilike.%ferment%')
    .gte('price_amount', 500)
    .lte('price_amount', 20000)
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function EchipamentePatiseriePage() {
  const products = await getPastryProducts()

  const breadcrumbItems = [
    { name: 'Acasa', url: 'https://www.xeh.ro' },
    { name: 'Echipamente Patiserie', url: 'https://www.xeh.ro/echipamente-patiserie' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente Patiserie' }]}
            className="mb-8 text-amber-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente Profesionale pentru Patiserii
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Stii momentul ala cand scoti tava din cuptor si totul e exact cum trebuie?
              Crusta aurie, interiorul pufos, aroma care umple tot spatiul. Cu echipamente
              profesionale, momentul ala devine regula, nu exceptie. Cuptoare cu convectie,
              malaxoare de capacitate, vitrine care tin cremele la temperatura perfecta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=patiserie"
                className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-800 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Echipamentele
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Oferta pentru Patiserie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              O patiserie reusita e o combinatie de retete bune si echipamente care nu te lasa la greu.
              Am vazut destule cazuri: un cuptor care nu tine temperatura constanta transforma
              fiecare sarja intr-o loterie. Un malaxor subdimensionat se blocheaza exact cand ai
              comanda mare. O vitrina care face condens pe geam ascunde produsele in loc sa le puna in valoare.
            </p>
            <p>
              De aceea lucram cu RM Gastro si REDFOX - branduri care inteleg ce inseamna productia
              zilnica intr-o patiserie. Nu echipamente de casa marite, ci masini gandite pentru
              8-10 ore de lucru continuu, zi de zi.
            </p>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Ce Echipamente Gasesti pentru Patiserie
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De la coacere la expunere, acoperim tot lantul de productie al unei patiserii moderne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Recomandate pentru Patiserii
              </h2>
              <Link
                href="/catalog?search=patiserie convectie"
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

      {/* Tips Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Sfaturi din Experienta cu Patiserii
              </h2>
              <div className="space-y-4 text-amber-100">
                <p>
                  <strong className="text-white">Cuptorul e cel mai important.</strong> Poti compensa
                  un malaxor mai mic lucrand in mai multe sarje, dar un cuptor slab iti strica
                  produsele. Investeste aici primul.
                </p>
                <p>
                  <strong className="text-white">Planifica fluxul de lucru.</strong> Pune cuptorul
                  langa fermentator, masa de lucru langa malaxor, vitrina aproape de casa.
                  Pasii in minus se aduna la sute de kilometri pe an.
                </p>
                <p>
                  <strong className="text-white">Lasa loc pentru crestere.</strong> Daca acum
                  vinzi 50 de prajituri pe zi si vrei sa ajungi la 150, ia echipamente care
                  suporta volumul viitor. E mai ieftin decat sa schimbi tot peste doi ani.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              De ce XEH.ro pentru Echipamente de Patiserie
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">10+</div>
              <div className="text-gray-600">Ani experienta in echipamente HoReCa</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">2</div>
              <div className="text-gray-600">Branduri premium (RM Gastro, REDFOX)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
              <div className="text-gray-600">Livrare in toata Romania</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Intrebari despre Echipamente de Patiserie
            </h2>
            <p className="text-gray-500">
              Raspunsuri la ce ne intreaba cel mai des clientii care deschid sau doteaza patiserii
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
            Deschizi sau Reamenajezi o Patiserie?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Hai sa vorbim despre ce ai nevoie. Facem liste de echipamente, calculam
            consumuri, si iti dam preturi pentru tot pachetul. Fara obligatii.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Oferta Completa
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
