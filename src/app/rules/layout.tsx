import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Szabályok',
  description:
    'LámerKart gokart bajnokság szabályai – versenyzési szabályzat, pontrendszer és kategóriák részletes leírása.',
  openGraph: {
    title: 'Szabályok | LámerKart',
    description: 'Gokart bajnokság versenyszabályzat, pontrendszer és kategóriakövetelmények.',
  },
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
