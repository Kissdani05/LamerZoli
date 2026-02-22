import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'LámerKart blog – hírek, versenybesámolók és aktualitások a téglási gokart bajnokság világából.',
  openGraph: {
    title: 'Blog | LámerKart',
    description: 'Hírek és versenybesámolók a LámerKart gokart bajnokságról.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
