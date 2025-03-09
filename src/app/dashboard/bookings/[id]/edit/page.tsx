import { PageHeader } from "@/components/dashboard/page-header"
import { BookingForm } from "../../_components/booking-form"

export default async function EditBookingPage() {
  const id = 'test';

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Booking" description="Update booking information" backButtonLink="/dashboard/bookings" />
      <BookingForm id={id} />
    </div>
  )
}

