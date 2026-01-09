import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Despre Noi - eXpert Echipamente Horeca',
  description: 'Află mai multe despre XEH.ro - furnizor de echipamente profesionale HoReCa din România. Experiență, calitate și servicii complete pentru industria ospitalității.',
  openGraph: {
    title: 'Despre Noi | XEH.ro',
    description: 'Furnizor de echipamente profesionale HoReCa din România.',
  },
}

export default function AboutPage() {
  const breadcrumbs = [{ label: 'Despre Noi' }]

  const stats = [
    { value: '15+', label: 'Ani de Experiență' },
    { value: '1000+', label: 'Clienți Mulțumiți' },
    { value: '5000+', label: 'Produse Livrate' },
    { value: '98%', label: 'Grad de Satisfacție' },
  ]

  const values = [
    {
      title: 'Calitate',
      description: 'Oferim doar echipamente de cea mai înaltă calitate, de la branduri recunoscute internațional.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Profesionalism',
      description: 'Echipa noastră de experți oferă consultanță și suport tehnic de specialitate.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Încredere',
      description: 'Construim relații pe termen lung bazate pe transparență și onestitate.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Inovație',
      description: 'Urmărim constant tendințele și tehnologiile noi din industria HoReCa.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-800 rounded-2xl p-8 md:p-16 mb-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-accent">X</span>EH<span className="text-accent">.</span>ro
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-4">
          e<span className="text-accent font-semibold">X</span>pert{' '}
          <span className="text-accent font-semibold">E</span>chipamente{' '}
          <span className="text-accent font-semibold">H</span>oreca
        </p>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Furnizor de echipamente profesionale pentru industria ospitalității din România,
          cu peste 15 ani de experiență în domeniu.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="section-title">Povestea Noastră</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            XEH.ro s-a născut din pasiunea pentru excelență în industria HoReCa. De peste 15 ani,
            ajutăm restaurante, hoteluri, cafenele și cateringuri să își echipeze bucătăriile
            profesionale cu cele mai bune echipamente.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Numele nostru, <strong>XEH</strong>, reprezintă esența a ceea ce facem:
            suntem <strong>eXperți</strong> în <strong>Echipamente</strong> pentru industria <strong>Horeca</strong>.
            Fiecare literă din numele nostru reflectă angajamentul nostru față de calitate și profesionalism.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Lucrăm doar cu producători de renume internațional și oferim o gamă completă de servicii:
            de la consultanță și proiectare până la livrare, instalare și service post-vânzare.
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p>Showroom XEH.ro</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Valorile Noastre</h2>
          <p className="section-subtitle mx-auto">
            Principiile care ne ghidează în fiecare zi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Serviciile Noastre</h2>
          <p className="section-subtitle mx-auto">
            Oferim soluții complete pentru afacerea ta
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Consultanță & Proiectare</h3>
            <p className="text-gray-600 text-sm">
              Ajutăm la proiectarea bucătăriei profesionale și alegerea echipamentelor potrivite.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Livrare & Instalare</h3>
            <p className="text-gray-600 text-sm">
              Livrare în toată România cu montaj profesional și punere în funcțiune.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Service & Garanție</h3>
            <p className="text-gray-600 text-sm">
              Service autorizat, piese de schimb originale și garanție extinsă pentru toate produsele.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Pregătit să colaborăm?
        </h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Contactează-ne pentru o consultanță gratuită și descoperă cum te putem ajuta
          să îți echipezi afacerea cu cele mai bune echipamente HoReCa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contactează-ne
          </Link>
          <Link href="/cerere-oferta" className="btn-accent px-8 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Cere Ofertă
          </Link>
        </div>
      </div>
    </div>
  )
}
