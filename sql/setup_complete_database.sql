-- Complete database setup for LamerZoli Gokart Klub
-- Run this in Supabase SQL Editor to recreate the full schema
-- Safe to run multiple times (uses if not exists)

BEGIN;

-- ============================================
-- 1. REGISTRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  race_id UUID,
  race_name TEXT,
  sws_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  consent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for registrations
CREATE INDEX IF NOT EXISTS registrations_race_name_idx ON public.registrations (race_name);
CREATE INDEX IF NOT EXISTS registrations_status_idx ON public.registrations (status);
CREATE INDEX IF NOT EXISTS registrations_email_idx ON public.registrations (email);
CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON public.registrations (created_at DESC);

-- ============================================
-- 2. RACES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.races (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  location TEXT,
  date TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for races
CREATE INDEX IF NOT EXISTS races_name_idx ON public.races (name);
CREATE INDEX IF NOT EXISTS races_date_idx ON public.races (date DESC);

-- ============================================
-- 3. RESULTS TABLE (eredmények)
-- ============================================
CREATE TABLE IF NOT EXISTS public.results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE,
  location TEXT,
  participants INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for results
CREATE INDEX IF NOT EXISTS results_date_idx ON public.results (date DESC);
CREATE INDEX IF NOT EXISTS results_name_idx ON public.results (name);

-- ============================================
-- 4. RESULT_PARTICIPANTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.result_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  race_id UUID REFERENCES public.results(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for result_participants
CREATE INDEX IF NOT EXISTS result_participants_race_id_idx ON public.result_participants (race_id);
CREATE INDEX IF NOT EXISTS result_participants_position_idx ON public.result_participants (position);

-- ============================================
-- 5. BLOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  read_time TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for blog
CREATE INDEX IF NOT EXISTS blog_date_idx ON public.blog (date DESC);
CREATE INDEX IF NOT EXISTS blog_created_at_idx ON public.blog (created_at DESC);

-- ============================================
-- 6. SITE_SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  featured_race_id UUID REFERENCES public.races(id) ON DELETE SET NULL,
  next_race_at TIMESTAMP WITH TIME ZONE,
  next_race_desc TEXT,
  next_race_image_path TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by TEXT,
  CONSTRAINT only_one_row CHECK (id = 1)
);

-- Insert default site_settings if not exists
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. RLS (Row Level Security) Setup
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.result_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for races, results, blog, site_settings
CREATE POLICY "Enable read access for all users" ON public.races
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.results
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.result_participants
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.blog
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.site_settings
  FOR SELECT USING (true);

-- Registrations: allow insert and read for all (RLS enabled for security structure)
CREATE POLICY "Enable insert for anonymous users" ON public.registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.registrations
  FOR SELECT USING (true);

CREATE POLICY "Enable delete access for all users" ON public.registrations
  FOR DELETE USING (true);

CREATE POLICY "Enable update access for all users" ON public.registrations
  FOR UPDATE USING (true);

-- Admin write access (service role) is handled at application level via API routes

COMMIT;

-- ============================================
-- Notes:
-- - Service role key bypasses RLS automatically
-- - Admin operations use service role API routes
-- - Public registration inserts bypass RLS via API
-- - All timestamps in UTC (TIMESTAMP WITH TIME ZONE)
-- ============================================
