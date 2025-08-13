export default function Sitemap() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${process.env.SITE_URL || 'https://lamerzoli.vercel.app'}/</loc>\n  </sitemap>\n</sitemapindex>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
}
