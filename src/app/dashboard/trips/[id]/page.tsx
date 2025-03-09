import { PageHeader } from "@/components/dashboard/page-header"
import { TripDetails } from "../_components/trip-details"

export default async function TripDetailsPage() {
  const id = 'test';

  return (
    <div className="space-y-6">
      <PageHeader title="Trip Details" description="View trip information" backButtonLink="/dashboard/trips" />
      <TripDetails id={id} />
    </div>
  )
}

