import { NextResponse } from 'next/server';

// Change this password to whatever you want
const SITE_PASSWORD = 'yatzy2025';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === SITE_PASSWORD) {
    const response = NextResponse.json({ success: true });

    // Set authentication cookie (expires in 24 hours)
    response.cookies.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
