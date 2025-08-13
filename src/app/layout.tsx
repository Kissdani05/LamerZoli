import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './Header';
import { LanguageProvider } from './i18n/LanguageContext';
import ConsentBanner from './ConsentBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bérgokart versenyek – Lámer Zoltán | Nevezés, naptár, eredmények',
  description:
    'Csatlakozz a legnagyobb egykategóriás bérgokart versenyekhez! Nevezés, versenynaptár, eredmények és információk egy helyen.',
  openGraph: {
    title: 'Bérgokart versenyek – Lámer Zoltán',
    description:
      'Csatlakozz a legnagyobb egykategóriás bérgokart versenyekhez! Nevezés, versenynaptár, eredmények és információk egy helyen.',
    url: process.env.SITE_URL || 'https://lamerzoli.vercel.app',
    images: [
      {
        url: '/next.svg',
        width: 1200,
        height: 630,
        alt: 'Bérgokart versenyek',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bérgokart versenyek – Lámer Zoltán',
    description:
      'Csatlakozz a legnagyobb egykategóriás bérgokart versenyekhez! Nevezés, versenynaptár, eredmények és információk egy helyen.',
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

function OrgJsonLd() {
  const siteUrl = process.env.SITE_URL || 'https://lamerzoli.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Lámer Zoltán Gokart Klub',
        url: siteUrl,
        logo: `${siteUrl}/next.svg`,
        sameAs: ['https://www.facebook.com/', 'https://www.instagram.com/'],
      },
      {
        '@type': 'Person',
        name: 'Lámer Zoltán',
        url: siteUrl,
        jobTitle: 'Versenyszervező',
      },
      {
        '@type': 'WebSite',
        name: 'Lámer Zoltán – Bérgokart',
        url: siteUrl,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

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
          <Header />
          {children}
          <OrgJsonLd />
          <ConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
