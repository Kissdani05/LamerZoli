'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const years = [2023, 2024, 2025];
const tracks = ['G1', 'Hungaroring', 'Kecskemét', 'Téglás'];
const categories = ['Open', 'Junior', 'Pro'];

export default function ResultsPage() {
  // Szűrők állapota
  const [year, setYear] = useState(2025);
  const [track, setTrack] = useState('G1');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');

  // Dummy adatok (helyettesíthető API-val)
  const latestRace = {
    title: 'G1 Nyári Sprint – 2025.08.10.',
    date: '2025-08-10',
    track: 'G1',
    format: 'Q + 2×13’',
    entrants: 28,
    bestLap: '00:42.713',
    podium: [
      { name: 'Kovács Bence', place: 1 },
      { name: 'Tóth Máté', place: 2 },
      { name: 'Farkas Lili', place: 3 },
    ],
    image: '/1.png',
    detailsUrl: '#',
  };

  const events = [
    {
      title: 'Téglás Sprint – 2025.06.14.',
      date: '2025-06-14',
      track: 'Téglás',
      entrants: 22,
      bestLap: '00:43.201',
      avgLap: '00:44.100',
      image: '/2.png',
      detailsUrl: '#',
    },
    {
      title: 'Hungaroring Tavaszi – 2025.05.03.',
      date: '2025-05-03',
      track: 'Hungaroring',
      entrants: 30,
      bestLap: '00:41.900',
      avgLap: '00:43.000',
      image: '/1.png',
      detailsUrl: '#',
    },
  ];

  const standings = [
    { place: 1, name: 'Kovács Bence', races: 5, wins: 3, podiums: 5, points: 98 },
    { place: 2, name: 'Tóth Máté', races: 5, wins: 1, podiums: 4, points: 87 },
    { place: 3, name: 'Farkas Lili', races: 5, wins: 1, podiums: 3, points: 80 },
    { place: 4, name: 'Kiss Ádám', races: 5, wins: 0, podiums: 2, points: 72 },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 pb-16 text-white">
      {/* Hero */}
      <section className="relative rounded-xl overflow-hidden mb-4" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/2.png"
            alt="Eredmények hero háttér"
            fill
            className="object-cover"
            style={{ filter: 'blur(16px) brightness(0.7)' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-brand-3/60 pointer-events-none" />
        </div>
        <div className="relative z-10 py-8 px-6 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold gradient-text drop-shadow mb-2">
            Eredmények 🏁
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-2">
            Dobogók, köridők és szezonpontok – szűrj évre és pályára!
          </p>
        </div>
      </section>

      {/* Szűrősáv (sticky) */}
      <div className="sticky top-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/10 flex flex-wrap gap-2 px-2 py-2 rounded-b-xl mb-6 shadow-lg items-center">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white"
        >
          {tracks.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white"
        >
          <option value="">Kategória</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kezdj el gépelni: pl. Kiss Ádám…"
          className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white min-w-[180px]"
        />
        <span className="ml-auto text-xs text-muted">Rendezés:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white"
        >
          <option value="desc">Legutóbbi</option>
          <option value="asc">Legrégebbi</option>
          <option value="most">Több induló</option>
        </select>
        <button className="chip-btn px-3 py-1 rounded-full font-semibold bg-[#e4eb34] text-black ml-2">
          📥 CSV letöltés
        </button>
        <button className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white ml-2">
          📄 PDF összesítő
        </button>
      </div>

      {/* Legutóbbi futam */}
      <section id="latest" className="mb-8">
        <div className="glass-card flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl">
          <div className="w-full md:w-1/3">
            <Image
              src={latestRace.image}
              alt="Legutóbbi futam borítókép"
              width={320}
              height={180}
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              loading="eager"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-1">{latestRace.title}</h2>
            <div className="text-sm text-muted mb-1">
              {latestRace.date} • {latestRace.track} • {latestRace.format}
            </div>
            <div className="flex gap-2 mb-2">
              {latestRace.podium.map((p, i) => (
                <span
                  key={p.name}
                  className={`chip glass-card font-semibold ${i === 0 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white'}`}
                >
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {p.name}
                </span>
              ))}
            </div>
            <div className="text-xs text-muted mb-2">
              Indulók: {latestRace.entrants} • Legjobb kör: {latestRace.bestLap}
            </div>
            <div className="flex gap-2">
              <Link
                href={latestRace.detailsUrl}
                className="chip-btn px-3 py-1 rounded-full font-semibold bg-[#e4eb34] text-black"
              >
                Részletek →
              </Link>
              <button className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white">
                📥 CSV
              </button>
              <button className="chip-btn px-3 py-1 rounded-full font-semibold bg-white/10 text-white">
                📄 PDF
              </button>
            </div>
          </div>
        </div>
        {/* SportsEvent JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          "name": "${latestRace.title}",
          "startDate": "${latestRace.date}",
          "location": {"@type": "Place", "name": "${latestRace.track}"},
          "organizer": {"@type": "Organization", "name": "Lámer Zoltán Gokart"}
        }`,
          }}
        />
      </section>

      {/* Eseményrács */}
      <section id="events" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.title} className="glass-card rounded-xl p-4 flex flex-col gap-2">
              <Image
                src={ev.image}
                alt={ev.title + ' borítókép'}
                width={320}
                height={180}
                className="rounded-xl object-cover mb-2"
                sizes="(max-width: 768px) 100vw, 320px"
                loading="lazy"
              />
              <h3 className="font-semibold text-lg mb-1">{ev.title}</h3>
              <div className="text-xs text-muted mb-1">
                {ev.date} • {ev.track}
              </div>
              <div className="flex gap-2 text-xs mb-2">
                <span>Indulók: {ev.entrants}</span>
                <span>Legjobb kör: {ev.bestLap}</span>
                <span>Átlagkör: {ev.avgLap}</span>
              </div>
              <Link
                href={ev.detailsUrl}
                className="chip-btn px-3 py-1 rounded-full font-semibold bg-[#e4eb34] text-black"
              >
                Eredmények →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Ponttáblázat */}
      <section id="standings" className="mb-8">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <table className="min-w-[600px] w-full text-sm">
            <caption className="text-base font-semibold mb-2">
              2025 – Összetett ranglista (frissítve: 2025-08-18)
            </caption>
            <thead className="sticky top-0 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
              <tr>
                <th scope="col" className="p-2">
                  Hely
                </th>
                <th scope="col" className="p-2">
                  Pilóta
                </th>
                <th scope="col" className="p-2">
                  Futamok
                </th>
                <th scope="col" className="p-2">
                  Győzelmek
                </th>
                <th scope="col" className="p-2">
                  Dobogók
                </th>
                <th scope="col" className="p-2">
                  Pont
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.name}>
                  <td className="p-2 font-bold text-center">{row.place}</td>
                  <td
                    className="p-2 font-semibold text-brand-3 hover:underline cursor-pointer"
                    tabIndex={0}
                  >
                    {row.name}
                  </td>
                  <td className="p-2 text-center">{row.races}</td>
                  <td className="p-2 text-center">{row.wins}</td>
                  <td className="p-2 text-center">{row.podiums}</td>
                  <td className="p-2 text-center">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BreadcrumbList + Dataset JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Eredmények", "item": "https://lamerzoli.hu/eredmenyek"},
          {"@type": "ListItem", "position": 2, "name": "2025", "item": "https://lamerzoli.hu/eredmenyek?ev=2025"}
        ]
      }`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Gokart eredmények 2025",
        "description": "Szezon összesített eredmények, CSV és PDF letöltés.",
        "url": "https://lamerzoli.hu/eredmenyek?ev=2025",
        "distribution": [
          {"@type": "DataDownload", "encodingFormat": "CSV", "contentUrl": "https://lamerzoli.hu/eredmenyek.csv"},
          {"@type": "DataDownload", "encodingFormat": "PDF", "contentUrl": "https://lamerzoli.hu/eredmenyek.pdf"}
        ]
      }`,
        }}
      />
    </main>
  );
}
