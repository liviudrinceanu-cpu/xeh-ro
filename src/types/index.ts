export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  categorySlug: string
  categoryName: string
  images: string[]
  specifications: ProductSpecification[]
  features: string[]
  brand?: string
  model?: string
  sku?: string
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
