import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Versenynaptár – Lámer Zoltán Gokart',
  description: 'Közelgő versenyek időponttal és helyszínnel. Nevezés egy kattintással.',
};

export default function CalendarPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Versenynaptár</h1>
      <p>Hamarosan részletes naptár oldal, eseményenként SEO-barát leírásokkal.</p>
    </main>
  );
}
