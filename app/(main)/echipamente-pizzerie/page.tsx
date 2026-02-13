import Link from 'next/link'
import { ArrowRight, CheckCircle2, Flame, Timer, ThermometerSun, Gauge } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipamente Pizzerie Profesionale | Cuptor Pizza, Blat, Vitrine',
  description: 'Echipamente complete pentru pizzerie: cuptoare pizza profesionale, mese preparare, vitrine încălzite, topping station. Branduri RM Gastro și REDFOX. Livrare în toată România.',
  keywords: [
    'echipamente pizzerie',
    'cuptor pizza profesional',
    'cuptor pizza electric',
    'cuptor pizza gaz',
    'masa preparare pizza',
    'vitrina pizza',
    'echipamente pizzerie pret',
    'dotari pizzerie',
  ],
  openGraph: {
    title: 'Echipamente Pizzerie Profesionale | XEH.ro',
    description: 'Echipamente complete pentru pizzerie: cuptoare pizza, mese preparare, vitrine încălzite. Livrare națională.',
    url: 'https://www.xeh.ro/echipamente-pizzerie',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente Pizzerie Profesionale&subtitle=Cuptoare pizza, mese preparare, vitrine încălzite&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente Pizzerie Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente Pizzerie Profesionale | XEH.ro',
    description: 'Echipamente complete pentru pizzerie: cuptoare pizza, mese preparare, vitrine încălzite.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente Pizzerie Profesionale&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-pizzerie',
  },
}

const faqs = [
  {
    question: 'Ce tip de cuptor pizza este cel mai bun pentru o pizzerie?',
    answer: 'Depinde de volum și stil. Cuptoarele electrice cu vatră din piatră sunt cele mai populare pentru consistență. Cuptoarele pe gaz oferă aromă tradițională. Pentru volume mari (50+ pizza/oră), recomandăm cuptoare cu mai multe camere sau cuptoare tip tunel.',
  },
  {
    question: 'Cât costă să echipezi o pizzerie de la zero?',
    answer: 'O pizzerie mică (20-30 locuri) necesită investiții de 15.000-30.000 EUR în echipamente: cuptor pizza (3.000-8.000 EUR), masă refrigerată preparare (2.000-4.000 EUR), vitrină pizza (1.500-3.000 EUR), plus accesorii. Contactați-ne pentru o ofertă personalizată.',
  },
  {
    question: 'Ce temperatură trebuie să atingă un cuptor pizza profesional?',
    answer: 'Un cuptor pizza profesional trebuie să atingă minim 350°C, ideal 400-450°C. Cuptoarele premium pot ajunge la 500°C pentru pizza Napoletană autentică (90 secunde timp de coacere).',
  },
  {
    question: 'Am nevoie de masă refrigerată pentru preparare pizza?',
    answer: 'Da, este esențială pentru siguranța alimentară și eficiență. Masa refrigerată menține ingredientele la temperatura optimă și oferă suprafață de lucru pentru întinderea aluatului. Majoritatea modelelor au și topping station integrat.',
  },
  {
    question: 'Ce accesorii sunt necesare pentru o pizzerie?',
    answer: 'Accesorii esențiale: pale pizza (diferite mărimi), cuțite rotative, discuri aluat, tăvi perforate, suporturi pizza, termometre infraroșu. Opțional: mașină porționat aluat, mixer planetar pentru aluat, vitrină încălzită.',
  },
  {
    question: 'Livrați echipamente pentru pizzerie în toată România?',
    answer: 'Da, livrăm în toată România. Oferim și servicii de instalare pentru echipamente mari precum cuptoare pizza industriale. Timpul de livrare standard este 5-10 zile lucrătoare.',
  },
]

const equipmentTypes = [
  {
    title: 'Cuptoare Pizza',
    description: 'De la modele compacte la cuptoare industriale cu vatră din piatră',
    icon: Flame,
    features: ['Temperatură până la 500°C', 'Vatră piatră refractară', 'Electric sau gaz', '1-4 camere de coacere'],
  },
  {
    title: 'Mese Preparare',
    description: 'Mese refrigerate cu topping station pentru ingrediente proaspete',
    icon: ThermometerSun,
    features: ['Refrigerare integrată', 'Blat granit/inox', 'Topping station', 'Diverse dimensiuni'],
  },
  {
    title: 'Vitrine Pizza',
    description: 'Expunere atractivă pentru pizza gata sau ingrediente',
    icon: Gauge,
    features: ['Vitrine încălzite', 'Vitrine refrigerate', 'Iluminare LED', 'Design modern'],
  },
  {
    title: 'Echipamente Aluat',
    description: 'Mixere, divizoare și mașini pentru aluat perfect',
    icon: Timer,
    features: ['Mixere planetare', 'Laminatoare', 'Divizoare aluat', 'Dospitoare'],
  },
]

async function getPizzaProducts() {
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
    .or('title_en.ilike.%pizza%,title_ro.ilike.%pizza%,title_en.ilike.%dough%,title_ro.ilike.%aluat%')
    .limit(8)
    .order('price_amount', { ascending: false, nullsFirst: false })

  return products || []
}

