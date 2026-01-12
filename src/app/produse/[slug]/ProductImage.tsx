'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src: string | undefined
  alt: string
}

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
      <svg className="w-24 h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-.75a.375.375 0 01-.375-.375v-.75a3.375 3.375 0 00-3.375-3.375h-1.5A3.375 3.375 0 006.75 7.125v.75c0 .207-.168.375-.375.375H5.625a3.375 3.375 0 00-3.375 3.375v6.75a3.375 3.375 0 003.375 3.375h10.5a3.375 3.375 0 003.375-3.375V14.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9.75h.008v.008H8.25V9.75zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3.75-6h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3.75-6h.008v.008h-.008V9.75zm0 3h.008v.008h-.008v-.008z" />
      </svg>
      <span className="text-base font-medium">Imagine indisponibilă</span>
    </div>
  )
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const hasImage = src && src.length > 0

  if (!hasImage || imageError) {
    return <ImagePlaceholder />
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setImageError(true)}
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority
    />
  )
}
