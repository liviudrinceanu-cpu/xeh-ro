// ============================================================
// XEH.ro - SCHEMA TYPESCRIPT COMPLETĂ
// ============================================================
// Structură de date pentru echipamente HoReCa
// Branduri: RM Gastro (premium) + REDFOX (economic)
// ============================================================

// ============================================================
// 1. ENUMS - Valori fixe reutilizabile
// ============================================================

/** Brandurile disponibile pe platformă */
export enum Brand {
  RM = 'rm',
  REDFOX = 'redfox'
}

/** Starea stocului pentru un produs */
export enum StockStatus {
  IN_STOCK = 'in_stock',           // "Stoc la depozitul central"
  IN_TRANSIT = 'in_transit',       // "Pe drum"
  ON_REQUEST = 'on_request'        // "La cerere"
}

/** Tipul de alimentare al echipamentului */
export enum PowerType {
  ELECTRIC = 'electric',
  GAS = 'gas',
  ELECTRIC_GAS = 'electric_gas',   // Combinat
  MANUAL = 'manual'                // Fără alimentare (mese, rafturi)
}

/** Tipul de utilizator în sistem */
export enum UserRole {
  ADMIN = 'admin',                 // Administrare completă
  PARTNER = 'partner',             // Partener B2B cu discounturi
  CUSTOMER = 'customer'            // Vizitator / client obișnuit
}

/** Starea unei cereri de ofertă */
export enum QuoteStatus {
  PENDING = 'pending',             // Nou, neprocesat
  IN_PROGRESS = 'in_progress',     // În lucru
  SENT = 'sent',                   // Ofertă trimisă
  ACCEPTED = 'accepted',           // Acceptată de client
  REJECTED = 'rejected',           // Refuzată
  EXPIRED = 'expired'              // Expirată
}

/** Limbile suportate */
export enum Language {
  RO = 'ro',
  EN = 'en'
}

// ============================================================
// 2. TIPURI DE BAZĂ - Structuri comune
// ============================================================

/** Dimensiuni standard (în milimetri) */
export interface Dimensions {
  width: number;      // Lățime [mm]
  depth: number;      // Adâncime [mm]
  height: number;     // Înălțime [mm]
}

/** Greutate (în kilograme) */
export interface Weight {
  net: number;        // Greutate netă [kg]
  gross: number;      // Greutate brută [kg]
}

/** Alimentare electrică */
export interface ElectricPower {
  voltage: string;           // Ex: "400 V"
  phases: string;            // Ex: "3N"
  frequency: string;         // Ex: "50 Hz"
  power_kw: number;          // Putere în kW
  formatted: string;         // Ex: "400 V / 3N - 50 Hz"
}

/** Alimentare pe gaz */
export interface GasPower {
  gas_type: string;          // Ex: "Natural gas", "LPG"
  power_kw: number;          // Putere în kW
  consumption: string;       // Ex: "1.2 m³/h"
}

/** Preț cu monedă */
export interface Price {
  amount: number | null;     // null = "La cerere"
  currency: 'EUR' | 'RON';
  vat_included: boolean;     // true = cu TVA, false = fără TVA
}

/** Imagine cu metadata */
export interface ProductImage {
  id: string;
  url: string;               // URL Cloudinary
  alt: string;               // Text alternativ
  is_primary: boolean;       // Imagine principală
  order: number;             // Ordine în galerie
  width?: number;
  height?: number;
}

/** Document/PDF descărcabil */
export interface ProductDocument {
  id: string;
  type: 'manual' | 'datasheet' | 'declaration' | 'drawing' | 'brochure' | 'certificate';
  language: Language;
  title: string;
  url: string;               // URL către PDF
  file_size?: number;        // Dimensiune în bytes
}

/** Conținut multilingv */
export interface LocalizedContent {
  ro: string;
  en: string;
}

/** Timestamps standard */
export interface Timestamps {
  created_at: string;        // ISO 8601
  updated_at: string;        // ISO 8601
}

