import { PageHeader } from "@/components/dashboard/page-header"
import { PageParams } from "@/types/page-params";
import { TripForm } from "../../_components/trip-form"

export default async function EditTripPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;
  
  return (
    <div className="space-y-6">
      <PageHeader title="Edit Trip" description="Update trip information" backButtonLink="/dashboard/trips" />
      <TripForm />
    </div>
  )
}
