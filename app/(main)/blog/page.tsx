import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Ghiduri și Sfaturi Echipamente HoReCa',
  description: 'Articole, ghiduri și sfaturi pentru alegerea echipamentelor profesionale HoReCa. Află cum să alegi cuptoare, frigidere și echipamente pentru restaurantul tău.',
  keywords: ['blog horeca', 'ghid echipamente profesionale', 'sfaturi restaurante', 'cum aleg cuptor profesional'],
  openGraph: {
    title: 'Blog | Ghiduri Echipamente HoReCa | XEH.ro',
    description: 'Ghiduri complete și sfaturi pentru alegerea echipamentelor profesionale HoReCa.',
    url: 'https://xeh.ro/blog',
    images: [{
      url: 'https://xeh.ro/og-blog.jpg',
      width: 1200,
      height: 630,
      alt: 'Blog XEH.ro - Ghiduri Echipamente HoReCa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ghiduri Echipamente HoReCa | XEH.ro',
    description: 'Ghiduri complete și sfaturi pentru alegerea echipamentelor profesionale HoReCa.',
    images: ['https://xeh.ro/og-blog.jpg'],
  },
  alternates: {
    canonical: 'https://xeh.ro/blog',
  },
}

const blogFaqs = [
  {
    question: 'Ce echipamente HoReCa sunt cele mai importante pentru un restaurant?',
    answer: 'Echipamentele esențiale includ: cuptor profesional, frigider/congelator, mașină de spălat vase, aragazuri/plite, și mese de lucru inox. Prioritizarea depinde de tipul de meniu și volumul de producție.',
  },
  {
    question: 'Care este diferența dintre RM Gastro și REDFOX?',
    answer: 'RM Gastro este linia premium cu performanță maximă și garanție extinsă, ideală pentru restaurante fine dining. REDFOX oferă raport excelent calitate-preț, perfect pentru fast-food și bistrouri.',
  },
  {
    question: 'Cum pot obține o ofertă pentru echipamente HoReCa?',
    answer: 'Poți solicita o ofertă personalizată direct pe site-ul nostru la secțiunea Cerere Ofertă sau ne poți contacta telefonic la +40 724 256 250. Răspundem în maxim 24 de ore.',
  },
]

// Blog articles data
const articles = [
  {
    slug: 'top-10-cuptoare-profesionale-restaurante-2026',
    title: 'Top 10 Cuptoare Profesionale pentru Restaurante în 2026',
    excerpt: 'Ghid complet pentru alegerea celui mai bun cuptor profesional. Comparăm cuptoare cu convecție, combi steamere și cuptoare pentru pizza de la branduri de top.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/convection-oven.jpg',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-15',
    readTime: '8 min',
  },
  {
    slug: 'ghid-complet-echipamente-horeca-restaurant',
    title: 'Ghid Complet: Cum Alegi Echipamentele HoReCa pentru Restaurant',
    excerpt: 'Tot ce trebuie să știi înainte de a echipa bucătăria profesională. De la planificare la alegerea furnizorilor potriviți.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/kitchen.jpg',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-12',
    readTime: '12 min',
  },
  {
    slug: 'cuptor-convectie-vs-cuptor-clasic-diferente',
    title: 'Cuptor cu Convecție vs Cuptor Clasic: Care Este Mai Bun?',
    excerpt: 'Analizăm diferențele dintre cuptoarele cu convecție și cele clasice. Avantaje, dezavantaje și recomandări pentru fiecare tip de bucătărie.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/oven-comparison.jpg',
    category: 'Comparații',
    author: 'Echipa XEH',
    date: '2026-01-10',
    readTime: '6 min',
  },
  {
    slug: 'masini-spalat-vase-industriale-ghid-alegere',
    title: 'Mașini de Spălat Vase Industriale: Ghid Complet de Alegere',
    excerpt: 'Cum alegi mașina de spălat vase potrivită pentru restaurantul tău? Capacitate, consum, tipuri și recomandări.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/dishwasher.jpg',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-08',
    readTime: '7 min',
  },
  {
    slug: 'echipamente-refrigerare-profesionala-tipuri',
    title: 'Echipamente de Refrigerare Profesională: Tipuri și Utilizări',
    excerpt: 'De la frigidere verticale la răcitoare rapide blast chiller. Ghid complet pentru sistemele de refrigerare în bucătăria profesională.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/refrigeration.jpg',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-05',
    readTime: '9 min',
  },
  {
    slug: 'rm-gastro-vs-redfox-comparatie-branduri',
    title: 'RM Gastro vs REDFOX: Comparație Completă între Branduri',
    excerpt: 'Care brand este potrivit pentru tine? Comparăm cele două game de echipamente profesionale din portofoliul nostru.',
    image: 'https://res.cloudinary.com/dnigtxeaz/image/upload/v1768501997/xeh-products/categories/brands.jpg',
    category: 'Comparații',
    author: 'Echipa XEH',
    date: '2026-01-03',
    readTime: '5 min',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      <FAQJsonLd faqs={blogFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://xeh.ro' },
          { name: 'Blog' },
        ]}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Blog' }]} />
          <h1 className="text-4xl font-bold text-gray-600 mt-4">
            Blog & Ghiduri
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Articole, ghiduri și sfaturi pentru alegerea echipamentelor profesionale HoReCa
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        <div className="mb-12">
          <Link
            href={`/blog/${articles[0].slug}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full min-h-[300px] bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden" />
                <div className="w-full h-full bg-crimson/10 flex items-center justify-center">
                  <span className="text-6xl">🔥</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-crimson text-sm font-semibold mb-2">
                  {articles[0].category} • Articol Principal
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-4 group-hover:text-crimson transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-gray-500 mb-6">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(articles[0].date).toLocaleDateString('ro-RO')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Other Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <div className="w-full h-full bg-crimson/10 flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-crimson text-xs font-semibold">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-gray-600 mt-2 mb-3 group-hover:text-crimson transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString('ro-RO')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gray-600 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ai întrebări despre echipamente?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Echipa noastră de experți te poate ghida în alegerea echipamentelor potrivite pentru afacerea ta.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Contactează un Expert
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
