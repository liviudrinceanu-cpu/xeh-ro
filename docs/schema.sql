-- ============================================================
-- XEH.ro - SCHEMA BAZĂ DE DATE SUPABASE
-- ============================================================
-- Rulează acest SQL în Supabase SQL Editor pentru a crea tabelele
-- ============================================================

-- ============================================================
-- 1. ENABLE EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. ENUM TYPES
-- ============================================================

CREATE TYPE brand_type AS ENUM ('rm', 'redfox');
CREATE TYPE stock_status AS ENUM ('in_stock', 'in_transit', 'on_request');
CREATE TYPE power_type AS ENUM ('electric', 'gas', 'electric_gas', 'manual');
CREATE TYPE user_role AS ENUM ('admin', 'partner', 'customer');
CREATE TYPE quote_status AS ENUM ('pending', 'in_progress', 'sent', 'accepted', 'rejected', 'expired');
CREATE TYPE language_type AS ENUM ('ro', 'en');
CREATE TYPE document_type AS ENUM ('manual', 'datasheet', 'declaration', 'drawing', 'brochure', 'certificate');
CREATE TYPE discount_applies_to AS ENUM ('all', 'brand', 'category', 'product');
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');

-- ============================================================
-- 3. CATEGORIES TABLE
-- ============================================================

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL,
    brand brand_type NOT NULL,
    
    -- Hierarchy
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 6),
    path VARCHAR(500) NOT NULL,
    
    -- Content (JSONB for multilingual)
    name_ro VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_ro TEXT,
    description_en TEXT,
    
    -- Visual
    icon VARCHAR(100),
    image_url TEXT,
    
    -- Metadata
    product_count INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    -- SEO
    seo_title_ro VARCHAR(255),
    seo_title_en VARCHAR(255),
    seo_description_ro TEXT,
    seo_description_en TEXT,
    seo_keywords TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(brand, slug),
    UNIQUE(brand, path)
);

-- Index for faster queries
CREATE INDEX idx_categories_brand ON categories(brand);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_path ON categories(path);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = true;

-- ============================================================
-- 4. PRODUCTS TABLE
-- ============================================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) NOT NULL UNIQUE,
    model VARCHAR(100) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    
    -- Brand & Category
    brand brand_type NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    category_path VARCHAR(500) NOT NULL,
    
    -- Content
    name_ro VARCHAR(500) NOT NULL,
    name_en VARCHAR(500) NOT NULL,
    short_description_ro TEXT,
    short_description_en TEXT,
    description_ro TEXT,
    description_en TEXT,
    
    -- Key Features (JSONB array)
    key_features_ro TEXT[],
    key_features_en TEXT[],
    
    -- Price & Stock
    price_amount DECIMAL(10,2),
    price_currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    price_vat_included BOOLEAN NOT NULL DEFAULT false,
    stock_status stock_status NOT NULL DEFAULT 'on_request',
    delivery_time VARCHAR(100),
    
    -- Dimensions (mm)
    dim_net_width INTEGER,
    dim_net_depth INTEGER,
    dim_net_height INTEGER,
    dim_gross_width INTEGER,
    dim_gross_depth INTEGER,
    dim_gross_height INTEGER,
    
    -- Weight (kg)
    weight_net DECIMAL(8,2),
    weight_gross DECIMAL(8,2),
    
    -- Power
    power_type power_type NOT NULL DEFAULT 'electric',
    electric_voltage VARCHAR(50),
    electric_phases VARCHAR(20),
    electric_frequency VARCHAR(20),
    electric_power_kw DECIMAL(8,3),
    gas_type VARCHAR(50),
    gas_power_kw DECIMAL(8,3),
    gas_consumption VARCHAR(50),
    
    -- Technical Specifications (JSONB for flexibility)
    specifications JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    -- External Link
    source_url TEXT NOT NULL,
    
    -- Flags
    is_new BOOLEAN NOT NULL DEFAULT false,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- SEO
    seo_title_ro VARCHAR(255),
    seo_title_en VARCHAR(255),
    seo_description_ro TEXT,
    seo_description_en TEXT,
    seo_keywords TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(brand, slug)
);

