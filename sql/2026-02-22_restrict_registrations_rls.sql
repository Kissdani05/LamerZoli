-- Restrict public access to the registrations table
-- Previously all policies used USING (true) → anyone with the anon key could read all personal data
-- Run this in Supabase SQL Editor

-- 1. Remove the overly permissive policies
DROP POLICY IF EXISTS "Enable read access for all users"    ON public.registrations;
DROP POLICY IF EXISTS "Enable delete access for all users"  ON public.registrations;
DROP POLICY IF EXISTS "Enable update access for all users"  ON public.registrations;

-- 2. Keep INSERT open for anon so the public registration form still works
--    (policy may already exist from setup_complete_database.sql – use IF NOT EXISTS)
DROP POLICY IF EXISTS "Enable insert for all users" ON public.registrations;
CREATE POLICY "Enable insert for all users" ON public.registrations
  FOR INSERT WITH CHECK (true);

-- 3. No SELECT / UPDATE / DELETE for the anon role.
--    All admin reads/writes go through Next.js API routes that use the service_role key,
--    which bypasses RLS entirely – so no additional policy is needed for those operations.

-- Verify RLS is enabled (should already be on from setup)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
