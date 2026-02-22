import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapcsolat',
  description:
    'Vedd fel a kapcsolatot a LámerKart csapatával – elérhetőségeink, közösségi média oldalak és kapcsolatfelvételi lehetőségek.',
  openGraph: {
    title: 'Kapcsolat | LámerKart',
    description: 'LámerKart elérhetőségek és kapcsolatfelvételi lehetőségek.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
