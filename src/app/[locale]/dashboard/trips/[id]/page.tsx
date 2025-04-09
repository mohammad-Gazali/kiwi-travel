import { PageHeader } from "@/components/dashboard/page-header";
import { api } from "@/trpc/server";
import { PageParams } from "@/types/page-params";
import { notFound } from "next/navigation";
import { TripDetails } from "../_components/trip-details";

export default async function TripDetailsPage({
  params,
}: PageParams<{ id: string }>) {
  const { id } = await params;

  const trip = await api.trip.adminViewDetailed(Number(id));

  if (!trip) notFound();

  return (
      <div className="space-y-6">
        <PageHeader
          title="Trip Details"
          description="View detailed information about this trip"
          backButtonLink="/dashboard/trips"
        />
        <TripDetails 
          id={id}
        />
      </div>
    );
}