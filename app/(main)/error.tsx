'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Main section error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 mx-auto mb-6 bg-crimson-bg rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-600 mb-2">
          A apărut o eroare
        </h1>
        <p className="text-gray-500 mb-8">
          Ne cerem scuze pentru inconveniență. Pagina nu poate fi afișată momentan.
          Poți încerca să reîncarci pagina sau să navighezi în altă parte.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-crimson text-white font-semibold rounded-xl hover:bg-crimson-dark transition-colors"
          >
            Reîncarcă pagina
          </button>
          <Link
            href="/catalog"
            className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Vezi Catalogul
          </Link>
          <Link
            href="/"
            className="px-6 py-3 text-gray-500 font-medium hover:text-crimson transition-colors"
          >
            Acasă
          </Link>
        </div>
      </div>
    </div>
  )
}
