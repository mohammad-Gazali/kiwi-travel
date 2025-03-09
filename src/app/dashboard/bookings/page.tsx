import { PageHeader } from "@/components/dashboard/page-header"
import { BookingsList } from "./_components/bookings-list"

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trip Bookings"
        description="Manage customer bookings"
        createButtonLabel="Add Booking"
        createButtonLink="/dashboard/bookings/create"
      />
      <BookingsList />
    </div>
  )
}

