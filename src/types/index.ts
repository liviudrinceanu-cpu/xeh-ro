export interface Brand {
  id: string
  slug: string
  name: string
  shortName: string
  description: string
  tagline: string
  logo: string
  color: string
  accentColor: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
  brandSlug?: string
  parentSlug?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  categorySlug: string
  categoryName: string
  brandSlug: string
  images: string[]
  specifications: ProductSpecification[]
  features: string[]
  priceEUR: number
  brand?: string
  model?: string
  sku?: string
  isNew?: boolean
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}

export interface QuoteRequestFormData {
  name: string
  email: string
  phone: string
  company?: string
  productName?: string
  productId?: string
  quantity: number
  message: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
