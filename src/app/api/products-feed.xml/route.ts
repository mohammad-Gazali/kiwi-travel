import { NextResponse } from 'next/server';
import { api } from '@/src/trpc/server';

async function getAllTrips() {
  try {
    const response = await api.trips.listSearch({ page: 0 });

    return response.items.map((trip: any) => ({
      id: trip.id,
      title: trip.title,
      description: trip.description || '',
      assetsUrls: trip.images || [],
      adultTripPriceInCents: Math.round((trip.price || 0) * 100),
    }));
  } catch (error) {
    console.error('❌ Ошибка при получении туров:', error);
    return [];
  }
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return "&lt;";
      case '>': return "&gt;";
      case '&': return "&amp;";
      case '"': return "&quot;";
      case "'": return "&apos;";
      default: return c;
    }
  });
}

export async function GET() {
  const trips = await getAllTrips();

  const items = trips.map((trip: any) => `
    <item>
      <g:id>${trip.id}</g:id>
      <g:title>${escapeXml(trip.title)}</g:title>
      <g:description>${escapeXml(trip.description)}</g:description>
      <g:link>https://karimtor.com/ru/trips/${trip.id}</g:link>
      <g:image_link>${trip.assetsUrls?.[0] || 'https://karimtor.com/logo.svg'}</g:image_link>
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
