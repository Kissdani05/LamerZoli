import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pályák',
  description:
    'LámerKart gokart pályák – a Téglás F1 Gokartpálya és más versenyhelyszínek részletes bemutatása, pályajellemzők és információk.',
  openGraph: {
    title: 'Pályák | LámerKart',
    description: 'Gokart versenyhelyszínek részletes bemutatása és pályajellemzők.',
  },
};

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
