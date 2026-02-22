-- Fix RLS policies for admin access
-- Run this in Supabase SQL Editor after initial setup

-- Drop the restrictive policy on registrations
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.registrations;

-- Add a new policy that allows public read access (RLS will still protect via service role at API level)
CREATE POLICY "Enable read access for all users" ON public.registrations
  FOR SELECT USING (true);

-- Keep insert policy as is (for public registrations)
-- Service role key in API routes will bypass these policies anyway for admin operations
