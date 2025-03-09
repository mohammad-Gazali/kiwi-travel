import { PageHeader } from "@/components/dashboard/page-header"
import { TripForm } from "../../_components/trip-form"
import { PageParams } from "@/types/page-params";

export default async function EditTripPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;
  
  return (
    <div className="space-y-6">
      <PageHeader title="Edit Trip" description="Update trip information" backButtonLink="/dashboard/trips" />
      <TripForm id={id} />
    </div>
  )
}

