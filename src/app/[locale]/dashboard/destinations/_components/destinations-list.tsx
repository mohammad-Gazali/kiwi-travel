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
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

// Mock data for destinations
const mockDestinations = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    continent: "Europe",
    popular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    popular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: "3",
    name: "New York",
    country: "USA",
    continent: "North America",
    popular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: "4",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    popular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: "5",
    name: "Nairobi",
    country: "Kenya",
    continent: "Africa",
    popular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: "6",
    name: "Athens",
    country: "Greece",
    continent: "Europe",
    popular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: "7",
    name: "Barcelona",
    country: "Spain",
    continent: "Europe",
    popular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: "8",
    name: "Zurich",
    country: "Switzerland",
    continent: "Europe",
    popular: false,
    image: "https://placehold.co/300x200",
  },
]

type Destination = {
  id: string
  name: string
  country: string
  continent: string
  popular: boolean
  image: string
}

export function DestinationsList() {
  const [destinations, setDestinations] = useState(mockDestinations)
  const [destinationToDelete, setDestinationToDelete] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = () => {
    if (destinationToDelete) {
      setDestinations(destinations.filter((dest) => dest.id !== destinationToDelete))
      setDestinationToDelete(null)
      setDialogOpen(false)
    }
  }

  const columns: ColumnDef<Destination>[] = [
    {
      accessorKey: "name",
      header: "Destination",
      cell: ({ row }) => {
        const destination = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md overflow-hidden">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-medium">{destination.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "continent",
      header: "Continent",
    },
    {
      accessorKey: "popular",
      header: "Status",
      cell: ({ row }) => {
        const popular = row.getValue<boolean>("popular")
        return popular ? <Badge>Popular</Badge> : <Badge variant="secondary">Regular</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const destination = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/destinations/${destination.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDestinationToDelete(destination.id)
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
      <DataTable columns={columns} data={destinations} searchColumn="name" searchPlaceholder="Search destinations..." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this destination? This action cannot be undone.
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

