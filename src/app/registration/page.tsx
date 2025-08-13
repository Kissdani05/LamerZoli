import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nevezés – Lámer Zoltán Gokart',
  description: 'Nevezési információk és űrlap a soron következő futamokra.',
};

export default function RegistrationPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Nevezés</h1>
      <p>Hamarosan bővített nevezési űrlap extra mezőkkel és útmutatóval.</p>
    </main>
  );
}
