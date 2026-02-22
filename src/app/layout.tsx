import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import RootLayoutShell from './RootLayoutShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'LámerKart – Téglás Gokart Bajnokság',
    template: '%s | LámerKart',
  },
  description:
    'Magyarország egyik legjobb gokart bajnoksága Tégláson. Sprint, Endurance és Junior kategóriák. Nevezz be versenyeinkre és kövesd az eredményeket!',
  keywords: [
    'gokart',
    'gokart bajnokság',
    'téglás',
    'lamerkart',
    'verseny',
    'sprint',
    'endurance',
    'junior',
  ],
  authors: [{ name: 'LámerKart' }],
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'LámerKart',
    title: 'LámerKart – Téglás Gokart Bajnokság',
    description:
      'Magyarország egyik legjobb gokart bajnoksága Tégláson. Sprint, Endurance és Junior kategóriák.',
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
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
