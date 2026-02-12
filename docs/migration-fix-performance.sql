-- ============================================================
-- XEH.ro - FIX PERFORMANCE ADVISOR WARNINGS
-- ============================================================
-- Run this SQL in Supabase SQL Editor
-- Fixes:
--   1. auth.uid() evaluated per-row → (select auth.uid()) per-query
--   2. is_admin() evaluated per-row → (select is_admin()) per-query
--   3. FOR ALL policies → split into per-action policies
--   4. Multiple overlapping permissive SELECT → consolidated
--   5. user_favorites 5 overlapping policies → 4 clean ones
-- ============================================================

-- ============================================================
-- STEP 1: Fix is_admin() to use (select auth.uid()) internally
-- This makes the function itself evaluate auth.uid() once
-- ============================================================

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
        WHERE id = (select auth.uid()) AND role = 'admin'
    );
END;
$$;

-- ============================================================
-- STEP 2: Drop ALL existing RLS policies (clean slate)
-- ============================================================

-- brands
DROP POLICY IF EXISTS "Public read" ON brands;

-- categories
DROP POLICY IF EXISTS "Public read" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;

-- products
DROP POLICY IF EXISTS "Public read" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;

-- product_images
DROP POLICY IF EXISTS "Public read" ON product_images;
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;

-- product_documents
DROP POLICY IF EXISTS "Public read" ON product_documents;
DROP POLICY IF EXISTS "Admins can manage product documents" ON product_documents;

-- product_relations
DROP POLICY IF EXISTS "Product relations are viewable by everyone" ON product_relations;
DROP POLICY IF EXISTS "Admins can manage product relations" ON product_relations;

-- product_accessories
DROP POLICY IF EXISTS "Public read" ON product_accessories;

-- product_categories
DROP POLICY IF EXISTS "Public read" ON product_categories;

-- product_features
DROP POLICY IF EXISTS "Public read" ON product_features;

-- product_icons
DROP POLICY IF EXISTS "Public read" ON product_icons;

-- partners
DROP POLICY IF EXISTS "Admins can manage partners" ON partners;
DROP POLICY IF EXISTS "Partners can view their own data" ON partners;

-- partner_discount_rules
DROP POLICY IF EXISTS "Admins can manage discounts" ON partner_discount_rules;
DROP POLICY IF EXISTS "Partners can view their discounts" ON partner_discount_rules;

-- quote_requests
DROP POLICY IF EXISTS "Admins can manage all quotes" ON quote_requests;
DROP POLICY IF EXISTS "Anyone can create quotes" ON quote_requests;
DROP POLICY IF EXISTS "Users can view their own quotes" ON quote_requests;

-- quote_items
DROP POLICY IF EXISTS "Quote items follow quote permissions" ON quote_items;

-- user_favorites (had 5 overlapping policies)
DROP POLICY IF EXISTS "Admins can view all favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can add favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can manage own favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can remove their own favorites" ON user_favorites;
DROP POLICY IF EXISTS "Users can view their own favorites" ON user_favorites;

-- user_profiles
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;

-- ============================================================
-- STEP 3: Recreate ALL policies with optimized patterns
-- Rules:
--   (select auth.uid()) instead of auth.uid()
--   (select is_admin()) instead of is_admin()
--   No FOR ALL - separate per-action policies
--   Single SELECT policy per table (consolidated)
-- ============================================================

-- ==========================================
-- brands (public read-only catalog data)
-- ==========================================
CREATE POLICY "brands_select" ON brands
    FOR SELECT USING (true);

-- ==========================================
-- categories (public read, admin write)
-- ==========================================
CREATE POLICY "categories_select" ON categories
    FOR SELECT USING (true);
CREATE POLICY "categories_insert" ON categories
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "categories_update" ON categories
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "categories_delete" ON categories
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- products (public read, admin write)
-- ==========================================
CREATE POLICY "products_select" ON products
    FOR SELECT USING (true);
CREATE POLICY "products_insert" ON products
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "products_update" ON products
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "products_delete" ON products
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- product_images (public read, admin write)
-- ==========================================
CREATE POLICY "product_images_select" ON product_images
    FOR SELECT USING (true);
CREATE POLICY "product_images_insert" ON product_images
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "product_images_update" ON product_images
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "product_images_delete" ON product_images
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- product_documents (public read, admin write)
-- ==========================================
CREATE POLICY "product_documents_select" ON product_documents
    FOR SELECT USING (true);
