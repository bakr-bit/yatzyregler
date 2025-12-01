import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Force static generation - reads file at build time
export const dynamic = 'force-static';

// Read HTML at module load time (build time for static routes)
const htmlPath = join(process.cwd(), 'public', 'lander', 'index.html');
const html = readFileSync(htmlPath, 'utf-8');

export async function GET() {
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
