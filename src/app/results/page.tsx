'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

interface ResultRow {
  id: string;
  year: number;
  event: string;
  track: string;
  position: number;
  name: string;
  points: number;
  time: string;
  photo_url?: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  useEffect(() => {
    async function fetchResults() {
      // Próbáljuk lekérni a Supabase-ból, ha nincs tábla, mock adat
      const { data } = await supabase
        .from('results')
        .select('*')
        .order('year', { ascending: false })
        .order('event', { ascending: false });
      if (data) setResults(data as ResultRow[]);
      else
        setResults([
          {
            id: '1',
            year: 2025,
            event: 'Hungaroring Tavasz',
            track: 'Hungaroring',
            position: 1,
            name: 'Kiss Péter',
            points: 25,
            time: '12:34.567',
            photo_url: '/gallery/sample1.jpg',
          },
          {
            id: '2',
            year: 2025,
            event: 'G1 Bajnokok',
            track: 'G1',
            position: 2,
            name: 'Nagy Zoltán',
            points: 20,
            time: '12:36.123',
            photo_url: '/gallery/sample2.jpg',
          },
          {
            id: '3',
            year: 2025,
            event: 'Kecskemét Kupa',
            track: 'Kecskemét',
            position: 3,
            name: 'Tóth Anna',
            points: 16,
            time: '12:38.999',
            photo_url: '/gallery/sample3.jpg',
          },
        ]);
    }
    fetchResults();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Eredmények – Lámer Zoltán Gokart</h1>
      <div className="mb-6">
        <a href="/gallery" className="btn btn-outline mr-4">
          Fotógaléria
        </a>
        <a href="/results.pdf" className="btn btn-primary" download>
          Letölthető PDF
        </a>
      </div>
      <h2 className="text-xl font-semibold mb-2">Legutóbbi dobogósok</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {results.slice(0, 3).map((row) => (
          <div key={row.id} className="card">
            <p className="font-bold">
              {row.position}. hely: {row.name}
            </p>
            <p>
              {row.event} – {row.track}
            </p>
            <p>
              Pont: {row.points} | Idő: {row.time}
            </p>
            {row.photo_url && (
              <Image
                src={row.photo_url}
                alt={row.name}
                width={200}
                height={120}
                className="rounded"
              />
            )}
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2">Teljes eredménytábla</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Év</th>
              <th>Futam</th>
              <th>Pálya</th>
              <th>Helyezés</th>
              <th>Név</th>
              <th>Pont</th>
              <th>Idő</th>
              <th>Fotó</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.id}>
                <td>{row.year}</td>
                <td>{row.event}</td>
                <td>{row.track}</td>
                <td>{row.position}</td>
                <td>{row.name}</td>
                <td>{row.points}</td>
                <td>{row.time}</td>
                <td>
                  {row.photo_url && (
                    <Image
                      src={row.photo_url}
                      alt={row.name}
                      width={60}
                      height={36}
                      className="rounded"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
