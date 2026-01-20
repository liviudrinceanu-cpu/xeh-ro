'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type CartItem = {
  productId: string
  sapCode: string
  title: string
  model: string
  brand: string
  brandSlug: string
  imageUrl: string | null
  priceAmount: number | null  // null = "La cerere"
  priceCurrency: string
  quantity: number
}

type QuoteCartContextType = {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  totalPrice: number
  itemsWithPrice: number
  itemsWithoutPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined)

const STORAGE_KEY = 'xeh_quote_cart'

function getInitialItems(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
  }

  return []
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    setItems(getInitialItems())
    setIsHydrated(true)
  }, [])

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isHydrated])

  const addItem = useCallback((product: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingIndex = current.findIndex(item => item.productId === product.productId)

      if (existingIndex >= 0) {
        // Increment quantity if product already exists
        const updated = [...current]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        }
        return updated
      }

      // Add new product with quantity 1
      return [...current, { ...product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(current => current.filter(item => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems(current =>
      current.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    setIsOpen(false)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), [])

  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce((sum, item) => {
    if (item.priceAmount !== null) {
      return sum + (item.priceAmount * item.quantity)
    }
    return sum
  }, 0)

  const itemsWithPrice = items.filter(item => item.priceAmount !== null).length
  const itemsWithoutPrice = items.filter(item => item.priceAmount === null).length

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
        itemsWithPrice,
        itemsWithoutPrice,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  )
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext)
  if (context === undefined) {
    throw new Error('useQuoteCart must be used within a QuoteCartProvider')
  }
  return context
}
