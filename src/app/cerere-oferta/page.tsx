import { Metadata } from 'next'
import { Suspense } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import QuoteForm from './QuoteForm'

export const metadata: Metadata = {
  title: 'Cerere Ofertă - Echipamente HoReCa',
  description: 'Solicită o ofertă personalizată pentru echipamente HoReCa profesionale. Răspundem în maxim 24 de ore cu cele mai bune prețuri.',
  openGraph: {
    title: 'Cerere Ofertă | XEH.ro',
    description: 'Solicită o ofertă personalizată pentru echipamente HoReCa.',
  },
}

export default function QuoteRequestPage() {
  const breadcrumbs = [{ label: 'Cerere Ofertă' }]

  const benefits = [
    {
      title: 'Răspuns Rapid',
      description: 'Primești oferta în maxim 24 de ore',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Prețuri Competitive',
      description: 'Cele mai bune prețuri din piață',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Fără Obligații',
      description: 'Ofertă gratuită și fără angajamente',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Consultanță Inclusă',
      description: 'Sfaturi de la experți în domeniu',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title">Solicită Ofertă</h1>
        <p className="section-subtitle mx-auto">
          Completează formularul de mai jos și vei primi o ofertă personalizată în maxim 24 de ore.
          Este complet gratuit și fără obligații.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3 text-accent">
              {benefit.icon}
            </div>
            <h3 className="font-semibold text-primary text-sm mb-1">{benefit.title}</h3>
            <p className="text-gray-500 text-xs">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Detalii Cerere</h2>
            <Suspense fallback={<div>Se încarcă...</div>}>
              <QuoteForm />
            </Suspense>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Contact Direct</h3>
            <p className="text-gray-600 text-sm mb-4">
              Preferi să vorbești direct cu un specialist? Sună-ne sau scrie-ne.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+40123456789"
                className="flex items-center gap-3 text-gray-700 hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">+40 123 456 789</div>
                  <div className="text-xs text-gray-500">Luni - Vineri, 08:00 - 18:00</div>
                </div>
              </a>
              <a
                href="mailto:oferte@xeh.ro"
                className="flex items-center gap-3 text-gray-700 hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">oferte@xeh.ro</div>
                  <div className="text-xs text-gray-500">Răspundem în 24h</div>
                </div>
              </a>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-primary rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">De ce XEH.ro?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Peste 15 ani de experiență în domeniu</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Branduri recunoscute internațional</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Garanție și service post-vânzare</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Livrare și montaj în toată România</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Soluții de finanțare disponibile</span>
              </li>
            </ul>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-1 text-accent mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm italic mb-4">
              "Am colaborat cu XEH.ro pentru echiparea completă a restaurantului.
              Profesionalism, prețuri bune și livrare la timp. Recomand cu încredere!"
            </p>
            <div className="text-sm">
              <div className="font-semibold text-primary">Andrei M.</div>
              <div className="text-gray-500">Restaurant La Famiglia, București</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
