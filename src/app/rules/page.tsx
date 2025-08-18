'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

const sections = [
  { id: 'alapok', label: 'Alapok' },
  { id: 'felszereles', label: 'Felszerelés' },
  { id: 'palyan', label: 'Pályán' },
  { id: 'zaszlok', label: 'Zászlók' },
  { id: 'buntetesek', label: 'Büntetések' },
  { id: 'sulykart', label: 'Súly & kart' },
  { id: 'ovasetika', label: 'Óvás & Etika' },
  { id: 'gyik', label: 'GYIK' },
];

export default function RulesPage() {
  const [active, setActive] = useState('alapok');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll to section
  const handleNav = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    }
  };

  return (
    <main className="rules-main max-w-5xl mx-auto px-4 pb-16 text-white relative">
      {/* Hero */}
      <section className="relative rounded-xl overflow-hidden mb-8" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/2.png"
            alt="Szabályok hero háttér – sötét overlay"
            fill
            className="object-cover"
            style={{ filter: 'blur(24px) brightness(0.6)' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-brand-3/60 pointer-events-none" />
        </div>
        <div className="relative z-10 py-8 px-6 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold gradient-text drop-shadow mb-2">
            Szabályok 🏁
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-2">
            Tiszta verseny. Biztonságos futam. Egyenlő esélyek.
          </p>
        </div>
      </section>

      {/* Sticky subnav */}
      <nav className="sticky top-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/10 flex gap-2 px-2 py-2 rounded-b-xl mb-8 shadow-lg">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`chip-btn px-3 py-1 rounded-full font-semibold transition-all ${active === s.id ? 'bg-[#e4eb34] text-black' : 'bg-white/10 text-white'}`}
            onClick={() => handleNav(s.id)}
            aria-current={active === s.id ? 'true' : undefined}
          >
            {s.label}
          </button>
        ))}
        <div
          className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#e4eb34] to-transparent"
          style={{ opacity: 0.7 }}
        />
      </nav>

      {/* TL;DR pitboard */}
      <section className="glass-card rounded-xl p-6 mb-8 flex flex-col items-center" id="tldr">
        <h2 className="text-2xl font-bold mb-2">TL;DR – 30 másodperces összefoglaló</h2>
        <div className="flex flex-wrap gap-3 justify-center mb-2">
          <span className="chip glass-card">🚫 Nincs kontakt (lökdösés tilos)</span>
          <span className="chip glass-card">👟 Zárt cipő kötelező; hosszú haj felkötve</span>
          <span className="chip glass-card">✋ Sárga zászló: lassíts, ne előzz</span>
          <span className="chip glass-card">🏳️ Briefing: kötelező megjelenni</span>
          <span className="chip glass-card">🧯 Stop/hiba: kéz fel, maradj a pályaszélen</span>
          <span className="chip glass-card">🏁 Kockás zászló: futam vége → box</span>
        </div>
        <p className="text-base text-muted text-center max-w-2xl">
          A kötelező briefing és a „no contact” alapelv a bérgokart szabályrendszerek alapeleme; a
          pályák egységesen kérik a zárt cipőt és a hosszú haj rögzítését.
        </p>
      </section>

      {/* Alapok */}
      <section
        ref={(el) => {
          sectionRefs.current['alapok'] = el;
        }}
        id="alapok"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Alapok</h2>
        <p className="text-base text-muted mb-4">
          A versenyzői eligazítás kötelező. A zászlók és a pályaszabályok betartása mindenki
          biztonsága érdekében elvárt. A részletes versenykiírás (időrend, formátum, rajtprocedúra)
          az adott esemény oldalán található.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex flex-col gap-2">
            <span className="text-2xl">🧾</span>
            <span className="font-semibold">Nevezés & jelenlét</span>
            <span className="text-sm text-muted">
              A versenyzői eligazítás (briefing) kötelező; késés esetén figyelmeztetés vagy büntetés
              is lehet.
            </span>
          </div>
          <div className="glass-card p-4 flex flex-col gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-semibold">Fókusz</span>
            <span className="text-sm text-muted">
              Bérgokart nem vidámparki attrakció – zászlójelzések és a pályaszabály betartása
              kötelező.
            </span>
          </div>
          <div className="glass-card p-4 flex flex-col gap-2">
            <span className="text-2xl">🧍</span>
            <span className="font-semibold">Felelősség</span>
            <span className="text-sm text-muted">
              A helyszíni házirend és a kiegészítő versenykiírás mindenben irányadó.
            </span>
          </div>
        </div>
      </section>

      {/* Felszerelés */}
      <section
        ref={(el) => {
          sectionRefs.current['felszereles'] = el;
        }}
        id="felszereles"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Kötelező felszerelés</h2>
        <p className="text-base text-muted mb-4">
          Zárt cipő kötelező, hosszú haj összefogva/fejvédő alatt. Laza ruházat, sál tilos. Szükség
          esetén a pálya biztosít védőfelszerelést (sisak, nyakvédő, mellvédő).
        </p>
        <ul className="flex flex-wrap gap-4">
          <li className="glass-card p-3 flex items-center gap-2">
            <span className="text-2xl">👟</span> Zárt cipő kötelező.
          </li>
          <li className="glass-card p-3 flex items-center gap-2">
            <span className="text-2xl">🦺</span> Öv/nyakvédő a pálya szabálya szerint.
          </li>
          <li className="glass-card p-3 flex items-center gap-2">
            <span className="text-2xl">💇</span> Hosszú haj összefogva, fejvédő alatt.
          </li>
          <li className="glass-card p-3 flex items-center gap-2">
            <span className="text-2xl">👕</span> Laza sál/ruha tilos; minden testrész maradjon a
            gokart belső vonalán.
          </li>
        </ul>
      </section>

      {/* Pályán */}
      <section
        ref={(el) => {
          sectionRefs.current['palyan'] = el;
        }}
        id="palyan"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Pályán – viselkedés & biztonság</h2>
        <p className="text-base text-muted mb-4">
          Bérgokart nem kontakt sport. Sárga jelzésnél lassíts, ne előzz, emeld fel a kezed;
          pirosnál a marsallok utasításai szerint járj el. Megállt gokartnál mindig kéz fel.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-2">Tilos</h3>
            <ul className="list-disc ml-4">
              <li>🚫 Kontakt: lökés, ütés, szándékos terelés.</li>
              <li>
                🚫 Veszélyes védekezés: cikázás, többszöri irányváltás, pályaelhagyás
                előnyszerzésért.
              </li>
            </ul>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-2">Kötelező</h3>
            <ul className="list-disc ml-4">
              <li>✋ Sárga alatt: lassíts, ne előzz, kéz fel a figyelem jelzésére.</li>
              <li>🛑 Megállás/piros: lassan a kijelölt helyre, előzés nincs.</li>
              <li>🆘 Megállt kart: kéz fel, maradj a kartban, várd a marsall utasítását.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Zászlók */}
      <section
        ref={(el) => {
          sectionRefs.current['zaszlok'] = el;
        }}
        id="zaszlok"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Zászlók és fények</h2>
        <p className="text-base text-muted mb-4">
          A jelzéseket zászlóval vagy fénypanelekkel adjuk; a jelentés az FIA Appendix H szerint
          egységes.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-3 flex flex-col items-center" aria-label="Zöld zászló">
            <Image src="/9.png" alt="Zöld zászló" width={48} height={48} />
            <span className="font-semibold">🟩 Zöld</span>
            <span className="text-xs text-muted text-center">Pálya tiszta, verseny tempó.</span>
          </div>
          <div className="glass-card p-3 flex flex-col items-center" aria-label="Sárga zászló">
            <Image src="/9.png" alt="Sárga zászló" width={48} height={48} />
            <span className="font-semibold">🟨 Sárga</span>
            <span className="text-xs text-muted text-center">
              Veszély a pálya szélén – lassíts, ne előzz.
            </span>
          </div>
          <div className="glass-card p-3 flex flex-col items-center" aria-label="Piros zászló">
            <Image src="/9.png" alt="Piros zászló" width={48} height={48} />
            <span className="font-semibold">🟥 Piros</span>
            <span className="text-xs text-muted text-center">
              Edzés/futam megszakítva – előzés tilos.
            </span>
          </div>
          <div className="glass-card p-3 flex flex-col items-center" aria-label="Kockás zászló">
            <Image src="/9.png" alt="Kockás zászló" width={48} height={48} />
            <span className="font-semibold">🏁 Kockás</span>
            <span className="text-xs text-muted text-center">Futam vége – a célnál jelzik.</span>
          </div>
          {/* További zászlók... */}
        </div>
      </section>

      {/* Büntetések */}
      <section
        ref={(el) => {
          sectionRefs.current['buntetesek'] = el;
        }}
        id="buntetesek"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Büntetések – mintatáblázat</h2>
        <p className="text-base text-muted mb-4">
          A tipikus büntetések a táblázatban – a végső döntést a versenyigazgató hozza, a saját
          eseménykiírás szerint.
        </p>
        <div className="overflow-x-auto">
          <table className="glass-card w-full text-sm rounded-xl">
            <thead>
              <tr>
                <th className="p-2">Kihágás</th>
                <th className="p-2">Tipikus szankció</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Késés a briefingről</td>
                <td>Figyelmeztetés, átrasorolás</td>
              </tr>
              <tr>
                <td>Ugró rajt</td>
                <td>+10 mp</td>
              </tr>
              <tr>
                <td>Sárga jelzés figyelmen kívül</td>
                <td>+10 mp</td>
              </tr>
              <tr>
                <td>Pályaelhagyás (előnyszerzés)</td>
                <td>Figyelmeztetés → +5 mp</td>
              </tr>
              <tr>
                <td>Kontakt – előny nélkül</td>
                <td>Figyelmeztetés, 0–5 mp</td>
              </tr>
              <tr>
                <td>Kontakt – előny szerzése</td>
                <td>+10 mp, elhelyezés átrasorolás</td>
              </tr>
              <tr>
                <td>Veszélyes vezetés (ismételt)</td>
                <td>+20 mp, következő rajtrács-bünti, kizárás</td>
              </tr>
              <tr>
                <td>Piros figyelmen kívül</td>
                <td>Futamkizárás</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Súly & kart */}
      <section
        ref={(el) => {
          sectionRefs.current['sulykart'] = el;
        }}
        id="sulykart"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Súlykompenzáció & kart-rotáció</h2>
        <div className="glass-card p-4 flex flex-col gap-2">
          <span>
            ⚖️ Minimum súly: kategóriánként megadva (pl. 85/95 kg); mérés teljes felszereléssel.
          </span>
          <span>
            🧱 Ballaszt: hivatalos ólomsúlyok, személyzet rögzíti/jelöli; önálló „plusz” súly
            viselése tiltott.
          </span>
          <span>🔄 Kart-rotáció: sorsolás több futamon át az esélyek kiegyenlítésére.</span>
        </div>
      </section>

      {/* Óvás & Etika */}
      <section
        ref={(el) => {
          sectionRefs.current['ovasetika'] = el;
        }}
        id="ovasetika"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">Óvás & Etikai kódex</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <span className="text-2xl">📝</span>
            <span className="font-semibold">Óvás</span>
            <span className="text-sm text-muted">
              Sportszerű, higgadt kommunikáció a versenyigazgatóval 15 percen belül.
            </span>
          </div>
          <div className="glass-card p-4">
            <span className="text-2xl">🤝</span>
            <span className="font-semibold">Etika</span>
            <span className="text-sm text-muted">
              Tisztelet a versenybírók és pilóták iránt; alkohol/drog tilos; közösségi médiában
              kulturált kommunikáció.
            </span>
          </div>
        </div>
      </section>

      {/* GYIK */}
      <section
        ref={(el) => {
          sectionRefs.current['gyik'] = el;
        }}
        id="gyik"
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-2">GYIK</h2>
        <div className="accordion glass-card rounded-xl">
          {/* Példa kérdések, emoji, accordions */}
          <details className="mb-2">
            <summary className="font-semibold">👟 Mit vegyek fel bérgokartozáshoz?</summary>
            <div className="text-sm text-muted">
              Zárt cipő kötelező, a hosszú hajat kösd fel és tűrd a fejvédő alá. Kerüld a laza
              ruhát/sálat.
            </div>
          </details>
          <details className="mb-2">
            <summary className="font-semibold">🟨 Mi a teendő sárga zászlónál?</summary>
            <div className="text-sm text-muted">
              Jelentősen lassíts, ne előzz, készülj irányt változtatni. Dupla sárgánál készülj
              megállni.
            </div>
          </details>
          <details className="mb-2">
            <summary className="font-semibold">
              🏳️ Kötelező a versenyzői eligazítás (briefing)?
            </summary>
            <div className="text-sm text-muted">
              Igen. A briefing kötelező; késés esetén figyelmeztetés vagy rajtbüntetés alkalmazható.
            </div>
          </details>
        </div>
        {/* FAQPage JSON-LD strukturált adat */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question", "name": "Mit vegyek fel bérgokartozáshoz?", "acceptedAnswer": {"@type": "Answer", "text": "Zárt cipő kötelező, a hosszú hajat kösd fel és tűrd a fejvédő alá. Kerüld a laza ruhát/sálat."}},
            {"@type": "Question", "name": "Mi a teendő sárga zászlónál?", "acceptedAnswer": {"@type": "Answer", "text": "Jelentősen lassíts, ne előzz, készülj irányt változtatni. Dupla sárgánál készülj megállni."}},
            {"@type": "Question", "name": "Kötelező a versenyzői eligazítás (briefing)?", "acceptedAnswer": {"@type": "Answer", "text": "Igen. A briefing kötelező; késés esetén figyelmeztetés vagy rajtbüntetés alkalmazható."}}
          ]
        }`,
          }}
        />
      </section>

      {/* Belső linkek a szabályokból */}
      <div className="mt-8 text-center">
        <Link href="/blog" className="underline mx-2">
          Blog
        </Link>
        <Link href="/calendar" className="underline mx-2">
          Naptár
        </Link>
        <Link href="/tracks" className="underline mx-2">
          Pályák
        </Link>
      </div>
    </main>
  );
}
