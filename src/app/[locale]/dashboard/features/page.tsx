import { PageHeader } from "@/components/dashboard/page-header";
import { TripsFeaturesList } from "./_components/trips-features-list";

export default function TripsFeaturesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips Features"
        description="Manage trips features"
        createButtonLabel="Add Feature"
        createButtonLink="/dashboard/features/create"
      />
      <TripsFeaturesList />
    </div>
  );
}
