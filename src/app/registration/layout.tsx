import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nevezés',
  description:
    'Nevezz be a LámerKart gokart bajnokságra! Töltsd ki az online jelentkezési lapot és foglald el helyed a rajtrácson.',
  openGraph: {
    title: 'Nevezés | LámerKart',
    description: 'Online nevezési lehetőség a LámerKart gokart bajnokság versenyeire.',
  },
};

export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
