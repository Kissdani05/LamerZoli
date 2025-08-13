import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  const id = context.params?.id;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  // Optional admin cookie check
  try {
    const { cookies } = await import('next/headers');
    const c = await cookies();
    const isAdmin = c.get('admin')?.value === '1';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch {}

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    return NextResponse.json(
      { error: 'Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL' },
      { status: 500 },
    );
  }
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  const { createClient } = await import('@supabase/supabase-js');
  const serverClient = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await serverClient.from('registrations').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const id = context.params?.id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  try {
    const { cookies } = await import('next/headers');
    const c = await cookies();
    const isAdmin = c.get('admin')?.value === '1';
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch {}

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl)
    return NextResponse.json(
      { error: 'Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL' },
      { status: 500 },
    );
  if (!serviceRoleKey)
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });

  const { createClient } = await import('@supabase/supabase-js');
  const serverClient = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await serverClient.from('registrations').update(body).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
