import Link from 'next/link';
import Image from 'next/image';
import { getPostById } from '../data';

export default async function Page({ params }: { params?: Promise<{ id: string }> }) {
  const resolvedParams = params ? await params : undefined;
  const id = resolvedParams ? (resolvedParams as { id: string }).id : undefined;

  if (!id) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Cikk nem található</h1>
        <p>Ez a cikk nem létezik vagy törölve lett.</p>
        <Link href="/blog" className="btn btn-outline mt-6">
          Vissza a hírekhez
        </Link>
      </main>
    );
  }

  const post = getPostById(id);
  if (!post) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Cikk nem található</h1>
        <p>Az adott azonosítóval nem találtunk bejegyzést.</p>
        <Link href="/blog" className="btn btn-outline mt-6">
          Vissza a hírekhez
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pb-24 text-white">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-[#e4eb34] mb-6 transition"
      >
        ← Vissza
      </Link>
      <article className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <span className="inline-block bg-[#e4eb34] text-black text-[11px] font-black px-3 py-1 rounded self-start">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <span>{new Date(post.date).toLocaleDateString('hu-HU', { dateStyle: 'medium' })}</span>
            <span>• {post.readTime}</span>
            <span>• {post.author}</span>
          </div>
        </div>
        <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 shadow">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="prose prose-invert max-w-none text-white/90 leading-relaxed">
          <p className="text-base md:text-lg font-light">{post.excerpt}</p>
          {post.content && (
            <p className="mt-4 whitespace-pre-line text-sm md:text-base">{post.content}</p>
          )}
          <p className="mt-6 text-xs text-white/40">
            Ez egy statikus demó tartalom. A későbbiekben dinamikus CMS / adatbázis kerülhet ide.
          </p>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            author: { '@type': 'Person', name: post.author },
            articleSection: post.category,
            image: post.image,
            description: post.excerpt,
          }),
        }}
      />
    </main>
  );
}
