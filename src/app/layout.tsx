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
  return (
    <html lang="hu">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased`}
      >
        <LanguageProvider>
          <NotificationProvider>
            <Header />
            {children}
            <ConsentBanner />
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
