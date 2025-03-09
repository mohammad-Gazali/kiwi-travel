import { PageHeader } from "@/components/dashboard/page-header"
import { TripDetails } from "../_components/trip-details"
import { PageParams } from "@/types/page-params";

export default async function TripDetailsPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Trip Details" description="View trip information" backButtonLink="/dashboard/trips" />
      <TripDetails id={id} />
    </div>
  )
}

