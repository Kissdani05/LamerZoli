-- Allow DELETE on registrations table for admin operations
-- Run this in Supabase SQL Editor

CREATE POLICY "Enable delete access for all users" ON public.registrations
  FOR DELETE USING (true);

-- Also allow UPDATE for edit operations
CREATE POLICY "Enable update access for all users" ON public.registrations
  FOR UPDATE USING (true);