-- Indexes
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_category_path ON products(category_path);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_model ON products(model);
CREATE INDEX idx_products_price ON products(price_amount);
CREATE INDEX idx_products_stock ON products(stock_status);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_new ON products(is_new) WHERE is_new = true;
CREATE INDEX idx_products_popular ON products(is_popular) WHERE is_popular = true;

-- Full-text search
CREATE INDEX idx_products_search_ro ON products USING GIN (to_tsvector('romanian', name_ro || ' ' || COALESCE(description_ro, '')));
CREATE INDEX idx_products_search_en ON products USING GIN (to_tsvector('english', name_en || ' ' || COALESCE(description_en, '')));

-- ============================================================
-- 5. PRODUCT IMAGES TABLE
-- ============================================================

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    url TEXT NOT NULL,
    cloudinary_id VARCHAR(255),
    alt_ro VARCHAR(255),
    alt_en VARCHAR(255),
    
    is_primary BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    width INTEGER,
    height INTEGER,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_images_primary ON product_images(product_id, is_primary) WHERE is_primary = true;

-- ============================================================
-- 6. PRODUCT DOCUMENTS TABLE
-- ============================================================

CREATE TABLE product_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    doc_type document_type NOT NULL,
    language language_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    file_size INTEGER,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_documents_product ON product_documents(product_id);

-- ============================================================
-- 7. PRODUCT RELATIONS TABLE (Accessories, Related)
-- ============================================================

CREATE TABLE product_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    related_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    relation_type VARCHAR(50) NOT NULL, -- 'accessory', 'related', 'replacement'
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(product_id, related_product_id, relation_type)
);

CREATE INDEX idx_product_relations_product ON product_relations(product_id);

-- ============================================================
-- 8. USER PROFILES TABLE (extends Supabase Auth)
-- ============================================================

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    
    -- Company Info (for B2B partners)
    company_name VARCHAR(255),
    company_cui VARCHAR(50),
    company_reg_com VARCHAR(100),
    
    -- Address
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_county VARCHAR(100),
    address_postal_code VARCHAR(20),
    address_country VARCHAR(100) DEFAULT 'România',
    
    -- Billing Address (if different)
    billing_street VARCHAR(255),
    billing_city VARCHAR(100),
    billing_county VARCHAR(100),
    billing_postal_code VARCHAR(20),
    billing_country VARCHAR(100),
    
    -- Preferences
    preferred_language language_type NOT NULL DEFAULT 'ro',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

-- ============================================================
-- 9. PARTNERS TABLE (B2B System)
-- ============================================================

CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- Company Info (duplicated from user_profiles for quick access)
    company_name VARCHAR(255),
    cui VARCHAR(50),
    reg_com VARCHAR(100),
    address TEXT,

    is_approved BOOLEAN NOT NULL DEFAULT false,
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES user_profiles(id),

    credit_limit DECIMAL(10,2),
    payment_terms INTEGER, -- days

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_partners_user ON partners(user_id);
CREATE INDEX idx_partners_approved ON partners(is_approved) WHERE is_approved = true;

-- ============================================================
-- 10. PARTNER DISCOUNT RULES TABLE
-- ============================================================

CREATE TABLE partner_discount_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    
    applies_to discount_applies_to NOT NULL DEFAULT 'all',
    brand brand_type,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    
    discount_type discount_type NOT NULL DEFAULT 'percentage',
    discount_value DECIMAL(10,2) NOT NULL,
    
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    
    min_quantity INTEGER,
    min_order_value DECIMAL(10,2),
    
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_discount_rules_partner ON partner_discount_rules(partner_id);
CREATE INDEX idx_discount_rules_active ON partner_discount_rules(is_active) WHERE is_active = true;

-- ============================================================
-- 11. QUOTE REQUESTS TABLE
-- ============================================================

CREATE TABLE quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number VARCHAR(50) NOT NULL UNIQUE,
    
    user_id UUID REFERENCES user_profiles(id),
    
    -- Contact Info
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_company VARCHAR(255),
    contact_message TEXT,
    
    status quote_status NOT NULL DEFAULT 'pending',
    
    customer_notes TEXT,
    internal_notes TEXT,
    
    -- Response (JSONB for flexibility)
    response JSONB,
    
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quotes_user ON quote_requests(user_id);
CREATE INDEX idx_quotes_status ON quote_requests(status);
CREATE INDEX idx_quotes_number ON quote_requests(quote_number);

