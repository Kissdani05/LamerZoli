'use client';
import Link from 'next/link';
import { useI18n } from './i18n/LanguageContext';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="header">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
        <nav className="flex flex-wrap gap-1 md:gap-2 items-center text-sm">
          <Link href="/#hero" className="nav-link">
            {t('nav_register')}
          </Link>
          <Link href="/#race" className="nav-link">
            {t('nav_next_race')}
          </Link>
          <Link href="/results" className="nav-link">
            {t('nav_results')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('nav_about')}
          </Link>
          <Link href="/calendar" className="nav-link">
            {t('nav_calendar')}
          </Link>
          <Link href="/rules" className="nav-link">
            {t('nav_rules')}
          </Link>
          <Link href="/tracks" className="nav-link">
            {t('nav_tracks')}
          </Link>
          <Link href="/gallery" className="nav-link">
            {t('nav_gallery')}
          </Link>
          <Link href="/blog" className="nav-link">
            {t('nav_blog')}
          </Link>
          <Link href="/contact" className="nav-link">
            {t('nav_contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <img
            src="/file.svg"
            alt="Lámer Zoltán Gokart"
            className="h-8 w-8 rounded-full border border-primary"
          />
          <select
            aria-label={t('language_selector')}
            className="select text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value as 'hu' | 'en')}
          >
            <option value="hu">HU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </header>
  );
}
