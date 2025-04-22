"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon } from "lucide-react"

// Define the trip/book type
type TripStatus = "upcoming" | "completed" | "cancelled"

interface Trip {
  id: string
  title: string
  description: string
  image: string
  status: TripStatus
  date: string
  location: string
}

// Sample data
const trips: Trip[] = [
  {
    id: "1",
    title: "Paris Adventure",
    description: "Explore the romantic streets of Paris, visit the Eiffel Tower, and enjoy authentic French cuisine.",
    image: "https://placehold.co/300x200",
    status: "upcoming",
    date: "June 15, 2025",
    location: "Paris, France",
  },
  {
    id: "2",
    title: "Tokyo Exploration",
    description:
      "Discover the blend of traditional and modern culture in Tokyo, from ancient temples to futuristic skyscrapers.",
    image: "https://placehold.co/300x200",
    status: "completed",
    date: "March 10, 2025",
    location: "Tokyo, Japan",
  },
  {
    id: "3",
    title: "New York City Trip",
    description: "Experience the vibrant energy of New York City, visit iconic landmarks, and enjoy Broadway shows.",
    image: "https://placehold.co/300x200",
    status: "cancelled",
    date: "April 5, 2025",
    location: "New York, USA",
  },
  {
    id: "4",
    title: "Bali Retreat",
    description: "Relax on beautiful beaches, explore lush rice terraces, and immerse yourself in Balinese culture.",
    image: "https://placehold.co/300x200",
    status: "upcoming",
    date: "July 20, 2025",
    location: "Bali, Indonesia",
  },
  {
    id: "5",
    title: "Safari Adventure",
    description:
      "Witness the incredible wildlife of Africa on an unforgettable safari experience through national parks.",
    image: "https://placehold.co/300x200",
    status: "completed",
    date: "February 12, 2025",
    location: "Kenya",
  },
  {
    id: "6",
    title: "Rome Historical Tour",
    description: "Walk through ancient history in Rome, visiting the Colosseum, Roman Forum, and Vatican City.",
    image: "https://placehold.co/300x200",
    status: "upcoming",
    date: "August 3, 2025",
    location: "Rome, Italy",
  },
]

export default function Page() {
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter trips based on selected status
  const filteredTrips = statusFilter === "all" ? trips : trips.filter((trip) => trip.status === statusFilter)

  // Get status badge color
  const getStatusColor = (status: TripStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500 hover:bg-blue-600"
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "cancelled":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <main className="container mx-auto md:px-0 px-4 py-8 mt-14">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Trips</h1>
          <p className="text-muted-foreground">Manage and view all your travel plans</p>
        </div>

        <div className="w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No trips found with the selected status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image src={trip.image} alt={trip.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{trip.title}</h2>
                  <Badge className={getStatusColor(trip.status)}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{trip.description}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {trip.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {trip.location}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

