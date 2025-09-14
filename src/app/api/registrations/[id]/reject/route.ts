import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseId(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  // .../api/registrations/[id]/reject
  const id = parts[parts.length - 2] || '';
  return { id, url };
}

export async function GET(req: Request) {
  const { id, url } = parseId(req);
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const t = url.searchParams.get('t');
  if (!t) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  try {
    // Validate token: format exp.sig, recompute sig over `${id}:reject:${exp}`
    const [expStr, sig] = t.split('.', 2);
    const exp = Number(expStr);
    if (!exp || !sig) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    if (Math.floor(Date.now() / 1000) > exp)
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });

    const secret =
      process.env.REGISTRATION_SIGNING_SECRET ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'dev-secret';
    const msg = `${id}:reject:${exp}`;
    const expected = crypto.createHmac('sha256', secret).update(msg).digest('hex');
    if (expected !== sig) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey)
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(supabaseUrl, serviceRoleKey);

    // Update to rejected and fetch email details
    const { data, error } = await client
      .from('registrations')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select('email, name, race_name, status')
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Send registrant email
    try {
      if (data?.email) {
        const to = data.email;
        const subject = 'Nevezésed elutasítva';
        const text = `Kedves ${data.name || ''}, sajnos nevezésedet elutasítottuk ${data.race_name || ''} versenyre.`;
        const html = `<p>Kedves ${data.name || ''},</p><p>Sajnos nevezésedet elutasítottuk ${data.race_name || ''} versenyre.</p>`;
        await sendEmail({ to, subject, text, html });
      }
    } catch {}

    const okHtml = `<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Elutasítva</title></head><body style=\"font-family:system-ui;background:#0b0b0b;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh\"><div style=\"text-align:center\"><div style=\"font-size:56px\">❌</div><h1>Nevezés elutasítva</h1><p>Küldtünk értesítő emailt a nevezőnek.</p><a href=\"/admin\" style=\"display:inline-block;margin-top:16px;background:#e4eb34;color:#000;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:700\">Vissza az adminhoz</a></div></body></html>`;
    return new Response(okHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unhandled';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
