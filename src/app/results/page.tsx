'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  image_url?: string;
};

export default function ResultsPage() {
  // Supabase eredmények betöltése
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchResults();
  }, []);

  // ...existing code...

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

      {/* Szűrősáv eltávolítva */}

      {/* Események egymás mellett asztali nézetben */}
      <section id="events" className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-8 text-lg">Betöltés...</div>
        ) : events.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-lg">Nincs eredmény.</div>
        ) : (
          events.map((ev) => <EventResultCard key={ev.id} event={ev} />)
        )}
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

// Egy esemény kártya és részletes eredmény nézet
// ...existing code...

function EventResultCard({ event }: { event: Event }) {
  return (
    <div className="transition-all duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl p-5 flex flex-col items-center gap-3 mb-6 h-[370px] md:h-[400px] justify-between hover:scale-[1.03] hover:shadow-2xl border border-gray-800 relative">
      <div className="w-full flex justify-center">
        <Image
          src={event.image_url || '/1.png'}
          alt={event.name + ' borítókép'}
          width={220}
          height={140}
          className="rounded-xl object-cover mb-2 w-[220px] h-[140px] shadow-lg border border-gray-700 bg-gray-900"
          sizes="(max-width: 768px) 100vw, 220px"
          loading="lazy"
        />
      </div>
      <h3 className="font-extrabold text-xl mb-1 text-center text-white tracking-tight drop-shadow-lg">
        {event.name}
      </h3>
      <div className="text-xs text-gray-400 mb-1 text-center">
        {event.date} • {event.location}
      </div>
      <div className="text-xs text-gray-400 mb-2 text-center">Indulók: {event.participants}</div>
      <div className="w-full flex flex-grow items-end justify-center mt-2 mb-0">
        <Link
          className="w-full px-4 py-2 rounded-full font-bold bg-yellow-400 text-gray-900 shadow hover:bg-yellow-300 transition text-sm text-center"
          style={{ marginBottom: '0', marginTop: 'auto' }}
          href={`/results/${event.id}`}
        >
          Eredmények megtekintése
        </Link>
      </div>
    </div>
  );
}
