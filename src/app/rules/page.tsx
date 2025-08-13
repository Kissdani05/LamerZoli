import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szabályok és biztonság – Lámer Zoltán Gokart',
  description: 'Versenyszabályzat, biztonsági előírások és sportszerűség.',
};

export default function RulesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Szabályok</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Sisak és zárt cipő kötelező.</li>
        <li>Ütközés, lökdösődés tilos.</li>
        <li>Sárga zászló alatt előzni tilos.</li>
      </ul>
    </main>
  );
}
