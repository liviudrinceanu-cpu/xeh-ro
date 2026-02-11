-- ============================================================
-- XEH.ro - FIX SUPABASE LINTER ERRORS & WARNINGS
-- ============================================================
-- Run this SQL in Supabase SQL Editor
-- Fixes:
--   ERRORS:
--     1. RLS disabled on "Category" (PascalCase table)
--     2. RLS disabled on "Product" (PascalCase table)
--     3. RLS disabled on product_relations
--   WARNINGS:
--     4. Function search_path mutable (5 functions)
--     5. RLS policy always true on quote_requests INSERT
--     6. Leaked password protection (Dashboard setting - see note)
-- ============================================================

-- ============================================================
-- STEP 1: Drop PascalCase legacy tables (unused, created by ORM)
-- APPLIED: 2026-02-11
-- ============================================================

DROP TABLE IF EXISTS public."Category" CASCADE;
DROP TABLE IF EXISTS public."Product" CASCADE;

-- ============================================================
-- STEP 2: Enable RLS on product_relations
-- ============================================================

ALTER TABLE product_relations ENABLE ROW LEVEL SECURITY;

-- Public read access (product relations are catalog data)
CREATE POLICY "Product relations are viewable by everyone"
    ON product_relations FOR SELECT USING (true);

-- Admins can manage relations
CREATE POLICY "Admins can manage product relations"
    ON product_relations FOR ALL USING (is_admin());

-- ============================================================
-- STEP 3: Fix function search_path (5 functions)
-- Set search_path to prevent search_path injection attacks
-- ============================================================

-- 3a. Fix update_updated_at
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

-- 3b. Fix generate_quote_number
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

-- 3c. Fix set_quote_number
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

-- 3d. Fix update_category_product_count
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

-- 3e. Fix is_admin (keep SECURITY DEFINER + STABLE)
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

-- ============================================================
-- STEP 4: Fix "Anyone can create quotes" RLS policy
-- Replace always-true INSERT with a check that prevents
-- impersonation (user_id must be null or match auth.uid())
-- ============================================================

DROP POLICY IF EXISTS "Anyone can create quotes" ON quote_requests;

CREATE POLICY "Anyone can create quotes"
    ON quote_requests FOR INSERT
    WITH CHECK (
        user_id IS NULL OR user_id = auth.uid()
    );

-- ============================================================
-- STEP 5: Leaked Password Protection
-- ============================================================
-- This is a Supabase Dashboard setting, NOT a SQL fix.
-- Go to: Supabase Dashboard → Authentication → Providers → Email
-- Enable "Leaked password protection"
-- URL: https://supabase.com/dashboard/project/YOUR_PROJECT/auth/providers
-- ============================================================

-- ============================================================
-- VERIFICATION: Run this to confirm all fixes applied
-- ============================================================

DO $$
DECLARE
    tbl RECORD;
    fn RECORD;
BEGIN
    RAISE NOTICE '--- RLS STATUS ---';
    FOR tbl IN
        SELECT tablename, rowsecurity
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename IN ('categories', 'products', 'product_relations', 'Category', 'Product')
        ORDER BY tablename
    LOOP
        RAISE NOTICE 'Table: % | RLS: %', tbl.tablename, tbl.rowsecurity;
    END LOOP;

    RAISE NOTICE '--- FUNCTION SEARCH_PATH ---';
    FOR fn IN
        SELECT p.proname, p.proconfig
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND p.proname IN ('update_updated_at', 'generate_quote_number', 'set_quote_number', 'update_category_product_count', 'is_admin')
        ORDER BY p.proname
    LOOP
        RAISE NOTICE 'Function: % | Config: %', fn.proname, fn.proconfig;
    END LOOP;
END $$;
