import { PageHeader } from "@/components/dashboard/page-header"
import { DestinationForm } from "../../_components/destination-form"

export default async function EditDestinationPage() {
  const id = 'test';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Destination"
        description="Update destination information"
        backButtonLink="/dashboard/destinations"
      />
      <DestinationForm id={id} />
    </div>
  )
}

