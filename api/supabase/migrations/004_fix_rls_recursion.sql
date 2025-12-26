-- =====================================================
-- FIX: RLS Policy Infinite Recursion 
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can do anything on profiles" ON profiles;
DROP POLICY IF EXISTS "Service role bypass" ON profiles;

-- Drop ALL existing policies on companies
DROP POLICY IF EXISTS "Users can view their company" ON companies;
DROP POLICY IF EXISTS "Users can update their company" ON companies;
DROP POLICY IF EXISTS "Anyone can create company" ON companies;
DROP POLICY IF EXISTS "Service role can do anything on companies" ON companies;
DROP POLICY IF EXISTS "Service role bypass companies" ON companies;

-- Recreate with non-recursive policies
-- For profiles: use auth.uid() directly instead of subquery
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Allow service role to bypass RLS for triggers
CREATE POLICY "Service role bypass" ON profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- For companies: allow access based on profile lookup (but avoid recursion)
-- Use EXISTS with a simple check
CREATE POLICY "Users can view their company" ON companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.company_id = companies.id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their company" ON companies
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.company_id = companies.id 
      AND profiles.user_id = auth.uid()
    )
  );

-- Allow anyone to insert (for signup flow)
CREATE POLICY "Anyone can create company" ON companies
  FOR INSERT WITH CHECK (true);

-- Service role bypass for companies
CREATE POLICY "Service role bypass companies" ON companies
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
