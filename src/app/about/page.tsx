import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rólunk – Lámer Zoltán Gokart',
  description:
    'Ismerd meg a Lámer Zoltán Gokart Klubot: küldetésünk a sportszerű, elérhető bérgokart versenyzés.',
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Rólunk</h1>
      <p className="mb-4">
        Célunk, hogy profi szervezéssel, egyenlő technikával és barátságos közösséggel biztosítsunk
        valódi versenyélményt kezdőknek és haladóknak egyaránt.
      </p>
      <p>
        A sorozatot Lámer Zoltán szervezi, több éves tapasztalattal a bérgokart világából.
        Csatlakozz te is a következő futamhoz!
      </p>
    </main>
  );
}
