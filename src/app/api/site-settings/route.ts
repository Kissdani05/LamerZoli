import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH() {
  return NextResponse.json({ error: 'Deprecated endpoint' }, { status: 410 });
}
