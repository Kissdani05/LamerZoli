import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request) {
  // Admin cookie check
  try {
    const { cookies } = await import('next/headers');
    const c = await cookies();
    const isAdmin = c.get('admin')?.value === '1';
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch {}

  // Define the shape of allowed fields for type safety
  type SiteSettingsPatch = {
    featured_race_id?: string | null;
    next_race_at?: string | null;
    next_race_desc?: string | null;
    next_race_image_path?: string | null;
  };

  const bodyRaw = await req.json().catch(() => ({}));
  if (!bodyRaw || typeof bodyRaw !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const body = bodyRaw as Partial<SiteSettingsPatch>;

  const allowed: Partial<SiteSettingsPatch> = {};
  const fields: Array<keyof SiteSettingsPatch> = [
    'featured_race_id',
    'next_race_at',
    'next_race_desc',
    'next_race_image_path',
  ];
  for (const k of fields) {
    if (Object.prototype.hasOwnProperty.call(body, k)) {
      allowed[k] = body[k];
    }
  }
  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) return NextResponse.json({ error: 'Missing SUPABASE_URL' }, { status: 500 });
  if (!serviceRoleKey)
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });

  const { createClient } = await import('@supabase/supabase-js');
  const serverClient = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await serverClient.from('site_settings').update(allowed).eq('id', 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
