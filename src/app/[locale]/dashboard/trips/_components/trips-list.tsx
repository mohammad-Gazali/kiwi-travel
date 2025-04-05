"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Eye, Trash } from "lucide-react"

// Mock data for trips
const mockTrips = [
  {
    id: "1",
    title: "Paris Adventure",
    destination: "Paris, France",
    duration: "7 days",
    price: "$1,299",
    image: "https://placehold.co/300x200",
  },
  {
    id: "2",
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    duration: "10 days",
    price: "$2,499",
    image: "https://placehold.co/300x200",
  },
  {
    id: "3",
    title: "New York City Break",
    destination: "New York, USA",
    duration: "5 days",
    price: "$999",
    image: "https://placehold.co/300x200",
  },
  {
    id: "4",
    title: "Bali Retreat",
    destination: "Bali, Indonesia",
    duration: "14 days",
    price: "$1,899",
    image: "https://placehold.co/300x200",
  },
  {
    id: "5",
    title: "Safari Adventure",
    destination: "Nairobi, Kenya",
    duration: "8 days",
    price: "$3,299",
    image: "https://placehold.co/300x200",
  },
  {
    id: "6",
    title: "Greek Island Hopping",
    destination: "Athens, Greece",
    duration: "12 days",
    price: "$2,199",
    image: "https://placehold.co/300x200",
  },
  {
    id: "7",
    title: "Barcelona City Tour",
    destination: "Barcelona, Spain",
    duration: "6 days",
    price: "$1,499",
    image: "https://placehold.co/300x200",
  },
  {
    id: "8",
    title: "Swiss Alps Adventure",
    destination: "Zurich, Switzerland",
    duration: "9 days",
    price: "$2,799",
    image: "https://placehold.co/300x200",
  },
  {
    id: "9",
    title: "Dubai Luxury Escape",
    destination: "Dubai, UAE",
    duration: "7 days",
    price: "$3,499",
    image: "https://placehold.co/300x200",
  },
  {
    id: "10",
    title: "Rome Historical Tour",
    destination: "Rome, Italy",
    duration: "8 days",
    price: "$1,899",
    image: "https://placehold.co/300x200",
  },
  {
    id: "11",
    title: "Cancun Beach Vacation",
    destination: "Cancun, Mexico",
    duration: "10 days",
    price: "$2,099",
    image: "https://placehold.co/300x200",
  },
  {
    id: "12",
    title: "Sydney Explorer",
    destination: "Sydney, Australia",
    duration: "14 days",
    price: "$3,899",
    image: "https://placehold.co/300x200",
  },
]

type Trip = {
  id: string
  title: string
  destination: string
  duration: string
  price: string
  image: string
}

export function TripsList() {
  const [trips, setTrips] = useState(mockTrips)
  const [tripToDelete, setTripToDelete] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = () => {
    // TODO: handle delete
    if (tripToDelete) {
      setTrips(trips.filter((trip) => trip.id !== tripToDelete))
      setTripToDelete(null)
      setDialogOpen(false)
    }
  }

  const columns: ColumnDef<Trip>[] = [
    {
      accessorKey: "title",
      header: "Trip",
      cell: ({ row }) => {
        const trip = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md overflow-hidden">
              <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="h-full w-full object-cover" />
            </div>
            <span className="font-medium">{trip.title}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const trip = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/trips/${trip.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/trips/${trip.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setTripToDelete(trip.id)
                setDialogOpen(true)
              }}
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={trips} searchColumn="title" searchPlaceholder="Search trips..." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

