'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Tag, Search, Filter, Package, Download, ChevronDown, ChevronUp } from 'lucide-react'
import type { PartnerDiscountRule } from '@/types/database'

type ProductData = {
  id: string
  sap_code: string
  model: string
  title_ro: string | null
  price_amount: number | null
  price_currency: string
  stock_status: string
  brand_id: string
  brand: { id: string; name: string; slug: string } | { id: string; name: string; slug: string }[] | null
  product_images: { cloudinary_url: string | null; is_primary: boolean }[]
}

type ProductWithDiscount = ProductData & {
  discounted_price: number | null
  discount_percentage: number | null
  applicable_rule: PartnerDiscountRule | null
}

export default function PriceListPage() {
  const { profile, partner, isLoading: authLoading } = useAuth()
  const [products, setProducts] = useState<ProductWithDiscount[]>([])
  const [discountRules, setDiscountRules] = useState<PartnerDiscountRule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price_asc' | 'price_desc' | 'discount'>('name')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadData() {
      if (!profile?.id || !partner?.id) return

      const supabase = createClient()

      try {
        // Load discount rules for this partner
        const { data: rules } = await supabase
          .from('partner_discount_rules')
          .select('*')
          .eq('partner_id', partner.id)
          .eq('is_active', true)

        setDiscountRules(rules || [])

        // Load products with basic info
        const { data: productsData } = await supabase
          .from('products')
          .select(`
            id,
            sap_code,
            model,
            title_ro,
            price_amount,
            price_currency,
            stock_status,
            brand_id,
            brand:brands (id, name, slug),
            product_images (cloudinary_url, is_primary)
          `)
          .not('price_amount', 'is', null)
          .order('title_ro')
          .limit(500)

        if (productsData) {
          // Calculate discounts for each product
          const productsWithDiscounts = productsData.map(product => {
            const rule = findApplicableRule(rules || [], product)
            const discountedPrice = rule && product.price_amount
              ? calculateDiscountedPrice(product.price_amount, rule)
              : null
            const discountPercentage = rule && product.price_amount && discountedPrice
              ? Math.round((1 - discountedPrice / product.price_amount) * 100)
              : null

            return {
              ...product,
              discounted_price: discountedPrice,
              discount_percentage: discountPercentage,
              applicable_rule: rule,
            }
          })

          setProducts(productsWithDiscounts as ProductWithDiscount[])
        }
      } catch (error) {
        console.error('Error loading price list:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading && partner?.is_approved) {
      loadData()
    } else if (!authLoading) {
      setIsLoading(false)
    }
  }, [profile?.id, partner?.id, partner?.is_approved, authLoading])

  function findApplicableRule(rules: PartnerDiscountRule[], product: ProductData): PartnerDiscountRule | null {
    const now = new Date()

    // Filter valid rules
    const validRules = rules.filter(rule => {
      if (!rule.is_active) return false
      if (rule.valid_from && new Date(rule.valid_from) > now) return false
      if (rule.valid_until && new Date(rule.valid_until) < now) return false
      return true
    })

    // Get brand slug from product (handle array or object)
    const brandData = Array.isArray(product.brand) ? product.brand[0] : product.brand
    const brandSlug = brandData?.slug

    // Priority: product > category > brand > all
    // Check product-specific rule
    const productRule = validRules.find(r => r.applies_to === 'product' && r.product_id === product.id)
    if (productRule) return productRule

    // Check brand rule
    const brandRule = validRules.find(r => r.applies_to === 'brand' && r.brand === brandSlug)
    if (brandRule) return brandRule

    // Check "all" rule
    const allRule = validRules.find(r => r.applies_to === 'all')
    if (allRule) return allRule

    return null
  }

  function getBrandName(product: ProductData): string {
    const brandData = Array.isArray(product.brand) ? product.brand[0] : product.brand
    return brandData?.name || ''
  }

  function calculateDiscountedPrice(originalPrice: number, rule: PartnerDiscountRule): number {
    if (rule.discount_type === 'percentage') {
      return originalPrice * (1 - rule.discount_value / 100)
    } else {
      return Math.max(0, originalPrice - rule.discount_value)
    }
  }

  function getBrandSlug(product: ProductData): string {
    const brandData = Array.isArray(product.brand) ? product.brand[0] : product.brand
    return brandData?.slug || ''
  }

  const filteredProducts = products
    .filter(product => {
      if (brandFilter !== 'all' && getBrandSlug(product) !== brandFilter) return false
      if (searchQuery) {
        const search = searchQuery.toLowerCase()
        return (
          product.title_ro?.toLowerCase().includes(search) ||
          product.model?.toLowerCase().includes(search) ||
          product.sap_code?.toLowerCase().includes(search)
        )
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.discounted_price || a.price_amount || 0) - (b.discounted_price || b.price_amount || 0)
        case 'price_desc':
          return (b.discounted_price || b.price_amount || 0) - (a.discounted_price || a.price_amount || 0)
        case 'discount':
          return (b.discount_percentage || 0) - (a.discount_percentage || 0)
        default:
          return (a.title_ro || '').localeCompare(b.title_ro || '')
      }
    })

  const hasDiscounts = discountRules.length > 0

  if (authLoading || isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    )
  }

  if (!partner?.is_approved) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
        <Tag className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">
          Cont în așteptare
        </h2>
        <p className="text-yellow-700">
          Lista de prețuri va fi disponibilă după aprobarea contului.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Lista Prețuri</h1>
          <p className="text-gray-500 mt-1">
            {hasDiscounts
              ? `Ai ${discountRules.length} regulă(i) de discount active`
              : 'Prețuri standard de catalog'}
          </p>
        </div>
        {/* <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
          <Download className="w-5 h-5" />
          Exportă PDF
        </button> */}
      </div>

      {/* Discount Rules Summary */}
      {hasDiscounts && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Discount-uri Active</p>
              <ul className="mt-2 space-y-1 text-sm text-green-700">
                {discountRules.map(rule => (
                  <li key={rule.id}>
                    • {rule.discount_type === 'percentage' ? `${rule.discount_value}%` : `${rule.discount_value} EUR`} discount
                    {rule.applies_to === 'all' && ' pe toate produsele'}
                    {rule.applies_to === 'brand' && ` pe brandul ${rule.brand?.toUpperCase()}`}
                    {rule.applies_to === 'category' && ' pe categorie selectată'}
                    {rule.applies_to === 'product' && ' pe produs specific'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută după nume, model sau SKU..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
          />
        </div>
        <select
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson appearance-none bg-white"
        >
          <option value="all">Toate brandurile</option>
          <option value="rm">RM Gastro</option>
          <option value="redfox">REDFOX</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson appearance-none bg-white"
        >
          <option value="name">Sortare: Nume</option>
          <option value="price_asc">Preț: Crescător</option>
          <option value="price_desc">Preț: Descrescător</option>
          {hasDiscounts && <option value="discount">Discount: Mare → Mic</option>}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {products.length === 0
                ? 'Nu sunt produse disponibile.'
                : 'Nu s-au găsit produse pentru căutarea ta.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Produs
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Model
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Preț Catalog
                  </th>
                  {hasDiscounts && (
                    <>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                        Preț Partener
                      </th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                        Discount
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.product_images?.find(i => i.is_primary)?.cloudinary_url ? (
                            <img
                              src={product.product_images.find(i => i.is_primary)?.cloudinary_url || product.product_images[0]?.cloudinary_url || ''}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-600 line-clamp-1">
                            {product.title_ro || product.model}
                          </p>
                          <p className="text-xs text-gray-400">
                            {getBrandName(product)} • {product.sap_code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.model}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={hasDiscounts && product.discounted_price ? 'line-through text-gray-400' : 'font-medium text-gray-600'}>
                        {product.price_amount?.toLocaleString('ro-RO')} {product.price_currency}
                      </span>
                    </td>
                    {hasDiscounts && (
                      <>
                        <td className="px-6 py-4 text-right">
                          {product.discounted_price ? (
                            <span className="font-semibold text-green-600">
                              {product.discounted_price.toLocaleString('ro-RO', { maximumFractionDigits: 2 })} {product.price_currency}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {product.discount_percentage ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              -{product.discount_percentage}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination info */}
      <p className="text-sm text-gray-500 text-center">
        Afișare {filteredProducts.length} din {products.length} produse
      </p>
    </div>
  )
}
