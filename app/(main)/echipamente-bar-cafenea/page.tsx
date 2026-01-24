import Link from 'next/link'
import { ArrowRight, CheckCircle2, Coffee, Wine, Snowflake, Zap } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipamente Bar și Cafenea | Espressor Profesional, Blender, Vitrine',
  description: 'Echipamente complete pentru bar și cafenea: espressoare profesionale, blendere, mașini gheață, vitrine frigorifice, shaker station. Branduri RM Gastro și REDFOX.',
  keywords: [
    'echipamente bar',
    'echipamente cafenea',
    'espressor profesional',
    'blender bar',
    'masina gheata',
    'vitrina bar',
    'espressor automatic',
    'echipamente cocktail bar',
  ],
  openGraph: {
    title: 'Echipamente Bar și Cafenea Profesionale | XEH.ro',
    description: 'Echipamente complete pentru bar și cafenea: espressoare, blendere, mașini gheață, vitrine. Livrare națională.',
    url: 'https://www.xeh.ro/echipamente-bar-cafenea',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipamente Bar și Cafenea&subtitle=Espressor profesional, blender, mașini gheață&type=category',
      width: 1200,
      height: 630,
      alt: 'Echipamente Bar și Cafenea Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipamente Bar și Cafenea Profesionale | XEH.ro',
    description: 'Echipamente complete pentru bar și cafenea: espressoare, blendere, mașini gheață, vitrine.',
    images: ['https://www.xeh.ro/api/og?title=Echipamente Bar și Cafenea&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipamente-bar-cafenea',
  },
}

const faqs = [
  {
    question: 'Ce espressor profesional este potrivit pentru o cafenea mică?',
    answer: 'Pentru o cafenea mică (sub 100 cafele/zi), recomandăm un espressor semi-automatic cu 1-2 grupuri. Oferă control bun, preț accesibil (2.000-5.000 EUR) și este ușor de întreținut. Pentru volume mai mari, optează pentru espressoare automatice.',
  },
  {
    question: 'Cât costă să echipezi un bar de la zero?',
    answer: 'Un bar mic necesită investiții de 10.000-25.000 EUR în echipamente: mașină gheață (1.500-4.000 EUR), blender profesional (500-1.500 EUR), vitrine (2.000-5.000 EUR), back bar refrigerat (3.000-6.000 EUR), plus pahare și accesorii.',
  },
  {
    question: 'Ce blender este recomandat pentru cocktail bar?',
    answer: 'Pentru cocktail bar, recomandăm blendere profesionale cu minim 1.5 CP și cană inox. Modelele cu protecție sonoră sunt ideale pentru baruri cu muzică. Capacitatea cănii ar trebui să fie 1-2 litri pentru preparări multiple.',
  },
  {
    question: 'Câtă gheață produce o mașină profesională?',
    answer: 'Mașinile de gheață profesionale produc între 20-150 kg gheață/24h. Pentru un bar mediu (100-200 clienți/zi), recomandăm minim 50 kg/24h. Alege tipul de gheață (cuburi, ciobită, fulgi) în funcție de cocktailuri.',
  },
  {
    question: 'Am nevoie de răcitor pahare (glass froster)?',
    answer: 'Răcitorul de pahare este optional dar recomandat pentru baruri premium. Păstrează paharele la temperatură negativă pentru servire perfectă a berii și cocktailurilor. Îmbunătățește experiența clientului și prezentarea.',
  },
  {
    question: 'Ce vitrine frigorifice recomandați pentru o cafenea?',
    answer: 'Pentru cafenele, recomandăm vitrine refrigerate expunere (2-8°C) pentru prăjituri și sandvișuri. Dimensiunea depinde de ofertă: 90-120 cm pentru cafenele mici, 150-200 cm pentru ofertă variată. Iluminarea LED valorifică produsele.',
  },
]

