'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'hu' | 'en';

type Dict = Record<string, Record<Lang, string>>;

const dict: Dict = {
  nav_register: { hu: 'Regisztráció', en: 'Register' },
  nav_next_race: { hu: 'Következő verseny', en: 'Next race' },
  nav_results: { hu: 'Eredmények', en: 'Results' },
  nav_faq: { hu: 'GYIK', en: 'FAQ' },
  admin: { hu: 'Admin', en: 'Admin' },
  language_selector: { hu: 'Nyelvválasztó', en: 'Language selector' },
  // New header links
  nav_about: { hu: 'Rólunk', en: 'About' },
  nav_calendar: { hu: 'Naptár', en: 'Calendar' },
  nav_registration: { hu: 'Regisztráció', en: 'Registration' },
  nav_rules: { hu: 'Szabályok', en: 'Rules' },
  nav_tracks: { hu: 'Pályák', en: 'Tracks' },
  nav_gallery: { hu: 'Galéria', en: 'Gallery' },
  nav_blog: { hu: 'Blog', en: 'Blog' },
  nav_contact: { hu: 'Kapcsolat', en: 'Contact' },

  hero_title: { hu: 'Lámer Zoltán', en: 'Lámer Zoltán' },
  hero_subtitle1: { hu: 'Bérgokart bajnokságok', en: 'Rental kart championships' },
  hero_subtitle2: {
    hu: 'Magyarország legnagyobb egykategóriás bérgokart versenyei',
    en: "Hungary's largest single-class rental kart races",
  },
  btn_register: { hu: 'Nevezés', en: 'Register' },

  next_race: { hu: 'Következő verseny', en: 'Next race' },
  date: { hu: 'Dátum', en: 'Date' },
  description: { hu: 'Leírás', en: 'Description' },
  soon: { hu: 'Hamarosan…', en: 'Coming soon…' },

  featured_race_title: { hu: 'Weboldalon látszódó verseny', en: 'Featured race' },
  name: { hu: 'Név', en: 'Name' },
  location: { hu: 'Helyszín', en: 'Location' },
  time: { hu: 'Időpont', en: 'Time' },
  capacity: { hu: 'Max kapacitás', en: 'Max capacity' },

  results: { hu: 'Eredmények', en: 'Results' },

  faq: { hu: 'GYIK', en: 'FAQ' },
  faq_q1: { hu: 'Mikor lesz a következő verseny?', en: 'When is the next race?' },
  faq_a1: {
    hu: 'A főoldalon mindig megtalálod a pontos dátumot és leírást.',
    en: 'You can always find the exact date and description on the homepage.',
  },
  faq_q2: { hu: 'Hogyan tudok regisztrálni?', en: 'How can I register?' },
  faq_a2: {
    hu: 'Töltsd ki a regisztrációs űrlapot a főoldalon, majd kattints a Regisztráció gombra.',
    en: 'Fill out the registration form on the homepage and click the Register button.',
  },
  faq_q3: { hu: 'Hol találom az eredményeket?', en: 'Where can I find the results?' },
  faq_a3: {
    hu: 'Az Eredmények szekcióban láthatod a korábbi versenyek győzteseit.',
    en: 'You can see previous winners in the Results section.',
  },
  faq_q4: {
    hu: 'Mi történik, ha hibás email címet adok meg?',
    en: 'What happens if I enter an invalid email?',
  },
  faq_a4: {
    hu: 'A rendszer csak érvényes email címet fogad el, hibás esetben hibaüzenetet kapsz.',
    en: "The system only accepts valid email addresses; otherwise you'll receive an error.",
  },
  faq_q5: { hu: 'Hogyan védjük az adataidat?', en: 'How do we protect your data?' },
  faq_a5: {
    hu: 'A regisztrációhoz hozzájárulás szükséges, az adatokat biztonságosan kezeljük.',
    en: 'Consent is required for registration, and we handle your data securely.',
  },

  footer_copyright: { hu: 'Gokart Klub', en: 'Gokart Club' },
  back_to_top: { hu: 'Vissza a tetejére', en: 'Back to top' },

  // Modal
  modal_title: { hu: 'Nevezés', en: 'Registration' },
  field_fullname: { hu: 'Név', en: 'Full name' },
  field_email: { hu: 'Email', en: 'Email' },
  field_phone: { hu: 'Telefonszám', en: 'Phone number' },
  field_weight: { hu: 'Súly (kg)', en: 'Weight (kg)' },
  field_race: { hu: 'Verseny', en: 'Race' },
  submit: { hu: 'Küldés...', en: 'Submitting...' },
  register_btn: { hu: 'Nevezés', en: 'Register' },
  close: { hu: 'Bezárás', en: 'Close' },
  required_all: { hu: 'Minden mező kötelező!', en: 'All fields are required!' },

  // Admin
  select_race: { hu: 'Verseny kiválasztása', en: 'Select race' },
  select_placeholder: { hu: 'Válassz versenyt', en: 'Choose a race' },
  select_featured_race: { hu: 'Weboldalon látszódó verseny', en: 'Featured race on site' },
  save_featured_race: { hu: 'Kiemelt verseny mentése', en: 'Save featured race' },
  registrations_count: { hu: 'Nevezők száma', en: 'Registrations' },
  email: { hu: 'Email', en: 'Email' },
  phone: { hu: 'Telefonszám', en: 'Phone' },
  weight: { hu: 'Súly', en: 'Weight' },
  race: { hu: 'Verseny', en: 'Race' },
  actions: { hu: 'Műveletek', en: 'Actions' },
  edit: { hu: 'Szerkesztés', en: 'Edit' },
  save: { hu: 'Mentés', en: 'Save' },
  cancel: { hu: 'Mégse', en: 'Cancel' },
  delete: { hu: 'Törlés', en: 'Delete' },
  none_registrations: {
    hu: 'Nincs nevező ehhez a versenyhez.',
    en: 'No registrations for this race.',
  },
  featured_race_admin_title: {
    hu: 'Kiemelt verseny a weboldalon',
    en: 'Featured race on the site',
  },
  image: { hu: 'Kép', en: 'Image' },
  race_name_label: { hu: 'Verseny neve', en: 'Race name' },
  max_capacity_label: { hu: 'Max kapacitás', en: 'Max capacity' },
  pick_datetime: { hu: 'Válaszd ki az időpontot', en: 'Pick date & time' },
  races_fetch_error: { hu: 'Nem sikerült lekérni a versenyeket', en: 'Failed to fetch races' },
  no_races: { hu: 'Nincs elérhető verseny', en: 'No races available' },

  // Admin login
  admin_login_title: { hu: 'Admin Bejelentkezés', en: 'Admin Login' },
  password: { hu: 'Jelszó', en: 'Password' },
  login_button: { hu: 'Belépés', en: 'Login' },
  wrong_password: { hu: 'Hibás jelszó!', en: 'Wrong password!' },
  back_home: { hu: 'Vissza a főoldalra', en: 'Back to homepage' },

  // New keys for alerts and admin messages
  error_occurred: { hu: 'Hiba történt', en: 'An error occurred' },
  registration_success: { hu: 'Sikeres nevezés!', en: 'Registration successful!' },
  img_upload_error: { hu: 'Kép feltöltési hiba', en: 'Image upload error' },
  img_uploaded: { hu: 'Kép sikeresen feltöltve!', en: 'Image uploaded successfully!' },
  img_url_missing: {
    hu: 'Nem sikerült lekérni a kép URL-jét, csak a fájl nevét mentjük.',
    en: 'Could not retrieve image URL; saving file name only.',
  },
  save_success: { hu: 'Sikeres mentés!', en: 'Saved successfully!' },
  save_error: { hu: 'Hiba', en: 'Error' },
  choose_featured_race: { hu: 'Válassz kiemelt versenyt!', en: 'Choose a featured race!' },
  featured_race_saved: { hu: 'Kiemelt verseny sikeresen mentve!', en: 'Featured race saved!' },
  featured_race_save_error: {
    hu: 'Hiba a kiemelt verseny mentésénél',
    en: 'Error saving featured race',
  },
  delete_error: { hu: 'Törlés hiba', en: 'Delete error' },
  refresh_error: { hu: 'Hiba a frissítés közben', en: 'Error during refresh' },
  update_error: { hu: 'Mentési hiba', en: 'Update error' },
  more_results_soon: { hu: 'További eredmények hamarosan…', en: 'More results coming soon…' },
  first_place: { hu: '1. hely', en: '1st place' },
};

function translate(key: keyof typeof dict, lang: Lang): string {
  return dict[key]?.[lang] ?? dict[key]?.hu ?? (key as string);
}

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null;
    if (stored === 'hu' || stored === 'en') setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: keyof typeof dict) => translate(key, lang),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
