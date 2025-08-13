import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pályák és helyszínek – Lámer Zoltán Gokart',
  description: 'A versenyek helyszínei, pálya karakterisztikák és tippek.',
};

export default function TracksPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Pályák – Lámer Zoltán Gokart</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hungaroring Kart Center</h2>
        <ul className="list-disc pl-5 mb-2">
          <li>Cím: Mogyoród, Hungaroring út 10.</li>
          <li>Karakter: Gyors, külső aszfaltcsík, technikás középső szektorral.</li>
          <li>Minimum magasság: 150 cm (pályaszabálytól függően).</li>
          <li>Időmérő: transzponderes rendszer, online eredmények.</li>
          <li>Tipp: a középső szektorban érdemes korán fékezni.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">G1 Kart Center</h2>
        <ul className="list-disc pl-5 mb-2">
          <li>Cím: Budapest, Fehérvári út 120.</li>
          <li>Karakter: Beltéri, technikás pálya, sok balos kanyar.</li>
          <li>Minimum magasság: 140 cm.</li>
          <li>Időmérő: RFID alapú rendszer, azonnali köridők.</li>
          <li>Tipp: a hosszú egyenes végén érdemes későn fékezni.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Kecskemét Gokart</h2>
        <ul className="list-disc pl-5 mb-2">
          <li>Cím: Kecskemét, Szent László körút 66.</li>
          <li>Karakter: Vegyes karakterű aszfaltcsík, családias hangulat.</li>
          <li>Minimum magasság: 145 cm.</li>
          <li>Időmérő: transzponderes rendszer, helyszíni kijelző.</li>
          <li>Tipp: a célegyenes végén a balos kanyarban érdemes kívülről támadni.</li>
        </ul>
      </section>
    </main>
  );
}