const equipmentTypes = [
  {
    title: 'Espressoare & Cafea',
    description: 'Espressoare profesionale, râșnițe și accesorii cafenea',
    icon: Coffee,
    features: ['Espressoare 1-4 grupuri', 'Râșnițe profesionale', 'Automatice/Semi-auto', 'Accesorii barista'],
  },
  {
    title: 'Echipamente Bar',
    description: 'Blendere, shakere și tot ce ai nevoie pentru cocktailuri',
    icon: Wine,
    features: ['Blendere profesionale', 'Shaker station', 'Citrice juicer', 'Bar tools'],
  },
  {
    title: 'Mașini Gheață',
    description: 'Producție gheață cuburi, ciobită sau fulgi',
    icon: Snowflake,
    features: ['20-150 kg/24h', 'Cuburi/Ciobită/Fulgi', 'Stocare integrată', 'Self-cleaning'],
  },
  {
    title: 'Refrigerare Bar',
    description: 'Vitrine, back bar și răcitoare băuturi',
    icon: Zap,
    features: ['Vitrine expunere', 'Back bar frigorific', 'Răcitor sticle', 'Glass froster'],
  },
]

async function getBarProducts() {
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
    .or('title_en.ilike.%coffee%,title_en.ilike.%espresso%,title_en.ilike.%blender%,title_en.ilike.%ice%,title_ro.ilike.%cafea%,title_ro.ilike.%gheata%,title_ro.ilike.%blender%')
    .limit(8)
    .order('price_amount', { ascending: false, nullsFirst: false })

  return products || []
}

export default async function EchipamenteBarCafeneaPage() {
  const products = await getBarProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipamente Bar & Cafenea' }]}
            className="mb-8 text-amber-200"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipamente Profesionale pentru Bar și Cafenea
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Echipăm cafenele și baruri de succes: espressoare profesionale, blendere puternice,
              mașini de gheață, vitrine frigorifice și tot ce ai nevoie pentru băuturi perfecte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=coffee"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-amber-700 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Echipamente Cafenea
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
              Categorii Echipamente Bar & Cafenea
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Tot ce ai nevoie pentru a servi cafele excelente și cocktailuri memorabile
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

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Echipamente Recomandate pentru Bar & Cafenea
              </h2>
              <Link
                href="/catalog?search=bar"
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
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Sfaturi pentru Alegerea Echipamentelor
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">☕</div>
              <h3 className="font-bold text-gray-600 mb-2">Cafenea: Calculează Volumul</h3>
              <p className="text-gray-500 text-sm">
                Un grup de espressor servește ~60 cafele/oră.
                Pentru 200 cafele/zi, ai nevoie de minim 2 grupuri.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🧊</div>
              <h3 className="font-bold text-gray-600 mb-2">Bar: Gheață Suficientă</h3>
              <p className="text-gray-500 text-sm">
                Calculează ~1kg gheață per 10 cocktailuri.
                Pentru 100 cocktailuri/zi, ai nevoie de minim 40kg/24h producție.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🔌</div>
              <h3 className="font-bold text-gray-600 mb-2">Verifică Utilitățile</h3>
              <p className="text-gray-500 text-sm">
                Mașinile de gheață necesită racord apă și scurgere.
                Espressoarele mari necesită alimentare trifazată.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bar Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Echipăm Toate Tipurile de Localuri
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="font-bold text-gray-600">Cafenele</h3>
              <p className="text-gray-500 text-sm mt-2">Espressoare, râșnițe, vitrine prăjituri</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🍸</div>
              <h3 className="font-bold text-gray-600">Cocktail Bar</h3>
              <p className="text-gray-500 text-sm mt-2">Blendere, mașini gheață, shaker station</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🍺</div>
              <h3 className="font-bold text-gray-600">Pub & Beer Bar</h3>
              <p className="text-gray-500 text-sm mt-2">Răcitoare sticle, vitrine, glass froster</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🧋</div>
              <h3 className="font-bold text-gray-600">Juice Bar</h3>
              <p className="text-gray-500 text-sm mt-2">Blendere puternice, storcătoare citrice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                De ce să alegi echipamente de la XEH.ro?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-white/80">Baruri și cafenele echipate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5 ani</div>
                  <div className="text-white/80">Garanție extinsă disponibilă</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24h</div>
                  <div className="text-white/80">Suport tehnic</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contactează un Expert
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Întrebări Frecvente despre Echipamente Bar & Cafenea
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-amber-700 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-amber-700 group-open:rotate-180 transition-transform">
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
            Deschizi un bar sau o cafenea?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Primești consultanță gratuită și ofertă personalizată pentru toate echipamentele de care ai nevoie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Ofertă Bar/Cafenea
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
