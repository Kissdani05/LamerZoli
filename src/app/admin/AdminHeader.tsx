'use client';
import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 py-2 shadow-lg">
      <Link href="/admin" className="font-extrabold text-xl gradient-text">
        Lámer Zoltán Gokart Admin
      </Link>
      <nav className="flex gap-4">
        <Link href="/admin/eredmenyek" className="chip-btn px-3 py-1 rounded-full font-semibold">
          Eredmények
        </Link>
        <Link href="/admin/blog" className="chip-btn px-3 py-1 rounded-full font-semibold">
          Blog
        </Link>
        <Link href="/admin/versenyek" className="chip-btn px-3 py-1 rounded-full font-semibold">
          Versenyek
        </Link>
        <Link href="/admin/nevezesek" className="chip-btn px-3 py-1 rounded-full font-semibold">
          Nevezések
        </Link>
        <Link href="/admin/uj-verseny" className="chip-btn px-3 py-1 rounded-full font-semibold">
          Új Verseny
        </Link>
      </nav>
      {/* ...user avatar, logout, stb... */}
    </header>
  );
}
