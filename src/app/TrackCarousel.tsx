'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TrackImageSlider from './TrackImageSlider';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

type Track = {
  id: string;
  name: string;
  description: string;
  address: string;
  size: string;
  gokarts: string;
  conditions: string;
  badges: { emoji: string; label: string; text: string }[];
  website?: string;
  backgroundImage: string;
};

const tracks: Track[] = [
  {
    id: 'teglas',
    name: 'Téglás F1 Gokartpálya',
    description:
      'Kelet-Magyarország egyik legtechnikásabb kültéri bérgokart pályája ~470 m hosszal és 390 cm³-es SODI flottával. Számítógépes időmérés, 8 perces menetek.',
    address: '4243 Téglás, Kossuth L. u. 171.',
    size: '~470 m hosszú, 7 m széles',
    gokarts: 'SODI 390 cm³ (Honda GX)',
    conditions: '14+ év, ≥150 cm, ≤120 kg; zárt cipő kötelező',
    badges: [
      { emoji: '🅿️', label: 'Parkoló', text: 'Parkoló' },
      { emoji: '🍔', label: 'Büfé', text: 'Büfé' },
      { emoji: '🍦', label: 'Fagyizó', text: 'Fagyizó' },
      { emoji: '🪖', label: 'Sisak', text: 'Sisak biztosított' },
    ],
    website: 'https://teglasf1gokartpalya.hu/',
    backgroundImage: '/2.png',
  },
  {
    id: 'paloc',
    name: 'Palóc Ring',
    description:
      'Magyarország leghosszabb bérgokart pályája, 1,2 km-es, FIA tanúsítvánnyal rendelkező nyomvonallal. Kelet-Európában egyedülálló módon benzines és elektromos SODI flottával, intelligens pályavezérléssel, számítógépes időméréssel és szimulátorokkal várják a versenyzőket.',
    address: '2668 Patvarc, Külterület hrsz. 035/11. (Balassagyarmat mellett)',
    size: '1200 m hosszú (5 féle variálható nyomvonal)',
    gokarts:
      'SODI SR5 (390 cm³), gyerek SODI LR5 (200 cm³), elektromos SODI RSX és 2 személyes gokartok',
    conditions: 'Gyerek és felnőtt futamok külön; higiéniai maszk (kámzsa) és zárt cipő kötelező.',
    badges: [
      { emoji: '🅿️', label: 'Parkoló', text: 'Parkoló' },
      { emoji: '🍔', label: 'Büfé', text: 'Büfé' },
      { emoji: '🪖', label: 'Sisak', text: 'Sisak biztosított' },
      { emoji: '🎮', label: 'Szimulátor', text: 'Szimulátor' },
    ],
    website: 'https://palocring.hu/',
    backgroundImage: '/2.png',
  },
  {
    id: 'slovak',
    name: 'Slovak Karting Center',
    description:
      'Szlovákia leghosszabb, CIK-FIA licenccel rendelkező modern szabadtéri gokartpályája a Slovakia Ring komplexumán belül. 5 különböző nyomvonallal, éjszakai kivilágítással, profi időmérő és kamerarendszerrel, 10 perces futamokkal biztosítják a tökéletes élményt.',
    address: 'Orechová Potôň 812, 930 02 Orechová Potôň, Szlovákia',
    size: '1172 m hosszú, 7 m széles (a célegyenesben 10 m széles)',
    gokarts:
      'SODI RT10 (Honda GX 390 cm³), gyerek SODI LR5 (Honda GX 200 cm³) és 2 személyes gokartok',
    conditions:
      'Felnőtt gokart: 15+ év; Gyerek: 7+ év és ≥130 cm; 2 személyes gokart utas: 4+ év; zárt cipő és regisztráció (2€) kötelező.',
    badges: [
      { emoji: '🅿️', label: 'Parkoló', text: 'Parkoló' },
      { emoji: '🍔', label: 'Büfé', text: 'Teraszos Bár / Büfé' },
      { emoji: '🪖', label: 'Sisak', text: 'Sisak biztosított' },
      { emoji: '🌙', label: 'Éjszakai', text: 'Éjszakai kivilágítás' },
    ],
    website: 'https://slovakiaring.sk/en/karting',
    backgroundImage: '/2.png',
  },
];

