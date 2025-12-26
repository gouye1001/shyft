-- Seed data for development/testing
-- Run this after the migration

-- Insert a demo company
INSERT INTO companies (id, name, subscription_tier)
VALUES ('00000000-0000-0000-0000-000000000001', 'Shyft Demo Company', 'professional');

-- Insert demo technicians (you'll need to create auth users first, then link them)
-- These are placeholder entries for testing the API

-- To test: Create a user via Supabase Auth, then run:
-- UPDATE profiles SET role = 'technician' WHERE user_id = '<your-user-id>';
-- INSERT INTO technicians (profile_id, company_id, skills, status)
-- SELECT id, company_id, ARRAY['HVAC', 'Plumbing'], 'available'
-- FROM profiles WHERE user_id = '<your-user-id>';
