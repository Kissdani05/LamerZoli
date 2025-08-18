import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './Header';
import { LanguageProvider } from './i18n/LanguageContext';
import ConsentBanner from './ConsentBanner';
import NotificationProvider from './NotificationProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lámer Zoltán Gokart – Bérgokart versenyek, nevezés, naptár, eredmények',
  description:
    'Csatlakozz a Lámer Zoltán Gokart sorozathoz – egykategóriás bérgokart versenyek, nevezés, naptár, eredmények, információk egy helyen.',
  openGraph: {
    title: 'Lámer Zoltán Gokart – Bérgokart versenyek',
    description:
      'Csatlakozz a Lámer Zoltán Gokart sorozathoz – egykategóriás bérgokart versenyek, nevezés, naptár, eredmények, információk egy helyen.',
    url: process.env.SITE_URL || 'https://lamerzoli.vercel.app',
    images: [
      {
        url: '/next.svg',
        width: 1200,
        height: 630,
        alt: 'Lámer Zoltán Gokart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lámer Zoltán Gokart – Bérgokart versenyek',
    description:
      'Csatlakozz a Lámer Zoltán Gokart sorozathoz – egykategóriás bérgokart versenyek, nevezés, naptár, eredmények, információk egy helyen.',
    images: ['/next.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.SITE_URL || 'https://lamerzoli.vercel.app',
    languages: {
      'hu-HU': process.env.SITE_URL || 'https://lamerzoli.vercel.app',
      'en-US': process.env.SITE_URL || 'https://lamerzoli.vercel.app',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ellenőrizzük, hogy az admin oldalon vagyunk-e
  const isAdminRoute =
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/admin') : false;
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased px-2 md:px-0 w-full max-w-full overflow-x-hidden`}
      >
        <LanguageProvider>
          <NotificationProvider>
            {/* Csak akkor jelenítjük meg a Header-t, ha NEM admin route-on vagyunk */}
            {!isAdminRoute && <Header />}
            {/* Az admin route-on soha ne jelenjen meg a Header, se belépés előtt, se után */}
            <div className="w-full flex flex-col max-w-full">{children}</div>
            <ConsentBanner />
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
