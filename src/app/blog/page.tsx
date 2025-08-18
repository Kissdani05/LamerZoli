import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog – Lámer Zoltán Gokart',
  description: 'Tippek, útmutatók, kulisszák, hírek a bérgokart világából.',
  alternates: { canonical: 'https://lamerzoli.vercel.app/blog' },
};

const articles = [
  {
    slug: '/elso-bergokart-verseny-felkeszules',
    title: 'Hogyan készülj az első bérgokart versenyedre? (10 lépés, kezdőknek) 🔰',
    tags: ['Tippek', 'Útmutatók'],
    cover: '/1.png',
    alt: 'Onboard nézet balos kanyarban, naplemente',
    date: '2025-08-18',
    read: '5 perc olvasás',
    description:
      'Első versenyed? Ruházat, érkezés, zászlók, ülés- és pedálbeállítás, ívek, versenynapi rutin – 10 lépésben.',
    meta: 'Lámer Zoltán • 2025-08-18 • 5 perc olvasás',
    content: [
      'Első futamra készülsz? Nyugi, mindenki így kezdte! Itt a gyors checklist, amivel magabiztosan állsz rajthoz.',
      '👕 Felszerelés: zárt cipő, hosszú nadrág, kesztyű ajánlott; sisakot adunk.',
      '⏰ Érkezz korán: admin + briefing + ülés/pedál beállítás.',
      '🏳️ Zászlók gyorsan: zöld = rajt, sárga = előzés TILOS, piros = futam megáll. Részletek: ',
      <Link key="rules-link" href="/rules" className="underline">
        Szabályok
      </Link>,
      '🪑 Pozíció: ülés hátra/előre, hogy teljes fékerőt elérd; kormányfogás „9–3”.',
      '🛞 Gáz–fék fegyelem: egyszerre soha; féket egyenesen használd.',
      '🎯 Kanyar-stratégia: külső–belső–külső ív, késői apex biztonságosabb a kezdőknek.',
      '👀 Nézéstechnika: tekintet a kijáraton; a kart oda megy, ahova nézel.',
      '🧠 Mentális fókusz: első körök = ismerkedés; építs tempót.',
      '🤝 Fair play: lökdösés nincs; ha hiba, emeld a kezed és engedd el a gyorsabbat.',
      '✅ Versenynapi mini-checklist (nyomtasd ki): ruha, kesztyű, víz, érkezés -20’, briefing jegyzet, ülés/pedál beállítva, zászlók ismételve.',
      <div key="rules-calendar-btns" className="flex gap-4 mt-4">
        <Link key="calendar-btn" href="/calendar" className="btn btn-outline">
          Megnézem a Naptárt
        </Link>
        <Link key="rules-btn" href="/rules" className="btn btn-outline">
          Elolvasom a Szabályokat
        </Link>
      </div>,
    ],
  },
  {
    slug: '/ideal-ivek-es-fekezesi-pontok',
    title: 'Ideális ívek és fékezési pontok alapjai 🧭',
    tags: ['Útmutatók'],
    cover: '/2.png',
    alt: 'Rajt-rács éjszakai fényekkel, kockás zászló a háttérben',
    date: '2025-08-18',
    read: '4 perc olvasás',
    description:
      'Kanyarok olvasása, apex-időzítés, féknyomás és kigyorsítás – a stabil köridő első lépései.',
    meta: 'Lámer Zoltán • 2025-08-18 • 4 perc olvasás',
    content: [
      '🗺️ Pálya felosztása: fékezés → fordítás (apex) → kigyorsítás.',
      '⏱️ Fékpont kijelölése: fix referencia (tábla, rázókő eleje). Kezdőként korábban fékezz, de rövidebben.',
      '📐 Apex: „késői apex” biztonságos, különösen hosszú kijáratú kanyaroknál.',
      '⚖️ Kart egyensúlya: fék felengedése után fordíts; a terhelt első tengely segít befordulni.',
      '🔁 Összekötött kanyarok: az elsőből úgy gyere ki, hogy a másodikra jó legyen a kijárat – a hosszabb egyenes számít.',
      '🎥 Önelemzés: 2–3 körönként egy cél: pl. csak a fékpontokra figyelsz; ne mindent egyszerre.',
      <Link key="tracks-btn" href="/tracks" className="btn btn-outline mt-4">
        Pályák és helyszínek
      </Link>,
    ],
  },
  {
    slug: '/miert-jo-az-egykategorias-bajnoksag',
    title: 'Miért jó az egykategóriás bajnokság? ⚖️',
    tags: ['Tippek'],
    cover: '/1.png',
    alt: 'Onboard kanyar szakai rajtrács – bérgokart',
    date: '2025-08-18',
    read: '3 perc olvasás',
    description:
      'Egyenlő technika, tiszta verseny, közösség és gyors fejlődés – ezért szeretjük az egykategóriát.',
    meta: 'Lámer Zoltán • 2025-08-18 • 3 perc olvasás',
    content: [
      '🟰 Egyenlő esélyek: ugyanaz a kategória, a tudás dönt.',
      '🧮 Átlátható költség: bérautó, nincs setup-mánia – a pályaidőre fókuszálsz.',
      '🧑‍🤝‍🧑 Közösség: visszajáró pilóták, fair-play kultúra.',
      '📈 Fejlődés: azonos technikán gyorsabban mérhető a javulás; könnyebb célokat kitűzni (PB, szektoridők).',
      '🔁 Kart-rotáció sorsolás: több futam alatt kiegyenlít (ha van ilyen háziszabály).',
      <Link key="register-btn" href="/registration" className="btn btn-primary mt-4">
        Regisztrálok a következő futamra
      </Link>,
    ],
  },
];

