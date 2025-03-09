import { PageHeader } from "@/components/dashboard/page-header"
import { TripForm } from "../_components/trip-form"

export default function NewTripPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create Trip" description="Add a new trip to your catalog" backButtonLink="/dashboard/trips" />
      <TripForm />
    </div>
  )
}

