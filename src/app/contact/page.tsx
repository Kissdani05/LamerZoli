import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapcsolat – Lámer Zoltán Gokart',
  description: 'Lépj kapcsolatba velünk kérdés esetén.',
};

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Kapcsolat</h1>
      <p className="mb-3 text-sm md:text-base">
        Email:{' '}
        <a href="mailto:info@example.com" className="underline text-blue-600 hover:text-blue-800">
          info@example.com
        </a>
      </p>
      <p className="text-sm md:text-base">
        Közösség:{' '}
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Facebook
        </a>
        ,{' '}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Instagram
        </a>
      </p>
    </main>
  );
}
