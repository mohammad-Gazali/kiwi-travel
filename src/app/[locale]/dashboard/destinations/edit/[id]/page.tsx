import { PageHeader } from "@/components/dashboard/page-header"
import { DestinationForm } from "../../_components/destination-form"
import { PageParams } from "@/types/page-params";

export default async function EditDestinationPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Destination"
        description="Update destination information"
        backButtonLink="/dashboard/destinations"
      />
      <DestinationForm />
    </div>
  )
}

