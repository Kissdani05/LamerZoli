'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Participant = {
  id: string | number;
  name?: string;
  position?: number;
};

type Race = {
  id: string | number;
  name?: string;
  date?: string;
  location?: string;
  participants?: number;
  image_url?: string | null;
};

export default function RaceResultPage() {
  const { slug } = useParams();
  const [race, _setRace] = useState<Race | null>(null);
  const [participants, _setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nincs DB: hagyjuk üresen a tartalmat
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 pb-16 text-white">
        <div className="py-16 text-center">Betöltés...</div>
      </main>
    );
  }
  if (!race) {
    return (
      <main className="max-w-6xl mx-auto px-4 pb-16 text-white">
        <div className="py-16 text-center">Nincs ilyen verseny.</div>
      </main>
    );
  }
  // Dobogó részt a legjobb 3 indulóval töltjük fel
  const podium = participants.slice(0, 3);
  return (
    <main className="max-w-4xl mx-auto px-2 pb-16">
      <div className="mb-4">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-white font-semibold shadow hover:bg-gray-600 transition"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Vissza
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Bal oldal: verseny adatok kártya */}
        <section className="w-full md:w-1/3 flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 mb-6 md:mb-0">
          <div className="w-[220px] h-[140px] mb-4 overflow-hidden flex items-center justify-center rounded-xl shadow-lg border border-gray-700 bg-gray-900">
            <Image
              src={race.image_url || '/1.png'}
              alt={race.name + ' borítókép'}
              width={220}
              height={140}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 220px"
              loading="lazy"
            />
          </div>
          <h1 className="font-extrabold text-2xl mb-2 text-center text-white tracking-tight drop-shadow-lg">
            {race.name}
          </h1>
          <div className="text-xs text-gray-400 mb-1 text-center">
            {race.date} • {race.location}
          </div>
          <div className="text-xs text-gray-400 mb-4 text-center">Indulók: {race.participants}</div>
          {/* Dobogó */}
          <div className="flex justify-center items-end gap-2 w-full mb-2">
            {/* 2. helyezett */}
            <div className="flex flex-col items-center justify-end">
              <div className="bg-gradient-to-t from-gray-300 to-gray-100 text-gray-900 rounded-t-lg px-3 py-2 font-bold text-base w-24 text-center shadow">
                🥈 {podium[1]?.name || '-'}
              </div>
              <div className="bg-gray-300 text-gray-900 rounded-b-lg px-3 py-1 w-24 text-center shadow">
                2.
              </div>
            </div>
            {/* 1. helyezett */}
            <div className="flex flex-col items-center justify-end">
              <div className="bg-gradient-to-t from-yellow-400 to-yellow-200 text-gray-900 rounded-t-lg px-3 py-3 font-bold text-lg w-24 text-center shadow-lg">
                🥇 {podium[0]?.name || '-'}
              </div>
              <div className="bg-yellow-400 text-gray-900 rounded-b-lg px-3 py-1 w-24 text-center shadow">
                1.
              </div>
            </div>
            {/* 3. helyezett */}
            <div className="flex flex-col items-center justify-end">
              <div className="bg-gradient-to-t from-orange-700 to-orange-300 text-gray-900 rounded-t-lg px-3 py-2 font-bold text-base w-24 text-center shadow">
                🥉 {podium[2]?.name || '-'}
              </div>
              <div className="bg-orange-700 text-gray-100 rounded-b-lg px-3 py-1 w-24 text-center shadow">
                3.
              </div>
            </div>
          </div>
        </section>
        {/* Jobb oldal: eredménytábla kártya */}
        <section className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-white tracking-tight">Eredmények</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[320px] w-full text-sm rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gray-800 text-gray-200">
                <tr>
                  <th className="p-3 font-semibold text-center">Hely</th>
                  <th className="p-3 font-semibold text-left">Név</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 text-white">
                {participants.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="p-3 font-bold text-center text-yellow-400 text-lg">
                      {row.position}
                    </td>
                    <td className="p-3 font-semibold text-left">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
