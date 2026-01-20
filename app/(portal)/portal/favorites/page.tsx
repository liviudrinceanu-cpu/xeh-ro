'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Heart, Trash2, ShoppingCart, Package } from 'lucide-react'

type FavoriteProduct = {
  id: string
  product_id: string
  created_at: string
  product: {
    id: string
    sap_code: string
    model: string
    title_ro: string | null
    price_amount: number | null
    price_currency: string
    stock_status: string
    brand: {
      name: string
      slug: string
    }
    product_images: {
      cloudinary_url: string | null
      is_primary: boolean
    }[]
  }
}

export default function FavoritesPage() {
  const { profile, isLoading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadFavorites() {
      if (!profile?.id) return

      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select(`
            id,
            product_id,
            created_at,
            product:products (
              id,
              sap_code,
              model,
              title_ro,
              price_amount,
              price_currency,
              stock_status,
              brand:brands (name, slug),
              product_images (cloudinary_url, is_primary)
            )
          `)
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        // Transform data to handle Supabase nested relations
        const transformedData = (data || []).map((item: Record<string, unknown>) => ({
          ...item,
          product: Array.isArray(item.product) ? item.product[0] : item.product,
        })).filter((item: Record<string, unknown>) => item.product) as FavoriteProduct[]

        setFavorites(transformedData)
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      loadFavorites()
    }
  }, [profile?.id, authLoading])

  const removeFavorite = async (favoriteId: string) => {
    setRemovingId(favoriteId)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('id', favoriteId)

      if (error) throw error

      setFavorites(prev => prev.filter(f => f.id !== favoriteId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    } finally {
      setRemovingId(null)
    }
  }

  const getProductImage = (product: FavoriteProduct['product']) => {
    const primaryImage = product.product_images?.find(img => img.is_primary)
    return primaryImage?.cloudinary_url || product.product_images?.[0]?.cloudinary_url
  }

  const getStockLabel = (status: string) => {
    switch (status) {
      case 'in_stock':
        return { label: 'În stoc', color: 'bg-green-100 text-green-700' }
      case 'in_transit':
        return { label: 'În tranzit', color: 'bg-blue-100 text-blue-700' }
      case 'on_request':
        return { label: 'La cerere', color: 'bg-yellow-100 text-yellow-700' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700' }
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-600">Produse Favorite</h1>
        <p className="text-gray-500 mt-1">
          {favorites.length} produs(e) salvate
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Nu ai produse favorite
          </h2>
          <p className="text-gray-500 mb-6">
            Adaugă produse la favorite pentru a le găsi rapid mai târziu.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 bg-crimson hover:bg-crimson-dark text-white rounded-xl transition-colors"
          >
            Explorează Catalogul
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => {
            const product = favorite.product
            const imageUrl = getProductImage(product)
            const stockInfo = getStockLabel(product.stock_status)

            return (
              <div
                key={favorite.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden group"
              >
                {/* Image */}
                <Link
                  href={`/${product.brand?.slug}/${product.sap_code}`}
                  className="block aspect-square bg-gray-50 relative overflow-hidden"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title_ro || product.model}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-4">
                  {/* Brand */}
                  <p className="text-xs text-crimson font-medium uppercase tracking-wide mb-1">
                    {product.brand?.name}
                  </p>

                  {/* Title */}
                  <Link href={`/${product.brand?.slug}/${product.sap_code}`}>
                    <h3 className="font-medium text-gray-600 line-clamp-2 hover:text-crimson transition-colors">
                      {product.title_ro || product.model}
                    </h3>
                  </Link>

                  {/* Model */}
                  <p className="text-sm text-gray-500 mt-1">{product.model}</p>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mt-3">
                    {product.price_amount ? (
                      <p className="font-semibold text-gray-600">
                        {product.price_amount.toLocaleString('ro-RO')} {product.price_currency}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">Preț la cerere</p>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockInfo.color}`}>
                      {stockInfo.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/cerere-oferta?product=${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-crimson hover:bg-crimson-dark text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Cere Ofertă
                    </Link>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      disabled={removingId === favorite.id}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                      title="Șterge din favorite"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
