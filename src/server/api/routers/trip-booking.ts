import { tripBookingFormSchema } from "@/validators/trip-booking-schema";
import { authProtectedProcedure, createTRPCRouter } from "../trpc";
import { tripBooking } from "@/server/db/schema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";

export const tripBookingRouter = createTRPCRouter({
  create: authProtectedProcedure
    .input(
      tripBookingFormSchema.extend({
        tripId: z.number({ required_error: "Trip is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const t = await getTranslations("TripDetailsPage.bookingForm")

      const trip = await ctx.db.query.trip.findFirst({
        columns: {
          id: true,
          tripPriceInCents: true,
        },
        where: ({ id }, { eq }) => eq(id, input.tripId),
      });

      if (!trip) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Trip doesn't exist with provided `tripId`"
        })
      }

      const existingBooking = await ctx.db.query.tripBooking.findFirst({
        columns: {
          id: true,
        },
        where: ({ userId, tripId, status, bookingDate }, { eq, and }) => and(
          eq(userId, ctx.userId),
          eq(tripId, input.tripId),
          eq(bookingDate, input.date.toISOString()),
          eq(status, "pending"),
        ),
      })

      if (existingBooking) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already booked a trip with same date, consider updating the existing one"
        })
      }

      await ctx.db.insert(tripBooking).values({
        userId: ctx.userId,
        priceInCents: trip.tripPriceInCents,
        travelersCount: input.travelersCount,
        tripId: input.tripId,
        userPhone: input.phone,
        bookingDate: input.date.toISOString(),
      });

      return {
        message: t("successMessage")
      }
    }),
});
