import { Suspense } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import QuoteForm from '@/components/forms/QuoteForm'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getProductBySapCode } from '@/lib/queries/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cere Ofertă | XEH.ro - Echipamente HoReCa Profesionale',
  description: 'Solicită o ofertă personalizată pentru echipamente HoReCa profesionale. Cuptoare, frigidere, mașini de spălat vase. Răspundem în maxim 24 de ore cu prețuri competitive.',
  keywords: ['cerere oferta horeca', 'pret echipamente restaurant', 'oferta cuptor profesional', 'pret frigider industrial'],
  openGraph: {
    title: 'Cere Ofertă | XEH.ro - Echipamente HoReCa Profesionale',
    description: 'Solicită o ofertă personalizată pentru echipamente HoReCa profesionale. Răspundem în maxim 24 de ore.',
    url: 'https://xeh.ro/cerere-oferta',
    images: [{
      url: 'https://xeh.ro/api/og?title=Cere Ofertă Personalizată&subtitle=Echipamente HoReCa profesionale la prețuri competitive',
      width: 1200,
      height: 630,
      alt: 'Cerere Ofertă XEH.ro - Echipamente HoReCa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cere Ofertă | XEH.ro - Echipamente HoReCa Profesionale',
    description: 'Solicită o ofertă personalizată pentru echipamente HoReCa profesionale.',
    images: ['https://xeh.ro/api/og?title=Cere Ofertă Personalizată'],
  },
  alternates: {
    canonical: 'https://xeh.ro/cerere-oferta',
  },
}

interface QuotePageProps {
  searchParams: Promise<{
    produs?: string
  }>
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams
  const productSapCode = params.produs

  let preselectedProduct = null
  if (productSapCode) {
    preselectedProduct = await getProductBySapCode(productSapCode)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://xeh.ro' },
          { name: 'Cerere Ofertă' },
        ]}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Cerere Ofertă' }]} />
          <h1 className="text-3xl font-bold text-gray-600 mt-4">
            Cere Ofertă
          </h1>
          <p className="text-gray-500 mt-2">
            Completează formularul și te vom contacta în cel mai scurt timp.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10">
          {/* Preselected Product */}
          {preselectedProduct && (
            <div className="mb-8 p-4 bg-crimson-bg rounded-xl">
              <p className="text-sm text-crimson font-medium mb-1">Produs selectat:</p>
              <p className="font-semibold text-gray-600">
                {preselectedProduct.model} - {preselectedProduct.title_en?.split('|')[0] || 'Produs'}
              </p>
            </div>
          )}

          <QuoteForm preselectedProductId={preselectedProduct?.id} />
        </div>

        {/* Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-600 mb-1">Răspuns Rapid</h3>
            <p className="text-sm text-gray-500">Primești oferta în maxim 24 de ore</p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-600 mb-1">Prețuri Speciale</h3>
            <p className="text-sm text-gray-500">Discounturi pentru comenzi mari</p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-600 mb-1">Suport Tehnic</h3>
            <p className="text-sm text-gray-500">Consultanță gratuită</p>
          </div>
        </div>
      </div>
    </div>
  )
}
