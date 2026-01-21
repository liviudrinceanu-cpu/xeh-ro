'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn, getOptimizedImageUrl } from '@/lib/utils'
import type { ProductImage } from '@/types/database'

interface ProductGalleryProps {
  images: ProductImage[]
  productTitle: string
}

// Filter out non-image URLs (PDFs, etc.) that might have been stored by mistake
function isValidImageUrl(url: string | null): boolean {
  if (!url) return false
  const lowercaseUrl = url.toLowerCase()
  // Exclude PDFs and other non-image files
  if (lowercaseUrl.endsWith('.pdf') || lowercaseUrl.includes('.pdf?') || lowercaseUrl.includes('/pdf/')) {
    return false
  }
  return true
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Filter out invalid image URLs (like PDFs) and then sort
  const validImages = images.filter(img =>
    isValidImageUrl(img.cloudinary_url) || isValidImageUrl(img.original_url)
  )

  const sortedImages = [...validImages].sort((a, b) => {
    if (a.is_primary) return -1
    if (b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const activeImage = sortedImages[activeIndex]
  const imageUrl = activeImage?.cloudinary_url || activeImage?.original_url

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1))
  }

  if (sortedImages.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>Fără imagine</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square group">
        {imageUrl && (
          <Image
            src={getOptimizedImageUrl(imageUrl, 800)}
            alt={productTitle}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        {/* Navigation Arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => {
            const thumbUrl = image.cloudinary_url || image.original_url
            return (
              <button
                key={image.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                  index === activeIndex
                    ? 'border-crimson'
                    : 'border-transparent hover:border-gray-300'
                )}
              >
                {thumbUrl && (
                  <Image
                    src={getOptimizedImageUrl(thumbUrl, 100)}
                    alt={`${productTitle} - ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full bg-gray-50 p-1"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <Image
              src={getOptimizedImageUrl(imageUrl, 1200)}
              alt={productTitle}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