/** SEO metadata */
export interface SEOMetadata {
  title: LocalizedContent;
  description: LocalizedContent;
  keywords: string[];
  og_image?: string;
}

// ============================================================
// 3. CATEGORII - Structură ierarhică (până la 6 nivele)
// ============================================================

/** Categorie de produse */
export interface Category {
  // Identificare
  id: string;                      // UUID
  slug: string;                    // URL-friendly: "friteuze-electrice"
  brand: Brand;                    // RM sau REDFOX
  
  // Ierarhie
  parent_id: string | null;        // null = categorie principală
  level: number;                   // 1-6 (adâncime în ierarhie)
  path: string;                    // Ex: "rm-700/friteuze/electrice"
  
  // Conținut
  name: LocalizedContent;          // Nume în RO și EN
  description?: LocalizedContent;  // Descriere opțională
  
  // Vizual
  icon?: string;                   // Nume icon Lucide: "flame", "snowflake"
  image?: string;                  // URL imagine reprezentativă
  
  // Metadata
  product_count: number;           // Număr produse în categorie
  is_active: boolean;              // Vizibilă pe site
  order: number;                   // Ordine în meniu
  
  // SEO
  seo?: SEOMetadata;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

/** Categorie cu subcategorii (pentru navigare) */
export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

/** Breadcrumb pentru navigare */
export interface Breadcrumb {
  name: string;
  slug: string;
  url: string;
}

// ============================================================
// 4. PRODUSE - Structura completă
// ============================================================

/** Produs HoReCa */
export interface Product {
  // ─────────────────────────────────────────────────────────
  // IDENTIFICARE
  // ─────────────────────────────────────────────────────────
  id: string;                      // UUID intern
  sku: string;                     // Cod SAP/produs: "00008526"
  model: string;                   // Model: "FE 740/17 E"
  slug: string;                    // URL: "friteuza-electrica-fe-740-17-e"
  
  // ─────────────────────────────────────────────────────────
  // BRAND & CATEGORIE
  // ─────────────────────────────────────────────────────────
  brand: Brand;
  category_id: string;             // Referință la Category
  category_path: string;           // Ex: "rm-700/friteuze/electrice"
  
  // ─────────────────────────────────────────────────────────
  // CONȚINUT
  // ─────────────────────────────────────────────────────────
  name: LocalizedContent;          // Nume complet
  short_description?: LocalizedContent;  // Descriere scurtă (listing)
  description?: LocalizedContent;  // Descriere completă
  
  // ─────────────────────────────────────────────────────────
  // PROPRIETĂȚI CHEIE (afișate prominent)
  // ─────────────────────────────────────────────────────────
  key_features: LocalizedContent[];  // Lista de bullet points
  
  // ─────────────────────────────────────────────────────────
  // PREȚ & DISPONIBILITATE
  // ─────────────────────────────────────────────────────────
  price: Price;
  stock_status: StockStatus;
  delivery_time?: string;          // Ex: "2-3 săptămâni"
  
  // ─────────────────────────────────────────────────────────
  // DIMENSIUNI & GREUTATE
  // ─────────────────────────────────────────────────────────
  dimensions_net: Dimensions;      // Dimensiuni produs
  dimensions_gross: Dimensions;    // Dimensiuni ambalat
  weight: Weight;
  
  // ─────────────────────────────────────────────────────────
  // ALIMENTARE
  // ─────────────────────────────────────────────────────────
  power_type: PowerType;
  electric_power?: ElectricPower;
  gas_power?: GasPower;
  
  // ─────────────────────────────────────────────────────────
  // SPECIFICAȚII TEHNICE (key-value dinamic)
  // ─────────────────────────────────────────────────────────
  specifications: ProductSpecification[];
  
  // ─────────────────────────────────────────────────────────
  // MEDIA
  // ─────────────────────────────────────────────────────────
  images: ProductImage[];
  documents: ProductDocument[];
  videos?: ProductVideo[];
  
