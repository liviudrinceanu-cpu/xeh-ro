'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-600 mb-2">
          Ceva nu a mers bine
        </h1>
        <p className="text-gray-500 mb-6">
          Ne pare rău, a apărut o eroare neașteptată. Te rugăm să încerci din nou.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-crimson text-white font-semibold rounded-xl hover:bg-crimson-dark transition-colors"
          >
            Încearcă din nou
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Pagina principală
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-500">
            Cod eroare: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
