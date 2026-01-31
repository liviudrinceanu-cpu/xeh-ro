import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from '@/components/forms/ContactForm'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | XEH.ro - eXpert Echipamente Horeca',
  description: 'Contactează-ne pentru informații despre echipamente HoReCa profesionale. Telefon: +40 724 256 250, Email: secretariat@infinitrade-romania.ro. Răspundem în maxim 24 de ore.',
  keywords: ['contact xeh', 'echipamente horeca contact', 'telefon echipamente restaurant'],
  openGraph: {
    title: 'Contact | XEH.ro - eXpert Echipamente Horeca',
    description: 'Contactează-ne pentru informații despre echipamente HoReCa profesionale. Răspundem în maxim 24 de ore.',
    url: 'https://www.xeh.ro/contact',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Contactează-ne&subtitle=Suntem aici să te ajutăm cu echipamente HoReCa profesionale',
      width: 1200,
      height: 630,
      alt: 'Contact XEH.ro - Echipamente HoReCa Profesionale',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | XEH.ro - eXpert Echipamente Horeca',
    description: 'Contactează-ne pentru informații despre echipamente HoReCa profesionale.',
    images: ['https://www.xeh.ro/api/og?title=Contactează-ne'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Contact' },
        ]}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="text-3xl font-bold text-gray-600 mt-4">
            Contactează-ne
          </h1>
          <p className="text-gray-500 mt-2">
            Suntem aici să te ajutăm cu orice întrebare.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-600 mb-6">
                Informații Contact
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Adresă</h3>
                    <p className="text-gray-500 text-sm">Calea Lugojului 47/B, Hala 3<br />Ghiroda, Timiș 307200</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Telefon</h3>
                    <a href="tel:+40724256250" className="text-crimson hover:underline text-sm">
                      +40 724 256 250
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Email</h3>
                    <a href="mailto:secretariat@infinitrade-romania.ro" className="text-crimson hover:underline text-sm">
                      secretariat@infinitrade-romania.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Program</h3>
                    <p className="text-gray-500 text-sm">Luni - Vineri: 08:00 - 16:30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-600 mb-4">
                Link-uri Rapide
              </h2>
              <div className="space-y-2">
                <a href="/cerere-oferta" className="block text-crimson hover:underline text-sm">
                  → Cere Ofertă
                </a>
                <a href="/catalog" className="block text-crimson hover:underline text-sm">
                  → Vezi Catalogul
                </a>
                <a href="/rm" className="block text-crimson hover:underline text-sm">
                  → Produse RM
                </a>
                <a href="/redfox" className="block text-crimson hover:underline text-sm">
                  → Produse REDFOX
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-600 mb-6">
                Trimite-ne un mesaj
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
