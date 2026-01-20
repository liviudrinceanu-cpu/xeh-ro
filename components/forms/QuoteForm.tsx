'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Package, Minus, Plus, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useQuoteCart, CartItem } from '@/components/providers/QuoteCartProvider'

interface QuoteFormProps {
  preselectedProductId?: string
}

export default function QuoteForm({ preselectedProductId }: QuoteFormProps) {
  const router = useRouter()
  const { items, clearCart, removeItem, updateQuantity, totalPrice, itemsWithoutPrice } = useQuoteCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [quoteNumber, setQuoteNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // Prepare products array from cart items
    const products = items.map(item => ({
      productId: item.productId,
      sapCode: item.sapCode,
      title: item.title,
      model: item.model,
      brand: item.brand,
      brandSlug: item.brandSlug,
      quantity: item.quantity,
      priceAmount: item.priceAmount,
      priceCurrency: item.priceCurrency,
    }))

    const data = {
      contact_name: formData.get('name'),
      contact_email: formData.get('email'),
      contact_phone: formData.get('phone'),
      contact_company: formData.get('company'),
      contact_message: formData.get('message'),
      product_id: preselectedProductId, // For backwards compatibility
      products: products.length > 0 ? products : undefined,
    }

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('A apărut o eroare. Vă rugăm încercați din nou.')
      }

      const result = await response.json()
      setQuoteNumber(result.quoteNumber || '')
      setSubmitted(true)
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Cerere trimisă cu succes!
        </h2>
        {quoteNumber && (
          <p className="text-lg font-semibold text-crimson mb-2">
            Număr cerere: {quoteNumber}
          </p>
        )}
        <p className="text-gray-500 mb-6">
          Îți mulțumim pentru interes. Te vom contacta în cel mai scurt timp.
        </p>
        <Button href="/" variant="outline">
          Înapoi la pagina principală
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Products Table */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-crimson" />
              <h3 className="font-semibold text-gray-600">
                Produse Selectate ({items.length})
              </h3>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Produs
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Preț/buc
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Cantitate
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.productId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/${item.brandSlug}/produs/${item.sapCode}`}
                          className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
                        >
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-300" />
                            </div>
                          )}
                        </Link>
                        <div className="min-w-0">
                          <p className="text-xs text-crimson font-medium uppercase">{item.brand}</p>
                          <Link
                            href={`/${item.brandSlug}/produs/${item.sapCode}`}
                            className="font-medium text-gray-600 hover:text-crimson transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-gray-500">Cod: {item.sapCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {item.priceAmount !== null ? (
                        <span className="font-medium text-gray-600">
                          {item.priceAmount.toLocaleString('ro-RO')} {item.priceCurrency}
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">La cerere</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-500" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-600">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {item.priceAmount !== null ? (
                        <span className="font-semibold text-gray-600">
                          {(item.priceAmount * item.quantity).toLocaleString('ro-RO')} {item.priceCurrency}
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">La cerere</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-semibold text-gray-600">
                    Total Estimat:
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-lg font-bold text-crimson">
                      {totalPrice > 0 ? `${totalPrice.toLocaleString('ro-RO')} EUR` : '-'}
                    </span>
                    {itemsWithoutPrice > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        + {itemsWithoutPrice} produs(e) la cerere
                      </p>
                    )}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.productId} className="p-4">
                <div className="flex gap-3">
                  <Link
                    href={`/${item.brandSlug}/produs/${item.sapCode}`}
                    className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-crimson font-medium uppercase">{item.brand}</p>
                    <Link
                      href={`/${item.brandSlug}/produs/${item.sapCode}`}
                      className="font-medium text-gray-600 text-sm line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500">Cod: {item.sapCode}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200"
                    >
                      <Minus className="w-4 h-4 text-gray-500" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200"
                    >
                      <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="text-right">
                    {item.priceAmount !== null ? (
                      <>
                        <p className="text-xs text-gray-500">
                          {item.priceAmount.toLocaleString('ro-RO')} {item.priceCurrency}/buc
                        </p>
                        <p className="font-semibold text-gray-600">
                          {(item.priceAmount * item.quantity).toLocaleString('ro-RO')} {item.priceCurrency}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">La cerere</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Total */}
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">Total Estimat:</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-crimson">
                    {totalPrice > 0 ? `${totalPrice.toLocaleString('ro-RO')} EUR` : '-'}
                  </span>
                  {itemsWithoutPrice > 0 && (
                    <p className="text-xs text-gray-500">
                      + {itemsWithoutPrice} produs(e) la cerere
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {items.length === 0 && !preselectedProductId && (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            Nu ai selectat niciun produs. Poți adăuga produse din catalog sau completa cererea fără produse specifice.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-medium"
          >
            Explorează Catalogul →
          </Link>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-600 mb-6">Date de Contact</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                Nume complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
                placeholder="Ion Popescu"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
                placeholder="email@exemplu.ro"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
                placeholder="07XX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-2">
                Companie
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
                placeholder="Numele companiei"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
              Mesaj / Detalii cerere
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all resize-none"
              placeholder="Descrieți echipamentele dorite, cantități, sau orice alte detalii relevante..."
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="gdpr"
            name="gdpr"
            required
            className="mt-1 w-4 h-4 text-crimson border-gray-300 rounded focus:ring-crimson"
          />
          <label htmlFor="gdpr" className="text-sm text-gray-500">
            Sunt de acord cu prelucrarea datelor personale în conformitate cu{' '}
            <a href="/confidentialitate" className="text-crimson hover:underline">
              Politica de Confidențialitate
            </a>
            . *
          </label>
        </div>

        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          {isSubmitting ? 'Se trimite...' : items.length > 0 ? `Trimite Cererea (${items.length} produse)` : 'Trimite Cererea'}
        </Button>
      </form>
    </div>
  )
}
