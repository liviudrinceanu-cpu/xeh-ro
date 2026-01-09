'use client'

import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  { name: 'Acasă', href: '/' },
  { name: 'Categorii', href: '/categorii' },
  { name: 'Despre Noi', href: '/despre-noi' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-lg">
      {/* Top bar with phone */}
      <div className="bg-primary-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>Echipamente HoReCa de calitate</span>
          <a
            href="tel:+40123456789"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold">+40 123 456 789</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">
              <span className="text-accent">X</span>EH<span className="text-accent">.</span>ro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-accent transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/cerere-oferta"
              className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Cere Ofertă
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Deschide meniu</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-primary-700 pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-accent transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/cerere-oferta"
                className="bg-accent hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cere Ofertă
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
