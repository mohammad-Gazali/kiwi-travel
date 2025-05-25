import { PageHeader } from "@/components/dashboard/page-header";
import { TripsTypesList } from "./_components/trips-types-list";

export default function TripsTypessPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips Types"
        description="Manage trips types"
        createButtonLabel="Add Trip Type"
        createButtonLink="/dashboard/types/create"
      />
      <TripsTypesList />
    </div>
  );
}
