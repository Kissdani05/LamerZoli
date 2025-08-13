import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog – Lámer Zoltán Gokart',
  description: 'Tippek, hírek és történetek a bérgokart világából.',
};

export default function BlogPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">Blog – Lámer Zoltán Gokart</h1>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">
          Hogyan készülj az első bérgokart versenyedre?
        </h2>
        <img
          src="/gallery/sample1.jpg"
          alt="Bérgokart verseny"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          Az első bérgokart verseny mindig izgalmas kihívás. Ebben a cikkben összegyűjtöttük, mire
          érdemes figyelned, hogy magabiztosan állj rajthoz.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Felszerelés és biztonság</h3>
        <ul className="list-disc pl-5 mb-2">
          <li>Sisak, zárt cipő, overall – ezek kötelezőek.</li>
          <li>Ajánlott: kesztyű, nyakvédő, bérelhető a pályán.</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-2">Mentális felkészülés</h3>
        <p>
          Fontos, hogy ne izgulj túl, koncentrálj a pályára és a szabályokra. A{' '}
          <a href="/rules" className="underline">
            szabályzatot
          </a>{' '}
          érdemes előre átnézni.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Nevezés menete</h3>
        <p>
          Regisztrálj online a{' '}
          <a href="/calendar" className="underline">
            naptár
          </a>{' '}
          oldalon, válaszd ki a futamot, és töltsd ki az adatokat. A{' '}
          <a href="/tracks" className="underline">
            pályák
          </a>{' '}
          leírása segít a választásban.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Gyakorlás</h3>
        <p>Ha van lehetőséged, próbáld ki a pályát verseny előtt. A tapasztalat sokat számít!</p>
        <p className="mt-4">Sok sikert az első futamhoz!</p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Ideális ívek és fékezési pontok alapjai</h2>
        <img
          src="/gallery/sample2.jpg"
          alt="Gokart pálya"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          A gyors kör titka az ideális ív és a pontos fékezés. Ebben a cikkben bemutatjuk az
          alapokat, amivel javíthatod a köridődet.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Ívek</h3>
        <p>
          Az ívek megválasztása pályánként eltérő, de általános szabály: minél kevesebb kormányzás,
          annál gyorsabb kör. A{' '}
          <a href="/tracks" className="underline">
            pályák
          </a>{' '}
          szekcióban minden helyszínhez találsz tippet.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Fékezés</h3>
        <p>
          Mindig egyenesben fékezz, és ne blokkolj. A fékezési pontokat érdemes előre megfigyelni,
          akár gyalog is bejárni a pályát.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Gyakorlat</h3>
        <p>Próbálj ki több pályát, figyeld a tapasztaltabb versenyzőket, kérdezz bátran!</p>
        <p className="mt-4">
          További tippekért nézd meg a{' '}
          <a href="/results" className="underline">
            eredményeket
          </a>{' '}
          és a{' '}
          <a href="/gallery" className="underline">
            fotókat
          </a>
          .
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Miért jó az egykategóriás bajnokság?</h2>
        <img
          src="/gallery/sample3.jpg"
          alt="Egykategóriás gokart"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          Az egykategóriás bajnokság lényege, hogy mindenki azonos technikával indul, így a tudás és
          a sportszerűség kerül előtérbe.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Előnyök</h3>
        <ul className="list-disc pl-5 mb-2">
          <li>Igazságosabb verseny, nincs technikai előny.</li>
          <li>Kiegyenlített mezőny, izgalmasabb futamok.</li>
          <li>Barátságosabb közösség, kevesebb konfliktus.</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-2">Tapasztalatok</h3>
        <p>
          Lámer Zoltán szervezésében évek óta sikeresen működik az egykategóriás rendszer. A{' '}
          <a href="/about" className="underline">
            Rólunk
          </a>{' '}
          oldalon többet is megtudhatsz.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Csatlakozz!</h3>
        <p>
          Ha szeretnél igazságos, izgalmas versenyeken indulni, regisztrálj a{' '}
          <a href="/registration" className="underline">
            regisztráció
          </a>{' '}
          oldalon!
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Edzés gokartverseny előtt – hogyan készülj?</h2>
        <img
          src="/gallery/sample4.jpg"
          alt="Gokart edzés"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          A rendszeres edzés segít abban, hogy a versenyen magabiztosan és gyorsan vezess. Mutatjuk,
          mire figyelj!
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Fizikai felkészülés</h3>
        <ul className="list-disc pl-5 mb-2">
          <li>Erősítsd a kar- és törzsizmaidat, hogy jobban bírd a terhelést.</li>
          <li>Fontos a jó állóképesség, próbálj ki futást, kerékpározást.</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-2">Mentális edzés</h3>
        <p>Koncentráció, stresszkezelés, vizualizáció – ezek mind segítenek a versenyhelyzetben.</p>
        <h3 className="text-lg font-bold mt-4 mb-2">Gyakorlati tippek</h3>
        <ul className="list-disc pl-5 mb-2">
          <li>Próbálj ki több pályát, ismerd meg a kanyarokat.</li>
          <li>Figyeld a tapasztaltabb versenyzőket, kérdezz bátran!</li>
        </ul>
        <p className="mt-4">
          További edzéstippekért nézd meg a{' '}
          <a href="/tracks" className="underline">
            pályákat
          </a>{' '}
          és a{' '}
          <a href="/results" className="underline">
            eredményeket
          </a>
          .
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Felszerelés: mit érdemes hozni a versenyre?</h2>
        <img
          src="/gallery/sample5.jpg"
          alt="Gokart felszerelés"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          A megfelelő felszerelés nemcsak biztonságot, hanem kényelmet is ad. Lássuk, mire van
          szükség!
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>Sisak, zárt cipő, overall – kötelező.</li>
          <li>Kesztyű, nyakvédő, esőruha – ajánlott.</li>
          <li>Bérelhető felszerelés a pályán.</li>
        </ul>
        <p className="mt-4">
          A{' '}
          <a href="/rules" className="underline">
            szabályzatban
          </a>{' '}
          minden részletet megtalálsz.
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">
          Taktika a futamon – hogyan előzz, mikor támadj?
        </h2>
        <img
          src="/gallery/sample6.jpg"
          alt="Gokart taktika"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          A jó taktika sokszor többet ér, mint a puszta gyorsaság. Mutatjuk, mire figyelj a futam
          alatt!
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>Figyeld a versenytársakat, keresd a hibákat.</li>
          <li>Előzésnél légy határozott, de sportszerű.</li>
          <li>Boxkiállás időzítése kulcsfontosságú lehet.</li>
        </ul>
        <p className="mt-4">
          További taktikai tippekért olvasd el a{' '}
          <a href="/rules" className="underline">
            szabályzatot
          </a>{' '}
          és nézd meg a{' '}
          <a href="/results" className="underline">
            dobogósokat
          </a>
          .
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Interjú: egy bajnok gondolatai</h2>
        <img
          src="/gallery/sample7.jpg"
          alt="Interjú bajnokkal"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          Kiss Péter, többszörös dobogós, mesél a felkészülésről, versenyélményről és a közösségről.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Motiváció</h3>
        <p>„A legfontosabb, hogy minden futamon tanuljak valamit, és jól érezzem magam.”</p>
        <h3 className="text-lg font-bold mt-4 mb-2">Közösség</h3>
        <p>„A Lámer Zoltán Gokart sorozatban mindenki segítőkész, barátságos, sportszerű.”</p>
        <p className="mt-4">
          További interjúkért nézd meg a{' '}
          <a href="/results" className="underline">
            dobogósokat
          </a>{' '}
          és a{' '}
          <a href="/about" className="underline">
            Rólunk
          </a>{' '}
          oldalt.
        </p>
      </article>
      <article className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Vendégcikk: egy kezdő tapasztalatai</h2>
        <img
          src="/gallery/sample8.jpg"
          alt="Vendégcikk gokart"
          className="rounded w-full max-w-xl mb-4"
        />
        <p className="mb-2">
          Tóth Anna, első versenyző, megosztja élményeit, tanulságait és tippjeit a kezdőknek.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Első benyomások</h3>
        <p>„Nagyon izgultam, de a szervezők és a többi pilóta segítőkészek voltak.”</p>
        <h3 className="text-lg font-bold mt-4 mb-2">Tanulságok</h3>
        <ul className="list-disc pl-5 mb-2">
          <li>Érdemes előre gyakorolni, ismerkedni a pályával.</li>
          <li>Ne félj kérdezni, mindenki segít!</li>
        </ul>
        <p className="mt-4">
          További élménybeszámolókért nézd meg a{' '}
          <a href="/results" className="underline">
            eredményeket
          </a>{' '}
          és a{' '}
          <a href="/gallery" className="underline">
            fotókat
          </a>
          .
        </p>
      </article>
    </main>
  );
}
