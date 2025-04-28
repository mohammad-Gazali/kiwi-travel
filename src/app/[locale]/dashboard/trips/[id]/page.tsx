import { PageHeader } from "@/components/dashboard/page-header";
import { TripDetails } from "../_components/trip-details";
import { PageParams } from "@/types/page-params";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function TripDetailsPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  const trip = await api.trip.adminViewDetailsPage(Number(id))

  if (!trip) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trip Details"
        description="Manage your trip and see its reviews and booking requests"
        backButtonLink="/dashboard/trips"
      />
      <TripDetails trip={trip} />
    </div>
  );
}
