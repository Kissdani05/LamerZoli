'use client';
import Link from 'next/link';
import { useI18n } from './i18n/LanguageContext';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="sticky top-0 bg-white border-b shadow z-50 flex items-center justify-between px-4 py-3">
      <nav className="flex gap-4">
        <a href="#hero" className="hover:underline text-black">
          {t('nav_register')}
        </a>
        <a href="#race" className="hover:underline text-black">
          {t('nav_next_race')}
        </a>
        <a href="#results" className="hover:underline text-black">
          {t('nav_results')}
        </a>
        <a href="#faq" className="hover:underline text-black">
          {t('nav_faq')}
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <select
          aria-label={t('language_selector')}
          className="border rounded px-2 py-1 text-sm bg-white text-black"
          value={lang}
          onChange={(e) => setLang(e.target.value as 'hu' | 'en')}
        >
          <option value="hu">HU</option>
          <option value="en">EN</option>
        </select>
        <Link href="/admin/login" className="text-sm text-gray-700 hover:underline">
          {t('admin')}
        </Link>
      </div>
    </header>
  );
}
