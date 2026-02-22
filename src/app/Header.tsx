'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NextRace {
  id: string;
  name: string;
  date: string;
  location: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();
  const [nextRace, setNextRace] = useState<NextRace | null>(null);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { href: '/', label: 'Főoldal', visible: true },
    { href: '/calendar', label: 'Naptár', visible: true },
    { href: '/tracks', label: 'Pályák', visible: true },
    { href: '/results', label: 'Eredmények', visible: true },
    { href: '/blog', label: 'Blog', visible: false },
    { href: '/rules', label: 'Szabályok', visible: true },
  ];

  // Fetch next race from API
  useEffect(() => {
    async function fetchNextRace() {
      try {
        const res = await fetch('/api/next-race');
        const data = await res.json();
        if (data.race) {
          setNextRace(data.race);
        }
      } catch (error) {
        console.error('Failed to fetch next race:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNextRace();
  }, []);

  const nextRaceDateStr = nextRace?.date
    ? new Date(nextRace.date).toLocaleString('hu-HU', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  return (
    <header className="header glass sticky top-0 z-50">
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
          {navItems
            .filter((item) => item.visible !== false)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 font-semibold relative transition-colors${
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

        {/* Jobb: social icons (Nevezés gomb eltávolítva az eredeti headerből) */}
        <div className="hidden md:flex items-center gap-3">
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

      {/* Külön következő verseny sáv (független a felső nav-tól) */}
      {!loading && nextRace && (
        <div
          className="w-full border-t border-white/10 text-white/90 text-xs md:text-sm"
          role="region"
          aria-label="Következő verseny"
        >
          <div className="container flex flex-col md:flex-row gap-2 md:items-center justify-between py-2 px-3 md:px-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold tracking-wide text-[#e4eb34]">Következő verseny</span>
              <span className="font-medium">{nextRace.name}</span>
              <span className="opacity-70">{nextRace.location}</span>
              <span className="opacity-70">{nextRaceDateStr}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm px-4 py-1.5 shadow-md"
                onClick={() => {
                  if (window.openRegistrationModal) window.openRegistrationModal(nextRace.id);
                }}
              >
                Nevezés
              </button>
              <Link href="/#race" className="btn btn-outline btn-sm px-4 py-1.5" prefetch={false}>
                Részletek
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobil: lenyíló menü */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black/95 text-white flex flex-col items-center py-4 z-50 shadow-lg">
          {navItems
            .filter((item) => item.visible !== false)
            .map((item) => (
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
          {/* Nevezés gomb eltávolítva a mobil menüből is */}
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
