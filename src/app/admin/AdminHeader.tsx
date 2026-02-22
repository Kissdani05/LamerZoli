'use client';
import { useState } from 'react';
import Link from 'next/link';
import NewRaceModal from './NewRaceModal';

export default function AdminHeader() {
  const [showNewRaceModal, setShowNewRaceModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 glass border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e4eb34] to-[#e4eb34]/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏁</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold gradient-text">Lámer Zoltán Admin</h1>
                <p className="text-xs text-white/50">Nevezések kezelése</p>
              </div>
            </Link>
            <nav className="flex gap-2">
              <button
                onClick={() => setShowNewRaceModal(true)}
                className="btn btn-outline btn-sm px-4 py-2"
              >
                ➕ Új Verseny
              </button>
              <Link href="/" className="btn btn-ghost btn-sm px-4 py-2">
                🏠 Főoldal
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <NewRaceModal
        open={showNewRaceModal}
        onClose={() => setShowNewRaceModal(false)}
        onSuccess={() => {
          // Dispatch custom event to refresh races in NevezesekAdmin
          window.dispatchEvent(new Event('racesUpdated'));
        }}
      />
    </>
  );
}
