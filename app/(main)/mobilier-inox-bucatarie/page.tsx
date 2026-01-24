import Link from 'next/link'
import { ArrowRight, CheckCircle2, Shield, Sparkles, Ruler, Truck } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mobilier Inox Bucătărie Profesională | Mese, Chiuvete, Rafturi | XEH.ro',
  description: 'Mobilier inox pentru bucătării profesionale: mese de lucru, chiuvete industriale, rafturi, dulapuri și cărucioare. Tablă inox 0.8-1.5mm, conformitate HACCP. Livrare România.',
  keywords: [
    'mobilier inox',
    'masa lucru inox',
    'chiuveta profesionala',
    'raft inox',
    'dulap inox bucatarie',
    'carucior inox bucatarie',
    'hota profesionala',
    'mobilier bucatarie profesionala',
    'echipamente inox horeca',
  ],
  openGraph: {
    title: 'Mobilier Inox Bucătărie Profesională | XEH.ro',
    description: 'Mese de lucru, chiuvete, rafturi și dulapuri din inox pentru bucătării comerciale. Calitate profesională, conformitate HACCP.',
    url: 'https://www.xeh.ro/mobilier-inox-bucatarie',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Mobilier Inox Bucătărie&subtitle=Mese, chiuvete, rafturi și dulapuri profesionale&type=category',
      width: 1200,
      height: 630,
      alt: 'Mobilier Inox pentru Bucătării Profesionale - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobilier Inox Bucătărie Profesională | XEH.ro',
    description: 'Mese de lucru, chiuvete, rafturi și dulapuri din inox pentru bucătării comerciale.',
    images: ['https://www.xeh.ro/api/og?title=Mobilier Inox Bucătărie&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/mobilier-inox-bucatarie',
  },
}

const faqs = [
  {
    question: 'Ce grosime de tablă inox recomandați pentru mese de lucru?',
    answer: 'Depinde de utilizare. Pentru rafturi și suprafețe de depozitare, 0.8mm este suficient. Pentru mese de lucru unde se taie carne sau se prelucrează alimente, minim 1.2mm - altfel blatul se deformează în timp. Pentru mesele cu chiuvetă integrată sau zonele cu impact mare, 1.5mm oferă durabilitate maximă. Verificați și întăriturile de sub blat - mesele de calitate au profile de rigidizare.',
  },
  {
    question: 'Pot comanda mobilier inox la dimensiuni personalizate?',
    answer: 'Da, majoritatea producătorilor oferă dimensiuni la comandă. Lungimea și lățimea se pot adapta la spațiul dvs. Înălțimea standard este 850-900mm, dar se poate modifica pentru bucătari mai înalți sau pentru poziții de lucru specifice. Termenul de livrare pentru dimensiuni speciale este de obicei 3-4 săptămâni. Contactați-ne cu planul bucătăriei pentru o ofertă personalizată.',
  },
  {
    question: 'Cum se montează mobilierul inox? Aveți echipă de instalare?',
    answer: 'Mobilierul inox vine asamblat sau pre-asamblat. Mesele și rafturile necesită doar nivelare pe picioarele reglabile. Chiuvetele trebuie racordate la instalația sanitară - recomandăm un instalator autorizat. Dulapurile suspendate necesită prindere în perete cu dibluri metalice. La cerere, putem recomanda echipe de montaj în majoritatea orașelor mari.',
  },
  {
    question: 'Cum se întreține mobilierul inox pentru a nu rugini?',
    answer: 'Inoxul AISI 304 (18/10) nu ruginește în condiții normale. Curățați zilnic cu detergent neutru și apă caldă, apoi uscați. Evitați bureții abrazivi - zgârie suprafața și creează locuri unde se poate acumula mizerie. Nu lăsați sare sau oțet pe suprafață timp îndelungat. Pentru pete persistente, folosiți produse speciale pentru inox. Verificați ca produsele de curățare să nu conțină clor.',
  },
  {
    question: 'Ce certificări trebuie să aibă mobilierul pentru inspecția HACCP?',
    answer: 'Mobilierul trebuie să fie din inox alimentar AISI 304 sau AISI 316. Suprafețele trebuie să fie netede, fără fisuri sau rosturi unde se pot acumula bacterii. Colțurile interioare trebuie să fie rotunjite pentru curățare ușoară. Picioarele reglabile permit curățarea sub mobilier. La livrare, primiți fișa tehnică cu specificațiile materialului - păstrați-o pentru inspecții.',
  },
  {
    question: 'Care este diferența între inox AISI 304 și AISI 316?',
    answer: 'AISI 304 (cunoscut și ca 18/10) este standardul pentru bucătării - rezistent la coroziune, ușor de curățat, preț accesibil. AISI 316 conține și molibden, oferind rezistență superioară la cloruri - recomandat pentru bucătării de pe litoral sau unde se folosesc frecvent produse cu conținut mare de sare. Pentru majoritatea bucătăriilor, AISI 304 este alegerea optimă.',
  },
  {
    question: 'Cât costă să echipez o bucătărie de restaurant cu mobilier inox?',
    answer: 'Un set de bază pentru o bucătărie de 20-30mp include: 2-3 mese de lucru (1500-2500 EUR), chiuvetă dublă cu picurător (800-1500 EUR), raft perete 3-4 niveluri (400-800 EUR), cărucior GN (300-600 EUR). Total orientativ: 4000-7000 EUR pentru mobilierul de bază. Variază în funcție de dimensiuni și configurație. Cerem o ofertă personalizată pentru bucătăria dvs.',
  },
]

