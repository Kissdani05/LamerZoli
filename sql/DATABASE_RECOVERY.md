# Supabase Adatbázis Helyreállítás

Ha az adatbázis leállt, kövesd az alábbi lépéseket:

## 1. Lépj be a Supabase-be
- Menj ide: https://app.supabase.com/
- Válaszd ki a projekted

## 2. Nyisd meg az SQL Editor-t
- Bal menüben kattints az **SQL Editor** menüpontra

## 3. Futtasd az alábbi SQL scripteket

### Opció A: Teljes séma létrehozása (ajánlott)
Másold be ezt a fájl tartalmát az SQL Editor-ba:
```
sql/setup_complete_database.sql
```

Ezt a teljes szövegét vedd rá az SQL Editor-ba és kattints a **Run** gombra (a bal alsó sarokban).

### Opció B: Lépésről lépésre (ha probléma van)

Futtasd az alábbi scripteket a sorrendben:

#### 1. REGISTRATIONS tábla
```sql
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

CREATE INDEX IF NOT EXISTS registrations_race_name_idx ON public.registrations (race_name);
CREATE INDEX IF NOT EXISTS registrations_status_idx ON public.registrations (status);
CREATE INDEX IF NOT EXISTS registrations_email_idx ON public.registrations (email);
CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON public.registrations (created_at DESC);
```

#### 2. RACES tábla
```sql
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

CREATE INDEX IF NOT EXISTS races_name_idx ON public.races (name);
CREATE INDEX IF NOT EXISTS races_date_idx ON public.races (date DESC);
```

#### 3. RESULTS tábla
```sql
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

CREATE INDEX IF NOT EXISTS results_date_idx ON public.results (date DESC);
CREATE INDEX IF NOT EXISTS results_name_idx ON public.results (name);
```

#### 4. RESULT_PARTICIPANTS tábla
```sql
CREATE TABLE IF NOT EXISTS public.result_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  race_id UUID REFERENCES public.results(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS result_participants_race_id_idx ON public.result_participants (race_id);
CREATE INDEX IF NOT EXISTS result_participants_position_idx ON public.result_participants (position);
```

#### 5. BLOG tábla
```sql
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

CREATE INDEX IF NOT EXISTS blog_date_idx ON public.blog (date DESC);
CREATE INDEX IF NOT EXISTS blog_created_at_idx ON public.blog (created_at DESC);
```

#### 6. SITE_SETTINGS tábla
```sql
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

INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
```

#### 7. RLS (Row Level Security) beállítása
```sql
-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.result_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Enable read access for all users" ON public.races FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.results FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.result_participants FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.blog FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.site_settings FOR SELECT USING (true);

-- Registrations policies
CREATE POLICY "Enable insert for anonymous users" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON public.registrations FOR SELECT USING (auth.role() = 'authenticated');
```

## 4. Ellenőrzés
Miután futtatod az SQL scripteket, ellenőrizd:
1. A **Database** menü bal oldalon megjelenjenek a táblák
2. Minden tábla legyen jelen: `registrations`, `races`, `results`, `result_participants`, `blog`, `site_settings`

## 5. Ha még mindig probléma van
- Nézd meg a Supabase dokumentációt: https://supabase.com/docs
- Ellenőrizd az adatbázis naplókat az SQL Editor alatt

