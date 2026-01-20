'use client'

import { useState } from 'react'
import { Plus, Check, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuoteCart, CartItem } from '@/components/providers/QuoteCartProvider'

type ProductData = Omit<CartItem, 'quantity'>

interface AddToCartButtonProps {
  product: ProductData
  variant?: 'icon' | 'full'
  size?: 'sm' | 'lg'
  className?: string
}

export default function AddToCartButton({
  product,
  variant = 'icon',
  size = 'sm',
  className,
}: AddToCartButtonProps) {
  const { addItem, items, openCart } = useQuoteCart()
  const [justAdded, setJustAdded] = useState(false)

  const isInCart = items.some(item => item.productId === product.productId)
  const itemInCart = items.find(item => item.productId === product.productId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product)
    setJustAdded(true)

    // Show confirmation briefly then open cart
    setTimeout(() => {
      setJustAdded(false)
      openCart()
    }, 500)
  }

  if (variant === 'icon') {
    const sizeClasses = {
      sm: 'w-9 h-9',
      lg: 'w-11 h-11',
    }

    const iconSizes = {
      sm: 'w-5 h-5',
      lg: 'w-6 h-6',
    }

    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200',
          'bg-crimson/90 backdrop-blur-sm shadow-sm',
          'hover:bg-crimson hover:shadow-md hover:scale-110',
          justAdded && 'bg-green-500 hover:bg-green-500',
          sizeClasses[size],
          className
        )}
        aria-label="Adaugă în cerere ofertă"
        title={isInCart ? `În ofertă (${itemInCart?.quantity})` : 'Adaugă în cerere ofertă'}
      >
        {justAdded ? (
          <Check className={cn(iconSizes[size], 'text-white')} />
        ) : isInCart ? (
          <span className="text-white font-medium text-sm">{itemInCart?.quantity}</span>
        ) : (
          <Plus className={cn(iconSizes[size], 'text-white')} />
        )}
      </button>
    )
  }

  // Full button variant
  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all',
        'bg-white border-2 border-crimson text-crimson',
        'hover:bg-crimson hover:text-white',
        justAdded && 'bg-green-500 border-green-500 text-white hover:bg-green-500',
        size === 'lg' && 'px-6 py-3 text-base',
        className
      )}
    >
      {justAdded ? (
        <>
          <Check className="w-5 h-5" />
          Adăugat
        </>
      ) : isInCart ? (
        <>
          <ShoppingBag className="w-5 h-5" />
          În ofertă ({itemInCart?.quantity})
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Adaugă în Ofertă
        </>
      )}
    </button>
  )
}