const furnitureTypes = [
  {
    title: 'Mese de Lucru Inox',
    description: 'Blaturi rezistente pentru preparare și porționare',
    icon: Ruler,
    features: ['Blat 1.2-1.5mm grosime', 'Picioare reglabile', 'Cu sau fără poliță inferioară', 'Margini răsfrânte anti-scurgere'],
  },
  {
    title: 'Chiuvete Profesionale',
    description: 'Chiuvete cu una sau mai multe cuve pentru spălare',
    icon: Sparkles,
    features: ['Cuve adânci 300-400mm', 'Picurător integrat', 'Preaplin de siguranță', 'Sifon inox inclus'],
  },
  {
    title: 'Rafturi și Etajere',
    description: 'Stocare verticală pentru optimizarea spațiului',
    icon: Shield,
    features: ['Polițe perforate sau pline', 'Capacitate 100-200kg/poliță', 'Înălțime reglabilă', 'Montaj perete sau podea'],
  },
  {
    title: 'Dulapuri și Cărucioare',
    description: 'Depozitare mobilă și fixă pentru bucătărie',
    icon: Truck,
    features: ['Uși glisante sau batante', 'Roți pivotante cu frână', 'Compatibile tăvi GN', 'Închidere cu cheie opțional'],
  },
]

async function getStainlessSteelProducts() {
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
    .or('title_en.ilike.%table%,title_en.ilike.%sink%,title_en.ilike.%shelf%,title_en.ilike.%cabinet%,title_en.ilike.%trolley%,title_en.ilike.%hood%,title_en.ilike.%stainless%,title_ro.ilike.%masă%,title_ro.ilike.%chiuvetă%,title_ro.ilike.%raft%,title_ro.ilike.%dulap%,title_ro.ilike.%cărucior%,title_ro.ilike.%hotă%,title_ro.ilike.%inox%')
    .limit(8)
    .order('price_amount', { ascending: true, nullsFirst: false })

  return products || []
}

