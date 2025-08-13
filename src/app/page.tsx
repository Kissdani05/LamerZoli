'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import RegistrationModal from './RegistrationModal';
import { useI18n } from './i18n/LanguageContext';
import Image from 'next/image';

function SportsEventSchema({ date, desc, image }: { date: string; desc: string; image: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'Gokart verseny',
    startDate: date,
    description: desc,
    image: image,
    location: {
      '@type': 'Place',
      name: 'Gokart pálya',
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
  const [race, setRace] = useState<NextRaceSettings>({ next_race_at: '', next_race_desc: '', next_race_image_path: '' });
  const [showModal, setShowModal] = useState(false);
  const [featuredRace, setFeaturedRace] = useState<FeaturedRace | null>(null);

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
      const settingsRes = await supabase.from('site_settings').select('featured_race_id').eq('id', 1).single();
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
    const { error } = await supabase.from('registrations').insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        weight: data.weight,
        race_id: data.race,
        race_name: data.race_name,
      },
    ]);
    if (error) {
      alert(t('error_occurred') + ': ' + error.message);
    } else {
      alert(t('registration_success'));
    }
  }

  return (
    <>
      <SportsEventSchema date={race.next_race_at} desc={race.next_race_desc} image={race.next_race_image_path} />
      <section id="hero" className="py-16 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex flex-col items-start md:w-1/2 w-full">
          <h1 className="text-5xl font-bold mb-4">{t('hero_title')}</h1>
          <h2 className="text-3xl font-semibold mb-2">{t('hero_subtitle1')}</h2>
          <h3 className="text-xl font-medium mb-6">{t('hero_subtitle2')}</h3>
          <button
            className="bg-black text-white font-bold rounded px-6 py-3 mb-4 hover:bg-gray-800"
            onClick={() => setShowModal(true)}
          >
            {t('btn_register')}
          </button>
        </div>
        <div className="md:w-1/2 w-full flex justify-center items-center">
          {/* Image placeholder */}
        </div>
      </section>
      <RegistrationModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleRegistration} />

      <section id="race" className="py-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">{t('next_race')}</h2>
        <div className="bg-white rounded border shadow p-4 w-full max-w-md">
          <p>{t('date')}: <span className="font-semibold">{race.next_race_at ? new Date(race.next_race_at).toLocaleString() : t('soon')}</span></p>
          <p>{t('description')}: <span className="font-semibold">{race.next_race_desc || t('soon')}</span></p>
          {race.next_race_image_path && (
            <div className="w-full h-48 relative mt-4">
              <Image
                src={race.next_race_image_path}
                alt={t('image')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
                priority
              />
            </div>
          )}
        </div>
        {featuredRace && (
          <div className="bg-white border rounded p-6 mt-8 text-black w-full max-w-xl">
            <h3 className="text-xl font-bold mb-2">{t('featured_race_title')}</h3>
            <p><span className="font-semibold">{t('name')}:</span> {featuredRace.name}</p>
            <p><span className="font-semibold">{t('location')}:</span> {featuredRace.location}</p>
            <p><span className="font-semibold">{t('time')}:</span> {featuredRace.date ? new Date(featuredRace.date).toLocaleString() : ''}</p>
            <p><span className="font-semibold">{t('capacity')}:</span> {featuredRace.max_participants}</p>
            <p><span className="font-semibold">{t('description')}:</span> {featuredRace.description || ''}</p>
            {featuredRace.image_url && (
              <div className="w-full h-48 relative mt-4">
                <Image
                  src={featuredRace.image_url}
                  alt={t('image')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            )}
          </div>
        )}
      </section>

      <section id="results" className="py-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">{t('results')}</h2>
        <ul className="list-disc pl-6 text-left w-full max-w-md">
          <li>2025. 07. 20. – {t('first_place')}: Kovács Péter</li>
          <li>2025. 06. 15. – {t('first_place')}: Kiss Dániel</li>
          <li>2025. 05. 10. – {t('first_place')}: Nagy Zoltán</li>
          <li>{t('more_results_soon')}</li>
        </ul>
      </section>

      <section id="faq" className="py-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">{t('faq')}</h2>
        <ul className="list-disc pl-6 text-left w-full max-w-md">
          <li><strong>{t('faq_q1')}</strong><br />{t('faq_a1')}</li>
          <li><strong>{t('faq_q2')}</strong><br />{t('faq_a2')}</li>
          <li><strong>{t('faq_q3')}</strong><br />{t('faq_a3')}</li>
          <li><strong>{t('faq_q4')}</strong><br />{t('faq_a4')}</li>
          <li><strong>{t('faq_q5')}</strong><br />{t('faq_a5')}</li>
        </ul>
      </section>

      <footer className="py-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} {t('footer_copyright')}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="ml-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          aria-label={t('back_to_top')}
        >
          {t('back_to_top')}
        </button>
      </footer>
    </>
  );
}
