import { mainImage } from "@/lib/utils";
import { tripBooking } from "@/server/db/schema";
import { tripBookingFormSchema } from "@/validators/trip-booking-schema";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { eq, inArray } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { authProtectedProcedure, createTRPCRouter } from "../trpc";

export const tripBookingRouter = createTRPCRouter({
  list: authProtectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.query.tripBooking
        .findMany({
          where: ({ userId }, { eq }) => eq(userId, ctx.userId),
          with: {
            review: {
              columns: {
                ratingValue: true,
              },
            },
            trip: {
              columns: {
                id: true,
                titleEn: true,
                titleRu: true,
                assetsUrls: true,
                tripPriceInCents: true,
              },
              with: {
                destination: {
                  columns: {
                    id: true,
                    nameEn: true,
                    nameRu: true,
                  },
                  with: {
                    country: true,
                  },
                },
              },
            },
          },
        })
        .then((res) =>
          res.map((item) => ({
            id: item.id,
            status: item.status,
            bookingDate: item.bookingDate,
            travelersCount: item.travelersCount,
            review: item.review,
            titleEn: item.trip.titleEn,
            titleRu: item.trip.titleRu,
            image: mainImage(item.trip.assetsUrls),
            locationEn: `${item.trip.destination.country.nameEn}, ${item.trip.destination.nameEn}`,
            locationRu: `${item.trip.destination.country.nameRu}, ${item.trip.destination.nameRu}`,
            price: Math.floor(item.trip.tripPriceInCents / 100),
          })),
        ),
  ),
  view: authProtectedProcedure.input(z.number()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.tripBooking.findFirst({
        where: ({ id, userId }, { eq, and }) =>
          and(eq(userId, ctx.userId), eq(id, input)),
        with: {
          review: {
            columns: {
              id: true,
              message: true,
              ratingValue: true,
              createdAt: true,
            },
          },
          trip: {
            columns: {
              id: true,
              titleEn: true,
              titleRu: true,
              assetsUrls: true,
              tripPriceInCents: true,
              isConfirmationRequired: true,
            },
            with: {
              destination: {
                columns: {
                  id: true,
                  nameEn: true,
                  nameRu: true,
                },
                with: {
                  country: true,
                },
              },
            },
          },
        },
      }),
  ),
  create: authProtectedProcedure
    .input(
      tripBookingFormSchema.extend({
        tripId: z.number({ required_error: "Trip is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const t = await getTranslations("TripDetailsPage.bookingForm");

      const trip = await ctx.db.query.trip.findFirst({
        columns: {
          id: true,
          tripPriceInCents: true,
          isConfirmationRequired: true,
        },
        where: ({ id }, { eq }) => eq(id, input.tripId),
      });

      if (!trip) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Trip doesn't exist with provided `tripId`",
        });
      }

      const existingBooking = await ctx.db.query.tripBooking.findFirst({
        columns: {
          id: true,
        },
        where: ({ userId, tripId, status, bookingDate }, { eq, and }) =>
          and(
            eq(userId, ctx.userId),
            eq(tripId, input.tripId),
            eq(bookingDate, format(input.date, "yyyy-MM-dd")),
            inArray(status, ["pending", "accepted"]),
          ),
      });

      if (existingBooking) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: t("existingBookingError"),
        });
      }

      await ctx.db.insert(tripBooking).values({
        userId: ctx.userId,
        priceInCents: trip.tripPriceInCents,
        travelersCount: input.travelersCount,
        tripId: input.tripId,
        userPhone: input.phone,
        bookingDate: format(input.date, "yyyy-MM-dd"),
        status: trip.isConfirmationRequired ? "pending" : "accepted",
      });

      return {
        message: trip.isConfirmationRequired
          ? t("successMessageWithConfirm")
          : t("successMessage"),
      };
    }),
  cancel: authProtectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.query.tripBooking.findFirst({
        where: ({ id, userId }, { eq, and }) =>
          and(eq(userId, ctx.userId), eq(id, input)),
        columns: {
          status: true,
        },
        with: {
          trip: {
            columns: {
              isConfirmationRequired: true,
            },
          },
        },
      });

      if (!booking)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no booking with provided id by current user",
        });

      if (booking.status !== "accepted" && booking.status !== "pending")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "you can only cancel requests that is in 'pending' or 'accepted' statuses",
        });

      if (booking.status === "accepted" && booking.trip.isConfirmationRequired)
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "you can't cancel accepted booking that need admin confirmation, contact the admin firstly",
        });

      await ctx.db
        .update(tripBooking)
        .set({
          status: "cancelled",
        })
        .where(eq(tripBooking.id, input));

      // TODO
      return {
        message: "booking has been cancelled successfully",
      };
    }),
  availableBookingsForReview: authProtectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.query.tripBooking
        .findMany({
          where: ({ userId, status }, { eq, and }) =>
            and(eq(userId, ctx.userId), eq(status, "done")),
          columns: {
            id: true,
          },
          with: {
            review: {
              columns: {
                id: true,
              },
            },
            trip: {
              columns: {
                titleEn: true,
                titleRu: true,
              },
            },
          },
        })
        .then((res) => 
          res
            .filter((item) => !item.review)
            .map((item) => ({
              bookingId: item.id,
              titleEn: item.trip.titleEn,
              titleRu: item.trip.titleRu,
            })),
        ),
  ),
});
