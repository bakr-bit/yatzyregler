import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block all Danish subpages (but allow /da homepage)
  if (pathname.startsWith('/da/')) {
    return new NextResponse('Gone', { status: 410 });
  }

  // Block all Swedish article pages
  const blockedSwedishArticles = [
    '/kan-du-strategisera-i-tarningsspel',
    '/tur-vs-skicklighet-en-jamforelse-mellan-tarningsspel-och-casinospel',
    '/fran-noje-till-tavling-sa-forbereder-du-dig-for-din-forsta-yatzy-turnering',
    '/yatzy-en-favorit-aven-i-den-digitala-tidsaldern',
    '/spela-pa-natet-utan-att-aventyra-din-sakerhet',
  ];

  if (blockedSwedishArticles.includes(pathname)) {
    return new NextResponse('Gone', { status: 410 });
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|images/|pdfs/).*)',
  ],
};
