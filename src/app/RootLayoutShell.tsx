'use client';

import Header from './Header';
import { LanguageProvider } from './i18n/LanguageContext';
import ConsentBanner from './ConsentBanner';
import NotificationProvider from './NotificationProvider';
import RegistrationModal from './RegistrationModal';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    openRegistrationModal: (raceId?: string) => void;
  }
}

export default function RootLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const [showModal, setShowModal] = useState(false);
  const [modalRaceId, setModalRaceId] = useState<string>('');

  useEffect(() => {
    window.openRegistrationModal = (raceId?: string) => {
      if (raceId) setModalRaceId(raceId);
      setShowModal(true);
    };
  }, []);

  async function handleRegistration(data: {
    name: string;
    email: string;
    phone: string;
    weight: number;
    race: string;
    race_name: string;
    category: string;
    team_size?: number;
    sws_id?: string;
  }) {
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
          category: data.category,
          team_size: data.team_size,
          sws_id: data.sws_id,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      alert('Nevezés sikeres!');
      setShowModal(false);
      setModalRaceId('');
    } catch {
      alert('Hiba történt a nevezés során.');
    }
  }

  return (
    <LanguageProvider initialLang={isAdminRoute ? 'hu' : 'en'}>
      <NotificationProvider>
        {!isAdminRoute && <Header />}
        <RegistrationModal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setModalRaceId('');
          }}
          onSubmit={handleRegistration}
          defaultRaceId={modalRaceId}
        />
        {children}
        <ConsentBanner />
      </NotificationProvider>
    </LanguageProvider>
  );
}
