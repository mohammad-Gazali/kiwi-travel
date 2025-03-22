import { PageHeader } from "@/components/dashboard/page-header"
import { BookingForm } from "../_components/booking-form"

export default function NewBookingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create Booking" description="Add a new trip booking" backButtonLink="/dashboard/bookings" />
      <BookingForm />
    </div>
  )
}

