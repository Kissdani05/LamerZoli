export function GET() {
  const base = process.env.SITE_URL || 'https://lamerzoli.vercel.app';
  const paths = [
    '/',
    '/about',
    '/calendar',
    '/registration',
    '/rules',
    '/tracks',
    '/results',
    '/gallery',
    '/blog',
    '/contact',
  ];
  const urls = paths
    .map(
      (p) =>
        `  <url>\n    <loc>${base}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.7'}</priority>\n  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
