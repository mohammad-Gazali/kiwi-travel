import { PageHeader } from "@/components/dashboard/page-header";
import { PageParams } from "@/types/page-params";
import { TripForm } from "../../_components/trip-form";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function EditTripPage({
  params,
}: PageParams<{ id: string }>) {
  const { id } = await params;

  const trip = await api.trip.adminView(Number(id));

  if (!trip) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Trip"
        description="Update trip information"
        backButtonLink="/dashboard/trips"
      />
      <TripForm
        id={Number(id)}
        initialData={{
          ...trip,
          assets: trip.assetsUrls,
          price: trip.tripPriceInCents / 100,
          features: trip.features.map((f) => f.featureId),
        }}
      />
    </div>
  );
}
