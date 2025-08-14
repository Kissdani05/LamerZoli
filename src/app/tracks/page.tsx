'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const tracks = [
  {
    name: 'Hungaroring Kart Center',
    img: '/hungaroring.jpg',
    character: 'Gyors, külső aszfaltcsík, technikás középső szektorral.',
    minAge: '150 cm',
    link: '/calendar',
  },
  {
    name: 'G1 Kart Center',
    img: '/g1.jpg',
    character: 'Beltéri, technikás pálya, sok balos kanyar.',
    minAge: '140 cm',
    link: '/calendar',
  },
  {
    name: 'Kecskemét Gokart',
    img: '/kecskemet.jpg',
    character: 'Vegyes karakterű aszfaltcsík, családias hangulat.',
    minAge: '145 cm',
    link: '/calendar',
  },
];

export default function TracksPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Mobil swipe-karusszelhez scroll snap
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">Pályák – Lámer Zoltán Gokart</h1>
      <div className="hidden md:grid grid-cols-2 gap-8">
        {tracks.map((track) => (
          <div
            key={track.name}
            className="glass card p-6 shadow-xl tilt-card transition-transform duration-300 hover:scale-105"
            tabIndex={0}
            style={{ perspective: '800px' }}
          >
            <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden">
              <Image
                src={track.img}
                alt={track.name + ' pályafotó'}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold gradient-text mb-2">{track.name}</h2>
            <p className="mb-2">{track.character}</p>
            <p className="mb-2 font-semibold">Minimum: {track.minAge}</p>
            <a href={track.link} className="btn btn-outline mt-2">
              Megnézem a naptárban
            </a>
          </div>
        ))}
      </div>
      {/* Mobil swipe-karusszel */}
      <div
        ref={carouselRef}
        className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {tracks.map((track) => (
          <div
            key={track.name}
            className="glass card min-w-[80vw] max-w-xs p-6 shadow-xl tilt-card transition-transform duration-300 hover:scale-105 snap-center"
            tabIndex={0}
            style={{ perspective: '800px' }}
          >
            <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden">
              <Image
                src={track.img}
                alt={track.name + ' pályafotó'}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-lg font-bold gradient-text mb-2">{track.name}</h2>
            <p className="mb-2 text-sm">{track.character}</p>
            <p className="mb-2 font-semibold text-sm">Minimum: {track.minAge}</p>
            <a href={track.link} className="btn btn-outline mt-2 text-sm">
              Megnézem a naptárban
            </a>
          </div>
        ))}
      </div>
      {/* Tilt effect JS/CSS (alap markup, bővíthető) */}
      <style jsx>{`
        .tilt-card:hover {
          transform: rotateY(8deg) scale(1.05);
        }
      `}</style>
    </main>
  );
}
