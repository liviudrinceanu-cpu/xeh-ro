import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Contactează-ne pentru informații despre echipamente HoReCa profesionale. Suntem aici să te ajutăm.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
                    <p className="text-gray-500 text-sm">București, România</p>
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
                    <a href="mailto:contact@xeh.ro" className="text-crimson hover:underline text-sm">
                      contact@xeh.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Program</h3>
                    <p className="text-gray-500 text-sm">Luni - Vineri: 9:00 - 18:00</p>
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