export default function TrackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Téglás futamok dátumai (2026)
  const teglasRaceDates = [
    '2026-03-07',
    '2026-04-03',
    '2026-05-03',
    '2026-06-07',
    '2026-07-12',
    '2026-08-02',
    '2026-08-23',
    '2026-09-13',
    '2026-10-04',
    '2026-11-08',
  ];

  function handleCalendarClick() {
    const track = tracks[currentIndex];

    // Ha Téglás pálya, keressük meg a következő futamot
    if (track.id === 'teglas' || track.name.includes('Téglás')) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Keressük meg a következő futamot
      const nextRace = teglasRaceDates.find((dateStr) => {
        const raceDate = new Date(dateStr);
        raceDate.setHours(0, 0, 0, 0);
        return raceDate >= today;
      });

      if (nextRace) {
        router.push(`/calendar?date=${nextRace}`);
        return;
      }
    }

    // Egyébként csak a naptárra navigálunk
    router.push('/calendar');
  }

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const track = tracks[currentIndex];

  return (
    <main className="relative max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-white">
      <h1 className="mb-6 md:mb-8 text-3xl md:text-4xl font-extrabold gradient-text text-center drop-shadow-lg">
        Pályák
      </h1>
      <div className="absolute inset-0 -z-10">
        <Image
          src={track.backgroundImage}
          alt="Pálya háttér"
          fill
          className="object-cover blur-2xl"
        />
      </div>

      <div className="relative bg-gray-800/80 rounded-2xl shadow-xl p-4 md:p-8">
        {/* Pálya cím és lapozó nyilak */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={prevTrack}
            className="flex-shrink-0 p-1 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Előző pálya"
          >
            <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>

          <h2 className="text-xl md:text-3xl font-bold gradient-text text-center drop-shadow flex-1">
            {track.name}
          </h2>

          <button
            onClick={nextTrack}
            className="flex-shrink-0 p-1 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Következő pálya"
          >
            <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
        </div>

        {/* Szöveg */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <p className="mb-4 text-sm md:text-lg text-center text-white max-w-2xl">
            {track.description}
          </p>
        </div>

        {/* Adatok és kép */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-6 md:mb-8">
          {/* Bal oldal: adatok, badge-ek */}
          <div className="flex-1 flex flex-col items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-xl mb-4 md:mb-6">
              <div className="spec-card glass-card p-3 md:p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-xl md:text-2xl mb-1">📍</span>
                <span className="font-bold text-sm md:text-base mb-1">Cím</span>
                <span className="text-xs md:text-sm text-center md:text-left">{track.address}</span>
              </div>
              <div className="spec-card glass-card p-3 md:p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-xl md:text-2xl mb-1">🛣️</span>
                <span className="font-bold text-sm md:text-base mb-1">Méret</span>
                <span className="text-xs md:text-sm text-center md:text-left">{track.size}</span>
              </div>
              <div className="spec-card glass-card p-3 md:p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-xl md:text-2xl mb-1">🛞</span>
                <span className="font-bold text-sm md:text-base mb-1">Gokartok</span>
                <span className="text-xs md:text-sm text-center md:text-left">{track.gokarts}</span>
              </div>
              <div className="spec-card glass-card p-3 md:p-4 rounded-xl shadow flex flex-col items-center md:items-start">
                <span className="text-xl md:text-2xl mb-1">🧒</span>
                <span className="font-bold text-sm md:text-base mb-1">Feltételek</span>
                <span className="text-xs md:text-sm text-center md:text-left">
                  {track.conditions}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6 md:mb-8">
              {track.badges.map((badge) => (
                <div
                  key={badge.label}
                  className="info-badge glass-card px-2 md:px-3 py-1 rounded-xl flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                >
                  <span role="img" aria-label={badge.label}>
                    {badge.emoji}
                  </span>{' '}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Jobb oldal: képslider */}
          <div className="w-full max-w-md flex flex-col items-center">
            <TrackImageSlider trackId={track.id} />
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6 w-full">
              {track.website && (
                <a
                  href={track.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl animate-float w-full sm:w-auto"
                >
                  Pálya weboldala
                </a>
              )}
              <button
                onClick={handleCalendarClick}
                className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl animate-float w-full sm:w-auto"
              >
                Naptár
              </button>
            </div>
          </div>
        </div>

        {/* Pálya indikátorok */}
        {tracks.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {tracks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Pálya ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
