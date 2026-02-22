'use client';
// F1 stílusú eredmény nézet statikus teszt adatokkal
import { useState, useMemo } from 'react';
import { races } from './data';

export default function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedRaceId, setSelectedRaceId] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');

  // Szűrd meg az évnek megfelelő versenyeket
  const filteredRaces = useMemo(() => {
    return races.filter((r) => new Date(r.date).getFullYear() === selectedYear);
  }, [selectedYear]);

  // Ha még nincsen kiválasztott verseny, vagy az nem létezik az aktuális évben
  const selectedRace = useMemo(() => {
    const found = filteredRaces.find((r) => r.id === selectedRaceId);
    if (!found && filteredRaces.length > 0) {
      return filteredRaces[0];
    }
    return found;
  }, [selectedRaceId, filteredRaces]);

  // Ha a kiválasztott verseny megváltozott, frissítsd az ID-t
  if (selectedRace && selectedRaceId !== selectedRace.id) {
    setSelectedRaceId(selectedRace.id);
  }

  const activeCategory = useMemo(
    () =>
      selectedRace?.categories.find((c) => c.categoryId === activeCategoryId) ||
      selectedRace?.categories[0],
    [selectedRace, activeCategoryId],
  );

  if (selectedRace && !selectedRace.categories.some((c) => c.categoryId === activeCategoryId)) {
    setActiveCategoryId(selectedRace.categories[0].categoryId);
  }
  return (
    <main className="max-w-[1200px] mx-auto px-4 pb-24 text-white">
      <section className="mt-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <span className="bg-[#e4eb34] text-black px-4 py-1 rounded-md text-2xl md:text-3xl font-black leading-none shadow">
              EREDMÉNYEK
            </span>
            <span className="gradient-text">{selectedYear} Szezon</span>
          </h1>

          {/* Év választó */}
          <div className="flex gap-2">
            {[2025, 2026].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedYear === year
                    ? 'bg-[#e4eb34] text-black shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {filteredRaces.map((r) => {
          const active = r.id === selectedRace?.id;
          const isOverall = r.id.includes('overall');
          return (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRaceId(r.id);
                setActiveCategoryId(r.categories[0].categoryId);
              }}
              className={`relative flex flex-col items-start p-3 rounded-lg border text-left transition group overflow-hidden shadow-sm ${
                active
                  ? 'bg-[#e4eb34] text-black border-[#e4eb34]'
                  : 'bg-[#121315] border-white/10 hover:border-[#e4eb34]/60'
              }`}
            >
              {!isOverall && (
                <span className="text-xs opacity-70">
                  {new Date(r.date).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}
                </span>
              )}
              <span
                className={`font-bold text-sm leading-tight line-clamp-2 ${isOverall ? '' : 'mt-1'}`}
              >
                {r.name}
              </span>
              <span className="text-[11px] mt-1 opacity-60">{r.location}</span>
              {active && <span className="absolute top-0 right-0 w-2 h-full bg-[#e4eb34]" />}
            </button>
          );
        })}
      </div>
      {/* Fej panel + kategória tabok */}
      {selectedRace && (
        <div className="mb-8 rounded-xl border border-white/10 bg-gradient-to-r from-[#1a1b1e] via-[#141518] to-[#1a1b1e] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-extrabold tracking-tight">{selectedRace.name}</h2>
            <div className="text-sm opacity-70 flex flex-wrap gap-4">
              {!selectedRace.id.includes('overall') && (
                <span>
                  {new Date(selectedRace.date).toLocaleString('hu-HU', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              )}
              <span className="uppercase tracking-wide text-[#e4eb34] font-semibold">
                {selectedRace.location}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedRace.categories.map((cat) => {
              const active = cat.categoryId === (activeCategory?.categoryId || activeCategoryId);
              return (
                <button
                  key={cat.categoryId}
                  onClick={() => setActiveCategoryId(cat.categoryId)}
                  className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition border ${
                    active
                      ? 'bg-[#e4eb34] text-black border-[#e4eb34]'
                      : 'bg-[#1f2023] text-white border-white/10 hover:border-[#e4eb34]/60'
                  }`}
                >
                  {cat.categoryName}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Eredmény tábla */}
      {selectedRace && activeCategory && (
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#0f1012]">
          <div className="grid grid-cols-12 bg-[#181a1d] text-[11px] md:text-xs uppercase tracking-wide font-semibold text-white/80">
            <div className="col-span-1 px-3 py-2">Pos</div>
            <div className="col-span-4 md:col-span-5 px-3 py-2">Pilóta</div>
            <div className="col-span-2 px-3 py-2 md:col-span-2">Pontok</div>
            <div className="col-span-2 px-3 py-2 hidden md:block">Lemaradás</div>
            <div className="col-span-3 md:col-span-2 px-3 py-2">Kategória</div>
          </div>
          <div className="divide-y divide-white/5">
            {activeCategory.results.map((res) => (
              <div
                key={res.position + res.driverName}
                className="grid grid-cols-12 text-sm md:text-[15px] items-center hover:bg-white/5 transition"
              >
                <div className="col-span-1 px-3 py-2 font-bold text-[#e4eb34]">{res.position}</div>
                <div className="col-span-4 md:col-span-5 px-3 py-2 font-medium">
                  {res.driverName}
                </div>
                <div className="col-span-2 px-3 py-2 md:col-span-2 font-semibold text-[#e4eb34]">
                  {res.points}
                </div>
                <div className="col-span-2 px-3 py-2 hidden md:block text-white/70">
                  -{res.entryOrder}
                </div>
                <div className="col-span-3 md:col-span-2 px-3 py-2 text-white/70">
                  {activeCategory.categoryName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* SEO strukturált adatok */}
      {selectedRace && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsEvent',
              name: selectedRace.name,
              startDate: selectedRace.date,
              location: { '@type': 'Place', name: selectedRace.location },
              competitor: activeCategory?.results.map((r) => ({
                '@type': 'Person',
                name: r.driverName,
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
