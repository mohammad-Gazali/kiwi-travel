"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Edit, Eye, Trash } from "lucide-react"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    tripName: "Paris Adventure",
    customerName: "John Doe",
    bookingDate: "2023-06-15",
    travelDate: "2023-08-10",
    status: "Confirmed",
    amount: "$1,299",
  },
  {
    id: "2",
    tripName: "Tokyo Explorer",
    customerName: "Jane Smith",
    bookingDate: "2023-06-18",
    travelDate: "2023-09-05",
    status: "Pending",
    amount: "$2,499",
  },
  {
    id: "3",
    tripName: "New York City Break",
    customerName: "Robert Johnson",
    bookingDate: "2023-06-20",
    travelDate: "2023-07-15",
    status: "Confirmed",
    amount: "$999",
  },
  {
    id: "4",
    tripName: "Bali Retreat",
    customerName: "Emily Davis",
    bookingDate: "2023-06-22",
    travelDate: "2023-10-01",
    status: "Cancelled",
    amount: "$1,899",
  },
  {
    id: "5",
    tripName: "Safari Adventure",
    customerName: "Michael Wilson",
    bookingDate: "2023-06-25",
    travelDate: "2023-11-10",
    status: "Confirmed",
    amount: "$3,299",
  },
  {
    id: "6",
    tripName: "Greek Island Hopping",
    customerName: "Sarah Johnson",
    bookingDate: "2023-07-05",
    travelDate: "2023-08-20",
    status: "Confirmed",
    amount: "$2,199",
  },
  {
    id: "7",
    tripName: "Barcelona City Tour",
    customerName: "David Brown",
    bookingDate: "2023-07-10",
    travelDate: "2023-09-15",
    status: "Pending",
    amount: "$1,499",
  },
  {
    id: "8",
    tripName: "Swiss Alps Adventure",
    customerName: "Lisa Anderson",
    bookingDate: "2023-07-15",
    travelDate: "2023-12-05",
    status: "Confirmed",
    amount: "$2,799",
  },
  {
    id: "9",
    tripName: "Dubai Luxury Escape",
    customerName: "James Wilson",
    bookingDate: "2023-07-20",
    travelDate: "2023-10-10",
    status: "Cancelled",
    amount: "$3,499",
  },
  {
    id: "10",
    tripName: "Rome Historical Tour",
    customerName: "Patricia Moore",
    bookingDate: "2023-07-25",
    travelDate: "2023-09-25",
    status: "Confirmed",
    amount: "$1,899",
  },
  {
    id: "11",
    tripName: "Cancun Beach Vacation",
    customerName: "Thomas Taylor",
    bookingDate: "2023-08-01",
    travelDate: "2023-11-15",
    status: "Pending",
    amount: "$2,099",
  },
  {
    id: "12",
    tripName: "Sydney Explorer",
    customerName: "Jennifer White",
    bookingDate: "2023-08-05",
    travelDate: "2024-01-10",
    status: "Confirmed",
    amount: "$3,899",
  },
]

type Booking = {
  id: string
  tripName: string
  customerName: string
  bookingDate: string
  travelDate: string
  status: string
  amount: string
}

export function BookingsList() {
  const [bookings, setBookings] = useState(mockBookings)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = () => {
    if (bookingToDelete) {
      setBookings(bookings.filter((booking) => booking.id !== bookingToDelete))
      setBookingToDelete(null)
      setDialogOpen(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default"
      case "Pending":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "tripName",
      header: "Trip",
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "bookingDate",
      header: "Booking Date",
    },
    {
      accessorKey: "travelDate",
      header: "Travel Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/bookings/${booking.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/bookings/${booking.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setBookingToDelete(booking.id)
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
      <DataTable columns={columns} data={bookings} searchColumn="tripName" searchPlaceholder="Search bookings..." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
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

