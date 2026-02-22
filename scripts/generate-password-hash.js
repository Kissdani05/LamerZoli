#!/usr/bin/env node
/**
 * Admin jelszó hash generáló script
 * Használat: node scripts/generate-password-hash.js "uj-jelszo"
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Hiba: Add meg a jelszót paraméterként!');
  console.log('\nHasználat:');
  console.log('  node scripts/generate-password-hash.js "uj-jelszo"');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('❌ Hiba a hash generálása közben:', err);
    process.exit(1);
  }
  
  console.log('\n✅ Jelszó hash sikeresen generálva!\n');
  console.log('Másold be ezt az értéket az .env.local fájlba az ADMIN_PASSWORD értékének:\n');
  console.log(hash);
  console.log('\nPélda:');
  console.log(`ADMIN_PASSWORD=${hash}\n`);
});
