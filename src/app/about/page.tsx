import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Rólunk – Lámer Zoltán Gokart',
  description:
    'Ismerd meg a Lámer Zoltán Gokart Klubot: küldetésünk a sportszerű, elérhető bérgokart versenyzés.',
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Rólunk – Lámer Zoltán Gokart</h1>
      <section className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="md:w-1/3 w-full flex justify-center">
            <Image
              src="/file.svg"
              alt="Bemutatkozás"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Lámer Zoltán – alapító, szervező
            </h2>
            <p className="mb-2 text-sm md:text-base">
              Több mint 10 éve aktív a bérgokart világában, számos bajnokság szervezője és
              résztvevője. Célja, hogy a tudás döntsön, ne a szerencse vagy technikai különbség.
            </p>
            <p className="mb-2 text-sm md:text-base">
              Az egykategóriás rendszer garantálja, hogy mindenki azonos eséllyel indul, a fair play
              és sportszerűség kiemelt érték.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge badge-primary text-xs md:text-sm">Több száz nevezés/év</span>
              <span className="badge badge-muted text-xs md:text-sm">8+ forduló, 4 pálya</span>
              <span className="badge badge-muted text-xs md:text-sm">
                Forrás: nevezési statisztika, 2022–2025
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Partnerpályák</h2>
        <ul className="list-disc pl-4 md:pl-5 space-y-2 text-sm md:text-base">
          <li>
            Hungaroring Kart Center – gyors, külső aszfaltcsík, technikás középső szektorral.
            Minimum: 150 cm (pályaszabálytól függően).
          </li>
          <li>G1 Kart Center – beltéri, technikás pálya, modern időmérő rendszer.</li>
          <li>Kecskemét Gokart – vegyes karakterű aszfaltcsík, családias hangulat.</li>
        </ul>
      </section>
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Időmérés és technika</h2>
        <p className="text-sm md:text-base">
          Az összes futamon professzionális időmérő rendszer működik, a pályák saját transzponderes
          vagy RFID alapú technológiát használnak. Az eredmények azonnal elérhetők online.
        </p>
      </section>
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Miért válassz minket?</h2>
        <ul className="list-disc pl-4 md:pl-5 space-y-2 text-sm md:text-base">
          <li>Garantáltan egyenlő technika, mindenki azonos eséllyel indul.</li>
          <li>Sportszerű, barátságos közösség, visszajáró pilóták.</li>
          <li>Átlátható szabályok, fair verseny.</li>
          <li>
            Évente 300+ induló, 8+ forduló, 4 partnerpálya – az egyik legnagyobb magyar bérgokart
            sorozat.
          </li>
        </ul>
      </section>
    </main>
  );
}