  // ─────────────────────────────────────────────────────────
  // RELAȚII
  // ─────────────────────────────────────────────────────────
  accessories?: string[];          // ID-uri produse accesorii
  related_products?: string[];     // ID-uri produse similare
  
  // ─────────────────────────────────────────────────────────
  // LINK EXTERN
  // ─────────────────────────────────────────────────────────
  source_url: string;              // URL original pe rm.rmgastro.com
  
  // ─────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────
  is_new: boolean;                 // Badge "NOU"
  is_popular: boolean;             // Badge "POPULAR"
  is_active: boolean;              // Vizibil pe site
  
  // SEO
  seo?: SEOMetadata;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

/** Specificație tehnică (key-value) */
export interface ProductSpecification {
  key: string;                     // Ex: "basin_volume"
  label: LocalizedContent;         // Ex: { ro: "Volum bazin", en: "Basin volume" }
  value: string;                   // Ex: "17"
  unit?: string;                   // Ex: "l" (litri)
  formatted: LocalizedContent;     // Ex: { ro: "17 litri", en: "17 liters" }
  group?: string;                  // Grupare: "dimensions", "power", "capacity"
  order: number;                   // Ordine afișare
}

/** Video produs */
export interface ProductVideo {
  id: string;
  type: 'youtube' | 'vimeo' | 'hosted';
  url: string;
  title?: string;
  thumbnail?: string;
}

/** Produs în format listing (mai puține date) */
export interface ProductListItem {
  id: string;
  sku: string;
  model: string;
  slug: string;
  brand: Brand;
  name: LocalizedContent;
  price: Price;
  stock_status: StockStatus;
  primary_image?: ProductImage;
  category_path: string;
  is_new: boolean;
  is_popular: boolean;
}

// ============================================================
// 5. UTILIZATORI & AUTENTIFICARE (Supabase Auth)
// ============================================================

/** Profil utilizator (extinde Supabase Auth User) */
export interface UserProfile {
  id: string;                      // UUID (din Supabase Auth)
  email: string;
  role: UserRole;
  
  // Date personale
  first_name?: string;
  last_name?: string;
  phone?: string;
  
  // Date companie (pentru parteneri B2B)
  company?: CompanyInfo;
  
  // Preferințe
  preferred_language: Language;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

/** Informații companie (pentru parteneri B2B) */
export interface CompanyInfo {
  name: string;                    // Denumire firmă
  cui: string;                     // CUI / CIF
  reg_com: string;                 // Nr. Registrul Comerțului
  address: Address;
  billing_address?: Address;       // Dacă diferă de adresa principală
  contact_person?: string;
  contact_phone?: string;
  contact_email?: string;
}

/** Adresă */
export interface Address {
  street: string;
  city: string;
  county: string;                  // Județ
  postal_code: string;
  country: string;                 // Default: "România"
}

// ============================================================
// 6. SISTEM PARTENERI B2B - Discounturi
// ============================================================

/** Partener B2B cu sistem de discounturi */
export interface Partner {
  id: string;
  user_id: string;                 // Referință la UserProfile
  
  // Status
  is_approved: boolean;            // Aprobat de admin
  approved_at?: string;
  approved_by?: string;            // Admin ID
  
  // Discounturi
  discount_rules: DiscountRule[];
  
  // Credit
  credit_limit?: number;           // Limită credit EUR
  payment_terms?: number;          // Zile plată (ex: 30)
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

/** Regulă de discount pentru partener */
export interface DiscountRule {
  id: string;
  
  // Aplicabilitate
  applies_to: 'all' | 'brand' | 'category' | 'product';
  brand?: Brand;                   // Dacă applies_to = 'brand'
  category_id?: string;            // Dacă applies_to = 'category'
  product_id?: string;             // Dacă applies_to = 'product'
  
