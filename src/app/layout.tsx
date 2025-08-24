'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './Header';
import { LanguageProvider } from './i18n/LanguageContext';
import ConsentBanner from './ConsentBanner';
import NotificationProvider from './NotificationProvider';
import RegistrationModal from './RegistrationModal';
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

declare global {
  interface Window {
    openRegistrationModal: () => void;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ellenőrizzük, hogy az admin oldalon vagyunk-e
  const isAdminRoute =
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/admin') : false;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Globális függvény, amit a Header bárhonnan hívhat
    window.openRegistrationModal = () => setShowModal(true);
  }, []);

  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased`}
      >
        <LanguageProvider initialLang={isAdminRoute ? 'hu' : 'en'}>
          <NotificationProvider>
            {/* Csak akkor jelenítjük meg a Header-t, ha NEM admin route-on vagyunk */}
            {!isAdminRoute && <Header />}
            {/* RegistrationModal minden oldalon elérhető */}
            <RegistrationModal
              open={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={() => {}}
            />
            {children}
            <ConsentBanner />
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
