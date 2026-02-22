import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Return the next upcoming race based on date
export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
      return NextResponse.json({ race: null, error: 'Missing configuration' }, { status: 200 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(supabaseUrl, serviceRoleKey || anonKey!);

    // Get current date in ISO format
    const now = new Date().toISOString();

    // First try to get upcoming races
    let { data, error } = await client
      .from('races')
      .select('id, name, location, date, max_participants, description, image_url, categories')
      .gt('date', now)
      .order('date', { ascending: true })
      .limit(1)
      .maybeSingle();

    // If no upcoming race, get the most recent past race
    if (!data && !error) {
      const pastQuery = await client
        .from('races')
        .select('id, name, location, date, max_participants, description, image_url, categories')
        .lte('date', now)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      data = pastQuery.data;
      error = pastQuery.error;
    }

    if (error || !data) {
      return NextResponse.json(
        { race: null, error: error?.message || 'No races found' },
        { status: 200 },
      );
    }

    return NextResponse.json({ race: data });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ race: null, error: message }, { status: 200 });
  }
}
