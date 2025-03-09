import Link from "next/link"
import { Calendar, Globe, MapPin, Star, Users, Wifi, Coffee, Utensils, Car, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGallery } from "./_components/image-gallery"

// interface PageProps {
//   params: Promise<{ tripId: string }>;
// }

export default async function TripDetailsPage(/*{ params }: PageProps*/) {
  // const { tripId } = await params;

  // This would typically come from an API or database
  const trip = {
    id: "trip-123",
    title: "Serene Beach Getaway in Bali",
    description:
      "Experience the ultimate relaxation at our exclusive beachfront villa in Bali. Wake up to stunning ocean views, enjoy private beach access, and immerse yourself in the local culture with guided tours to ancient temples and traditional villages. Our package includes daily breakfast, airport transfers, and a complimentary spa session.",
    longDescription:
      "Nestled on the pristine shores of Nusa Dua, this luxurious retreat offers the perfect balance of adventure and relaxation. The villa features modern amenities while maintaining authentic Balinese charm through traditional architecture and décor.\n\nYour days can be spent lounging by your private infinity pool, practicing yoga on the beach at sunrise, or exploring the island's natural wonders. Nearby attractions include the sacred Uluwatu Temple, the artistic hub of Ubud, and the vibrant markets of Seminyak.\n\nOur dedicated concierge team is available 24/7 to ensure your stay exceeds expectations, arranging everything from in-villa dining experiences to cultural excursions tailored to your interests.",
    images: [
      "https://placehold.co/1200x600",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    features: [
      "Private beach access",
      "Infinity pool",
      "Daily breakfast",
      "Airport transfers",
      "Complimentary spa session",
      "24/7 concierge service",
      "WiFi throughout the property",
      "Air conditioning",
    ],
    status: "Available",
    country: "Indonesia",
    location: "Nusa Dua, Bali",
    price: 1299,
    duration: 7,
    rating: 4.8,
    reviewCount: 124,
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Coffee, name: "Breakfast Included" },
      { icon: Utensils, name: "Restaurant" },
      { icon: Car, name: "Airport Transfer" },
    ],
  }

  return (
    <main className="container mx-auto md:px-0 px-4 py-8 mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Title and Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{trip.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {trip.location}, {trip.country}
                </span>
              </div>
            </div>
            <Badge
              className={`${trip.status === "Available" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white w-fit`}
            >
              {trip.status}
            </Badge>
          </div>

          {/* Main Image and Gallery */}
          <ImageGallery images={trip.images} title={trip.title} />
          {/* <div className="space-y-2">
            <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src={trip.images[0] || "/placeholder.svg"}
                alt={trip.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {trip.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-20 overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${trip.title} - image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div> */}

          {/* Tabs for Description and Details */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Features</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 space-y-4">
              <p className="text-muted-foreground">{trip.description}</p>
              <p className="text-muted-foreground whitespace-pre-line">{trip.longDescription}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Trip Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trip.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {trip.amenities.map((amenity, index) => {
                      const Icon = amenity.icon
                      return (
                        <div key={index} className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                          <Icon className="h-6 w-6 mb-2" />
                          <span className="text-sm text-center">{amenity.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${trip.price}</span>
                  <span className="text-muted-foreground">per person</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{trip.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5).fill(null).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(trip.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {trip.rating} ({trip.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-in</label>
                    <div className="border rounded-md p-2">
                      <span>Select date</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-out</label>
                    <div className="border rounded-md p-2">
                      <span>Select date</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <div className="flex items-center border rounded-md p-2">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>2 Adults</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Base price</span>
                  <span>${trip.price} × 2</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>${Math.round(trip.price * 0.15)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${trip.price * 2 + Math.round(trip.price * 0.15)}</span>
                </div>
              </div>

              <Button className="w-full">Book Now</Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>No charge for reservation. Pay later.</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Trip Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium">{trip.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{trip.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{trip.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{trip.status}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Link href="#" className="flex items-center justify-center w-full">
                Ask a Question
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

