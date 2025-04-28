import { PageHeader } from "@/components/dashboard/page-header";
import { BookingsList } from "./_components/bookings-list";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        description="Manage your bookings"
      />
      <BookingsList />
    </div>
  );
}
