'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: 'Versenynaptár – Lámer Zoltán Gokart',
//   description: 'Közelgő versenyek időponttal és helyszínnel. Nevezés egy kattintással.',
// };

function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const monthNames = [
  'Január',
  'Február',
  'Március',
  'Április',
  'Május',
  'Június',
  'Július',
  'Augusztus',
  'Szeptember',
  'Október',
  'November',
  'December',
];

interface Race {
  id: string;
  name: string;
  location: string;
  date: string;
  description?: string;
  categories?: string[];
  image_url?: string;
  max_participants?: number;
  address?: string;
  layout?: string;
  format?: string;
  fee?: string;
  weight_rule?: string;
  deposit?: string;
  deadline?: string;
  rain_rule?: string;
  media_rule?: string;
}

function CalendarContent() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure no time component

  // Ha van date paraméter az URL-ben, azt használjuk
  const initialDate = dateParam ? new Date(dateParam) : today;
  initialDate.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());

  // URL paraméter változásakor frissítjük a kiválasztott dátumot
  useEffect(() => {
    if (dateParam) {
      const newDate = new Date(dateParam);
      newDate.setHours(0, 0, 0, 0);
      setSelectedDate(newDate);
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
    }
  }, [dateParam]);

  // Static races for 2026 season
  const races: Race[] = [
    {
      id: '1',
      name: 'Téglás Gokart GP 2026 1. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-03-07T10:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '2',
      name: 'Téglás Gokart GP 2026 2. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-04-03T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '3',
      name: 'Téglás Gokart GP 2026 3. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-05-03T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '4',
      name: 'Téglás Gokart GP 2026 4. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-06-07T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '5',
      name: 'Téglás Gokart GP 2026 5. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-07-12T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '6',
      name: 'Téglás Gokart GP 2026 6. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-08-02T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '7',
      name: 'Téglás Gokart GP 2026 7. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-08-23T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '8',
      name: 'Téglás Gokart GP 2026 8. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-09-13T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '9',
      name: 'Téglás Gokart GP 2026 9. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-10-04T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
    {
      id: '10',
      name: 'Téglás Gokart GP 2026 10. Forduló',
      location: 'Téglás F1 Gokartpálya',
      date: '2026-11-08T09:00:00',
      categories: ['Sprint', 'Endurance', 'Junior'],
      address: 'Téglás F1 Gokartpálya',
    },
  ];

  // Hónap léptetése
  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function handleNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  // Versenyek dátumai
  // Note: raceDates kept for future highlighting logic; currently unused
  // const raceDates = races.map((r) => (r.date ? new Date(r.date).toISOString().slice(0, 10) : null));

  // Apple stílusú naptár grid
  const daysInMonth = getMonthDays(year, month);
  // Compute Monday-first offset: JS getDay() => 0 Sun ... 6 Sat; convert so Mon=0
  const firstDay = new Date(year, month, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  const calendarDays: Array<Date | null> = [];
  for (let i = 0; i < mondayOffset; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(new Date(year, month, d));

  // Kiválasztott nap versenyei
  const keyFromDate = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${dd}`;
  };
  const selectedDayStr = selectedDate ? keyFromDate(selectedDate) : '';
  const dayRaces = races.filter((r) => r.date && r.date.startsWith(selectedDayStr));

  // Static highlight days (2026):
  // Blue (organizing): 2026 race schedule - Teglas Gokart Palya
  const brandDays = new Set<string>([]);
  const blueDays = new Set([
    '2026-03-07', // 1. forduló - Március 7 SZOMBAT
    '2026-04-03', // 2. forduló - Április 3 PÉNTEK
    '2026-05-03', // 3. forduló - Május 3 VASÁRNAP
    '2026-06-07', // 4. forduló - Június 7 VASÁRNAP
    '2026-07-12', // 5. forduló - Július 12 VASÁRNAP
    '2026-08-02', // 6. forduló - Augusztus 2 VASÁRNAP
    '2026-08-23', // 7. forduló - Augusztus 23 VASÁRNAP
    '2026-09-13', // 8. forduló - Szeptember 13 VASÁRNAP
    '2026-10-04', // 9. forduló - Október 4 VASÁRNAP
    '2026-11-08', // 10. forduló - November 8 VASÁRNAP
  ]);

  return (
    <div className="relative">
      {/* Blur háttérkép */}
      <div className="absolute inset-0 -z-10">
        <Image src="/2.png" alt="Naptár háttér" fill className="object-cover blur-2xl" />
      </div>
      <h1 className=" text-4xl font-extrabold gradient-text text-center drop-shadow-lg">Naptár</h1>
      <div className="apple-calendar flex flex-col md:flex-row gap-8 p-8">
        {/* Bal: nagy naptár */}
        <div className="calendar-glass rounded-2xl shadow-xl p-6 bg-gray-200/80 dark:bg-gray-800/60 backdrop-blur-xl w-full max-w-xl">
          <div className="mb-4">
            {/* Mobile: year above, month below, arrows beside, centered */}
            <div className="flex flex-col items-center md:hidden gap-2">
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={handlePrevMonth}
                  aria-label="Előző hónap"
                  className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
                  style={{ minWidth: 40, cursor: 'pointer' }}
                >
                  ◀
                </button>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold gradient-text">{year}</div>
                  <div className="text-xl font-bold gradient-text">{monthNames[month]}</div>
                </div>
                <button
                  onClick={handleNextMonth}
                  aria-label="Következő hónap"
                  className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
                  style={{ minWidth: 40, cursor: 'pointer' }}
                >
                  ▶
                </button>
              </div>
              {/* Alsó hónapváltó eltávolítva mobil nézetből */}
            </div>
            {/* Desktop: year and month inline, arrows beside */}
            <div className="hidden md:flex justify-between items-center">
              <button
                onClick={handlePrevMonth}
                aria-label="Előző hónap"
                className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
                style={{ minWidth: 40, cursor: 'pointer' }}
              >
                ◀
              </button>
              <div className="flex items-center gap-2 relative">
                <div className="text-xl font-bold gradient-text">{year}</div>
                <div className="text-xl font-bold gradient-text">{monthNames[month]}</div>
              </div>
              <button
                onClick={handleNextMonth}
                aria-label="Következő hónap"
                className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
                style={{ minWidth: 40, cursor: 'pointer' }}
              >
                ▶
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-lg font-semibold">
            {['H', 'K', 'Sz', 'Cs', 'P', 'Szo', 'V'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, idx) => {
              const dateStr = date ? keyFromDate(date) : '';
              const isSelected = selectedDayStr === dateStr;
              const isBrandDay = date ? brandDays.has(dateStr) : false;
              const isBlueDay = date ? blueDays.has(dateStr) : false;
              const baseBg = isBrandDay
                ? 'bg-[var(--brand-2)] text-black shadow-lg'
                : isBlueDay
                  ? 'bg-[#3b82f6] text-white shadow-lg'
                  : 'bg-white/80 dark:bg-black/30';
              return (
                <button
                  key={idx}
                  className={`calendar-day rounded-xl aspect-square flex items-center justify-center text-lg font-bold transition-all relative ${baseBg} ${isSelected ? 'border-2 border-white ring-4 ring-brand-2' : ''}`}
                  disabled={!date}
                  onClick={() => date && setSelectedDate(date)}
                  aria-label={date ? date.toLocaleDateString() : ''}
                  style={{ cursor: date ? 'pointer' : 'default' }}
                >
                  {date ? date.getDate() : ''}
                </button>
              );
            })}
          </div>
        </div>
        {/* Jobb: óránkénti bontás, ha van verseny */}
        <div className="calendar-details flex-1 rounded-2xl shadow-xl p-6 bg-gray-200/80 dark:bg-gray-800/60 backdrop-blur-xl">
          {selectedDate ? (
            <>
              <div className="text-xl font-bold mb-4 gradient-text">
                {selectedDate.toLocaleDateString()}
              </div>
              {dayRaces.length > 0 ? (
                <ul className="space-y-8">
                  {dayRaces.map((race) => (
                    <li
                      key={race.id}
                      className="glass-card p-6 rounded-xl shadow-lg border-l-4 border-brand-2 border-2 border-white"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="font-bold text-2xl mb-4 text-center">{race.name}</div>
                          <div className="text-center">
                            <div className="font-semibold text-lg mb-1">Helyszín</div>
                            <div className="text-base">{race.location}</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg mb-1">Időpont</div>
                            <div className="text-base">
                              {race.date ? new Date(race.date).toLocaleDateString('hu-HU') : ''}{' '}
                              9:00 - 15:00
                            </div>
                          </div>
                          {race.categories && race.categories.length > 0 && (
                            <div className="text-center">
                              <div className="font-semibold text-lg mb-1">Kategóriák</div>
                              <div className="text-base">{race.categories.join(', ')}</div>
                            </div>
                          )}
                          <div className="flex justify-center mt-6">
                            {race.id === '1' ? (
                              <Link
                                href="/#race"
                                className="btn btn-primary px-8 py-3 shadow-lg text-lg font-bold inline-block"
                              >
                                Részletek
                              </Link>
                            ) : (
                              <button
                                className="btn btn-outline px-8 py-3 shadow-lg text-lg font-semibold cursor-not-allowed opacity-50"
                                disabled
                              >
                                Hamarosan...
                              </button>
                            )}
                          </div>
                        </div>
                        {race.id === '1' ? (
                          <div className="w-full md:w-80 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                            <Image
                              src="/firstgp.jpg"
                              alt="Teglas Gokart GP 2026 1. Forduló"
                              width={1200}
                              height={630}
                              className="w-full h-auto"
                            />
                          </div>
                        ) : (
                          <div className="w-full md:w-80 h-64 rounded-xl shadow-lg border-2 border-white bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                              Hamarosan...
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted">Nincs verseny ezen a napon.</div>
              )}
            </>
          ) : (
            <div className="text-muted">Válassz egy napot a naptárból!</div>
          )}
        </div>
      </div>

      {/* Legend below the calendar */}
      <div className="px-8 mt-4 space-y-2">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-4 h-4 rounded-sm"
            style={{ background: 'var(--brand-2)' }}
          />
          <span className="text-sm">- Amelyik versenyeken részt veszek</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block w-4 h-4 rounded-sm bg-[#3b82f6]" />
          <span className="text-sm">- Amelyik versenyeket én szervezem</span>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-white">Betöltés...</span>
        </div>
      }
    >
      <CalendarContent />
    </Suspense>
  );
}
