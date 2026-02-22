import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { password } = await request.json();
  const adminPasswordHash = process.env.ADMIN_PASSWORD;

  if (process.env.NODE_ENV === 'development') {
    console.log('=== Admin Login Attempt ===');
    console.log('Password length:', password.length);
    console.log('Hash available:', !!adminPasswordHash);
  }

  if (!adminPasswordHash) {
    if (process.env.NODE_ENV === 'development') {
      console.log('ERROR: No admin password hash found in environment');
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash);

  if (process.env.NODE_ENV === 'development') {
    console.log('Password validation result:', isValid);
    console.log('=========================');
  }

  if (isValid) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      // Session cookie - törlődik böngésző bezárásakor
    });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
