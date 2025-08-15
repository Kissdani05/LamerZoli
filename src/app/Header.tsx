'use client';
import Link from 'next/link';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  // Aktív oldal detektálása
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const navItems = [
    { href: '/calendar', label: t('nav_calendar') },
    { href: '/tracks', label: t('nav_tracks') },
    { href: '/results', label: t('nav_results') },
    { href: '/blog', label: t('nav_blog') },
    { href: '/rules', label: t('nav_rules') },
  ];
  return (
    <header className="header glass sticky top-0 z-50 border-b border-brand-2 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-2">
        {/* Bal: logó helyett sárga "LámerKart" felirat */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-[1.7rem] font-extrabold text-[#e4eb34] drop-shadow-lg tracking-tight"
            style={{ fontFamily: 'inherit' }}
          >
            LÁMERKART
          </span>
        </Link>
        {/* Közép: menü */}
        <nav className="flex gap-1 md:gap-2 items-center text-sm relative">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link px-3 py-2 font-semibold relative${
                currentPath === item.href ? ' active' : ''
              }`}
            >
              {item.label}
              {currentPath === item.href && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-5 rounded-full bg-gradient-to-r from-brand-2 via-brand-3 to-brand-2 animate-race-line" />
              )}
            </Link>
          ))}
        </nav>
        {/* Jobb: fő CTA + nyelvváltó ikon */}
        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('nav_register')}
          </button>
          <button
            aria-label={t('language_selector')}
            className="bg-surface rounded-full p-2 border-2 border-brand-2 hover:bg-brand-2 transition-colors"
            onClick={() => setLang(lang === 'hu' ? 'en' : 'hu')}
          >
            <Image src="/globe.svg" alt="Nyelvváltó" width={24} height={24} className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
