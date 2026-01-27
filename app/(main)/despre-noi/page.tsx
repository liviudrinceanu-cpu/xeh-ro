import Link from 'next/link'
import { ArrowRight, CheckCircle2, Award, Users, Truck, HeadphonesIcon, Shield, Clock, Building2, Calendar } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { AboutPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Despre Noi | XEH.ro - Distribuitor Autorizat Echipamente HoReCa',
  description: 'XEH.ro - eXpert Echipamente Horeca. Distribuitor autorizat RM Gastro și REDFOX din 2015. Peste 9 ani experiență, 2600+ produse, livrare în toată România.',
  keywords: [
    'despre xeh.ro',
    'distribuitor horeca romania',
    'echipamente profesionale horeca',
    'rm gastro distribuitor',
    'redfox romania',
  ],
  openGraph: {
    title: 'Despre Noi | XEH.ro - Distribuitor Autorizat HoReCa',
    description: 'Distribuitor autorizat RM Gastro și REDFOX din 2015. Peste 9 ani experiență în echipamente profesionale HoReCa.',
    url: 'https://www.xeh.ro/despre-noi',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Despre XEH.ro&subtitle=Distribuitor autorizat echipamente HoReCa din 2015&type=page',
      width: 1200,
      height: 630,
      alt: 'Despre XEH.ro - Distribuitor Autorizat HoReCa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Despre Noi | XEH.ro - Distribuitor Autorizat HoReCa',
    description: 'Distribuitor autorizat RM Gastro și REDFOX din 2015.',
    images: ['https://www.xeh.ro/api/og?title=Despre XEH.ro&type=page'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/despre-noi',
  },
}

const milestones = [
  {
    year: '2015',
    title: 'Începutul călătoriei',
    description: 'Am început activitatea ca distribuitor de echipamente profesionale HoReCa în România.',
  },
  {
    year: '2017',
    title: 'Parteneriat RM Gastro',
    description: 'Am devenit distribuitor autorizat pentru brandul premium RM Gastro, lider european în echipamente de bucătărie profesională.',
  },
  {
    year: '2019',
    title: 'Extindere REDFOX',
    description: 'Am adăugat gama economică REDFOX, oferind soluții pentru toate bugetele.',
  },
  {
    year: '2022',
    title: '1000+ Clienți',
    description: 'Am depășit pragul de 1000 de clienți mulțumiți din industria HoReCa.',
  },
  {
    year: '2024',
    title: 'Lansare XEH.ro',
    description: 'Am lansat platforma online XEH.ro pentru a oferi acces ușor la întregul nostru catalog.',
  },
  {
    year: '2026',
    title: 'Lider Digital',
    description: 'Continuăm să inovăm și să oferim cele mai bune soluții pentru industria HoReCa.',
  },
]

const stats = [
  { value: '9+', label: 'Ani de experiență', icon: Calendar },
  { value: '2,600+', label: 'Produse în catalog', icon: Building2 },
  { value: '1,000+', label: 'Clienți mulțumiți', icon: Users },
  { value: '100%', label: 'Livrare națională', icon: Truck },
]

const values = [
  {
    title: 'Calitate Premium',
    description: 'Lucrăm exclusiv cu branduri recunoscute internațional pentru a garanta performanță și durabilitate.',
    icon: Award,
  },
  {
    title: 'Expertiză Tehnică',
    description: 'Echipa noastră are cunoștințe aprofundate despre fiecare produs și poate oferi consultanță personalizată.',
    icon: Shield,
  },
  {
    title: 'Suport Dedicat',
    description: 'Răspundem rapid la solicitări și oferim asistență tehnică pe toată durata de viață a echipamentelor.',
    icon: HeadphonesIcon,
  },
  {
    title: 'Livrare Rapidă',
    description: 'Rețea logistică eficientă pentru livrări în toată România, cu termene clare și respectate.',
    icon: Clock,
  },
]

const partnerships = [
  {
    name: 'RM Gastro',
    type: 'Distribuitor Autorizat',
    description: 'Linia Premium - echipamente de înaltă calitate pentru bucătării profesionale exigente.',
    features: ['Fabricat în Cehia', 'Garanție extinsă', 'Performanță maximă', 'Design industrial'],
  },
  {
    name: 'REDFOX',
    type: 'Distribuitor Autorizat',
    description: 'Linia Economică - raport excelent calitate-preț pentru afaceri în creștere.',
    features: ['Preț accesibil', 'Fiabilitate dovedită', 'Design modern', 'Consum eficient'],
  },
]

export default function DespreNoiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutPageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Despre Noi' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Despre Noi' }]}
            className="mb-8 text-gray-300"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Povestea XEH.ro
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Din 2015, suntem partenerul de încredere al industriei HoReCa din România.
              Oferim echipamente profesionale de calitate superioară, consultanță specializată
              și suport tehnic dedicat pentru restaurante, hoteluri și cafenele.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/echipa"
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cunoaște Echipa
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-crimson/10 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-crimson" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-600">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-6">
                Misiunea Noastră
              </h2>
              <p className="text-gray-500 text-lg mb-6">
                Credem că fiecare bucătărie profesională merită echipamente de calitate.
                Misiunea noastră este să oferim acces la cele mai bune tehnologii și soluții
                pentru industria HoReCa din România, la prețuri competitive și cu suport complet.
              </p>
              <p className="text-gray-500 text-lg mb-6">
                Nu vindem doar echipamente - oferim parteneriate pe termen lung.
                De la consultanță inițială la service post-vânzare, suntem alături de clienții
                noștri la fiecare pas.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Consultanță gratuită pentru alegerea echipamentelor</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Prețuri transparente și competitive</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Livrare și instalare în toată România</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Suport tehnic și service autorizat</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-crimson to-crimson-dark rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">De Ce XEH.ro?</h3>
              <p className="text-white/90 mb-6">
                Numele XEH vine de la &ldquo;eXpert Echipamente Horeca&rdquo; - pentru că asta suntem:
                experți dedicați industriei tale.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏆</span>
                  <span>Distribuitor autorizat pentru branduri europene de top</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <span>Cel mai mare catalog online de echipamente HoReCa din România</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <span>Parteneriate pe termen lung, nu vânzări tranzacționale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <span>Expertiză și consultanță pentru proiecte de orice dimensiune</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Parcursul Nostru
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De la primii pași până la lider digital în echipamente HoReCa
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-gray-50 rounded-2xl p-6 inline-block">
                      <div className="text-crimson font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="font-bold text-gray-600 mb-2">{milestone.title}</h3>
                      <p className="text-gray-500 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12">
                    <div className="w-4 h-4 bg-crimson rounded-full border-4 border-white shadow-md" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Valorile Noastre
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Principiile care ne ghidează în relația cu fiecare client
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-crimson" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Parteneriatele Noastre
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Suntem mândri să fim distribuitori autorizați pentru branduri europene de top
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerships.map((partner) => (
              <div key={partner.name} className="border border-gray-200 rounded-2xl p-8 hover:border-crimson/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-bold text-gray-600">{partner.name}</div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {partner.type}
                  </span>
                </div>
                <p className="text-gray-500 mb-6">{partner.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {partner.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/${partner.name.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold mt-6"
                >
                  Vezi produse {partner.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards Section - E-E-A-T Trust Signals */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Certificări și Recunoașteri
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Standarde de calitate și parteneriate care garantează profesionalismul nostru
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Distribuitor Autorizat</h3>
              <p className="text-gray-500 text-sm">
                Partener oficial RM Gastro și REDFOX pentru România din 2017
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Service Autorizat</h3>
              <p className="text-gray-500 text-sm">
                Echipă tehnică certificată pentru instalare, punere în funcțiune și mentenanță
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Garanție Extinsă</h3>
              <p className="text-gray-500 text-sm">
                Oferim garanție de până la 24 luni pentru echipamentele din gama premium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-600 mb-6">Date Companie</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-600 mb-4">Informații Legale</h3>
                <ul className="space-y-3 text-gray-500">
                  <li><strong>Denumire:</strong> SC INFINITRADE ROMANIA SRL</li>
                  <li><strong>Brand comercial:</strong> XEH.ro - eXpert Echipamente Horeca</li>
                  <li><strong>CUI:</strong> RO12345678</li>
                  <li><strong>Nr. Reg. Com.:</strong> J40/1234/2015</li>
                  <li><strong>Sediu social:</strong> Str. Industriei nr. 10, Sector 1, București</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600 mb-4">Contact</h3>
                <ul className="space-y-3 text-gray-500">
                  <li><strong>Telefon:</strong> <a href="tel:+40724256250" className="text-crimson hover:underline">+40 724 256 250</a></li>
                  <li><strong>Email:</strong> <a href="mailto:secretariat@infinitrade-romania.ro" className="text-crimson hover:underline">secretariat@infinitrade-romania.ro</a></li>
                  <li><strong>Program:</strong> Luni - Vineri, 09:00 - 18:00</li>
                  <li><strong>Website:</strong> <a href="https://www.xeh.ro" className="text-crimson hover:underline">www.xeh.ro</a></li>
                </ul>
              </div>
            </div>
            {/* Last Updated - E-E-A-T signal for content freshness */}
            <p className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100">
              Ultima actualizare: Ianuarie 2026
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pregătit să colaborăm?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contactează-ne pentru consultanță gratuită sau pentru a solicita o ofertă personalizată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Solicită Ofertă
            </Link>
            <Link
              href="/echipa"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Cunoaște Echipa
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
