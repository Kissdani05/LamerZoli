'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import RegistrationModal from './RegistrationModal';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';

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

  return (
    <>
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section id="hero" className="section">
        <div className="container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex flex-col items-start md:w-1/2 w-full">
            <h1 className="mb-4">Bérgokart versenyek – Lámer Zoltán</h1>
            <p className="text-lg text-gray-700 mb-6">
              Magyarország legnagyobb egykategóriás bérgokart sorozata. Nevezés pár kattintással.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Nevezés most
              </button>
              <a href="#race" className="btn btn-outline">
                Következő verseny
              </a>
              <a href="#faq" className="btn btn-ghost">
                GYIK
              </a>
            </div>
            <div className="mt-6 w-full">
              <p className="text-sm text-gray-600 mb-2">Partnereink</p>
              <div className="flex flex-wrap items-center gap-6 opacity-80">
                <Image src="/vercel.svg" alt="Partner logo" width={96} height={24} />
                <Image src="/next.svg" alt="Partner logo" width={96} height={24} />
                <Image src="/globe.svg" alt="Partner logo" width={96} height={24} />
                <Image src="/window.svg" alt="Partner logo" width={96} height={24} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-primary">Biztonságos fizetés</span>
                <span className="badge badge-muted">500+ nevezés</span>
                <span className="badge badge-muted">Top pályák</span>
                <span className="badge badge-muted">Professzionális időmérés</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex justify-center items-center">
            {/* Optional hero image placeholder */}
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
          <h2 className="mb-4">Következő verseny</h2>
          <div className="card w-full max-w-2xl">
            <p>
              Dátum:{' '}
              <span className="font-semibold">
                {race.next_race_at ? new Date(race.next_race_at).toLocaleString() : 'Hamarosan…'}
              </span>
            </p>
            <p>
              Leírás: <span className="font-semibold">{race.next_race_desc || 'Hamarosan…'}</span>
            </p>
            {featuredRace && (
              <p>
                Helyszín: <span className="font-semibold">{featuredRace.location}</span>
              </p>
            )}
            {race.next_race_image_path && (
              <div className="w-full h-64 relative mt-4">
                <Image
                  src={race.next_race_image_path}
                  alt="Következő verseny"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Értékajánlatok */}
      <section className="section border-t">
        <div className="container grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="mb-2">Egyenlő feltételek</h3>
            <p>Egységes technika, a vezetési tudás dönt.</p>
          </div>
          <div className="card">
            <h3 className="mb-2">Professzionális szervezés</h3>
            <p>Időmérés, szabályok, sportszerű környezet.</p>
          </div>
          <div className="card">
            <h3 className="mb-2">Közösség</h3>
            <p>Barátságos hangulat, visszajáró pilóták.</p>
          </div>
        </div>
      </section>

      {/* Pályák */}
      <section className="section border-t">
        <div className="container">
          <h2 className="mb-4">Pályák</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="mb-1">G1 Kart Center</h3>
              <p>Beltéri technikás pálya.</p>
            </div>
            <div className="card">
              <h3 className="mb-1">Hungaroring Kart Center</h3>
              <p>Kültéri gyors pálya.</p>
            </div>
            <div className="card">
              <h3 className="mb-1">Kecskemét Gokart</h3>
              <p>Vegyes karakterű aszfaltcsík.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hogyan működik */}
      <section className="section border-t">
        <div className="container">
          <h2 className="mb-4">Hogyan működik a nevezés?</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Kattints a Nevezés gombra.</li>
            <li>Töltsd ki az adataidat.</li>
            <li>Erősítsd meg e-mailben.</li>
            <li>Találkozunk a pályán!</li>
          </ol>
        </div>
      </section>

      {/* Vélemények */}
      <section className="section border-t">
        <div className="container">
          <h2 className="mb-4">Vélemények</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <blockquote className="card text-sm">
              „Szuper hangulat és profi lebonyolítás.” – Bence
            </blockquote>
            <blockquote className="card text-sm">
              „Igazi versenyélmény amatőröknek is.” – Anna
            </blockquote>
            <blockquote className="card text-sm">
              „Visszatérő vendég vagyok, minden futam élmény.” – Gábor
            </blockquote>
          </div>
        </div>
      </section>

      {/* GYIK */}
      <section id="faq" className="section border-t">
        <div className="container">
          <h2 className="mb-4">GYIK</h2>
          <ul className="list-disc pl-6 max-w-3xl">
            <li>
              <strong>Mikor lesz a következő verseny?</strong>
              <br />A főoldalon megtalálod a pontos dátumot.
            </li>
            <li>
              <strong>Hogyan tudok regisztrálni?</strong>
              <br />
              Kattints a Nevezés gombra és töltsd ki az űrlapot.
            </li>
            <li>
              <strong>Vannak súlycsoportok?</strong>
              <br />
              Egykategóriás sorozat vagyunk, kiegyensúlyozott kartokkal.
            </li>
            <li>
              <strong>Hol találom az eredményeket?</strong>
              <br />
              Az Eredmények oldalon.
            </li>
          </ul>
        </div>
      </section>

      {/* Hírlevél és közösség */}
      <section className="section border-t">
        <div className="container">
          <h2 className="mb-4">Hírlevél</h2>
          <p className="mb-3">Iratkozz fel, hogy elsőként értesülj az új futamokról.</p>
          <form className="flex gap-2 max-w-xl">
            <input type="email" placeholder="Email címed" className="input" aria-label="Email" />
            <button type="button" className="btn btn-primary">
              Feliratkozás
            </button>
          </form>
          <div className="flex items-center gap-6 mt-6">
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

      <footer className="py-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Gokart Klub
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="ml-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          aria-label="Vissza a tetejére"
        >
          Vissza a tetejére
        </button>
      </footer>
    </>
  );
}
