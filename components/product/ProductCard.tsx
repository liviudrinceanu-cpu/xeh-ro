'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn, formatPriceShort, getOptimizedImageUrl, extractProductTitle } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import FavoriteButton from '@/components/product/FavoriteButton'
import AddToCartButton from '@/components/product/AddToCartButton'
import type { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
  className?: string
  initialFavorite?: boolean
  isPriority?: boolean // Set to true for above-fold products (first 4-8 products)
}

export default function ProductCard({ product, className, initialFavorite = false, isPriority = false }: ProductCardProps) {
  const brandSlug = product.brand?.slug || 'rm'
  // Use SEO-friendly slug_ro if available, otherwise fallback to SAP code
  const productUrl = `/${brandSlug}/produs/${product.slug_ro || product.sap_code}`

  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0]
  const imageUrl = primaryImage?.cloudinary_url || primaryImage?.original_url

  const title = extractProductTitle(product.title_en, product.title_ro, product.model)
  const brandName = product.brand?.name || brandSlug.toUpperCase()

  return (
    <Link
      href={productUrl}
      className={cn(
        'group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={getOptimizedImageUrl(imageUrl, 400)}
            alt={title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={isPriority}
            loading={isPriority ? undefined : 'lazy'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges - top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.stock_status === 'in_stock' && (
            <Badge variant="success">In Stoc</Badge>
          )}
        </div>

        {/* Action buttons - top right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <FavoriteButton
            productId={product.id}
            size="sm"
            initialFavorite={initialFavorite}
          />
          <AddToCartButton
            product={{
              productId: product.id,
              sapCode: product.sap_code,
              title: title,
              model: product.model,
              brand: brandName,
              brandSlug: brandSlug,
              imageUrl: imageUrl || null,
              priceAmount: product.price_amount,
              priceCurrency: product.price_currency || 'EUR',
            }}
            variant="icon"
            size="sm"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          {brandName}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-gray-600 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-crimson transition-colors">
          {title}
        </h3>

        {/* Model */}
        <p className="text-xs text-gray-400 mb-3">
          Model: {product.model}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <span className={cn(
            'font-bold',
            product.price_amount ? 'text-crimson text-lg' : 'text-gray-500 text-sm'
          )}>
            {formatPriceShort(product.price_amount, product.price_currency)}
          </span>

          <span className="px-3 py-1.5 bg-gray-100 group-hover:bg-crimson group-hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Oferta
          </span>
        </div>
      </div>
    </Link>
  )
}
