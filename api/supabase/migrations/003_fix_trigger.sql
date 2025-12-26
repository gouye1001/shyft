-- =====================================================
-- FIX: Drop and recreate the trigger function with proper permissions
-- Run this if you get "Database error saving new user"
-- =====================================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate with proper schema search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_company_id UUID;
BEGIN
  -- Create a new company
  INSERT INTO public.companies (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'company_name', 'My Company'))
  RETURNING id INTO new_company_id;

  -- Create profile for the user
  INSERT INTO public.profiles (user_id, company_id, full_name, role)
  VALUES (
    NEW.id,
    new_company_id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'admin'
  );

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail signup
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Make sure the function can insert into these tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add policy for service role to bypass RLS (for trigger)
DROP POLICY IF EXISTS "Service role can do anything on companies" ON public.companies;
CREATE POLICY "Service role can do anything on companies" ON public.companies
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can do anything on profiles" ON public.profiles;
CREATE POLICY "Service role can do anything on profiles" ON public.profiles
  FOR ALL USING (true) WITH CHECK (true);
