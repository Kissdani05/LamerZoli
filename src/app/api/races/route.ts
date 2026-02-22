import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Return list of races for selection in the registration modal
export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
      // Missing config: return empty list rather than 500 to keep UI usable
      return NextResponse.json({ races: [] });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(supabaseUrl, serviceRoleKey || anonKey!);

    // Select minimal fields for dropdown; ignore failures gracefully
    const { data, error } = await client
      .from('races')
      .select('id, name, categories')
      .order('name', { ascending: true });

    if (error) {
      // Return empty list on error to avoid breaking registration modal
      return NextResponse.json(
        { races: [], error: error?.message || 'Ismeretlen hiba' },
        { status: 200 },
      );
    }

    return NextResponse.json({ races: (data || []).filter((r) => r && r.id && r.name) });
  } catch (e: unknown) {
    // Never throw to client; degrade gracefully
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ races: [], error: message }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(supabaseUrl, serviceRoleKey);

    const body = await request.json();
    const { name, location, date, categories } = body;

    if (!name || !location || !date) {
      return NextResponse.json({ error: 'Hiányzó mezők' }, { status: 400 });
    }

    const { data, error } = await client
      .from('races')
      .insert({
        name,
        location,
        date,
        categories: categories || [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ race: data }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
