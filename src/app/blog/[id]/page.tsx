import Link from 'next/link';

export default async function Page({ params }: { params?: Promise<{ id: string }> }) {
  const resolvedParams = params ? await params : undefined;
  const id = resolvedParams ? (resolvedParams as { id: string }).id : undefined;
  // Nincs adatbázis lekérés: statikus fallback
  if (!id) {
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
      <div className="text-center text-lg">Blog cikk tartalom jelenleg nem elérhető.</div>
    </main>
  );
}
