import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Edit } from "lucide-react"

// Mock booking data
const mockBooking = {
  id: "1",
  tripName: "Paris Adventure",
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  customerPhone: "+1 (555) 123-4567",
  bookingDate: "2023-06-15",
  travelDate: "2023-08-10",
  returnDate: "2023-08-17",
  status: "Confirmed",
  amount: "$1,299",
  paymentMethod: "Credit Card",
  paymentStatus: "Paid",
  notes: "Customer requested window seat on flights.",
  travelers: 2,
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const booking = mockBooking // In a real app, fetch the booking by ID

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

  return (
    <div className="space-y-6">
      <PageHeader title="Booking Details" description="View booking information" backButtonLink="/dashboard/bookings">
        <Button asChild className="ml-auto">
          <Link href={`/dashboard/bookings/${params.id}/edit`}>
            <Edit className="mr-1 h-4 w-4" />
            Edit Booking
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Booking Information
              <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Trip</div>
                <div className="font-medium">{booking.tripName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Booking ID</div>
                <div className="font-medium">{booking.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Booking Date
                </div>
                <div className="font-medium">{booking.bookingDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Travel Date
                </div>
                <div className="font-medium">{booking.travelDate}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Return Date</div>
                <div className="font-medium">{booking.returnDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Travelers</div>
                <div className="font-medium">{booking.travelers}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Amount</div>
                <div className="font-medium">{booking.amount}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Payment Status</div>
                <div className="font-medium">{booking.paymentStatus}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Payment Method</div>
              <div className="font-medium">{booking.paymentMethod}</div>
            </div>

            {booking.notes && (
              <div>
                <div className="text-sm text-muted-foreground">Notes</div>
                <div className="font-medium">{booking.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{booking.customerName}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{booking.customerEmail}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-medium">{booking.customerPhone}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

