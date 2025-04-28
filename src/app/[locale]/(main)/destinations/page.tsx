import Image from "next/image"
import type { Metadata } from "next"
import { api } from "@/trpc/server"
import { getLocale } from "next-intl/server"
import { localeAttributeFactory } from "@/lib/utils"
import { Link } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Popular Travel Destinations | Explore Your Next Adventure",
  description:
    "Discover amazing travel destinations around the world. Find the perfect location for your next vacation with our curated list of popular destinations.",
  openGraph: {
    title: "Popular Travel Destinations | Explore Your Next Adventure",
    description:
      "Discover amazing travel destinations around the world. Find the perfect location for your next vacation.",
    images: [
      {
        url: "/og-destinations.jpg",
        width: 1200,
        height: 630,
        alt: "Popular Travel Destinations",
      },
    ],
  },
}

export default async function DestinationsPage() {
  const locale = await getLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const destinations = await api.destination.list({});

  return (
    <main className="container mx-auto mt-20 px-4 py-8 lg:grid lg:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`} className="group">
            <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={destination.imageUrl}
                  alt={localeAttribute(destination, "name")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl text-center font-semibold">{localeAttribute(destination, "name")}</h2>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
