// ============================================================
// XEH.ro - Database Types
// ============================================================

export type Brand = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  brand_id: string
  parent_id: string | null
  name: string
  name_ro: string | null
  slug: string
  slug_ro: string | null
  path: string
  path_ro: string | null
  depth: number
  product_count?: number
  created_at: string
  updated_at: string
  // Joined data
  brand?: Brand
  parent?: Category
  children?: Category[]
}

export type StockStatus = 'in_stock' | 'in_transit' | 'on_request'

export type Product = {
  id: string
  sap_code: string
  model: string
  slug_ro: string | null
  brand_id: string
  title_en: string | null
  title_ro: string | null
  price_amount: number | null
  price_currency: string
  price_vat_included: boolean
  stock_status: StockStatus
  source_url: string | null
  scraped_at: string | null
  created_at: string
  updated_at: string
  // Joined data
  brand?: Brand
  product_images?: ProductImage[]
  product_specifications?: ProductSpecification[]
  product_features?: ProductFeature[]
  product_documents?: ProductDocument[]
  product_categories?: ProductCategory[]
  product_accessories?: ProductAccessory[]
  product_icons?: ProductIcon[]
}

export type ProductImage = {
  id: string
  product_id: string
  original_url: string
  cloudinary_url: string | null
  cloudinary_public_id: string | null
  is_primary: boolean
  sort_order: number
  created_at: string
}

export type ProductSpecification = {
  id: string
  product_id: string
  spec_key: string
  label: string
  label_ro: string | null
  value: string
  value_ro: string | null
  unit: string | null
  sort_order: number
}

export type ProductFeature = {
  id: string
  product_id: string
  label: string
  label_ro: string | null
  value: string
  value_ro: string | null
  sort_order: number
}

export type ProductDocument = {
  id: string
  product_id: string
  doc_type: string
  language: string
  title: string
  url: string
  sort_order: number
  created_at: string
}

export type ProductCategory = {
  id: string
  product_id: string
  category_id: string
  is_primary: boolean
  category?: Category
}

export type ProductAccessory = {
  id: string
  product_id: string
  accessory_sap_code: string
  accessory_title: string
  accessory_url: string | null
  thumbnail_url: string | null
  sort_order: number
}

export type ProductIcon = {
  id: string
  product_id: string
  name: string
  original_url: string
  cloudinary_url: string | null
  sort_order: number
}

// ============================================================
// Extended Types with Relations
// ============================================================

export type ProductWithDetails = Product & {
  brand: Brand
  product_images: ProductImage[]
  product_specifications: ProductSpecification[]
  product_features: ProductFeature[]
  product_documents: ProductDocument[]
  product_categories: (ProductCategory & { category: Category })[]
  product_accessories: ProductAccessory[]
  product_icons: ProductIcon[]
}

export type CategoryWithProducts = Category & {
  products: Product[]
}

export type BrandWithCategories = Brand & {
  categories: Category[]
}

// ============================================================
// API Response Types
// ============================================================

export type PaginatedResponse<T> = {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

export type ApiError = {
  message: string
  code?: string
}

// ============================================================
// Form Types
// ============================================================

export type QuoteRequestForm = {
  contact_name: string
  contact_email: string
  contact_phone: string
  contact_company?: string
  contact_message?: string
  products: {
    product_id: string
    quantity: number
  }[]
}

export type ContactForm = {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

// ============================================================
// Auth & User Types
// ============================================================

export type UserRole = 'admin' | 'partner' | 'customer'

export type UserProfile = {
  id: string
  email: string
  role: UserRole
  first_name: string | null
  last_name: string | null
  phone: string | null
  company_name: string | null
  company_cui: string | null
  company_reg_com: string | null
  address_street: string | null
  address_city: string | null
  address_county: string | null
  address_postal_code: string | null
  address_country: string | null
  billing_street: string | null
  billing_city: string | null
  billing_county: string | null
  billing_postal_code: string | null
  billing_country: string | null
  preferred_language: 'ro' | 'en'
  created_at: string
  updated_at: string
  last_login_at: string | null
}

export type Partner = {
  id: string
  user_id: string
  is_approved: boolean
  approved_at: string | null
  approved_by: string | null
  credit_limit: number | null
  payment_terms: number | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined data
  user_profile?: UserProfile
  discount_rules?: PartnerDiscountRule[]
}

export type DiscountAppliesTo = 'all' | 'brand' | 'category' | 'product'
export type DiscountType = 'percentage' | 'fixed'

export type PartnerDiscountRule = {
  id: string
  partner_id: string
  applies_to: DiscountAppliesTo
  brand: string | null
  category_id: string | null
  product_id: string | null
  discount_type: DiscountType
  discount_value: number
  valid_from: string | null
  valid_until: string | null
  min_quantity: number | null
  min_order_value: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type QuoteStatus = 'pending' | 'in_progress' | 'sent' | 'accepted' | 'rejected' | 'expired'

export type QuoteRequest = {
  id: string
  quote_number: string
  user_id: string | null
  contact_name: string
  contact_email: string
  contact_phone: string
  contact_company: string | null
  contact_message: string | null
  status: QuoteStatus
  customer_notes: string | null
  internal_notes: string | null
  response: Record<string, unknown> | null
  expires_at: string | null
  created_at: string
  updated_at: string
  // Joined data
  quote_items?: QuoteItem[]
}

export type QuoteItem = {
  id: string
  quote_id: string
  product_id: string
  product_name: string
  product_sku: string | null
  quantity: number
  notes: string | null
  created_at: string
  // Joined data
  product?: Product
}

export type UserFavorite = {
  id: string
  user_id: string
  product_id: string
  created_at: string
  // Joined data
  product?: Product
}

// ============================================================
// Auth Form Types
// ============================================================

export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = {
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  phone: string
  company_name: string
  company_cui: string
  company_reg_com?: string
  address_street?: string
  address_city?: string
  address_county?: string
  address_postal_code?: string
  gdpr_consent: boolean
}
