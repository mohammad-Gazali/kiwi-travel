import { PageHeader } from "@/components/dashboard/page-header"
import { TripForm } from "../../_components/trip-form"

export default function EditTripPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Edit Trip" description="Update trip information" backButtonLink="/dashboard/trips" />
      <TripForm id={params.id} />
    </div>
  )
}

