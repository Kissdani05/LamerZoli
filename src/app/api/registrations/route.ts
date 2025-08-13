import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, weight, race_id, race_name } = body || {};

  if (
    !name ||
    typeof name !== 'string' ||
    !email ||
    typeof email !== 'string' ||
    !phone ||
    typeof phone !== 'string' ||
    weight === undefined ||
    weight === null ||
    isNaN(Number(weight)) ||
    !race_id ||
    typeof race_id !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) return NextResponse.json({ error: 'Missing SUPABASE_URL' }, { status: 500 });
  if (!serviceRoleKey)
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });

  const { createClient } = await import('@supabase/supabase-js');
  const serverClient = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await serverClient.from('registrations').insert([
    {
      name,
      email,
      phone,
      weight: Number(weight),
      race_id,
      race_name: typeof race_name === 'string' ? race_name : null,
    },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
