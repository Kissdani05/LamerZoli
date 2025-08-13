import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (password === adminPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin', '1', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
