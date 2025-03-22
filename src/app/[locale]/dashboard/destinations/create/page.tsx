import { PageHeader } from "@/components/dashboard/page-header"
import { DestinationForm } from "../_components/destination-form"

export default function NewDestinationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Destination"
        description="Add a new destination to your catalog"
        backButtonLink="/dashboard/destinations"
      />
      <DestinationForm />
    </div>
  )
}

