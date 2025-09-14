'use client';
import Image from 'next/image';
import TrackImageSlider from '../TrackImageSlider';

export default function TracksPage() {
  return (
    <main className="relative max-w-5xl mx-auto px-4 py-12 text-white">
      <h1 className="mb-8 text-4xl font-extrabold gradient-text text-center drop-shadow-lg">
        Pályák
      </h1>
      <div className="absolute inset-0 -z-10">
        <Image src="/2.png" alt="Téglás pálya háttér" fill className="object-cover blur-2xl" />
      </div>
      <div className="relative bg-gray-800/80 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="mb-6 text-3xl font-bold gradient-text text-center drop-shadow">
            Téglás F1 Gokartpálya
          </h2>
          <p className="mb-4 text-lg text-center text-white max-w-2xl">
            Kelet-Magyarország egyik legtechnikásabb kültéri bérgokart pályája ~470 m hosszal és 390
            cm³-es SODI flottával.
            <br />
            Számítógépes időmérés, 8 perces menetek.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          {/* Bal oldal: adatok, badge-ek */}
          <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-6">
              <div className="spec-card glass-card p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-2xl mb-1">📍</span>
                <span className="font-bold text-base mb-1">Cím</span>
                <span className="text-sm text-center md:text-left">
                  4243 Téglás, Kossuth L. u. 171.
                </span>
              </div>
              <div className="spec-card glass-card p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-2xl mb-1">🛣️</span>
                <span className="font-bold text-base mb-1">Méret</span>
                <span className="text-sm text-center md:text-left">~470 m hosszú, 7 m széles</span>
              </div>
              <div className="spec-card glass-card p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-2xl mb-1">🛞</span>
                <span className="font-bold text-base mb-1">Gokartok</span>
                <span className="text-sm text-center md:text-left">SODI 390 cm³ (Honda GX)</span>
              </div>
              <div className="spec-card glass-card p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-2xl mb-1">🧒</span>
                <span className="font-bold text-base mb-1">Feltételek</span>
                <span className="text-sm text-center md:text-left">
                  14+ év, ≥150 cm, ≤120 kg; zárt cipő
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <div className="info-badge glass-card px-3 py-1 rounded-xl flex items-center gap-2 text-sm">
                <span role="img" aria-label="Parkoló">
                  🅿️
                </span>{' '}
                Parkoló
              </div>
              <div className="info-badge glass-card px-3 py-1 rounded-xl flex items-center gap-2 text-sm">
                <span role="img" aria-label="Büfé">
                  🍔
                </span>{' '}
                Büfé
              </div>
              <div className="info-badge glass-card px-3 py-1 rounded-xl flex items-center gap-2 text-sm">
                <span role="img" aria-label="Fagyizó">
                  🍦
                </span>{' '}
                Fagyizó
              </div>
              <div className="info-badge glass-card px-3 py-1 rounded-xl flex items-center gap-2 text-sm">
                <span role="img" aria-label="Sisak">
                  🪖
                </span>{' '}
                Sisak biztosított
              </div>
            </div>
          </div>
          {/* Jobb oldal: képslider nyilakkal és gombok alatta */}
          <div className="w-full max-w-md flex flex-col items-center">
            <TrackImageSlider />
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
              <a
                href="https://teglasf1gokartpalya.hu/"
                target="_blank"
                rel="noopener"
                className="btn btn-outline text-lg px-8 py-4 shadow-xl animate-float w-full sm:w-auto"
              >
                Pálya weboldala
              </a>
              <a
                href="/calendar"
                className="btn btn-primary text-lg px-8 py-4 shadow-xl animate-float w-full sm:w-auto"
              >
                Megnézem a naptárban
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
