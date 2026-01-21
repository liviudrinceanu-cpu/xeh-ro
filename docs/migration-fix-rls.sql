-- ============================================================
-- XEH.ro - FIX RLS POLICIES MIGRATION
-- ============================================================
-- Run this SQL in Supabase SQL Editor to fix RLS issues:
-- 1. Infinite recursion in user_profiles policy
-- 2. Missing user_favorites table
-- ============================================================

-- ============================================================
-- STEP 1: Create a SECURITY DEFINER function to check admin status
-- This avoids recursion by running with elevated privileges
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================
-- STEP 2: Drop problematic user_profiles policies
-- ============================================================

DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage all quotes" ON quote_requests;
DROP POLICY IF EXISTS "Admins can manage partners" ON partners;
DROP POLICY IF EXISTS "Admins can manage discounts" ON partner_discount_rules;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;
DROP POLICY IF EXISTS "Admins can manage product documents" ON product_documents;
DROP POLICY IF EXISTS "Quote items follow quote permissions" ON quote_items;

-- ============================================================
-- STEP 3: Recreate policies using the is_admin() function
-- ============================================================

-- User Profiles: Admins can view all
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT USING (is_admin());

-- Admins can update any profile
CREATE POLICY "Admins can update all profiles" ON user_profiles FOR UPDATE USING (is_admin());

-- Categories: Admin write
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (is_admin());

-- Products: Admin write
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (is_admin());

-- Product Images: Admin write
CREATE POLICY "Admins can manage product images" ON product_images FOR ALL USING (is_admin());

-- Product Documents: Admin write
CREATE POLICY "Admins can manage product documents" ON product_documents FOR ALL USING (is_admin());

-- Partners: Admin manage
CREATE POLICY "Admins can manage partners" ON partners FOR ALL USING (is_admin());

-- Discount Rules: Admin manage
CREATE POLICY "Admins can manage discounts" ON partner_discount_rules FOR ALL USING (is_admin());

-- Quotes: Admin manage all
CREATE POLICY "Admins can manage all quotes" ON quote_requests FOR ALL USING (is_admin());

-- Quote Items: Fixed to avoid recursion
CREATE POLICY "Quote items follow quote permissions" ON quote_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM quote_requests
        WHERE id = quote_id AND (user_id = auth.uid() OR is_admin())
    )
);

-- ============================================================
-- STEP 4: Create user_favorites table
-- ============================================================

CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Prevent duplicate favorites
    UNIQUE(user_id, product_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_product ON user_favorites(product_id);

-- Enable RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 5: RLS Policies for user_favorites
-- ============================================================

-- Users can view their own favorites
CREATE POLICY "Users can view their own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Users can add to their own favorites
CREATE POLICY "Users can add favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can remove their own favorites
CREATE POLICY "Users can remove their own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Admins can view all favorites
CREATE POLICY "Admins can view all favorites" ON user_favorites
    FOR SELECT USING (is_admin());

-- ============================================================
-- STEP 6: Grant permissions to authenticated users
-- ============================================================

GRANT SELECT, INSERT, DELETE ON user_favorites TO authenticated;

-- ============================================================
-- DONE! RLS policies are now fixed.
-- ============================================================
