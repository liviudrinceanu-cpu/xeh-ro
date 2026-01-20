'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Menu, X, Loader2, Package, FolderOpen, User, LogOut, LayoutDashboard, ChevronDown, Shield } from 'lucide-react'
import { cn, getCategoryName } from '@/lib/utils'
import { useAuth } from '@/components/providers/AuthProvider'
import CartButton from '@/components/cart/CartButton'
import CartDrawer from '@/components/cart/CartDrawer'

const navigation = [
  { name: 'Branduri', href: '/#branduri' },
  { name: 'RM Gastro', href: '/rm' },
  { name: 'REDFOX', href: '/redfox' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, isLoading, signOut, isAdmin } = useAuth()

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    setMobileMenuOpen(false)
    await signOut()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-nav border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 font-bold text-xl">
            <span className="bg-crimson text-white px-2 py-1 rounded-l">XEH</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded-r">.ro</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-crimson transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Caută produse...</span>
            </button>

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 text-gray-600 hover:text-crimson"
              aria-label="Deschide căutarea"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Section */}
            {!isLoading && (
              <>
                {user ? (
                  /* User Menu */
                  <div className="relative hidden sm:block">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
                        isAdmin ? "bg-purple-100 text-purple-700" : "bg-crimson-bg text-crimson"
                      )}>
                        {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                      </div>
                      {isAdmin && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">
                          Admin
                        </span>
                      )}
                      <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", userMenuOpen && "rotate-180")} />
                    </button>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-600 truncate">
                                {profile?.first_name} {profile?.last_name}
                              </p>
                              {isAdmin && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">
                                  Admin
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 truncate">{profile?.email}</p>
                          </div>
                          <Link
                            href={isAdmin ? '/admin' : '/portal/dashboard'}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            {isAdmin ? 'Panou Admin' : 'Portalul Meu'}
                          </Link>
                          <Link
                            href="/portal/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <User className="w-4 h-4" />
                            Profil
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <LogOut className="w-4 h-4" />
                            Deconectare
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Login Button */
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Cont Partener
                  </Link>
                )}
              </>
            )}

            {/* Cart Button */}
            <CartButton className="hidden sm:flex" />

            {/* CTA Button */}
            <Link
              href="/cerere-oferta"
              className="hidden sm:inline-flex bg-crimson hover:bg-crimson-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-crimson"
            >
              Cere Ofertă
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-crimson"
              aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-crimson hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Auth links for mobile */}
              {!isLoading && (
                <>
                  {user ? (
                    <>
                      <li className="pt-2 border-t border-gray-200">
                        <Link
                          href={isAdmin ? '/admin' : '/portal/dashboard'}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-base font-medium text-crimson hover:bg-crimson-bg rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-5 h-5" />
                          {isAdmin ? 'Panou Admin' : 'Portalul Meu'}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          Deconectare
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="pt-2 border-t border-gray-200">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-base font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="w-5 h-5" />
                        Cont Partener
                      </Link>
                    </li>
                  )}
                </>
              )}
              <li className="pt-2">
                <Link
                  href="/cerere-oferta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-white bg-crimson hover:bg-crimson-dark rounded-lg transition-colors text-center"
                >
                  Cere Ofertă
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  )
}

type SearchResult = {
  products: {
    id: string
    sapCode: string
    slugRo: string | null
    model: string
    title: string
    price: number | null
    currency: string
    stockStatus: string
    brand: { name: string; slug: string }
    image: string | null
  }[]
  categories: {
    id: string
    name: string
    name_ro: string | null
    slug: string
    path: string
    productCount: number
    brand: { name: string; slug: string }
  }[]
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults(null)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=6`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const hasResults = results && (results.products.length > 0 || results.categories.length > 0)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="min-h-screen px-4 pt-20">
        <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg animate-slide-down overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            {loading ? (
              <Loader2 className="w-5 h-5 text-crimson animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută produse, categorii, modele..."
              className="flex-1 text-lg outline-none placeholder:text-gray-400"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Închide căutarea"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {/* Results */}
            {hasResults ? (
              <div className="p-2">
                {/* Categories */}
                {results.categories.length > 0 && (
                  <div className="mb-2">
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Categorii
                    </h3>
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/${cat.brand.slug}/${cat.path}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FolderOpen className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{getCategoryName(cat.name, cat.name_ro)}</p>
                          <p className="text-sm text-gray-500">
                            {cat.brand.name} • {cat.productCount} produse
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Products */}
                {results.products.length > 0 && (
                  <div>
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Produse
                    </h3>
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${product.brand.slug}/produs/${product.slugRo || product.sapCode}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title || product.model}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain rounded-lg bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {product.title || product.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.brand.name} • {product.model}
                            {product.price && (
                              <span className="ml-2 text-crimson font-semibold">
                                {product.price} {product.currency}
                              </span>
                            )}
                          </p>
                        </div>
                        {product.stockStatus === 'in_stock' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            În Stoc
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {/* View all results */}
                <Link
                  href={`/catalog?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 mt-2 p-3 text-crimson hover:bg-crimson-bg rounded-lg transition-colors font-medium"
                >
                  Vezi toate rezultatele pentru &ldquo;{query}&rdquo;
                </Link>
              </div>
            ) : query.length >= 2 && !loading ? (
              /* No results */
              <div className="p-8 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Niciun rezultat pentru &ldquo;{query}&rdquo;</p>
                <p className="text-sm mt-1">Încearcă alte cuvinte cheie</p>
              </div>
            ) : (
              /* Default state - suggestions */
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Căutări populare
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Friteuză', 'Cuptor', 'Grătar', 'Mașină gheață', 'Răcitor', 'Vitrină'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-crimson-bg hover:text-crimson rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Branduri
                  </h3>
                  <div className="flex gap-3">
                    <Link
                      href="/rm"
                      onClick={onClose}
                      className="flex-1 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center font-semibold transition-colors"
                    >
                      RM Gastro
                    </Link>
                    <Link
                      href="/redfox"
                      onClick={onClose}
                      className="flex-1 p-3 bg-gray-50 hover:bg-crimson-bg hover:text-crimson rounded-xl text-center font-semibold transition-colors"
                    >
                      REDFOX
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
    </div>
  )
}
