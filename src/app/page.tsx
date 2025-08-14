'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import RegistrationModal from './RegistrationModal';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';
import Countdown from './Countdown';
import Link from 'next/link';

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
  const { t } = useI18n();
  const [race, setRace] = useState<NextRaceSettings>({
    next_race_at: '',
    next_race_desc: '',
    next_race_image_path: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [featuredRace, setFeaturedRace] = useState<FeaturedRace | null>(null);

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
    } catch (e) {
      const err = e as Error;
      alert(t('error_occurred') + ': ' + err.message);
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
    <>
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section id="hero" className="hero section relative overflow-hidden">
        {/* Animált/videó háttér */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="/next.svg"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-2 to-brand-3 opacity-30 pointer-events-none" />
        </div>
        <div className="container relative z-10 flex flex-col items-center justify-center min-h-[60vh] py-16">
          <h1 className="mb-4 text-5xl md:text-7xl font-extrabold gradient-text text-center drop-shadow-lg">
            Lámer Zoltán Gokart
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white text-center mb-8 drop-shadow">
            Egyenlő technika. Tiszta szabályok. Valódi versenyélmény.
          </p>
          <div className="flex flex-wrap gap-6 justify-center mb-8">
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
          {/* Odometer badge-sáv */}
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <div className="badge badge-primary text-lg animate-odometer">
              {new Date().getFullYear()}+ nevezés
            </div>
            <div className="badge badge-muted text-lg animate-odometer">Top pályák</div>
            <div className="badge badge-muted text-lg animate-odometer">
              Professzionális időmérés
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegistration}
      />

      {/* Következő verseny */}
      <section id="race" className="section">
        <div className="container flex flex-col items-center">
          <div className="glass card w-full max-w-2xl p-6 shadow-2xl relative animate-float">
            {race.next_race_image_path && (
              <div className="w-full h-64 relative mb-4 rounded-xl overflow-hidden">
                <Image
                  src={race.next_race_image_path}
                  alt="Következő verseny pályafotó"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2 gradient-text">Következő verseny</h2>
            <div className="mb-2 text-lg">
              <span className="font-semibold">
                {race.next_race_at ? new Date(race.next_race_at).toLocaleString() : 'Hamarosan…'}
              </span>
              {featuredRace?.location && <span> &middot; {featuredRace.location}</span>}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Formátum:</span>{' '}
              {featuredRace?.format || 'Hamarosan…'}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Nevezési díj:</span>{' '}
              {featuredRace?.fee || 'Hamarosan…'}
              {featuredRace?.max_participants && (
                <span className="ml-4 font-semibold">Limit:</span>
              )}{' '}
              {featuredRace?.max_participants || ''}
            </div>
            <ul className="mb-4 list-disc pl-5">
              <li>
                <strong>Súlykompenzáció:</strong> {featuredRace?.weight_rule || 'Hamarosan…'}
              </li>
              <li>
                <strong>Kiosztás:</strong> {featuredRace?.layout || 'Hamarosan…'}
              </li>
              <li>
                <strong>Esőszabály:</strong> {featuredRace?.rain_rule || 'Hamarosan…'}
              </li>
            </ul>
            {/* Countdown + progress-bar */}
            <div className="mb-4">
              {race.next_race_at && <Countdown targetDate={race.next_race_at} />}
              {/* Progress bar: napok aránya a versenyig (példa) */}
              {race.next_race_at && (
                <div className="w-full h-2 bg-brand-3/30 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-brand-2 to-brand-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(0, Math.min(100, 100 - ((new Date(race.next_race_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)) * 100))}%`,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                className="btn btn-primary text-lg px-6 py-3 shadow-lg animate-float"
                onClick={() => setShowModal(true)}
              >
                Nevezek
              </button>
              <a
                href="/calendar"
                className="btn btn-outline text-lg px-6 py-3 shadow-lg animate-float"
              >
                Teljes részletek
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Miért a Lámer-futam? */}
      <section className="section border-t">
        <div className="container grid md:grid-cols-3 gap-8">
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float">
            <span className="text-5xl mb-4" role="img" aria-label="Egyenlő technika">
              ⚙️
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center">Egyenlő feltételek</h3>
            <p className="text-base text-center">
              Mindenki azonos technikával indul, csak a tudás számít.
            </p>
          </div>
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float">
            <span className="text-5xl mb-4" role="img" aria-label="Profi szervezés">
              🏁
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center">Profi szervezés</h3>
            <p className="text-base text-center">
              Átlátható szabályok, időmérés, sportszerű versenyek.
            </p>
          </div>
          <div className="glass card flex flex-col items-center p-8 shadow-xl animate-float">
            <span className="text-5xl mb-4" role="img" aria-label="Közösség">
              🤝
            </span>
            <h3 className="mb-2 text-xl font-bold gradient-text text-center">Közösség</h3>
            <p className="text-base text-center">
              Barátságos, támogató pilóták, visszajáró versenyzők.
            </p>
          </div>
        </div>
      </section>

      {/* Nevezés-lépések vizuális stepper */}
      <section className="section border-t">
        <div className="container flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="stepper flex md:flex-row flex-col gap-6">
              <div className="step flex flex-col items-center">
                <span className="bg-brand-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
                  1
                </span>
                <span className="font-semibold mb-1">Űrlap kitöltése</span>
                <span className="text-sm text-muted">
                  Add meg az adataidat, válaszd ki a futamot.
                </span>
              </div>
              <div className="step flex flex-col items-center">
                <span className="bg-brand-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
                  2
                </span>
                <span className="font-semibold mb-1">Visszaigazolás</span>
                <span className="text-sm text-muted">
                  E-mailben kapsz visszaigazolást a nevezésről.
                </span>
              </div>
              <div className="step flex flex-col items-center">
                <span className="bg-brand-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
                  3
                </span>
                <span className="font-semibold mb-1">Fizetés</span>
                <span className="text-sm text-muted">
                  A pályán vagy online fizethetsz, ahogy a kiírásban szerepel.
                </span>
              </div>
              <div className="step flex flex-col items-center">
                <span className="bg-brand-2 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
                  4
                </span>
                <span className="font-semibold mb-1">Rajt</span>
                <span className="text-sm text-muted">Találkozunk a pályán, indul a verseny!</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 mt-8 md:mt-0">
            <a href="#faq" className="btn btn-outline">
              Kezdő vagyok, jöhetek?
            </a>
          </div>
        </div>
      </section>

      {/* Vélemények kártya-slider */}
      <section className="section border-t" aria-labelledby="reviews-title">
        <div className="container">
          <h2 id="reviews-title" className="mb-4">
            Versenyzői vélemények
          </h2>
          <div
            className="slider flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {[
              {
                name: 'Bence',
                race: 'Hungaroring Tavasz',
                stars: 5,
                text: 'Szuper hangulat és profi lebonyolítás. Minden futam élmény!',
                img: '/gallery/bence.jpg',
              },
              {
                name: 'Anna',
                race: 'G1 Bajnokok',
                stars: 4,
                text: 'Igazi versenyélmény amatőröknek is. Barátságos közösség!',
                img: '/gallery/anna.jpg',
              },
              {
                name: 'Gábor',
                race: 'Kecskemét Kupa',
                stars: 5,
                text: 'Visszatérő vendég vagyok, minden futam élmény. Ajánlom mindenkinek!',
                img: '/gallery/gabor.jpg',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="glass card min-w-[320px] max-w-xs p-6 shadow-xl snap-center transition-transform duration-300 hover:scale-105"
                tabIndex={0}
                aria-label={`${review.stars} csillag, ${review.name}, ${review.race}`}
                style={{ perspective: '800px' }}
              >
                <div className="flex flex-col items-center mb-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-brand-2 shadow-lg">
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
                  <div className="font-bold text-lg gradient-text mb-1">{review.name}</div>
                  <div className="text-sm text-muted mb-2">{review.race}</div>
                </div>
                <blockquote className="text-base text-center mb-2">{review.text}</blockquote>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/blog" className="btn btn-outline">
              További élménybeszámolók
            </a>
          </div>
        </div>
      </section>

      {/* GYIK */}
      <section id="faq" className="section border-t glass-card gradient-bg motion-fade-in">
        <div className="container max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold gradient-text">GYIK</h2>
          {/* Kiemelt Q&A */}
          <div className="mb-6 p-4 rounded-xl glass-card border-l-4 border-primary shadow-lg motion-slide-in">
            <div className="font-semibold text-lg">Mikor lesz a következő verseny?</div>
            <div className="text-base text-muted">
              A főoldalon mindig megtalálod a pontos dátumot és leírást.
            </div>
          </div>
          {/* Accordion Q&A */}
          <ul className="faq-accordion" role="list">
            {faqs.map((faq, idx) => (
              <li key={faq.q} className="mb-2">
                <button
                  className={`faq-toggle w-full text-left py-3 px-4 rounded-lg glass-card gradient-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all ${openIdx === idx ? 'active' : ''}`}
                  aria-expanded={openIdx === idx}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className="font-semibold text-base">{faq.q}</span>
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
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hírlevél és közösség */}
      <section className="section border-t">
        <div className="container flex justify-center">
          <div className="pitlane-card glass-card gradient-bg shadow-xl p-8 max-w-lg w-full motion-fade-in">
            <h2 className="mb-4 text-2xl font-bold gradient-text flex items-center gap-2">
              <span>Hírlevél</span>
              <span className="nitro-badge motion-nitro" aria-label="Gyors infók">
                🏁
              </span>
            </h2>
            <p className="mb-3 text-base">
              Iratkozz fel, hogy elsőként értesülj az új futamokról, exkluzív tippekről és
              akciókról!
            </p>
            <form className="flex gap-2 mb-2" aria-label="Hírlevél feliratkozás">
              <input
                type="email"
                placeholder="Email címed"
                className="input glass-input"
                aria-label="Email"
                required
              />
              <button
                type="submit"
                className="btn btn-primary nitro-anim"
                aria-label="Feliratkozás"
              >
                Feliratkozás
              </button>
            </form>
            <div className="text-xs text-muted mb-2">
              Az email megadásával elfogadod az{' '}
              <a href="/rules" className="underline">
                adatvédelmi szabályzatot
              </a>{' '}
              és bármikor leiratkozhatsz.
            </div>
            <div className="flex items-center gap-6 mt-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Facebook csoport
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Kapcsolat */}
      <section className="section border-t">
        <div className="container">
          <h2 className="mb-2">Kapcsolat</h2>
          <p>
            Email:{' '}
            <a className="underline" href="mailto:info@example.com">
              info@example.com
            </a>
          </p>
        </div>
      </section>

      <footer className="footer glass-card gradient-bg py-10 mt-12 motion-fade-in text-base text-gray-800 dark:text-gray-200">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Bal: bemutatkozás + social */}
          <div>
            <div className="font-bold text-xl mb-2">Lámer Zoltán Gokart</div>
            <div className="text-sm mb-4">
              Motorsport, élmény, közösség – prémium amatőr futamok, mindenki számára!
            </div>
            <div className="flex gap-4">
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
          <nav aria-label="Gyorslinkek" className="footer-links flex flex-col gap-2">
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
            <Link href="/contact" className="footer-link">
              Kapcsolat
            </Link>
          </nav>
          {/* Jobb: kapcsolat + jogi linkek */}
          <div className="footer-legal flex flex-col gap-2 items-end">
            <div>
              <span className="font-semibold">Kapcsolat:</span>
              <a className="underline ml-2" href="mailto:info@example.com">
                info@example.com
              </a>
            </div>
            <a href="/rules" className="footer-link">
              Szabályzat
            </a>
            <a href="/rules#adatvedelem" className="footer-link">
              Adatvédelem
            </a>
            <div className="mt-4 text-xs text-muted">
              &copy; {new Date().getFullYear()} Lámer Zoltán Gokart
            </div>
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
    </>
  );
}
