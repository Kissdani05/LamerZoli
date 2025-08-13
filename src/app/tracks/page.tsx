import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pályák és helyszínek – Lámer Zoltán Gokart',
  description: 'A versenyek helyszínei, pálya karakterisztikák és tippek.',
};

export default function TracksPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Pályák</h1>
      <p>Ismert helyszínek: G1 Kart Center, Hungaroring Kart Center, Kecskemét Gokart.</p>
    </main>
  );
}
