'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuoteCart } from '@/components/providers/QuoteCartProvider'

export default function CartDrawer() {
  const {
    items,
    itemCount,
    totalPrice,
    itemsWithoutPrice,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useQuoteCart()

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeCart])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl',
          'flex flex-col',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-crimson" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Cerere Ofertă</h2>
              <p className="text-sm text-gray-500">{itemCount} produs(e)</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Închide"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Nu ai produse în cererea de ofertă</p>
              <button
                onClick={closeCart}
                className="text-crimson hover:text-crimson-dark font-medium"
              >
                Continuă cumpărăturile
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.productId} className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link
                      href={`/${item.brandSlug}/produs/${item.sapCode}`}
                      onClick={closeCart}
                      className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${item.brandSlug}/produs/${item.sapCode}`}
                        onClick={closeCart}
                        className="block"
                      >
                        <p className="text-xs text-crimson font-medium uppercase">{item.brand}</p>
                        <h3 className="font-medium text-gray-600 text-sm line-clamp-2 hover:text-crimson transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">Cod: {item.sapCode}</p>

                      {/* Price */}
                      <div className="mt-2">
                        {item.priceAmount !== null ? (
                          <span className="text-sm font-semibold text-gray-600">
                            {item.priceAmount.toLocaleString('ro-RO')} {item.priceCurrency}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500 italic">La cerere</span>
                        )}
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            aria-label="Micșorează cantitatea"
                          >
                            <Minus className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="w-8 text-center font-medium text-gray-600">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            aria-label="Mărește cantitatea"
                          >
                            <Plus className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Șterge din coș"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      {item.priceAmount !== null && item.quantity > 1 && (
                        <p className="text-xs text-gray-500 mt-1">
                          = {(item.priceAmount * item.quantity).toLocaleString('ro-RO')} {item.priceCurrency}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {/* Totals */}
            <div className="space-y-2 mb-4">
              {totalPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal estimat:</span>
                  <span className="font-semibold text-gray-600">
                    {totalPrice.toLocaleString('ro-RO')} EUR
                  </span>
                </div>
              )}
              {itemsWithoutPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Produse la cerere:</span>
                  <span className="text-gray-500">{itemsWithoutPrice}</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/cerere-oferta"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-crimson hover:bg-crimson-dark text-white font-semibold rounded-xl transition-colors"
            >
              Trimite Cererea
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-xs text-gray-500 text-center mt-3">
              Prețurile sunt orientative și pot varia
            </p>
          </div>
        )}
      </div>
    </>
  )
}
