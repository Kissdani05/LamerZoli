-- Add category column to registrations table
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Create index for better filtering performance
CREATE INDEX IF NOT EXISTS registrations_category_idx ON public.registrations (category);
