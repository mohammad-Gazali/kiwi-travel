import { PageParams } from "@/types/page-params";
import { BookingDetails } from "./_components/booking-details";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function BookingDetailsPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  const booking = await api.tripBooking.view(Number(id));

  if (!booking) notFound();

  return (
    <BookingDetails booking={booking} />
  )
}