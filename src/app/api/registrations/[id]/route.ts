import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getIdFromUrl(req: Request): string | null {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  // Find the [id] segment (last part)
  return parts[parts.length - 1] || null;
}

export async function DELETE(req: Request) {
  const id = getIdFromUrl(req);
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
    return NextResponse.json({ error: error?.message || 'Ismeretlen hiba' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const id = getIdFromUrl(req);
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

  const { data, error } = await serverClient
    .from('registrations')
    .update(body)
    .eq('id', id)
    .select('email, name, race_name, status')
    .single();
  if (error)
    return NextResponse.json({ error: error?.message || 'Ismeretlen hiba' }, { status: 400 });

  // If status changed to accepted/rejected, notify the registrant
  try {
    const status = (body as Record<string, unknown>)?.status as string | undefined;
    if (status && (status === 'accepted' || status === 'rejected') && data?.email) {
      const to = data.email;
      const subject = status === 'accepted' ? 'Nevezésed elfogadva' : 'Nevezésed elutasítva';
      const extra = ' Hamarosan értesítünk a pontosabb információkról a versennyel kapcsolatban.';
      const text =
        status === 'accepted'
          ? `Kedves ${data.name || ''}, nevezésed elfogadtuk ${data.race_name || ''} versenyre.${extra}`
          : `Kedves ${data.name || ''}, sajnos nevezésedet elutasítottuk ${data.race_name || ''} versenyre.`;
      const html = `<p>Kedves ${data.name || ''},</p>
        <p>${
          status === 'accepted'
            ? `Nevezésedet elfogadtuk ${data.race_name || ''} versenyre. <br/>Hamarosan értesítünk a pontosabb információkról a versennyel kapcsolatban.`
            : `Sajnos nevezésedet elutasítottuk ${data.race_name || ''} versenyre.`
        }</p>`;
      await sendEmail({ to, subject, text, html });
    }
  } catch {}

  return NextResponse.json({ success: true });
}
