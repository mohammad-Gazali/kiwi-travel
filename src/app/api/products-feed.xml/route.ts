import { NextResponse } from 'next/server';
import { api } from '@/src/trpc/server';

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/[<>&"']/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '"': return '&quot;';
        case "'": return '&apos;';
        default: return c;
      }
    })
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uD800-\uDFFF\uFFFE\uFFFF]/g, '')
    .replace(/[\u{110000}-\u{FFFFFFFF}]/gu, '');
}

async function getAllTrips() {
  const allTrips: any[] = [];
  let page = 0;
  const pageSize = 10;

  try {
    while (true) {
      const response = await api.trips.listSearch({ page, pageSize });
      if (!response.items || response.items.length === 0) break;

      const formatted = response.items.map((trip: any) => ({
        id: trip.id,
        title: trip.title,
        description: trip.description || '',
        assetsUrls: trip.images || [],
        adultTripPriceInCents: Math.round((trip.price || 0) * 100),
      }));

      allTrips.push(...formatted);

      if (response.items.length < pageSize) break;
      page++;
    }
  } catch (error) {
    console.error('Ошибка при получении туров:', error);
  }

  return allTrips;
}

export async function GET() {
  const trips = await getAllTrips();

  const items = trips.map((trip: any) => `
    <item>
      <g:id>${escapeXml(String(trip.id))}</g:id>
      <g:title>${escapeXml(String(trip.title))}</g:title>
      <g:description>${escapeXml(String(trip.description))}</g:description>
      <g:link>https://karimtor.com/ru/trips/${trip.id}</g:link>
      <g:image_link>${trip.assetsUrls?.[0] ? escapeXml(trip.assetsUrls[0]) : 'https://karimtor.com/logo.svg'}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${(trip.adultTripPriceInCents / 100).toFixed(2)} USD</g:price>
      <g:brand>Karim Tour</g:brand>
      <g:condition>new</g:condition>
    </item>
  `).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Экскурсии Karim Tour</title>
    <link>https://karimtor.com/ru/trips</link>
    <description>Каталог экскурсий Karim Tour</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
