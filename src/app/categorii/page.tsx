import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { categories } from '@/data/categories'

export const metadata: Metadata = {
  title: 'Categorii Echipamente HoReCa',
  description: 'Explorează toate categoriile de echipamente profesionale HoReCa: cuptoare, frigidere, mașini de spălat vase, mobilier inox, echipamente pentru pizzerie, bar și cafenea.',
  openGraph: {
    title: 'Categorii Echipamente HoReCa | XEH.ro',
    description: 'Explorează toate categoriile de echipamente profesionale HoReCa.',
  },
}

export default function CategoriesPage() {
  const breadcrumbs = [{ label: 'Categorii' }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-10">
        <h1 className="section-title">Categorii Echipamente HoReCa</h1>
        <p className="section-subtitle">
          Găsește echipamentele profesionale potrivite pentru afacerea ta.
          Oferim o gamă completă de soluții pentru restaurante, hoteluri, cafenele și catering.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categorii/${category.slug}`}
            className="card group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white font-bold text-xl mb-1">{category.name}</h2>
                <span className="text-accent font-medium text-sm">{category.productCount} produse</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {category.description}
              </p>
              <span className="text-accent font-semibold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Explorează categoria
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-primary-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Nu găsești ce cauți?
          </h2>
          <p className="text-gray-600 mb-6">
            Echipa noastră de experți te poate ajuta să găsești echipamentul perfect pentru nevoile tale.
            Contactează-ne pentru o consultanță gratuită sau trimite o cerere de ofertă.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactează-ne
            </Link>
            <Link href="/cerere-oferta" className="btn-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Cere Ofertă
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
