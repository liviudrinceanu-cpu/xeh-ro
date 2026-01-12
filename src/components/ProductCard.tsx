'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { getBrandBySlug } from '@/data/brands'

interface ProductCardProps {
  product: Product
  showCategory?: boolean
}

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
      <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-.75a.375.375 0 01-.375-.375v-.75a3.375 3.375 0 00-3.375-3.375h-1.5A3.375 3.375 0 006.75 7.125v.75c0 .207-.168.375-.375.375H5.625a3.375 3.375 0 00-3.375 3.375v6.75a3.375 3.375 0 003.375 3.375h10.5a3.375 3.375 0 003.375-3.375V14.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9.75h.008v.008H8.25V9.75zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3.75-6h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3.75-6h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008z" />
      </svg>
      <span className="text-sm font-medium">Imagine indisponibilă</span>
    </div>
  )
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const brand = getBrandBySlug(product.brandSlug)
  const brandColor = brand?.color || '#DC143C'
  const [imageError, setImageError] = useState(false)
  const hasImage = product.images && product.images.length > 0 && product.images[0]

  return (
    <div className="card h-full flex flex-col">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {/* Brand Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-xs font-semibold px-2 py-1 rounded"
            style={{ backgroundColor: brandColor }}
          >
            {brand?.shortName || product.brand}
          </span>
        </div>

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              NOU
            </span>
          </div>
        )}

        {/* Product Image or Placeholder */}
        {hasImage && !imageError ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category Link */}
        {showCategory && (
          <Link
            href={`/categorii/${product.categorySlug}`}
            className="text-sm font-medium hover:underline"
            style={{ color: brandColor }}
          >
            {product.categoryName}
          </Link>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-primary mt-1 mb-2 line-clamp-2">
          <Link href={`/produse/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold" style={{ color: brandColor }}>
            {product.priceEUR.toLocaleString('ro-RO')} EUR
          </span>
          <span className="text-xs text-gray-500 block">(fără TVA)</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/produse/${product.slug}`}
            className="flex-1 text-center text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: brandColor }}
          >
            Vezi Detalii
          </Link>
          <Link
            href={`/cerere-oferta?produs=${product.slug}`}
            className="flex-1 text-center border-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: brandColor, color: brandColor }}
          >
            Cere Ofertă
          </Link>
        </div>
      </div>
    </div>
  )
}
