'use client'

import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuoteCart } from '@/components/providers/QuoteCartProvider'

interface CartButtonProps {
  className?: string
}

export default function CartButton({ className }: CartButtonProps) {
  const { itemCount, toggleCart } = useQuoteCart()

  return (
    <button
      onClick={toggleCart}
      className={cn(
        'relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors',
        'hover:bg-gray-100',
        className
      )}
      aria-label={`Coș cerere ofertă - ${itemCount} produse`}
    >
      <ShoppingBag className="w-5 h-5 text-gray-600" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-crimson rounded-full">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}