export default async function EchipamentePizzeriePage() {
  const products = await getPizzaProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente Pizzerie' }]}
            className="mb-8 text-orange-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente Profesionale pentru Pizzerie
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Totul pentru pizzeria ta: cuptoare pizza profesionale cu vatră din piatră,
              mese de preparare refrigerate, vitrine încălzite și accesorii.
              Echipăm pizzerii de succes din 2006.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=pizza"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-orange-600 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Toate Echipamentele
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Ofertă Pizzerie Completă
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
              Categorii Echipamente Pizzerie
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De la cuptor pizza la ultima lingură - găsești tot ce ai nevoie pentru o pizzerie de succes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Avantaje și Dezavantaje Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Avantaje și Dezavantaje pe Tipuri de Echipamente
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Analizează avantajele și limitările fiecărui tip de echipament pentru pizzerie
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cuptor Pizza Electric */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Cuptor Pizza Electric</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Control precis al temperaturii - rezultate consistente</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ușor de instalat - necesită doar priză electrică</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Curățare simplă - suprafețe netede</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Disponibil în mai multe dimensiuni și capacități</span>
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
                    <span>Consum electric mare (necesită priză trifazată)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Timp de încălzire mai lung decât pe gaz</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Cost mai mare pe pizza la tarife ridicate energie</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cuptor Pizza pe Gaz */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Cuptor Pizza pe Gaz</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Încălzire rapidă - gata în 15-20 minute</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Aromă autentică - gust tradițional pizza napolitană</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Cost mai mic pe pizza - gaz mai ieftin decât energia</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Funcționează și fără curent electric</span>
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
                    <span>Necesită instalație de gaz certificată</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Curățare mai dificilă decât la modelele electrice</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Control mai puțin precis al temperaturii</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Masă Refrigerată Pizza */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-600 mb-6">Masă Refrigerată Pizza</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Avantaje
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Preparare și refrigerare în același loc</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Economie de spațiu - funcții multiple într-un echipament</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Conformitate HACCP - ingrediente la temperatura corectă</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Topping station integrat pentru eficiență maximă</span>
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
                    <span>Investiție inițială mare (2.000-4.000 EUR)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Necesită mentenanță periodică a compresorului</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Greutate considerabilă - necesită pardoseală rezistentă</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Recomandate pentru Pizzerie
              </h2>
              <Link
                href="/catalog?search=pizza"
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

      {/* Tips Section */}
      <section className="py-16 md:py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Sfaturi pentru Alegerea Echipamentelor de Pizzerie
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🍕</div>
              <h3 className="font-bold text-gray-600 mb-2">Calculează Volumul</h3>
              <p className="text-gray-500 text-sm">
                Un cuptor pizza standard coace 4-6 pizza/oră per cameră.
                Pentru 100 pizza/zi, ai nevoie de minim 2 camere.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-600 mb-2">Verifică Alimentarea</h3>
              <p className="text-gray-500 text-sm">
                Cuptoarele pizza electrice necesită alimentare trifazată.
                Verifică instalația electrică înainte de achiziție.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">📏</div>
              <h3 className="font-bold text-gray-600 mb-2">Măsoară Spațiul</h3>
              <p className="text-gray-500 text-sm">
                Lasă minim 80cm spațiu de lucru în fața cuptorului
                și asigură ventilație adecvată pentru evacuare căldură.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                De ce să alegi echipamente de la XEH.ro?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-white/80">Pizzerii echipate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-white/80">Branduri premium</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">48h</div>
                  <div className="text-white/80">Răspuns ofertă</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contactează un Expert Pizzerie
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Întrebări Frecvente despre Echipamente Pizzerie
            </h2>
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
            Articole și Resurse Utile
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-600 mb-4">📚 Ghiduri din Blog</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog/echipamente-pizzerie-completa-ghid" className="text-orange-600 hover:underline">
                    Echipamente pentru Pizzerie Completă - Ghid Complet 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cum-alegi-cuptor-profesional-perfect" className="text-orange-600 hover:underline">
                    Cum Alegi Cuptorul Profesional Perfect
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ghid-deschidere-restaurant-2026" className="text-orange-600 hover:underline">
                    Ghid Complet Deschidere Restaurant 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cost-echipare-restaurant-complet-2026" className="text-orange-600 hover:underline">
                    Cât Costă Echiparea Completă a unui Restaurant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-600 mb-4">🔗 Echipamente Conexe</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/cuptoare-profesionale" className="text-orange-600 hover:underline">
                    Cuptoare Profesionale - Toate Tipurile
                  </Link>
                </li>
                <li>
                  <Link href="/frigidere-industriale" className="text-orange-600 hover:underline">
                    Frigidere și Mese Refrigerate
                  </Link>
                </li>
                <li>
                  <Link href="/mobilier-inox-bucatarie" className="text-orange-600 hover:underline">
                    Mobilier Inox pentru Bucătărie
                  </Link>
                </li>
                <li>
                  <Link href="/echipamente-fast-food" className="text-orange-600 hover:underline">
                    Echipamente Fast Food
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
            Deschizi sau renovezi o pizzerie?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Primești consultanță gratuită și ofertă personalizată pentru toate echipamentele de care ai nevoie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Ofertă Completă Pizzerie
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Sună: 0724 256 250
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
