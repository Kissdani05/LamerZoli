import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapcsolat – Lámer Zoltán Gokart',
  description: 'Lépj kapcsolatba velünk kérdés esetén.',
};

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Kapcsolat</h1>
      <p className="mb-2">
        Email:{' '}
        <a href="mailto:info@example.com" className="underline">
          info@example.com
        </a>
      </p>
      <p>
        Közösség:{' '}
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Facebook
        </a>
        ,{' '}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Instagram
        </a>
      </p>
    </main>
  );
}
