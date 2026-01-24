import Link from 'next/link'
import Button from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina nu a fost găsită | XEH.ro',
  description: 'Pagina căutată nu există. Vizitați catalogul nostru de echipamente HoReCa profesionale.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-bold text-gray-600 mt-4 mb-2">
          Pagina nu a fost găsită
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/">
            Înapoi la pagina principală
          </Button>
          <Button href="/catalog" variant="outline">
            Vezi catalogul
          </Button>
        </div>
      </div>
    </div>
  )
}
