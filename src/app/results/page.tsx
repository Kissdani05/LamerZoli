import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eredmények és ranglista – Lámer Zoltán Gokart',
  description: 'Korábbi futamok eredményei, összesített ponttáblázat.',
};

export default function ResultsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Eredmények</h1>
      <p>Hamarosan dinamikus eredménylista és ponttáblázat.</p>
    </main>
  );
}
