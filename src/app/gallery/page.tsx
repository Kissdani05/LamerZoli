import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galéria – Lámer Zoltán Gokart',
  description: 'Képek és videók a futamokról.',
};

export default function GalleryPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Galéria</h1>
      <p className="text-sm md:text-base">Hamarosan válogatott képgalériák és videók.</p>
    </main>
  );
}
