import { PageHeader } from "@/components/dashboard/page-header";
import { TripTypeForm } from "../_components/trip-type-form";

export default function NewFeaturePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Trip Type"
        description="Add a new trip types for your trips"
        backButtonLink="/dashboard/types"
      />
      <TripTypeForm />
    </div>
  );
}