export default function BlogPage() {
  return (
    <main className="blog-main max-w-6xl mx-auto px-4 pb-16 text-white relative">
      {/* Blur háttérkép az egész oldalhoz */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/2.png"
          alt="Blog oldal háttér – naplementés onboard"
          fill
          className="object-cover w-full h-full" // Remove blur utility
          style={{ filter: 'blur(32px) brightness(0.7)' }} // Use inline CSS blur for reliability
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60" />
      </div>
      {/* Hero + intro */}
      <section className="blog-hero relative rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/1.png"
            alt="Onboard nézet balos kanyarban, naplemente"
            fill
            className="object-cover blur-2xl"
            style={{ filter: 'brightness(0.7)' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60 pointer-events-none" />
        </div>
        <div className="relative z-10 py-10 px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text drop-shadow mb-2">
            Blog 🏎️
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-2">Tippek, útmutatók, kulisszák</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="blog-toolbar flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xl">🔍</span>
          <input
            type="text"
            placeholder="Keresés a cikkekben…"
            className="input glass-input px-4 py-2 rounded-xl w-full max-w-md"
            aria-label="Keresés a cikkekben"
          />
        </div>
        <div className="flex items-center gap-2">
          {['Tippek', 'Útmutatók', 'Hírek'].map((tag) => (
            <button
              key={tag}
              className="pill-btn px-4 py-2 rounded-full glass-card gradient-bg text-base font-semibold"
            >
              {tag}
            </button>
          ))}
          <select className="input glass-input px-2 py-2 rounded-xl ml-2">
            <option>Legújabb</option>
            <option>Legrégebbi</option>
          </select>
        </div>
      </section>

      {/* Card grid */}
      <section className="blog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="blog-card glass-card rounded-xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl relative"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={article.cover}
                alt={article.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#e4eb34] to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-xl font-bold gradient-text mb-1 line-clamp-2">{article.title}</h2>
              <p className="text-base text-muted line-clamp-2 mb-1">{article.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted mb-2">
                <span>📅 {article.date}</span>
                <span>• ⏱️ {article.read}</span>
              </div>
              <Link href={article.slug} className="btn btn-outline mt-2">
                Olvasom →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="btn btn-outline px-6 py-3 rounded-xl shadow-lg">További cikkek</button>
      </div>
    </main>
  );
}
