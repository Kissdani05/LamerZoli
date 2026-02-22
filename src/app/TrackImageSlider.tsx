'use client';
import Image from 'next/image';
import { useState } from 'react';

const trackImages: Record<string, string[]> = {
  teglas: ['/teglas1.jpg', '/teglas2.jpg'],
  paloc: ['/paloc.jpg'],
  slovak: ['/slovak.webp'],
};

export default function TrackImageSlider({ trackId }: { trackId: string }) {
  const images = trackImages[trackId] || trackImages.teglas;
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {images.length > 1 && (
        <button
          onClick={prev}
          aria-label="Előző kép"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-900/60 hover:bg-[#e4eb34] hover:text-black text-white rounded-full p-2 shadow-lg transition-colors"
        >
          ◀
        </button>
      )}
      <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={images[idx]}
          alt={`Pálya kép ${idx + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <button
          onClick={next}
          aria-label="Következő kép"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-900/60 hover:bg-[#e4eb34] hover:text-black text-white rounded-full p-2 shadow-lg transition-colors"
        >
          ▶
        </button>
      )}
    </div>
  );
}
