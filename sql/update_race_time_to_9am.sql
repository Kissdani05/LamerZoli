-- Frissítjük a március 7-i verseny időpontját 10:00-ra
UPDATE public.races
SET date = '2026-03-07T10:00:00+02:00'
WHERE name = 'Téglás Gokart GP 2026 1. Forduló'
  AND date::date = '2026-03-07';

-- Ellenőrzés
SELECT id, name, date, location 
FROM public.races 
WHERE date::date = '2026-03-07';
