import { addReviewFormSchema } from "@/validators/review-schema";
import {
  adminProcedure,
  authProtectedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";
import { review, review as reviewTableSchema } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

export const reviewRouter = createTRPCRouter({
  create: authProtectedProcedure
    .input(addReviewFormSchema)
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.query.tripBooking.findFirst({
        where: ({ id, userId }, { eq, and }) =>
          and(eq(userId, ctx.userId), eq(id, input.bookingId)),
        columns: {
          tripId: true,
          status: true,
        },
        with: {
          review: true,
        },
      });

      if (!booking)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no booking with provided id by current user",
        });

      if (booking.review)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "there is already a review for this booking, instead, try to edit the existing one",
        });

      if (booking.status !== "done")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you can't add a review for non-done bookings",
        });

      const client = await clerkClient();

      const user = await client.users.getUser(ctx.userId);

      await ctx.db.insert(reviewTableSchema).values({
        ratingValue: input.ratingValue,
        message: input.message,
        tripBookingId: input.bookingId,
        tripId: booking.tripId,
        userEmail: user.emailAddresses[0]!.emailAddress,
        userId: ctx.userId,
        userImageUrl: user.hasImage ? user.imageUrl : null,
        userFullName: user.fullName,
      });

      const t = await getTranslations("ToastMessages");

      return {
        message: t("AddReview"),
      };
    }),
  delete: authProtectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(reviewTableSchema)
        .where(
          and(
            eq(reviewTableSchema.userId, ctx.userId),
            eq(reviewTableSchema.id, input),
          ),
        );


      const t = await getTranslations("ToastMessages");
      
      return {
        message: t("DeleteReview"),
      };
    }),
  adminHide: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(review)
        .set({
          isHiddenByAdmin: true,
        })
        .where(eq(review.id, input));

      return {
        message: "review has been hidden successfully",
      };
    }),
  adminUnhide: adminProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(review)
        .set({
          isHiddenByAdmin: false,
        })
        .where(eq(review.id, input));

      return {
        message: "review has been unhidden successfully",
      };
    }),
  listTop: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.db.query.review.findMany({
        where: ({ ratingValue, isHiddenByAdmin }, { eq, and }) =>
          and(eq(ratingValue, 5), eq(isHiddenByAdmin, false)),
        columns: {
          id: true,
          userImageUrl: true,
          userEmail: true,
          userFullName: true,
          message: true,
        },
        limit: 3,
      }),
  ),
});
