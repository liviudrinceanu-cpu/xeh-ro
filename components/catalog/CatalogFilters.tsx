'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import type { SortOption, StockFilter } from '@/lib/queries/products'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Cele mai noi' },
  { value: 'price_asc', label: 'Preț: mic → mare' },
  { value: 'price_desc', label: 'Preț: mare → mic' },
  { value: 'name_asc', label: 'Nume: A → Z' },
  { value: 'name_desc', label: 'Nume: Z → A' },
]

const STOCK_OPTIONS: { value: StockFilter; label: string }[] = [
  { value: 'all', label: 'Toate' },
  { value: 'in_stock', label: 'În Stoc' },
  { value: 'on_request', label: 'La Comandă' },
]

interface CatalogFiltersProps {
  currentSort: SortOption
  currentStock: StockFilter
  currentPriceMin?: number
  currentPriceMax?: number
  currentBrand?: string
  currentSearch?: string
}

export default function CatalogFilters({
  currentSort,
  currentStock,
  currentPriceMin,
  currentPriceMax,
  currentBrand,
  currentSearch,
}: CatalogFiltersProps) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [priceMin, setPriceMin] = useState(currentPriceMin?.toString() || '')
  const [priceMax, setPriceMax] = useState(currentPriceMax?.toString() || '')

  const updateFilters = useCallback((updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams()

    // Preserve existing params
    if (currentBrand) params.set('brand', currentBrand)
    if (currentSearch) params.set('search', currentSearch)
    if (currentSort !== 'newest') params.set('sort', currentSort)
    if (currentStock !== 'all') params.set('stock', currentStock)
    if (currentPriceMin) params.set('priceMin', String(currentPriceMin))
    if (currentPriceMax) params.set('priceMax', String(currentPriceMax))

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'newest') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    params.delete('page')

    router.push(`/catalog?${params.toString()}`)
  }, [router, currentBrand, currentSearch, currentSort, currentStock, currentPriceMin, currentPriceMax])

  const handleSortChange = (sort: SortOption) => {
    updateFilters({ sort })
  }

  const handleStockChange = (stock: StockFilter) => {
    updateFilters({ stock })
  }

  const handlePriceApply = () => {
    updateFilters({
      priceMin: priceMin || undefined,
      priceMax: priceMax || undefined,
    })
    setShowFilters(false)
  }

  const clearAllFilters = () => {
    setPriceMin('')
    setPriceMax('')
    const params = new URLSearchParams()
    if (currentBrand) params.set('brand', currentBrand)
    if (currentSearch) params.set('search', currentSearch)
    router.push(`/catalog?${params.toString()}`)
  }

  const hasActiveFilters = currentSort !== 'newest' || currentStock !== 'all' || currentPriceMin || currentPriceMax

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sort Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
          <span className="text-gray-600">Sortare:</span>
          <span className="font-medium">{SORT_OPTIONS.find(o => o.value === currentSort)?.label}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                currentSort === option.value ? 'text-crimson font-medium' : 'text-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
          <span className="text-gray-600">Stoc:</span>
          <span className="font-medium">{STOCK_OPTIONS.find(o => o.value === currentStock)?.label}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
          {STOCK_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStockChange(option.value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                currentStock === option.value ? 'text-crimson font-medium' : 'text-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          currentPriceMin || currentPriceMax
            ? 'bg-crimson-bg text-crimson'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Preț</span>
        {(currentPriceMin || currentPriceMax) && (
          <span className="font-medium">
            {currentPriceMin || '0'} - {currentPriceMax || '∞'} EUR
          </span>
        )}
      </button>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1 px-3 py-2 text-crimson hover:bg-crimson-bg rounded-lg text-sm transition-colors"
        >
          <X className="w-4 h-4" />
          Resetează
        </button>
      )}

      {/* Price Filter Panel */}
      {showFilters && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[280px] z-30">
          <h4 className="font-medium text-gray-900 mb-3">Interval de preț (EUR)</h4>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-crimson"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-crimson"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors"
            >
              Anulează
            </button>
            <button
              onClick={handlePriceApply}
              className="flex-1 px-4 py-2 bg-crimson text-white hover:bg-crimson-dark rounded-lg text-sm font-medium transition-colors"
            >
              Aplică
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
