import { clsx, type ClassValue } from 'clsx'

// ============================================================
// Class Name Utility
// ============================================================

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// ============================================================
// Price Formatting
// ============================================================

export function formatPrice(amount: number | null, currency: string = 'EUR'): string {
  if (amount === null || amount === undefined) {
    return 'La Cerere'
  }

  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPriceShort(amount: number | null, currency: string = 'EUR'): string {
  if (amount === null || amount === undefined) {
    return 'La Cerere'
  }

  return `${new Intl.NumberFormat('ro-RO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)} ${currency}`
}

// ============================================================
// Stock Status
// ============================================================

export function getStockStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'in_stock': 'Disponibil în stoc',
    'in_transit': 'Pe drum',
    'on_request': 'La cerere',
  }
  return labels[status] || status
}

export function getStockStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'in_stock': 'text-green-600 bg-green-50',
    'in_transit': 'text-orange-600 bg-orange-50',
    'on_request': 'text-gray-500 bg-gray-100',
  }
  return colors[status] || 'text-gray-500 bg-gray-100'
}

// ============================================================
// Slug Utilities
// ============================================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateProductSlug(model: string, sapCode: string): string {
  return `${slugify(model)}-${sapCode}`
}

// ============================================================
// Image Utilities
// ============================================================

export function getCloudinaryUrl(url: string | null, transforms?: string): string {
  if (!url) {
    return '/images/placeholder-product.png'
  }

  // If it's already a cloudinary URL, apply transforms
  if (url.includes('cloudinary.com') && transforms) {
    return url.replace('/upload/', `/upload/${transforms}/`)
  }

  return url
}

export function getOptimizedImageUrl(url: string | null, width: number = 400): string {
  return getCloudinaryUrl(url, `w_${width},f_auto,q_auto`)
}

// ============================================================
// Text Utilities
// ============================================================

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function extractProductTitle(titleEn: string | null, titleRo: string | null, model: string): string {
  if (titleRo) return titleRo
  if (titleEn) {
    // Extract just the product description part (before the | brand part)
    const parts = titleEn.split('|')
    return parts[0].trim()
  }
  return model
}

export function getCategoryName(name: string, nameRo: string | null): string {
  return nameRo || name
}

// ============================================================
// URL Utilities
// ============================================================

const SITE_URL = 'https://xeh.ro'

export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (envUrl && envUrl.startsWith('https://')) {
    return envUrl.replace(/\/$/, '') // Remove trailing slash
  }
  return SITE_URL
}

export function getProductUrl(brandSlug: string, slugRo: string | null, model: string, sapCode: string): string {
  // Use slug_ro if available, otherwise fallback to model-sapCode
  if (slugRo) {
    return `/${brandSlug}/produs/${slugRo}`
  }
  return `/${brandSlug}/produs/${slugify(model)}-${sapCode}`
}

export function getCategoryUrl(brandSlug: string, categoryPath: string, pathRo?: string | null): string {
  // Use Romanian path if available
  if (pathRo) {
    const cleanPath = pathRo.replace(/^\/Group\/[^/]+/, '')
    return `/${brandSlug}${cleanPath}`
  }
  // Fallback to original path
  const cleanPath = categoryPath.replace(/^\/Group\/[^/]+/, '')
  return `/${brandSlug}${cleanPath}`
}

export function getBrandUrl(brandSlug: string): string {
  return `/${brandSlug}`
}
