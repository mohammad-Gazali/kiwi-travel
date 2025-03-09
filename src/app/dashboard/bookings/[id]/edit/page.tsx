import { PageHeader } from "@/components/dashboard/page-header"
import { BookingForm } from "../../_components/booking-form"

export default function EditBookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Edit Booking" description="Update booking information" backButtonLink="/dashboard/bookings" />
      <BookingForm id={params.id} />
    </div>
  )
}

