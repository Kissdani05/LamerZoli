import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szabályok és biztonság – Lámer Zoltán Gokart',
  description: 'Versenyszabályzat, biztonsági előírások és sportszerűség.',
};

export default function RulesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Szabályok</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Géposztás és kiosztás</h2>
        <p>
          Minden versenyző azonos kategóriájú, egyforma teljesítményű bérgokartot kap. A gépkiosztás
          sorsolással vagy rotációval történik, hogy a technikai különbségek ne befolyásolják az
          eredményt.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Súlykompenzáció</h2>
        <p>
          A versenyzők súlyát mérjük, és szükség esetén súlykompenzációt alkalmazunk (pl. ólomsúlyok
          a gokartban), hogy mindenki azonos eséllyel induljon. A pontos szabályokat a verseny előtt
          ismertetjük.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Boxkiállás</h2>
        <p>
          Bizonyos futamformátumokban kötelező boxkiállás lehet, amelyet a verseny során
          meghatározott időablakban kell teljesíteni. A boxutcában a sebesség korlátozott, a
          biztonsági szabályokat szigorúan be kell tartani.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Zászlók</h2>
        <ul className="list-disc pl-5">
          <li>
            <strong>Sárga:</strong> Veszély, előzni tilos.
          </li>
          <li>
            <strong>Zöld:</strong> Pálya tiszta, verseny folytatódik.
          </li>
          <li>
            <strong>Piros:</strong> Verseny megszakítva, mindenki lassít.
          </li>
          <li>
            <strong>Kockás:</strong> Futam vége.
          </li>
          <li>
            <strong>Kék:</strong> Lassabb versenyzőt engedni kell.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Büntetések</h2>
        <p>
          Sportszerűtlen viselkedés, lökdösés, szándékos ütközés, pályaelhagyás vagy zászlószabály
          megsértése esetén időbüntetés, kizárás vagy pontlevonás járhat.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Óvás</h2>
        <p>
          Óvást a futam után írásban lehet benyújtani a szervezőnek. Az óvásokat a versenybizottság
          vizsgálja ki, döntésük végleges.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pontozás</h2>
        <p>
          Minden futamon a helyezések alapján pontokat kapnak a versenyzők. Az éves ranglistát a
          megszerzett pontok alapján állítjuk össze. A pontos pontozási rendszer a versenynaptárban
          olvasható.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Felelősség</h2>
        <p>
          Mindenki saját felelősségére indul, a pályán a szervező és a pályaüzemeltető utasításait
          be kell tartani. A biztonsági előírások megszegése kizárást vonhat maga után.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Felszerelés</h2>
        <ul className="list-disc pl-5">
          <li>Sisak és zárt cipő kötelező.</li>
          <li>Ajánlott: overall, kesztyű, nyakvédő.</li>
          <li>Bérelhető felszerelés a pályán.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Versenyformátumok magyarázata</h2>
        <ul className="list-disc pl-5 mb-2">
          <li>
            <strong>Időmérő:</strong> Minden verseny előtt időmérő edzést tartunk, ahol a
            leggyorsabb köridő alapján alakul ki a rajtsorrend.
          </li>
          <li>
            <strong>Futam:</strong> A verseny fő része, ahol a cél a minél jobb helyezés elérése. A
            futam hossza általában 10–20 perc.
          </li>
          <li>
            <strong>Pontozás:</strong> A helyezések alapján pontokat kapnak a versenyzők (pl. 1.
            hely: 25 pont, 2. hely: 20 pont, 3. hely: 16 pont stb.). Az év végén a legtöbb pontot
            gyűjtő versenyző lesz a bajnok.
          </li>
          <li>
            <strong>Súlykompenzáció:</strong> A versenyzők súlyát mérjük, és szükség esetén
            ólomsúlyokat helyezünk a gokartba, hogy mindenki azonos eséllyel induljon.
          </li>
          <li>
            <strong>Boxkiállás:</strong> Bizonyos futamokban kötelező boxkiállás van, amelyet a
            verseny során meghatározott időablakban kell teljesíteni.
          </li>
          <li>
            <strong>Szabályok:</strong> A sportszerűség, biztonság és fair play kiemelten fontos.
            Minden szabály megsértése büntetést vonhat maga után.
          </li>
          <li>
            <strong>Példa:</strong> Egy tipikus verseny: időmérő (5 perc), futam (15 perc),
            pontozás, eredményhirdetés.
          </li>
        </ul>
      </section>
    </main>
  );
}
