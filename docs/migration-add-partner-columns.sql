-- Migration: Add company info columns to partners table
-- Run this in Supabase SQL Editor if partners table is missing these columns

-- Check if columns exist before adding
DO $$
BEGIN
    -- Add company_name if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'partners' AND column_name = 'company_name'
    ) THEN
        ALTER TABLE partners ADD COLUMN company_name VARCHAR(255);
    END IF;

    -- Add cui if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'partners' AND column_name = 'cui'
    ) THEN
        ALTER TABLE partners ADD COLUMN cui VARCHAR(50);
    END IF;

    -- Add reg_com if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'partners' AND column_name = 'reg_com'
    ) THEN
        ALTER TABLE partners ADD COLUMN reg_com VARCHAR(100);
    END IF;

    -- Add address if not exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'partners' AND column_name = 'address'
    ) THEN
        ALTER TABLE partners ADD COLUMN address TEXT;
    END IF;
END $$;

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'partners'
ORDER BY ordinal_position;
