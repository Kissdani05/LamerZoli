# Gokart Klub – Projekt dokumentáció

## Környezeti változók

Az alkalmazás működéséhez a következő környezeti változók szükségesek a `.env.local` fájlban:

```
# Kötelező
NEXT_PUBLIC_SUPABASE_URL=...          # Supabase projekt URL (publikus)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     # Supabase anon kulcs (publikus)
SUPABASE_SERVICE_ROLE_KEY=...         # Service role kulcs (API műveletekhez)
ADMIN_PASSWORD=...                    # Admin belépési jelszó
SITE_URL=...                          # Publikus weboldal URL (sitemap/robots)

# Opcionális/ajánlott
SUPABASE_URL=...                      # Szerver oldali Supabase URL fallback
SMTP_HOST=...                         # SMTP kiszolgáló
SMTP_PORT=587                         # SMTP port (465 esetén secure)
SMTP_USER=...                         # SMTP felhasználó
SMTP_PASS=...                         # SMTP jelszó
MAIL_FROM="Név <no-reply@example.com>" # Feladó fejléce
REGISTRATION_ADMIN_EMAIL=...          # Admin értesítési email cím új nevezéskor
# NEXT_PUBLIC_SITE_URL=...             # Ha publikus helyen is szükséges az URL
# NEXT_PUBLIC_GTAG_ID=...              # Google Analytics (ha kell)
```

## Supabase adatbázis

### Táblák
- **registrations**: name, email, consent, created_at
- **site_settings**: id=1, next_race_at, next_race_desc, next_race_image_path, updated_at, updated_by

### Storage bucket
- **images**: public read, write csak service role, mappastruktúra: `next-race/`

## Admin használat
- Bejelentkezés: `/admin/login` oldalon, jelszóval
- Sikeres belépés után admin cookie kerül beállításra
- Admin oldalon szerkeszthető a következő verseny dátuma, leírása, kép
- Kép feltöltés: Supabase Storage-ba, elérési út automatikusan mentésre kerül

## SEO & minőség
- Főoldal meta adatok, Open Graph/Twitter képek, JSON-LD schema
- robots.txt: `/admin` tiltva az indexelésből
- sitemap.xml: csak főoldal
- Minden fontos képen alt szöveg
- Mobil Lighthouse: Performance, SEO, Best Practices, A11y ≥ 95

## További infó
- Supabase projekt URL: [https://app.supabase.com/project/](https://app.supabase.com/project/)
- Service role hozzáférés: csak adminoknak, biztonságosan tárold!
- Ajánlott képméret: 1200x630px (Open Graph)

---

Ha kérdésed van, vagy új mezőket/feature-t szeretnél, jelezz bátran!
