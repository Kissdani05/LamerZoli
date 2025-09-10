import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, weight, race_id, race_name, sws_id } = body || {};

  if (
    !name ||
    typeof name !== 'string' ||
    !email ||
    typeof email !== 'string' ||
    !phone ||
    typeof phone !== 'string' ||
    weight === undefined ||
    weight === null ||
    isNaN(Number(weight))
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

  const { data: inserted, error } = await serverClient
    .from('registrations')
    .insert([
      {
        name,
        email,
        phone,
        weight: Number(weight),
        race_id: typeof race_id === 'string' ? race_id : null,
        race_name: typeof race_name === 'string' ? race_name : null,
        sws_id: typeof sws_id === 'string' && sws_id.trim() ? sws_id.trim() : null,
        status: 'pending',
      },
    ])
    .select('id, name, email, race_name')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Notify admin about new registration
  try {
    const adminTo = process.env.REGISTRATION_ADMIN_EMAIL;
    if (adminTo) {
      const subject = 'Új nevezés érkezett';
      // Build signed one-click accept link using request origin (more robust across envs)
      const reqUrl = new URL(req.url);
      const origin = `${reqUrl.protocol}//${reqUrl.host}`;
      // Prefer request origin to ensure the link points to the exact deployed domain the admin is on
      const siteUrl =
        origin ||
        process.env.SITE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        'https://lamerzoli.vercel.app';
      const signingSecret =
        process.env.REGISTRATION_SIGNING_SECRET ||
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        'dev-secret';
      const id = inserted?.id as string;
      let acceptLink = '';
      let acceptFallback = '';
      if (id) {
        const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
        const msg = `${id}:accept:${exp}`;
        const sig = crypto.createHmac('sha256', signingSecret).update(msg).digest('hex');
        const token = `${exp}.${sig}`; // token binds id via msg
        acceptLink = `${siteUrl}/api/registrations/${id}/accept?t=${encodeURIComponent(token)}`;
        acceptFallback = `${siteUrl}/api/accept?id=${encodeURIComponent(id)}&t=${encodeURIComponent(token)}`;
      }

      const text = `Új nevezés:\nNév: ${name}\nEmail: ${email}\nTelefon: ${phone}\nSúly: ${weight}\nVerseny: ${race_name ?? ''}\nSWS ID: ${sws_id ?? ''}${acceptLink ? `\n\nElfogadás: ${acceptLink}` : ''}`;
      const html = `<p>Új nevezés érkezett:</p>
        <ul>
          <li><b>Név:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Telefon:</b> ${phone}</li>
          <li><b>Súly:</b> ${weight}</li>
          <li><b>Verseny:</b> ${race_name ?? ''}</li>
          <li><b>SWS ID:</b> ${sws_id ?? ''}</li>
        </ul>
        ${
          acceptLink
            ? `<div style="margin-top:16px">
          <a href="${acceptLink}" style="background:#22c55e;color:#000;font-weight:700;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block">Nevezés elfogadása</a>
          <div style="margin-top:8px;font-size:12px;color:#666">Ha a gomb nem működik: <a href="${acceptLink}">${acceptLink}</a></div>
          <div style="margin-top:6px;font-size:12px;color:#666">Alternatív link: <a href="${acceptFallback}">${acceptFallback}</a></div>
        </div>`
            : ''
        }`;
      await sendEmail({ to: adminTo, subject, text, html });
    }
  } catch {}

  return NextResponse.json({ success: true });
}
