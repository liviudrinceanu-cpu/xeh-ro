'use client'

import Link from 'next/link'
import { Clock, Mail, Phone, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'

export default function PendingPage() {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Cont în așteptare aprobare
        </h1>

        <p className="text-gray-500 mb-6">
          Salut <strong>{profile?.first_name}</strong>, contul tău de partener
          pentru <strong>{profile?.company_name}</strong> a fost creat cu succes
          și este în curs de verificare.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
          <h3 className="font-medium text-gray-600 mb-3">Ce urmează?</h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-crimson-bg text-crimson rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
              Echipa noastră verifică datele companiei
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-crimson-bg text-crimson rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
              Primești email de confirmare când contul e activ
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-crimson-bg text-crimson rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
              Accesezi portalul cu prețuri și funcționalități complete
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <p className="text-sm text-gray-500 mb-4">
            Ai întrebări? Contactează-ne:
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:contact@xeh.ro"
              className="flex items-center gap-2 text-crimson hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">contact@xeh.ro</span>
            </a>
            <a
              href="tel:+40724256250"
              className="flex items-center gap-2 text-crimson hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+40 724 256 250</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la site
          </Link>
          <button
            onClick={signOut}
            className="text-gray-500 hover:text-gray-700"
          >
            Deconectare
          </button>
        </div>
      </div>
    </div>
  )
}
