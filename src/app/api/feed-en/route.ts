import { generateRSSFeed } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const xml = await generateRSSFeed("en");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
