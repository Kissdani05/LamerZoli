import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Versenynaptár',
  description:
    'LámerKart versenynaptár – közelgő gokart versenyek időpontjai, helyszínei és részletei. Nevezz be egy kattintással!',
  openGraph: {
    title: 'Versenynaptár | LámerKart',
    description: 'Közelgő gokart versenyek időpontjai és helyszínei. Nevezz be egy kattintással!',
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
