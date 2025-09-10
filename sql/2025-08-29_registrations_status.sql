-- Registrations table updates for status-based workflow
-- Safe to run multiple times.
-- Recommended: run in Supabase SQL Editor.

begin;

-- Ensure race_name exists (optional, used for filtering/export)
alter table if exists public.registrations
  add column if not exists race_name text;

-- Add status column with constraint and default
alter table if exists public.registrations
  add column if not exists status text
  check (status in ('pending','accepted','rejected'))
  default 'pending';

-- Optional: normalize weight to numeric
-- alter table if exists public.registrations
--   alter column weight type numeric using (weight::numeric);

-- Helpful indexes for admin filters
create index if not exists registrations_race_name_idx on public.registrations (race_name);
create index if not exists registrations_status_idx on public.registrations (status);

commit;