-- ============================================================
-- 12. QUOTE ITEMS TABLE
-- ============================================================

CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    
    -- Snapshot at request time
    product_name VARCHAR(500) NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    
    quantity INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quote_items_quote ON quote_items(quote_id);

-- ============================================================
-- 13. AUTO-UPDATE TIMESTAMPS TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_discount_rules_updated_at BEFORE UPDATE ON partner_discount_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 14. USER FAVORITES TABLE
-- ============================================================

CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent duplicate favorites
    UNIQUE(user_id, product_id)
);

CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_product ON user_favorites(product_id);

-- ============================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Helper function to check admin status (SECURITY DEFINER avoids recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$;

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_discount_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Product Relations: Public read, admin write
CREATE POLICY "Product relations are viewable by everyone" ON product_relations FOR SELECT USING (true);
CREATE POLICY "Admins can manage product relations" ON product_relations FOR ALL USING (is_admin());

-- Categories: Public read, admin write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (is_admin());

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (is_admin());

-- Product Images: Public read
CREATE POLICY "Product images are viewable by everyone" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admins can manage product images" ON product_images FOR ALL USING (is_admin());

-- Product Documents: Public read
CREATE POLICY "Product documents are viewable by everyone" ON product_documents FOR SELECT USING (true);
CREATE POLICY "Admins can manage product documents" ON product_documents FOR ALL USING (is_admin());

-- User Profiles: Users can read/update their own, admins can see all
CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON user_profiles FOR UPDATE USING (is_admin());

-- Partners: Users see their own, admins see all
CREATE POLICY "Partners can view their own data" ON partners FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage partners" ON partners FOR ALL USING (is_admin());

-- Discount Rules: Partners see their own
CREATE POLICY "Partners can view their discounts" ON partner_discount_rules FOR SELECT USING (
    EXISTS (SELECT 1 FROM partners WHERE id = partner_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage discounts" ON partner_discount_rules FOR ALL USING (is_admin());

-- Quotes: Users see their own, admins see all
CREATE POLICY "Users can view their own quotes" ON quote_requests FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Anyone can create quotes" ON quote_requests FOR INSERT WITH CHECK (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Admins can manage all quotes" ON quote_requests FOR ALL USING (is_admin());

-- Quote Items: Follow quote permissions
CREATE POLICY "Quote items follow quote permissions" ON quote_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM quote_requests WHERE id = quote_id AND (user_id = auth.uid() OR is_admin()))
);
CREATE POLICY "Anyone can create quote items" ON quote_items FOR INSERT WITH CHECK (true);

-- User Favorites: Users can manage their own
CREATE POLICY "Users can view their own favorites" ON user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own favorites" ON user_favorites FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all favorites" ON user_favorites FOR SELECT USING (is_admin());

-- Grant permissions
GRANT SELECT, INSERT, DELETE ON user_favorites TO authenticated;

-- ============================================================
-- 16. HELPER FUNCTIONS
-- ============================================================

-- Generate quote number
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    year_part TEXT;
    seq_part TEXT;
    count_today INTEGER;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    SELECT COUNT(*) + 1 INTO count_today FROM quote_requests
    WHERE DATE(created_at) = CURRENT_DATE;
    seq_part := LPAD(count_today::TEXT, 5, '0');
    RETURN 'XEH-' || year_part || '-' || seq_part;
END;
$$;

-- Auto-generate quote number on insert
CREATE OR REPLACE FUNCTION set_quote_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF NEW.quote_number IS NULL THEN
        NEW.quote_number := generate_quote_number();
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER set_quote_number_trigger
    BEFORE INSERT ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION set_quote_number();

-- Update category product count
CREATE OR REPLACE FUNCTION update_category_product_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE categories SET product_count = product_count + 1 WHERE id = NEW.category_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE categories SET product_count = product_count - 1 WHERE id = OLD.category_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.category_id != OLD.category_id THEN
        UPDATE categories SET product_count = product_count - 1 WHERE id = OLD.category_id;
        UPDATE categories SET product_count = product_count + 1 WHERE id = NEW.category_id;
    END IF;
    RETURN NULL;
END;
$$;

CREATE TRIGGER update_category_count
    AFTER INSERT OR DELETE OR UPDATE OF category_id ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_category_product_count();
