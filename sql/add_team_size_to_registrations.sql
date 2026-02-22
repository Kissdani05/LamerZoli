-- Add team_size column to registrations table for Endurance races
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS team_size INTEGER;

-- Add constraint to limit team size between 1 and 10
ALTER TABLE public.registrations 
ADD CONSTRAINT team_size_check CHECK (team_size IS NULL OR (team_size >= 1 AND team_size <= 10));

-- Create index for filtering by team size
CREATE INDEX IF NOT EXISTS registrations_team_size_idx ON public.registrations (team_size);
