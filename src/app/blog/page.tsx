'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from './data';

export default function BlogPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const all = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main className="max-w-[1100px] mx-auto px-4 md:px-6 pb-16 md:pb-24 text-white min-h-screen">
      <div className="mt-6 md:mt-8 mb-6 md:mb-8 flex flex-col gap-4">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Összes cikk</h1>
        <div className="flex items-center gap-3 w-full max-w-md">
          <input
            placeholder="Keresés…"
            className="input px-3 md:px-4 py-2 text-sm md:text-base rounded-xl bg-[#181a1d] border-[#2a2d31] w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <section>
        {filtered.length === 0 && (
          <div className="text-center py-12 md:py-16 opacity-60 text-sm md:text-base">
            Nincs találat.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="group flex gap-3 md:gap-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition overflow-hidden h-24 md:h-28 p-3"
            >
              <div className="relative w-32 md:w-40 h-full rounded-lg overflow-hidden shrink-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width:768px) 128px, 160px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-1 left-1 bg-[#e4eb34] text-black text-[9px] font-black px-2 py-1 rounded">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                <div className="flex flex-col gap-1 min-w-0">
                  <h2 className="text-sm md:text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#e4eb34] transition">
                    {p.title}
                  </h2>
                  <p className="text-[11px] text-white/60 line-clamp-2">{p.excerpt}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] text-white/45">
                  <span>
                    {new Date(p.date).toLocaleDateString('hu-HU', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>• {p.readTime}</span>
                  <span>• {p.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Lámerkart Blog',
            blogPost: filtered
              .slice(0, 10)
              .map((p) => ({ '@type': 'BlogPosting', headline: p.title, datePublished: p.date })),
          }),
        }}
      />
    </main>
  );
}
