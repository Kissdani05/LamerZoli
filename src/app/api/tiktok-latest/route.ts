import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.tiktok.com/@lamerkart');
    const html = await response.text();
    const match = html.match(/"video\/([0-9]+)"/);
    if (match && match[1]) {
      const videoId = match[1];
      return NextResponse.json({ videoId });
    } else {
      return NextResponse.json({ error: 'Nem található videó.' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Hiba történt a TikTok lekérdezés során.' }, { status: 500 });
  }
}
