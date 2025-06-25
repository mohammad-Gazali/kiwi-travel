import { NextResponse } from 'next/server';

async function getAllTrips() {
  // Заглушка: подставьте реальные данные, когда будет API
  return [
    {
      id: 1,
      title: 'Экскурсия в Памуккале "All Inclusive" из Алании',
      description: 'Памуккале славится своими белоснежными травертинами и термальными источниками.',
      assetsUrls: ['https://bcvtumk79h.ufs.sh/f/7uBQ9XZFPcZHdlECXT2DYKGLUc3IFOjQVo9sm2ZXl8iRnr0p?type=image'],
      adultTripPriceInCents: 6700,
    },
    {
      id: 2,
      title: 'Дайвинг в Анталии',
      description: 'Дайвинг — отличная возможность исследовать подводный мир Средиземного моря.',
      assetsUrls: ['https://bcvtumk79h.ufs.sh/f/7uBQ9XZFPcZHKvb4Ws0K9GEgLAMYp3lV1ovqS5Rt62CFecPJ?type=image'],
      adultTripPriceInCents: 3000,
    },
  ];
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
      <g:image_link>${trip.assetsUrls?.[0]}</g:image_link>
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

