import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galéria',
  description:
    'LámerKart gokart verseny galéria – fotók és videók a bajnokság legjobb pillanataiból.',
  openGraph: {
    title: 'Galéria | LámerKart',
    description: 'Fotók és videók a LámerKart gokart bajnokság versenyeiről.',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