export default async function MobilierInoxBucatariePage() {
  const products = await getStainlessSteelProducts()

  const breadcrumbItems = [
    { name: 'Acasă', url: 'https://www.xeh.ro' },
    { name: 'Mobilier Inox Bucătărie', url: 'https://www.xeh.ro/mobilier-inox-bucatarie' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Mobilier Inox Bucătărie' }]}
            className="mb-8 text-slate-300"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mobilier Inox pentru Bucătării Profesionale
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Mese de lucru, chiuvete, rafturi și dulapuri din oțel inoxidabil AISI 304.
              Construcție robustă cu tablă de 0.8-1.5mm, conformitate HACCP, durabilitate de zeci de ani.
              Grosimea tablei contează - 0.8mm pentru rafturi, 1.2mm pentru mesele unde tai carne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog?search=inox"
                className="inline-flex items-center gap-2 bg-white text-slate-800 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Vezi Mobilier Inox
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cere Ofertă la Dimensiuni Speciale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Stainless Steel Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
              De ce mobilier inox în bucătăria profesională?
            </h2>
            <p className="text-gray-600">
              Oțelul inoxidabil este singurul material acceptat în bucătăriile profesionale din motive întemeiate:
              nu absoarbe bacterii, nu ruginește, rezistă la acizi și detergenți, se curăță în secunde.
              O masă de lucru din inox de calitate durează 20-30 de ani fără probleme - investiția se amortizează rapid.
            </p>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Tipuri de Mobilier Inox
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De la mese de lucru la sisteme complete de depozitare - tot ce ai nevoie pentru organizarea bucătăriei
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {furnitureTypes.map((type) => (
              <div key={type.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">{type.title}</h3>
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

      {/* Thickness Guide */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8 text-center">
              Ghid Grosime Tablă Inox - Ce să alegi pentru fiecare utilizare
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-slate-500 mb-2">0.8mm</div>
                <div className="font-semibold text-gray-700 mb-1">Rafturi, Polițe</div>
                <div className="text-sm text-gray-500">Depozitare ușoară, fără impact mecanic</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-slate-600 mb-2">1.0mm</div>
                <div className="font-semibold text-gray-700 mb-1">Dulapuri, Cărucioare</div>
                <div className="text-sm text-gray-500">Pereți laterali, uși, suprafețe secundare</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-slate-700 mb-2">1.2mm</div>
                <div className="font-semibold text-gray-700 mb-1">Mese de Lucru</div>
                <div className="text-sm text-gray-500">Standard pentru blaturi cu utilizare medie</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-slate-800 mb-2">1.5mm</div>
                <div className="font-semibold text-gray-700 mb-1">Heavy-Duty</div>
                <div className="text-sm text-gray-500">Mese tranșare, chiuvete, zone cu impact</div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
                Mobilier Inox Recomandat
              </h2>
              <Link
                href="/catalog?search=inox"
                className="text-slate-600 hover:text-slate-700 font-semibold text-sm flex items-center gap-1"
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

      {/* HACCP Compliance */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Conformitate HACCP și Siguranță Alimentară
              </h2>
              <p className="text-green-100 mb-8">
                Tot mobilierul inox pe care îl comercializăm respectă normele HACCP pentru bucătării profesionale.
                Inox AISI 304 certificat pentru contact alimentar, suduri netede, colțuri rotunjite pentru curățare ușoară.
                La livrare primiți documentația tehnică necesară pentru inspecții.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">AISI 304</div>
                  <div className="text-green-200">Oțel inoxidabil alimentar</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">CE</div>
                  <div className="text-green-200">Marcaj conformitate UE</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">HACCP</div>
                  <div className="text-green-200">Ready for inspection</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Întrebări Frecvente despre Mobilier Inox
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-700 hover:text-slate-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-slate-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 md:py-20 bg-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Planifici echiparea unei bucătării profesionale?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Trimite-ne planul bucătăriei și te ajutăm cu configurația optimă de mobilier.
            Oferim consultanță gratuită și oferte personalizate pentru proiecte complete.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Cere Ofertă pentru Proiect
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
