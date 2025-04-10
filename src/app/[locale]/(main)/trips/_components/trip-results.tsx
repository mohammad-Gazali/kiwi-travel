"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl"

// Mock data for trips
const trips = [
  {
    id: 1,
    title: "Romantic Paris Getaway",
    destination: "Paris, France",
    image: "https://placehold.co/500x300",
    price: 1299,
    duration: "7 days",
    rating: 4.8,
    reviews: 245,
    type: "Romantic",
    region: "Europe",
  },
  {
    id: 2,
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    image: "https://placehold.co/500x300",
    price: 1899,
    duration: "10 days",
    rating: 4.9,
    reviews: 189,
    type: "Adventure",
    region: "Asia",
  },
  {
    id: 3,
    title: "New York City Explorer",
    destination: "New York, USA",
    image: "https://placehold.co/500x300",
    price: 1499,
    duration: "5 days",
    rating: 4.7,
    reviews: 312,
    type: "City",
    region: "North America",
  },
  {
    id: 4,
    title: "Bali Beach Retreat",
    destination: "Bali, Indonesia",
    image: "https://placehold.co/500x300",
    price: 1099,
    duration: "8 days",
    rating: 4.6,
    reviews: 278,
    type: "Beach",
    region: "Asia",
  },
  {
    id: 5,
    title: "Rome Historical Tour",
    destination: "Rome, Italy",
    image: "https://placehold.co/500x300",
    price: 1399,
    duration: "6 days",
    rating: 4.8,
    reviews: 201,
    type: "Cultural",
    region: "Europe",
  },
  {
    id: 6,
    title: "London City Break",
    destination: "London, UK",
    image: "https://placehold.co/500x300",
    price: 999,
    duration: "4 days",
    rating: 4.5,
    reviews: 187,
    type: "City",
    region: "Europe",
  },
]

export function TripResults() {
  const t = useTranslations("TripsPage");

  return (
    <div className="col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t("tripsFoundHeader", { count: trips.length })}</h2>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <div className="md:flex hidden justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">
              {t("gridViewTab")}
            </TabsTrigger>
            <TabsTrigger value="list">
            {t("listViewTab")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge>{trip.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{trip.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${trip.price}</div>
                      <div className="text-xs text-muted-foreground">{t("tripCardPricePerPerson")}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {trip.rating} ({trip.reviews})
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/trips/${trip.id}`}>
                    <Button className="w-full">
                      {t("viewDetailsButton")}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge>{trip.type}</Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{trip.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {trip.destination}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${trip.price}</div>
                        <div className="text-xs text-muted-foreground">{t("tripCardPricePerPerson")}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />2 adults
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {trip.rating} ({trip.reviews})
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link href={`/trips/${trip.id}`}>
                        <Button>
                          {t("viewDetailsButton")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button variant="outline">
          {t("loadMoreResultsButton")}
        </Button>
      </div>
    </div>
  )
}

