import { PageHeader } from "@/components/dashboard/page-header"
import { DestinationForm } from "../../_components/destination-form"

export default function EditDestinationPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Destination"
        description="Update destination information"
        backButtonLink="/dashboard/destinations"
      />
      <DestinationForm id={params.id} />
    </div>
  )
}

