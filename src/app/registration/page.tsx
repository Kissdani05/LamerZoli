import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nevezés – Lámer Zoltán Gokart',
  description: 'Nevezési információk és űrlap a soron következő futamokra.',
};

export default function RegistrationPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Nevezés</h1>
      <div className="mb-6 p-4 md:p-6 rounded-lg border border-blue-500/40 bg-blue-50 text-blue-900">
        <h2 className="text-lg md:text-xl font-semibold mb-2">SWS nevezőknek extra lehetőség</h2>
        <p className="leading-relaxed text-sm md:text-base">
          Akik az SWS oldalon keresztül is előre neveznek a versenyemre, köztük minden alkalommal
          kisorsolunk <b>2 darab 8 perces szabadedzést</b>!
        </p>
      </div>

      <p className="text-sm md:text-base">
        Hamarosan bővített nevezési űrlap extra mezőkkel és útmutatóval.
      </p>
    </main>
  );
}
