'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Cele mai populare' },
  { value: 'newest', label: 'Cele mai noi' },
  { value: 'price_asc', label: 'Pret: mic - mare' },
  { value: 'price_desc', label: 'Pret: mare - mic' },
]

interface CategorySortDropdownProps {
  currentSort: string
}

export default function CategorySortDropdown({ currentSort }: CategorySortDropdownProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'popular') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    params.delete('page') // Reset to page 1
    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
    setIsOpen(false)
  }

  const currentLabel = SORT_OPTIONS.find(o => o.value === currentSort)?.label || 'Cele mai populare'

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-sm transition-colors"
      >
        <span className="text-gray-500">Sortare:</span>
        <span className="font-medium text-gray-700">{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[200px] z-20">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                currentSort === option.value ? 'text-crimson font-medium bg-crimson/5' : 'text-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
