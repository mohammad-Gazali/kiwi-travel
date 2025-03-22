import { PageHeader } from "@/components/dashboard/page-header"
import { DestinationsList } from "./_components/destinations-list"

export default function DestinationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Destinations"
        description="Manage your travel destinations"
        createButtonLabel="Add Destination"
        createButtonLink="/dashboard/destinations/create"
      />
      <DestinationsList />
    </div>
  )
}

