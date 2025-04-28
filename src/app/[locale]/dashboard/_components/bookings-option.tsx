"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export const BookingsOption = () => {
  const pathname = usePathname();

  const { data, isLoading } =
    api.tripBooking.adminUnseenBookingsCount.useQuery();

  return (
    <Link
      href="/dashboard/bookings"
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        pathname.includes("/dashboard/bookings")
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground",
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Trip Bookings</span>
      <div className="flex-1" />
      {isLoading && !data ? (
        <Skeleton className="size-5 rounded-full" />
      ) : data![0]?.count !== 0 ? (
        <Badge
          variant="destructive"
          className="grid size-5 place-items-center rounded-full p-0"
        >
          {data![0]?.count}
        </Badge>
      ) : null}
    </Link>
  );
};
