'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

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
}

export default function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [races, setRaces] = useState<Race[]>([]); // Specify Race[] type
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear()); // Add year state

  useEffect(() => {
    async function fetchRaces() {
      const { data } = await supabase.from('races').select('*');
      setRaces(data || []);
    }
    fetchRaces();
  }, []);

  // Versenyek dátumai
  const raceDates = races.map((r) => (r.date ? new Date(r.date).toISOString().slice(0, 10) : null));

  // Apple stílusú naptár grid
  const daysInMonth = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(new Date(year, month, d));

  // Kiválasztott nap versenyei
  const selectedDayStr = selectedDate ? selectedDate.toISOString().slice(0, 10) : '';
  const dayRaces = races.filter((r) => r.date && r.date.startsWith(selectedDayStr));

  return (
    <div className="relative">
      {/* Blur háttérkép */}
      <div className="absolute inset-0 -z-10">
        <Image src="/2.png" alt="Naptár háttér" fill className="object-cover blur-2xl" />
      </div>
      <h1 className="mb-8 text-4xl font-extrabold gradient-text text-center drop-shadow-lg">
        Naptár
      </h1>
      <div className="apple-calendar flex flex-col md:flex-row gap-8 p-8">
        {/* Bal: nagy naptár */}
        <div className="calendar-glass rounded-2xl shadow-xl p-6 bg-gray-200/80 dark:bg-gray-800/60 backdrop-blur-xl w-full max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setMonth(month === 0 ? 11 : month - 1)}
              aria-label="Előző hónap"
              className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
              style={{ minWidth: 40, cursor: 'pointer' }}
            >
              ◀
            </button>
            <div className="text-2xl font-bold gradient-text">
              {year} {monthNames[month]}
            </div>
            <button
              onClick={() => setMonth(month === 11 ? 0 : month + 1)}
              aria-label="Következő hónap"
              className="calendar-btn rounded-full border-2 border-white bg-white/80 dark:bg-black/30 px-3 py-1 text-lg font-bold shadow hover:bg-[#e4eb34] hover:text-black transition-colors"
              style={{ minWidth: 40, cursor: 'pointer' }}
            >
              ▶
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-lg font-semibold">
            {['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, idx) => {
              const dateStr = date ? date.toISOString().slice(0, 10) : '';
              const isRaceDay = raceDates.includes(dateStr);
              const isSelected = selectedDayStr === dateStr;
              return (
                <button
                  key={idx}
                  className={`calendar-day rounded-xl aspect-square flex items-center justify-center text-lg font-bold transition-all relative ${isRaceDay ? 'bg-[#e4eb34] text-black shadow-lg' : 'bg-white/80 dark:bg-black/30'} ${isSelected ? 'border-2 border-white ring-4 ring-brand-2' : ''}`}
                  disabled={!date}
                  onClick={() => date && setSelectedDate(date)}
                  aria-label={date ? date.toLocaleDateString() : ''}
                  style={{ cursor: date ? 'pointer' : 'default' }}
                >
                  {date ? date.getDate() : ''}
                  {isRaceDay && (
                    <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-brand-2 animate-pulse" />
                  )}
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
                <ul className="space-y-4">
                  {dayRaces.map((race) => (
                    <li
                      key={race.id}
                      className="glass-card p-4 rounded-xl shadow-lg border-l-4 border-brand-2 border-2 border-white"
                    >
                      <div className="font-bold text-lg mb-1">{race.name}</div>
                      <div className="text-base mb-1">{race.location}</div>
                      <div className="text-sm mb-1">
                        {race.date
                          ? new Date(race.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </div>
                      <div className="text-sm text-muted">{race.description}</div>
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
    </div>
  );
}
