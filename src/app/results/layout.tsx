import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eredmények',
  description:
    'LámerKart gokart bajnokság eredmények – Sprint, Endurance és Junior kategóriák végeredményei és versenyeredmények évente.',
  openGraph: {
    title: 'Eredmények | LámerKart',
    description: 'Gokart bajnokság eredmények Sprint, Endurance és Junior kategóriákban.',
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
