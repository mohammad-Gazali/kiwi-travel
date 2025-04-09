import { PageHeader } from "@/components/dashboard/page-header";
import { TripFeatureForm } from "../_components/trip-feature-form";

export default function NewFeaturePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Feature"
        description="Add a new feature for your trips"
        backButtonLink="/dashboard/trips-features"
      />
      <TripFeatureForm />
    </div>
  );
}
