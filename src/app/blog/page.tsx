'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type BlogArticle = {
  id: string | number;
  title: string;
  image_url?: string | null;
  content?: string | null;
  date?: string | null;
  read_time?: string | null;
};

export default function BlogPage() {
  const [articles] = useState<BlogArticle[]>([]);
  const [loading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  return (
    <main className="blog-main max-w-6xl mx-auto px-4 pb-16 text-white relative">
      {/* Blur háttérkép az egész oldalhoz */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/2.png"
          alt="Blog oldal háttér – naplementés onboard"
          fill
          className="object-cover w-full h-full"
          style={{ filter: 'blur(32px) brightness(0.7)' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60" />
      </div>
      {/* Hero + intro */}
      <section className="blog-hero relative rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/1.png"
            alt="Onboard nézet balos kanyarban, naplemente"
            fill
            className="object-cover blur-2xl"
            style={{ filter: 'brightness(0.7)' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-brand-3/60 pointer-events-none" />
        </div>
        <div className="relative z-10 py-10 px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text drop-shadow mb-2">
            Blog 🏎️
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-2">Tippek, útmutatók, kulisszák</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="blog-toolbar flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xl">🔍</span>
          <input
            type="text"
            placeholder="Keresés a címekben…"
            className="input glass-input px-4 py-2 rounded-xl w-full max-w-md"
            aria-label="Keresés a címekben"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="input glass-input px-2 py-2 rounded-xl ml-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value === 'asc' ? 'asc' : 'desc')}
          >
            <option value="desc">Legújabb</option>
            <option value="asc">Legrégebbi</option>
          </select>
        </div>
      </section>

      {/* Card grid */}
      <section className="blog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {loading ? (
          <div className="col-span-3 text-center py-8 text-lg">Betöltés...</div>
        ) : articles.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-lg">Nincs blogcikk.</div>
        ) : (
          (search.trim() === ''
            ? showAll
              ? articles
              : articles.slice(0, 3)
            : articles.filter((article) =>
                article.title.toLowerCase().includes(search.toLowerCase()),
              )
          ).map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="blog-card glass-card rounded-xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl relative block"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={article.image_url || '/1.png'}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#e4eb34] to-transparent" />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h2 className="text-xl font-bold gradient-text mb-1 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-base text-muted line-clamp-2 mb-1">
                  {article.content?.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-2 text-xs text-muted mb-2">
                  <span>📅 {article.date}</span>
                  <span>• ⏱️ {article.read_time}</span>
                </div>
                <span className="btn btn-outline mt-2 w-full text-center font-bold">
                  Elolvasom →
                </span>
              </div>
            </Link>
          ))
        )}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {search.trim() === '' &&
          articles.length > 3 &&
          (!showAll ? (
            <button
              className="btn btn-outline px-6 py-3 rounded-xl shadow-lg"
              onClick={() => setShowAll(true)}
            >
              További cikkek
            </button>
          ) : (
            <button
              className="btn btn-outline px-6 py-3 rounded-xl shadow-lg"
              onClick={() => setShowAll(false)}
            >
              Kevesebb cikk
            </button>
          ))}
      </div>
    </main>
  );
}
