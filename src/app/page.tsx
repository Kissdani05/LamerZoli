'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import RegistrationModal from './RegistrationModal';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

// ...existing code...

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Types for local state
interface NextRaceSettings {
  next_race_at: string;
  next_race_desc: string;
  next_race_image_path: string;
}

interface FeaturedRace {
  id: string;
  name: string;
  location: string;
  date: string | null;
  max_participants: number | null;
  description?: string | null;
  image_url?: string | null;
  address?: string | null;
  layout?: string | null;
  format?: string | null;
  fee?: string | null;
  weight_rule?: string | null;
  deposit?: string | null;
  deadline?: string | null;
  rain_rule?: string | null;
  media_rule?: string | null;
}

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  weight: number;
  race: string;
  race_name: string;
}

export default function Home() {
  useEffect(() => {
    // TikTok API fetch logika eltávolítva, nincs már latestTiktokId változó
  }, []);
  const { t } = useI18n();
  const [race, setRace] = useState<NextRaceSettings>({
    next_race_at: '',
    next_race_desc: '',
    next_race_image_path: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [featuredRace, setFeaturedRace] = useState<FeaturedRace | null>(null);
  const [modalRaceId, setModalRaceId] = useState<string>('');

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://lamerzoli.vercel.app';

  useEffect(() => {
    async function fetchRace() {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) {
        setRace({
          next_race_at: data.next_race_at || '',
          next_race_desc: data.next_race_desc || '',
          next_race_image_path: data.next_race_image_path || '',
        });
      }
    }
    fetchRace();
  }, []);

  useEffect(() => {
    async function fetchFeaturedRace() {
      const settingsRes = await supabase
        .from('site_settings')
        .select('featured_race_id')
        .eq('id', 1)
        .single();
      const featuredId = settingsRes.data?.featured_race_id as string | undefined;
      if (featuredId) {
        const { data } = await supabase.from('races').select('*').eq('id', featuredId).single();
        setFeaturedRace((data as FeaturedRace) || null);
      } else {
        setFeaturedRace(null);
      }
    }
    fetchFeaturedRace();
  }, []);

  async function handleRegistration(data: RegistrationData) {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          weight: data.weight,
          race_id: data.race,
          race_name: data.race_name,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      alert(t('registration_success'));
    } catch {
      alert(t('error_occurred'));
    }
  }

  const eventJsonLd = race.next_race_at
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: featuredRace?.name || 'Gokart verseny',
        startDate: race.next_race_at,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        image: [race.next_race_image_path || `${siteUrl}/next.svg`],
        description: race.next_race_desc,
        organizer: {
          '@type': 'Organization',
          name: 'Lámer Zoltán Gokart Klub',
          url: siteUrl,
        },
        location: {
          '@type': 'Place',
          name: featuredRace?.location || 'Gokart pálya',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'HU',
          },
        },
      }
    : null;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hogyan tudok nevezni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Töltsd ki a nevezési űrlapot, majd kattints a Nevezés gombra.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hol találom a versenynaptárt?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Naptár oldalon megtalálod az összes közelgő eseményt és részleteit.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Főoldal',
        item: siteUrl,
      },
    ],
  };

  const faqs = [
    {
      q: 'Hogyan tudok regisztrálni?',
      a: 'Töltsd ki a regisztrációs űrlapot a főoldalon, majd kattints a Regisztráció gombra.',
    },
    { q: 'Vannak súlycsoportok?', a: 'Egykategóriás sorozat vagyunk, kiegyensúlyozott kartokkal.' },
    {
      q: 'Hol találom az eredményeket?',
      a: 'Az Eredmények szekcióban láthatod a korábbi versenyek győzteseit.',
    },
    {
      q: 'Mi történik, ha hibás email címet adok meg?',
      a: 'A rendszer csak érvényes email címet fogad el, hibás esetben hibaüzenetet kapsz.',
    },
    {
      q: 'Hogyan védjük az adataidat?',
      a: 'A regisztrációhoz hozzájárulás szükséges, az adatokat biztonságosan kezeljük.',
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="w-full max-w-full flex flex-col min-h-screen px-2 md:px-0">
      {/* Hidden button for header registration trigger */}
      <button
        type="button"
        data-open-registration-modal
        style={{ display: 'none' }}
        onClick={() => setShowModal(true)}
      />
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section id="hero" className="hero section relative overflow-hidden w-full px-0 md:px-4">
        {/* Onboard/sunset kép BLUR háttérként */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/1.png"
            alt="Onboard nézet, balos kanyar naplementében – gokart"
            fill
            className="w-full h-full object-cover blur-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Sötét overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60 pointer-events-none" />
        </div>
        <div className="container w-full max-w-full relative z-10 min-h-[40vh] py-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-2 md:px-0">
          {/* Bal oldal: szöveg */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full">
            <h1 className="mb-4 text-4xl md:text-7xl font-extrabold gradient-text text-center md:text-left drop-shadow-lg w-full px-2 md:px-0">
              Lámer Zoltán Gokart
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white text-center md:text-left mb-8 drop-shadow w-full px-2 md:px-0">
              Egyenlő technika. Tiszta szabályok. Valódi versenyélmény.
            </p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-4 md:mb-8">
              <button
                className="btn btn-primary text-lg px-8 py-4 shadow-xl animate-float"
                onClick={() => setShowModal(true)}
              >
                Nevezek most
              </button>
              <a href="#race" className="btn btn-outline text-lg px-8 py-4 shadow-xl animate-float">
                Következő verseny
              </a>
            </div>
            {/* Pitboard számlálók */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2 md:mt-4 relative mb-0 md:mb-4">
              <div className="absolute inset-0 -z-10">
                <Image src="/3.png" alt="" fill className="object-cover blur-2xl opacity-30" />
              </div>
              <div className="badge badge-muted text-lg animate-odometer">500+ nevező</div>
              <div className="badge badge-muted text-lg animate-odometer">5+ év tapasztalat</div>
              <div className="badge badge-muted text-lg animate-odometer">
                50+ verseny szervezés
              </div>
            </div>
          </div>
          {/* Jobb oldal: zoli.png teljes kép, blur háttérrel csak desktopon */}
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            <div className="absolute inset-0 w-full h-full -z-10">
              <Image src="/zoli.png" alt="" fill className="object-cover blur-2xl" />
            </div>
            <Image
              src="/zoli.png"
              alt="Lámer Zoltán portré"
              width={320}
              height={420}
              className="rounded-xl shadow-2xl object-cover z-10"
              priority
            />
          </div>
        </div>
      </section>

      <RegistrationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegistration}
        defaultRaceId={modalRaceId}
      />

      {/* Fehér csík a hero és következő verseny között */}

      {/* Következő verseny */}
      <section id="race" className="section border-t w-full">
        <div className="container w-full max-w-full flex flex-col md:flex-row items-stretch gap-8">
          {/* Bal oldal: csak a kért adatok, BLUR kép háttérrel */}
          <div className="flex-1 flex flex-col justify-center rounded-xl p-8 shadow-xl relative overflow-hidden">
            {/* Blur háttérkép: verseny image_url vagy fallback */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={featuredRace?.image_url || '/next.svg'}
                alt="Következő verseny háttérkép"
                fill
                className="object-cover blur-lg brightness-60"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60 pointer-events-none" />
            </div>
            <h2 className="text-2xl font-bold mb-2 gradient-text">Következő verseny</h2>
            <div className="mb-2 text-lg font-semibold">{featuredRace?.name || 'Hamarosan…'}</div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Dátum:</span>{' '}
              {featuredRace?.date ? new Date(featuredRace.date).toLocaleDateString() : 'Hamarosan…'}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Max. férőhely:</span>{' '}
              {featuredRace?.max_participants || 'Hamarosan…'}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Lokáció:</span>{' '}
              {featuredRace?.location || 'Hamarosan…'}
            </div>
            <div className="mb-4 text-base">
              <span className="font-semibold">Leírás:</span>{' '}
              {featuredRace?.description || 'Hamarosan…'}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 w-full">
              <button
                className="btn btn-primary text-lg px-6 py-3 shadow-lg animate-float w-full md:w-auto"
                onClick={() => {
                  setModalRaceId(featuredRace?.id || '');
                  setShowModal(true);
                }}
              >
                Nevezés
              </button>
              <a
                href="/calendar"
                className="btn btn-outline text-lg px-6 py-3 shadow-lg animate-float w-full md:w-auto"
              >
                Teljes részletek
              </a>
            </div>
          </div>
          {/* Jobb oldal: kép az adatbázisból (races.image_url) */}
          <div className="flex-1 flex items-center justify-center">
            {featuredRace?.image_url && (
              <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={featuredRace.image_url}
                  alt="Következő verseny pályafotó"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TikTok szekció */}
      <section id="tiktok" className="section border-t w-full py-12 bg-black/80">
        <div className="container w-full max-w-full flex flex-col md:flex-row items-center gap-8">
          {/* Bal oldal: körkép félig belógva a téglalapba, gomb a téglalap alatt */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center relative">
            <div className="w-full flex flex-col items-center relative max-w-md">
              <div className="relative w-full flex flex-col items-center max-w-md">
                <div className="relative w-full flex flex-col items-center max-w-md">
                  <div
                    className="bg-white/90 rounded-xl p-6 shadow-xl max-w-md w-full relative z-10 flex flex-col items-center"
                    style={{ marginTop: '64px' }}
                  >
                    {/* Blur háttérkép: 2.png + overlay gradient */}
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src="/2.png"
                        alt="TikTok szekció háttér"
                        fill
                        className="object-cover blur-lg brightness-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/10 to-transparent" />
                    </div>
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -top-16"
                      style={{ top: '-64px' }}
                    >
                      <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-32 h-32 flex items-center justify-center bg-black">
                        <Image
                          src="/zoli_a.png"
                          alt="Lámer Zoltán arc"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <p className="text-lg text-black font-semibold text-center mt-16 relative z-10">
                      <span style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        2-3 naponta feltöltésre kerülő videóimból elsajátíthatjátok a bérgokartozás
                        alapjait. Verseny elemzések, bejelentések és további tanító tartalmakkal
                        találkozhattok csatornámon.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.tiktok.com/@lamerkart?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-lg px-8 py-4 shadow-xl mt-2 mb-0 block text-center"
                style={{ marginTop: '10px' }}
              >
                TikTok csatorna megtekintése
              </a>
            </div>
          </div>
          {/* Jobb oldal: teljes TikTok kép */}
          <div className="flex-1 flex items-center justify-center">
            <div className="hidden md:flex w-full max-w-4xl h-auto rounded-xl overflow-hidden shadow-2xl bg-black items-center justify-center">
              <Image
                src="/tiktok.png"
                alt="TikTok teljes kép"
                width={1800}
                height={1800}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Miért a Lámer-futam? – 3 USP kártya */}
      <section className="section border-t px-2 md:px-0 w-full">
        <div className="container w-full max-w-full grid md:grid-cols-3 gap-8">
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float relative">
            <Image
              src="/2.png"
              alt="Éjszakai rajt, fair technika"
              fill
              className="object-cover blur-lg brightness-50 absolute inset-0 -z-10"
            />
            <span className="text-5xl mb-4 relative z-10" role="img" aria-label="Egyenlő technika">
              ⚙️
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center relative z-10">
              Egyenlő feltételek
            </h3>
            <p className="text-base text-center relative z-10">
              Mindenki azonos technikával indul, csak a tudás számít.
            </p>
          </div>
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float relative">
            <Image
              src="/5.png"
              alt="Időmérés, profi szervezés"
              fill
              className="object-cover blur-lg brightness-50 absolute inset-0 -z-10"
            />
            <span className="text-5xl mb-4 relative z-10" role="img" aria-label="Profi szervezés">
              🏁
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center relative z-10">
              Profi szervezés
            </h3>
            <p className="text-base text-center relative z-10">
              Átlátható szabályok, időmérés, sportszerű versenyek.
            </p>
          </div>
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float relative">
            <Image
              src="/6.png"
              alt="Súlykompenzáció igazságosság"
              fill
              className="object-cover blur-lg brightness-50 absolute inset-0 -z-10"
            />
            <span className="text-5xl mb-4 relative z-10" role="img" aria-label="Közösség">
              🤝
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center relative z-10">
              Közösség
            </h3>
            <p className="text-base text-center relative z-10">
              Barátságos, támogató pilóták, visszajáró versenyzők.
            </p>
          </div>
        </div>
      </section>

      {/* Nevezés-lépések vizuális stepper */}
      <section className="section border-t px-2 md:px-0 w-full">
        <div className="container w-full max-w-full">
          <h2 className="text-2xl font-bold gradient-text text-[#e4eb34] text-center mb-6">
            Nevezési feltételek
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="stepper grid grid-cols-1 md:grid-cols-5 gap-6 w-full items-start md:items-stretch">
              <div className="step flex flex-col items-center text-center">
                <span className="bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
                  <span role="img" aria-label="Űrlap">
                    📝
                  </span>
                </span>
                <span className="font-semibold mb-1">Űrlap kitöltése</span>
                <span className="text-sm text-muted">
                  Add meg az adataidat, válaszd ki a futamot.
                </span>
              </div>
              <div className="step flex flex-col items-center text-center">
                <span className="bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
                  <span role="img" aria-label="Visszaigazolás">
                    📧
                  </span>
                </span>
                <span className="font-semibold mb-1">Visszaigazolás</span>
                <span className="text-sm text-muted">
                  E-mailben kapsz visszaigazolást a nevezésről.
                </span>
              </div>
              <div className="step flex flex-col items-center text-center">
                <span className="bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
                  <span role="img" aria-label="Fizetés">
                    💳
                  </span>
                </span>
                <span className="font-semibold mb-1">Fizetés</span>
                <span className="text-sm text-muted">
                  A pályán fizethetsz, ahogy a kiírásban szerepel.
                </span>
              </div>
              <div className="step flex flex-col items-center text-center">
                <span className="bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
                  <span role="img" aria-label="Rajt">
                    🏁
                  </span>
                </span>
                <span className="font-semibold mb-1">Rajt</span>
                <span className="text-sm text-muted">Találkozunk a pályán, indul a verseny!</span>
              </div>
              <div className="step flex flex-col items-center text-center">
                <span className="bg-[#e4eb34] rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold shadow-lg mb-2">
                  <span role="img" aria-label="Nevezés">
                    🏎️
                  </span>
                </span>
                <button
                  className="btn btn-primary font-semibold mt-1"
                  onClick={() => setShowModal(true)}
                  style={{ minWidth: 120 }}
                >
                  Nevezés
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vélemények kártya-slider */}
      <section className="section border-t px-2 md:px-0 w-full" aria-labelledby="reviews-title">
        <div className="container w-full max-w-full relative px-0 flex flex-col items-center">
          {/* Háttér: 2.png rajtrács, blur, sötétítés */}
          <div className="absolute inset-0 -z-10">
            <Image src="/2.png" alt="" fill className="object-cover blur-2xl brightness-50" />
          </div>
          <h2
            id="reviews-title"
            className="mb-4 text-center gradient-text text-[#e4eb34] text-3xl font-bold"
          >
            Versenyzői vélemények
          </h2>
          <div
            className="slider flex flex-col md:flex-row gap-8 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory w-full max-w-full justify-center items-center"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {[
              {
                name: 'Bence',
                race: 'Téglás Gokart GP 3',
                stars: 5,
                text: 'Szuper hangulat és profi lebonyolítás. Minden futam élmény!',
                img: '/pilot_male.webp',
                emoji: '🏎️',
              },
              {
                name: 'Anna',
                race: 'Téglás Gokart GP 1',
                stars: 4,
                text: 'Igazi versenyélmény amatőröknek is. Barátságos közösség!',
                img: '/pilot_female.webp',
                emoji: '🏁',
              },
              {
                name: 'Gábor',
                race: 'Téglás Gokart GP 2',
                stars: 5,
                text: 'Visszatérő vendég vagyok, minden futam élmény. Ajánlom mindenkinek!',
                img: '/pilot_male.webp',
                emoji: '👨‍✈️',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="glass card min-w-0 min-w-[280px] max-w-xs w-full md:w-auto p-6 shadow-xl md:snap-center z-10"
                tabIndex={0}
                aria-label={`${review.stars} csillag, ${review.name}, ${review.race}`}
                style={{ perspective: '800px' }}
              >
                <div className="flex flex-col items-center mb-2 min-w-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-brand-2 shadow-lg relative flex items-center justify-center">
                    <Image
                      src={review.img}
                      alt={review.name + ' fotó'}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div
                    className="flex gap-1 text-brand-3 text-xl mb-1"
                    aria-label={`${review.stars} csillag`}
                  >
                    {'★'.repeat(review.stars)}
                    {'☆'.repeat(5 - review.stars)}
                  </div>
                  <div className="font-bold text-lg gradient-text mb-1 min-w-0">{review.name}</div>
                  <div className="text-sm text-muted mb-2 min-w-0">{review.race}</div>
                </div>
                <blockquote className="text-base text-center mb-2 min-w-0">
                  {review.text}
                </blockquote>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/blog" className="btn btn-outline">
              További élménybeszámolók
            </Link>
          </div>
        </div>
      </section>

      {/* GYIK (zászló-tematikájú accordions) */}
      <section
        id="faq"
        className="section border-t glass-card gradient-bg motion-fade-in px-2 md:px-0 w-full"
      >
        <div className="container w-full max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold gradient-text">GYIK</h2>
          {/* Accordion Q&A zászló ikonokkal */}
          <ul className="faq-accordion" role="list">
            {faqs.map((faq, idx) => (
              <li key={faq.q} className="mb-2">
                <div
                  className="flex items-center gap-3 rounded-xl bg-[#e4eb34]/18 p-4"
                  style={{ boxShadow: '0 2px 12px 0 #e4eb3433' }}
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow">
                    <Image src="/9.png" alt="Zászló ikon" width={32} height={32} />
                  </span>
                  <div className="flex-1">
                    <button
                      className={`faq-toggle w-full text-left py-3 px-4 rounded-lg glass-card gradient-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all ${openIdx === idx ? 'active' : ''}`}
                      aria-expanded={openIdx === idx}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                      <span className="font-bold text-lg md:text-xl">{faq.q}</span>
                      <span className="float-right" aria-hidden>
                        {openIdx === idx ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      className={`faq-panel px-4 pb-3 text-muted transition-all ${openIdx === idx ? 'open' : 'hidden'}`}
                      role="region"
                      aria-labelledby={`faq-toggle-${idx}`}
                      style={{
                        maxHeight: openIdx === idx ? '200px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)',
                      }}
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer section border-t glass-card gradient-bg py-10 mt-12 motion-fade-in text-base text-gray-800 dark:text-gray-200 px-2 md:px-0 w-full">
        <div className="container w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
          {/* Bal: bemutatkozás + social */}
          <div>
            <div className="font-bold text-xl mb-2">LamerKart</div>
            <div className="text-sm mb-4">
              Motorsport, élmény, közösség – prémium amatőr futamok, mindenki számára!
            </div>
            <div className="flex justify-center md:justify-start gap-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="social-icon"
              >
                <Image
                  src="/window.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="social-icon"
              >
                <Image
                  src="/globe.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </a>
              {/* További social ikonok... */}
            </div>
          </div>
          {/* Közép: gyorslinkek */}
          <nav
            aria-label="Gyorslinkek"
            className="footer-links flex flex-col gap-2 items-center md:items-start"
          >
            <Link href="/" className="footer-link">
              Főoldal
            </Link>
            <Link href="/calendar" className="footer-link">
              Versenyek
            </Link>
            <Link href="/tracks" className="footer-link">
              Pályák
            </Link>
            <Link href="/blog" className="footer-link">
              Blog
            </Link>
          </nav>
          {/* Jobb: kontakt */}
          <div className="footer-contact w-full flex flex-col items-center gap-2 md:items-start md:text-left">
            <span className="text-base flex items-center gap-2">
              <span role="img" aria-label="Telefon">
                📞
              </span>{' '}
              +36 30 976 0305
            </span>
            <span className="text-base flex items-center gap-2">
              <span role="img" aria-label="Email">
                ✉️
              </span>{' '}
              lamerzle88@gmail.com
            </span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-4 px-3 py-1 rounded glass-btn gradient-bg text-sm motion-btn"
            aria-label="Vissza a tetejére"
          >
            Vissza a tetejére
          </button>
        </div>
      </footer>
    </main>
  );
}
