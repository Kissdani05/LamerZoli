'use client';
import Link from 'next/link';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="container flex items-center justify-between py-2 px-2 md:px-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-[1.7rem] font-extrabold text-[#e4eb34] drop-shadow-lg tracking-tight"
            style={{ fontFamily: 'inherit' }}
          >
            LÁMERKART
          </span>
        </Link>
        {/* Mobil: hamburger ikon */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          aria-label="Menü"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block w-6 h-6">
            <span className="block w-full h-1 bg-[#e4eb34] mb-1 rounded"></span>
            <span className="block w-full h-1 bg-[#e4eb34] mb-1 rounded"></span>
            <span className="block w-full h-1 bg-[#e4eb34] rounded"></span>
          </span>
        </button>
        {/* Asztali: menü */}
        <nav className="hidden md:flex gap-1 md:gap-2 items-center text-sm relative">
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
        <div className="hidden md:flex items-center gap-3">
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
      {/* Mobil: lenyíló menü */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black/95 text-white flex flex-col items-center py-4 z-50 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full text-center py-3 font-semibold border-b border-white/10${
                currentPath === item.href ? ' bg-[#e4eb34] text-black' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {t('nav_register')}
          </button>
          <button
            aria-label={t('language_selector')}
            className="bg-surface rounded-full p-2 border-2 border-brand-2 hover:bg-brand-2 transition-colors mt-2"
            onClick={() => {
              setLang(lang === 'hu' ? 'en' : 'hu');
              setMenuOpen(false);
            }}
          >
            <Image src="/globe.svg" alt="Nyelvváltó" width={24} height={24} className="h-6 w-6" />
          </button>
        </nav>
      )}
    </header>
  );
}
