import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rólunk',
  description:
    'A LámerKart csapatról – gokart bajnokságunk története, céljaink és a mögötte álló emberek bemutatása.',
  openGraph: {
    title: 'Rólunk | LámerKart',
    description: 'A LámerKart gokart bajnokság csapatának bemutatása és történetük.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
