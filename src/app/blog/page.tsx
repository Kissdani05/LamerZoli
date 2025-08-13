import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog – Lámer Zoltán Gokart',
  description: 'Tippek, hírek és történetek a bérgokart világából.',
};

export default function BlogPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Hogyan készülj az első bérgokart versenyedre?</li>
        <li>Ideális ívek és fékezési pontok alapjai</li>
        <li>Miért jó az egykategóriás bajnokság?</li>
      </ul>
    </main>
  );
}