  // Discount
  discount_type: 'percentage' | 'fixed';
  discount_value: number;          // % sau EUR
  
  // Valabilitate
  valid_from?: string;
  valid_until?: string;
  
  // Condiții
  min_quantity?: number;           // Cantitate minimă
  min_order_value?: number;        // Valoare minimă comandă EUR
  
  is_active: boolean;
}

/** Preț calculat pentru partener */
export interface PartnerPrice {
  original_price: Price;
  discount_applied: number;        // % sau EUR
  final_price: Price;
  discount_rule_id?: string;
}

// ============================================================
// 7. CERERI DE OFERTĂ
// ============================================================

/** Cerere de ofertă */
export interface QuoteRequest {
  id: string;
  quote_number: string;            // Ex: "XEH-2024-00123"
  
  // Client
  user_id?: string;                // Null dacă nu e logat
  contact: QuoteContact;
  
  // Produse solicitate
  items: QuoteItem[];
  
  // Status
  status: QuoteStatus;
  
  // Note
  customer_notes?: string;         // Note de la client
  internal_notes?: string;         // Note interne (admin)
  
  // Răspuns
  response?: QuoteResponse;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

/** Contact pentru cerere ofertă */
export interface QuoteContact {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
}

/** Produs în cererea de ofertă */
export interface QuoteItem {
  product_id: string;
  product_name: string;            // Snapshot la momentul cererii
  product_sku: string;
  quantity: number;
  notes?: string;
}

/** Răspuns la cererea de ofertă */
export interface QuoteResponse {
  items: QuoteResponseItem[];
  subtotal: Price;
  discount?: number;
  total: Price;
  valid_until: string;
  payment_terms?: string;
  delivery_terms?: string;
  notes?: string;
  created_at: string;
  created_by: string;              // Admin ID
}

/** Produs în răspunsul la ofertă */
export interface QuoteResponseItem {
  product_id: string;
  quantity: number;
  unit_price: Price;
  discount?: number;
  line_total: Price;
}

// ============================================================
// 8. SEARCH & FILTRE (Meilisearch)
// ============================================================

/** Document produs pentru indexare Meilisearch */
export interface ProductSearchDocument {
  id: string;
  sku: string;
  model: string;
  brand: Brand;
  category_path: string;
  name_ro: string;
  name_en: string;
  description_ro?: string;
  description_en?: string;
  price_amount: number | null;
  stock_status: StockStatus;
  is_new: boolean;
  is_popular: boolean;
  specifications: Record<string, string>;  // Flatten pentru search
  created_at: number;              // Timestamp pentru sorting
}

/** Filtre pentru căutare produse */
export interface ProductFilters {
  brand?: Brand[];
  category_id?: string;
  price_min?: number;
  price_max?: number;
  stock_status?: StockStatus[];
  power_type?: PowerType[];
  is_new?: boolean;
  is_popular?: boolean;
  specifications?: Record<string, string[]>;  // Ex: { material: ['AISI 304'] }
}

/** Opțiuni de sortare */
export type ProductSortOption = 
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'newest'
  | 'popular';

/** Rezultat paginat */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// ============================================================
// 9. API RESPONSES
// ============================================================

/** Răspuns API standard */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    timestamp: string;
    request_id: string;
  };
}

/** Eroare API */
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================================
// 10. CONFIGURĂRI SITE
// ============================================================

/** Configurare brand */
export interface BrandConfig {
  id: Brand;
  name: string;
  tagline: LocalizedContent;
  logo_url: string;
  color_primary: string;           // Ex: "#1D1D1F" pentru RM
  color_secondary: string;
  source_website: string;          // Ex: "https://rm.rmgastro.com"
  is_active: boolean;
}

/** Configurare globală site */
export interface SiteConfig {
  site_name: string;
  site_tagline: LocalizedContent;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  address: Address;
  social_links: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo_defaults: SEOMetadata;
  brands: BrandConfig[];
}
