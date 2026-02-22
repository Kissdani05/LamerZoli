-- Add categories column to races table
-- This column will store race formats as a JSON array

ALTER TABLE public.races 
ADD COLUMN IF NOT EXISTS categories JSONB DEFAULT '[]'::jsonb;

-- Create an index for faster queries on categories
CREATE INDEX IF NOT EXISTS races_categories_idx ON public.races USING GIN (categories);

-- Example data format: ["Sprint", "Endurance", "Junior"]