CREATE POLICY "product_documents_insert" ON product_documents
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "product_documents_update" ON product_documents
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "product_documents_delete" ON product_documents
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- product_relations (public read, admin write)
-- ==========================================
CREATE POLICY "product_relations_select" ON product_relations
    FOR SELECT USING (true);
CREATE POLICY "product_relations_insert" ON product_relations
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "product_relations_update" ON product_relations
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "product_relations_delete" ON product_relations
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- product_accessories (public read-only)
-- ==========================================
CREATE POLICY "product_accessories_select" ON product_accessories
    FOR SELECT USING (true);

-- ==========================================
-- product_categories (public read-only)
-- ==========================================
CREATE POLICY "product_categories_select" ON product_categories
    FOR SELECT USING (true);

-- ==========================================
-- product_features (public read-only)
-- ==========================================
CREATE POLICY "product_features_select" ON product_features
    FOR SELECT USING (true);

-- ==========================================
-- product_icons (public read-only)
-- ==========================================
CREATE POLICY "product_icons_select" ON product_icons
    FOR SELECT USING (true);

-- ==========================================
-- partners (combined select, admin write)
-- ==========================================
CREATE POLICY "partners_select" ON partners
    FOR SELECT USING (
        user_id = (select auth.uid()) OR (select is_admin())
    );
CREATE POLICY "partners_insert" ON partners
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "partners_update" ON partners
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "partners_delete" ON partners
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- partner_discount_rules (combined select, admin write)
-- ==========================================
CREATE POLICY "partner_discount_rules_select" ON partner_discount_rules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM partners
            WHERE partners.id = partner_discount_rules.partner_id
            AND partners.user_id = (select auth.uid())
        )
        OR (select is_admin())
    );
CREATE POLICY "partner_discount_rules_insert" ON partner_discount_rules
    FOR INSERT WITH CHECK ((select is_admin()));
CREATE POLICY "partner_discount_rules_update" ON partner_discount_rules
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "partner_discount_rules_delete" ON partner_discount_rules
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- quote_requests (user view own, anyone insert, admin manage)
-- ==========================================
CREATE POLICY "quote_requests_select" ON quote_requests
    FOR SELECT USING (
        user_id = (select auth.uid()) OR (select is_admin())
    );
CREATE POLICY "quote_requests_insert" ON quote_requests
    FOR INSERT WITH CHECK (
        user_id IS NULL OR user_id = (select auth.uid())
    );
CREATE POLICY "quote_requests_update" ON quote_requests
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "quote_requests_delete" ON quote_requests
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- quote_items (view via quote ownership, admin manage)
-- ==========================================
CREATE POLICY "quote_items_select" ON quote_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM quote_requests
            WHERE quote_requests.id = quote_items.quote_id
            AND (quote_requests.user_id = (select auth.uid()) OR (select is_admin()))
        )
    );
CREATE POLICY "quote_items_insert" ON quote_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM quote_requests
            WHERE quote_requests.id = quote_items.quote_id
            AND (quote_requests.user_id = (select auth.uid()) OR (select is_admin()))
        )
    );
CREATE POLICY "quote_items_update" ON quote_items
    FOR UPDATE USING ((select is_admin()));
CREATE POLICY "quote_items_delete" ON quote_items
    FOR DELETE USING ((select is_admin()));

-- ==========================================
-- user_favorites (user manage own, admin view)
-- Consolidated from 5 overlapping → 4 clean policies
-- ==========================================
CREATE POLICY "user_favorites_select" ON user_favorites
    FOR SELECT USING (
        user_id = (select auth.uid()) OR (select is_admin())
    );
CREATE POLICY "user_favorites_insert" ON user_favorites
    FOR INSERT WITH CHECK (
        user_id = (select auth.uid())
    );
CREATE POLICY "user_favorites_update" ON user_favorites
    FOR UPDATE USING (
        user_id = (select auth.uid())
    );
CREATE POLICY "user_favorites_delete" ON user_favorites
    FOR DELETE USING (
        user_id = (select auth.uid())
    );

-- ==========================================
-- user_profiles (user view/update own, admin view/update all)
-- ==========================================
CREATE POLICY "user_profiles_select" ON user_profiles
    FOR SELECT USING (
        id = (select auth.uid()) OR (select is_admin())
    );
CREATE POLICY "user_profiles_insert" ON user_profiles
    FOR INSERT WITH CHECK (
        id = (select auth.uid())
    );
CREATE POLICY "user_profiles_update" ON user_profiles
    FOR UPDATE USING (
        id = (select auth.uid()) OR (select is_admin())
    );
CREATE POLICY "user_profiles_delete" ON user_profiles
    FOR DELETE USING ((select is_admin()));
