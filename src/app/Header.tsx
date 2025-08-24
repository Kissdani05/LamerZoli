'use client';
import Link from 'next/link';
// removed language hook — static Hungarian labels in header
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  // no i18n here — header labels are fixed Hungarian
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const navItems = [
    { href: '/calendar', label: 'Naptár' },
    { href: '/tracks', label: 'Pályák' },
    { href: '/results', label: 'Eredmények' },
    { href: '/blog', label: 'Blog' },
    { href: '/rules', label: 'Szabályok' },
  ];

  return (
    <header className="header glass sticky top-0 z-50 border-b border-brand-2 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-2 px-2 md:px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-[1.7rem] font-extrabold text-[#e4eb34] drop-shadow-lg tracking-tight"
              style={{ fontFamily: 'inherit' }}
            >
              LÁMERKART
            </span>
          </Link>
        </div>

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

        {/* Jobb: fő CTA + social icons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="btn btn-primary shadow-lg"
            onClick={() => {
              if (window.openRegistrationModal) window.openRegistrationModal();
            }}
          >
            Nevezés
          </button>

          <a
            href="https://www.tiktok.com/@lamerkart?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10"
          >
            <Image src="/tiktok_icon.png" alt="TikTok" width={20} height={20} />
          </a>

          <a
            href="https://www.facebook.com/zoltan.lamer"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10"
          >
            <Image src="/facebook_icon.png" alt="Facebook" width={20} height={20} />
          </a>
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
              if (window.openRegistrationModal) window.openRegistrationModal();
            }}
          >
            Nevezés
          </button>
          <div className="flex gap-2 mt-2">
            <a
              href="https://www.tiktok.com/@lamerkart?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10"
            >
              <Image src="/tiktok_icon.png" alt="TikTok" width={18} height={18} />
            </a>
            <a
              href="https://www.facebook.com/zoltan.lamer"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10"
            >
              <Image src="/facebook_icon.png" alt="Facebook" width={18} height={18} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
