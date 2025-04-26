import { CalendarDays, MapPin, Star, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { localeAttributeFactory } from "@/lib/utils";
import { api } from "@/trpc/server";
import { getLocale } from "next-intl/server";

export default async function BookingsPage() {
  const locale = await getLocale();
  const localeAttribute = localeAttributeFactory(locale);

  const bookings = await api.tripBooking.list();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "accepted":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      case "missed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
    }
  };

  return (
    <main className="container mx-auto mt-14 px-4 py-8 lg:px-0">
      <h1 className="mb-6 text-3xl font-bold">Bookings</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
        </TabsList>

        {["all", "pending", "accepted", "done", "cancelled", "missed"].map(
          (tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookings
                  .filter((booking) => tab === "all" || booking.status === tab)
                  .map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <img
                          src={booking.image}
                          alt={localeAttribute(booking, "title")}
                          className="h-full w-full object-cover"
                        />
                        <Badge
                          className={`absolute right-3 top-3 ${getStatusColor(booking.status)}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-6">
                          <span className="line-clamp-2">
                            {localeAttribute(booking, "title")}
                          </span>
                          <div className="text-xl font-bold">
                            ${booking.price}
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {localeAttribute(booking, "location")}
                        </div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          {formatDate(booking.bookingDate)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {booking.travelersCount}{" "}
                            {booking.travelersCount === 1
                              ? "traveler"
                              : "travelers"}
                          </span>
                        </div>
                        {booking.review !== null && (
                          <div className="mt-2 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i <= (booking.review!.ratingValue || 0)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
              {bookings.filter(
                (booking) => tab === "all" || booking.status === tab,
              ).length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No {tab} trips found.</p>
                </div>
              )}
            </TabsContent>
          ),
        )}
      </Tabs>
    </main>
  );
}
