import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }: { params?: Promise<{ id: string }> }) {
  const resolvedParams = params ? await params : undefined;
  const id = resolvedParams ? (resolvedParams as { id: string }).id : undefined;
  const { data: article, error } = await supabase.from('blog').select('*').eq('id', id).single();

  if (error || !article) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Blogcikk nem található</h1>
        <p>Ez a cikk nem létezik vagy törölve lett.</p>
        <Link href="/blog" className="btn btn-outline mt-6">
          Vissza a bloghoz
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pb-16 text-white">
      <Link href="/blog" className="btn btn-outline mb-6 inline-block">
        ← Vissza
      </Link>
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        {/* Bal: kép és olvasási idő */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Image
            src={article.image_url || '/1.png'}
            alt={article.title}
            width={800}
            height={500}
            className="rounded-xl object-cover w-full max-h-[500px] mb-4 shadow-xl"
          />
          <div className="text-base text-yellow-400 font-bold text-center mb-2">
            ⏱️ {article.read_time}
          </div>
          <div className="text-xs text-muted text-center mb-2">📅 {article.date}</div>
        </div>
        {/* Jobb: cím és szöveg */}
        <div className="flex-1 flex flex-col items-center justify-start">
          <h1 className="text-3xl font-extrabold mb-4 gradient-text drop-shadow text-center w-full">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-muted mb-4 justify-center w-full"></div>
          <article className="prose prose-invert prose-lg max-w-none w-full">
            {article.content}
          </article>
        </div>
      </div>
    </main>
  );
}
