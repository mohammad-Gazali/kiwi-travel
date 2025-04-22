"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock trip data for display
const mockTrip = {
  id: "1",
  title: "Paris Adventure",
  destination: "Paris, France",
  duration: "7 days",
  price: "$1,299",
  description:
    "Experience the magic of Paris with this 7-day adventure. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
  image: "https://placehold.co/300x200",
}

interface TripDetailsProps {
  id: string
}

export function TripDetails({ id }: TripDetailsProps) {
  const [trip, setTrip] = useState(mockTrip)

  // In a real application, you would fetch the trip data based on the ID
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setTrip(mockTrip)
    }, 500)
  }, [id])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>View detailed information about this trip</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img src={trip.image || "https://placehold.co/300x200?text=Kiwi+Travel"} alt={trip.title} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">{trip.title}</h3>
          <p className="text-muted-foreground">{trip.destination}</p>
        </div>
        <div className="grid gap-2">
          <p>
            <strong>Duration:</strong> {trip.duration}
          </p>
          <p>
            <strong>Price:</strong> {trip.price}
          </p>
          <p>
            <strong>Description:</strong> {trip.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

