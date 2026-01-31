import Link from 'next/link'
import { ArrowRight, CheckCircle2, Award, Shield, Truck, Users, Building, Star, Phone } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd, OrganizationJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distribuitor Autorizat RM Gastro România | XEH.ro',
  description: 'XEH.ro este distribuitor oficial RM Gastro și REDFOX în România. Echipamente HoReCa profesionale cu garanție extinsă, service autorizat și livrare în toată țara.',
  keywords: [
    'distribuitor RM Gastro Romania',
    'distribuitor autorizat RM Gastro',
    'RM Gastro Romania',
    'echipamente RM Gastro',
    'REDFOX Romania',
    'distribuitor echipamente horeca',
    'dealer RM Gastro',
  ],
  openGraph: {
    title: 'Distribuitor Oficial RM Gastro și REDFOX | XEH.ro',
    description: 'Singurul distribuitor autorizat RM Gastro și REDFOX în România. Echipamente profesionale HoReCa cu garanție și service.',
    url: 'https://www.xeh.ro/distribuitor-rm-gastro-romania',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Distribuitor Autorizat RM Gastro România&subtitle=Echipamente HoReCa profesionale cu garanție și service&type=category',
      width: 1200,
      height: 630,
      alt: 'Distribuitor RM Gastro România - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Distribuitor Oficial RM Gastro România | XEH.ro',
    description: 'Singurul distribuitor autorizat RM Gastro și REDFOX în România.',
    images: ['https://www.xeh.ro/api/og?title=Distribuitor Autorizat RM Gastro România&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/distribuitor-rm-gastro-romania',
  },
}

const faqs = [
  {
    question: 'XEH.ro este distribuitorul oficial RM Gastro în România?',
    answer: 'Da, XEH.ro este distribuitor autorizat pentru echipamentele RM Gastro și REDFOX în România. Oferim produse originale cu garanție de la producător, service autorizat și piese de schimb originale pentru toate echipamentele comercializate.',
  },
  {
    question: 'Ce diferență este între RM Gastro și REDFOX?',
    answer: 'RM Gastro este linia premium cu performanță maximă, design robust și garanție extinsă - ideală pentru restaurante fine dining și hoteluri de lux. REDFOX este linia economică a aceluiași producător, oferind raport excelent calitate-preț - perfectă pentru fast-food, bistrouri și startup-uri HoReCa.',
  },
  {
    question: 'Oferiti service și garanție pentru echipamentele RM Gastro?',
    answer: 'Da, toate echipamentele RM Gastro și REDFOX beneficiază de garanție standard de la producător. Oferim service autorizat cu tehnicienii noștri certificați, piese de schimb originale și suport tehnic pentru întreaga durată de viață a echipamentelor.',
  },
  {
    question: 'Livrați echipamente RM Gastro în toată România?',
    answer: 'Da, livrăm în toate județele din România. Pentru comenzi mari oferim transport gratuit și servicii de instalare profesională. Timpul de livrare variază între 2-7 zile lucrătoare în funcție de disponibilitatea produselor.',
  },
  {
    question: 'Pot obține preturi speciale pentru comenzi mari?',
    answer: 'Da, oferim discounturi semnificative pentru comenzi de volum, pachete complete de echipare restaurant și parteneriate B2B pe termen lung. Contactați-ne pentru o ofertă personalizată bazată pe nevoile dvs.',
  },
  {
    question: 'Ce categorii de echipamente RM Gastro aveți disponibile?',
    answer: 'Oferim gama completă RM Gastro: cuptoare profesionale (convecție, combi steamer, pizza), echipamente de refrigerare (frigidere, congelatoare, blast chillere), mașini de spălat vase, echipamente de gătit (plite, friteuze, grătare), mobilier inox și accesorii profesionale.',
  },
]

const advantages = [
  {
    title: 'Distribuitor Autorizat',
    description: 'Partener oficial RM Gastro și REDFOX pentru România',
    icon: Award,
    features: ['Produse 100% originale', 'Certificate de autenticitate', 'Acces la noutăți înainte de lansare', 'Prețuri oficiale de distribuitor'],
  },
  {
    title: 'Garanție Extinsă',
    description: 'Garanție de la producător pentru toate echipamentele',
    icon: Shield,
    features: ['Garanție standard 12-24 luni', 'Opțiuni garanție extinsă', 'Piese de schimb originale', 'Suport tehnic permanent'],
  },
  {
    title: 'Service Autorizat',
    description: 'Echipă de tehnicieni certificați RM Gastro',
    icon: Users,
    features: ['Tehnicieni certificați', 'Intervenții rapide în toată țara', 'Mentenanță preventivă', 'Diagnoză profesională'],
  },
  {
    title: 'Livrare Națională',
    description: 'Transport profesional în toată România',
    icon: Truck,
    features: ['Livrare în 2-7 zile', 'Transport gratuit comenzi mari', 'Instalare la cerere', 'Ambalaj protectiv profesional'],
  },
]

