'use client'

import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  { name: 'Acasă', href: '/' },
  { name: 'Categorii', href: '/categorii' },
  { name: 'Despre Noi', href: '/despre-noi' },
  { name: 'Contact', href: '/contact' },
]

const brands = [
  { name: 'RM Gastro', slug: 'rm', color: '#1a1a1a', tagline: 'Premium pentru bucătării mari' },
  { name: 'REDFOX', slug: 'redfox', color: '#DC143C', tagline: 'Raport calitate-preț excelent' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false)

  return (
    <header className="gradient-header sticky top-0 z-50 shadow-lg">
      {/* Top bar with phone */}
      <div className="bg-secondary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>Echipamente HoReCa de calitate</span>
          <a
            href="tel:+40123456789"
            className="flex items-center gap-2 hover:text-primary transition-colors"
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
          <Link href="/" className="flex items-center">
            <span className="bg-primary text-white text-2xl font-bold px-2 py-1 rounded-l">
              XEH
            </span>
            <span className="bg-white text-secondary text-2xl font-bold px-2 py-1 rounded-r">
              .ro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsDropdownOpen(true)}
              onMouseLeave={() => setBrandsDropdownOpen(false)}
            >
              <button
                className="text-white hover:text-primary transition-colors font-medium flex items-center gap-1"
                onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
              >
                Branduri
                <svg
                  className={`w-4 h-4 transition-transform ${brandsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {brandsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50">
                  <Link
                    href="/branduri"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    Toate Brandurile
                  </Link>
                  <div className="border-t border-gray-100 my-2" />
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/branduri/${brand.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: brand.color }}
                        />
                        <div>
                          <span className="font-semibold text-gray-900 block">{brand.name}</span>
                          <span className="text-xs text-gray-500">{brand.tagline}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/cerere-oferta"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ boxShadow: '0 4px 15px rgba(220, 20, 60, 0.4)' }}
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
          <div className="md:hidden mt-4 pb-4 border-t border-secondary-light pt-4">
            <div className="flex flex-col gap-4">
              {navigation.slice(0, 2).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Brands Section */}
              <div className="border-t border-secondary-light pt-4">
                <span className="text-gray-300 text-sm font-medium mb-2 block">Branduri</span>
                <div className="flex flex-col gap-2 ml-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/branduri/${brand.slug}`}
                      className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: brand.color }}
                      />
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>

              {navigation.slice(2).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/cerere-oferta"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-all text-center"
                style={{ boxShadow: '0 4px 15px rgba(220, 20, 60, 0.4)' }}
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
