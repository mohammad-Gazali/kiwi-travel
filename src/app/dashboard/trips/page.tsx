import { PageHeader } from "@/components/dashboard/page-header"
import { TripsList } from "./_components/trips-list"

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips"
        description="Manage your available trips"
        createButtonLabel="Add Trip"
        createButtonLink="/dashboard/trips/create"
      />
      <TripsList />
    </div>
  )
}

