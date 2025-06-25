import { NextResponse } from 'next/server';
import { api } from '@/src/trpc/server';

async function getAllTrips() {
  try {
    const response = await api.trips.listSearch({ page: 0 });
    console.log("👉 API response", response); // временный лог

    return response.items.map((trip: any) => ({
      id: trip.id,
      title: trip.title,
      description: trip.description || '',
      assetsUrls: trip.images || [],
      adultTripPriceInCents: Math.round((trip.price || 0) * 100),
    }));
  } catch (error) {
    console.error('Ошибка при получении туров:', error);
    return [];
  }
}

export async function GET() {
  const trips = await getAllTrips();

  // Временный возврат JSON для отладки
  return NextResponse.json({ trips });
}
