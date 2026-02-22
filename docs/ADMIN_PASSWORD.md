# Admin Jelszó Kezelés

## Jelszó módosítása

Ha meg szeretnéd változtatni az admin jelszót:

### 1. Hash generálása

Futtasd a scriptet az új jelszóddal:

```bash
node scripts/generate-password-hash.js "uj-jelszo-ide"
```

Ez kiírja a konzolra a bcrypt hash-t.

### 2. .env.local frissítése

Másold be a generált hash-t az `.env.local` fájlba:

```env
ADMIN_PASSWORD=$2b$10$...generált-hash...
```

### 3. Szerver újraindítása

Ha a dev szerver fut, indítsd újra:

```bash
# Ctrl+C a futó szervernél, majd:
npm run dev
```

## Biztonság

- ✅ A jelszó **bcrypt** hash-eléssel van titkosítva
- ✅ A hash **nem fordítható vissza** az eredeti jelszóra
- ✅ Az `.env.local` fájl **nincs** a git-ben (lásd `.gitignore`)
- ⚠️ **Soha ne commitold** az `.env.local` fájlt git-be!

## Jelenlegi jelszó

Az admin jelszó: `Laurababa12.3`

(Ez az információ csak helyi fejlesztéshez - production-ben használj erős, egyedi jelszót!)

## Production deployment

Vercel-en vagy más hosting platformon állítsd be a környezeti változót:

1. Generálj hash-t a fenti script-tel
2. Állítsd be az `ADMIN_PASSWORD` értéket a dashboard-on
3. Deploy-old újra az alkalmazást