const brandComparison = [
  {
    brand: 'RM Gastro',
    segment: 'Premium',
    icon: Star,
    color: 'crimson',
    description: 'Linia profesională pentru restaurante fine dining și hoteluri',
    features: ['Construcție premium din inox AISI 304', 'Componente industriale de top', 'Design ergonomic avansat', 'Garanție extinsă disponibilă', 'Eficiență energetică maximă'],
    ideal: 'Fine dining, hoteluri, restaurante mari',
    link: '/rm',
  },
  {
    brand: 'REDFOX',
    segment: 'Economic',
    icon: Building,
    color: 'blue-600',
    description: 'Raport excelent calitate-preț pentru afaceri în creștere',
    features: ['Construcție solidă, design modern', 'Fiabilitate dovedită', 'Costuri de operare reduse', 'Ușor de întreținut', 'Perfect pentru buget optimizat'],
    ideal: 'Fast-food, bistrouri, startup-uri',
    link: '/redfox',
  },
]

async function getRMGastroProducts() {
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
    .eq('brand_id', 1) // RM Gastro
    .gte('price_amount', 1000)
    .lte('price_amount', 20000)
    .limit(8)
    .order('price_amount', { ascending: false, nullsFirst: false })

  return products || []
}

export default async function DistribuitorRMGastroPage() {
  const products = await getRMGastroProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Distribuitor RM Gastro România' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-crimson text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Distribuitor RM Gastro România' }]}
            className="mb-8 text-gray-300"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Distribuitor Oficial Autorizat</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Distribuitor RM Gastro și REDFOX în România
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              XEH.ro este partenerul oficial pentru echipamentele profesionale RM Gastro și REDFOX.
              Oferim gama completă de peste 2,600 de produse cu garanție, service autorizat și livrare în toată România.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rm"
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Explorează RM Gastro
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/redfox"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Explorează REDFOX
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Ofertă B2B
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-crimson">2,600+</div>
              <div className="text-gray-500 text-sm">Produse în Catalog</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crimson">30+</div>
              <div className="text-gray-500 text-sm">Ani Experiență RM Gastro</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crimson">100%</div>
              <div className="text-gray-500 text-sm">Produse Originale</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-crimson">România</div>
              <div className="text-gray-500 text-sm">Livrare Națională</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Comparison */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Două Branduri, Aceeași Calitate Cehă
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              RM Gastro și REDFOX sunt produse de același producător ceh cu peste 30 de ani de experiență în echipamente profesionale HoReCa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {brandComparison.map((brand) => (
              <div key={brand.brand} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${brand.color === 'crimson' ? 'bg-crimson/10' : 'bg-blue-100'}`}>
                    <brand.icon className={`w-7 h-7 ${brand.color === 'crimson' ? 'text-crimson' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-600">{brand.brand}</h3>
                    <span className={`text-sm font-medium ${brand.color === 'crimson' ? 'text-crimson' : 'text-blue-600'}`}>
                      Segment {brand.segment}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 mb-6">{brand.description}</p>

                <ul className="space-y-3 mb-6">
                  {brand.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${brand.color === 'crimson' ? 'text-crimson' : 'text-blue-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <span className="text-sm font-medium text-gray-500">Ideal pentru:</span>
                  <p className="text-gray-600 font-medium">{brand.ideal}</p>
                </div>

                <Link
                  href={brand.link}
                  className={`inline-flex items-center gap-2 w-full justify-center py-3 rounded-xl font-semibold transition-colors ${
                    brand.color === 'crimson'
                      ? 'bg-crimson hover:bg-crimson-dark text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Vezi Produsele {brand.brand}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              De Ce Să Alegi XEH.ro ca Distribuitor?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Avantajele de a cumpăra direct de la distribuitorul oficial RM Gastro în România
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-crimson" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">{advantage.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{advantage.description}</p>
                <ul className="space-y-2">
                  {advantage.features.map((feature) => (
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

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                  Echipamente RM Gastro Populare
                </h2>
                <p className="text-gray-500 mt-2">Cele mai căutate echipamente profesionale</p>
              </div>
              <Link
                href="/rm"
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

      {/* Categories CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-8 text-center">
            Categorii Principale de Echipamente
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Cuptoare Profesionale', href: '/cuptoare-profesionale', emoji: '🔥' },
              { name: 'Refrigerare', href: '/frigidere-industriale', emoji: '❄️' },
              { name: 'Mașini Spălat Vase', href: '/masini-spalat-vase-profesionale', emoji: '💧' },
              { name: 'Gătit', href: '/rm/gatit', emoji: '🍳' },
              { name: 'Preparare', href: '/rm/preparare', emoji: '🔪' },
              { name: 'Mobilier Inox', href: '/rm/mobilier-neutru', emoji: '🪑' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition-colors group"
              >
                <span className="text-3xl mb-2 block">{category.emoji}</span>
                <span className="text-sm font-medium text-gray-600 group-hover:text-crimson transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
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
            <p className="text-gray-500">
              Tot ce trebuie să știi despre distribuția RM Gastro în România
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Partener Oficial RM Gastro în România
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Cumpără direct de la distribuitorul autorizat și beneficiază de garanție completă,
            service autorizat și cele mai bune prețuri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-8 py-4 rounded-xl font-semibold transition-all text-lg"
            >
              Solicită Ofertă Personalizată
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              0724 256 250
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
