import { PageHeader } from "@/components/dashboard/page-header"
import { BookingForm } from "../../_components/booking-form"
import { PageParams } from "@/types/page-params"

export default async function EditBookingPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Booking" description="Update booking information" backButtonLink="/dashboard/bookings" />
      <BookingForm id={id} />
    </div>
  )
}

