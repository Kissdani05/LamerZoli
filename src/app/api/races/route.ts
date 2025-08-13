import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Admin gate
  try {
    const { cookies } = await import('next/headers');
    const c = await cookies();
    const isAdmin = c.get('admin')?.value === '1';
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch {}

  const body = await req.json().catch(() => ({}));
  const { name, location, date, max_participants, image_url, description } = body || {};

  if (!name || typeof name !== 'string' || !location || typeof location !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) return NextResponse.json({ error: 'Missing SUPABASE_URL' }, { status: 500 });
  if (!serviceRoleKey)
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });

  const { createClient } = await import('@supabase/supabase-js');
  const serverClient = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await serverClient
    .from('races')
    .insert([
      {
        name,
        location,
        date: typeof date === 'string' ? date : null,
        max_participants: Number(max_participants) || null,
        image_url: typeof image_url === 'string' ? image_url : null,
        description: typeof description === 'string' ? description : null,
      },
    ])
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true, id: data?.id });
}
