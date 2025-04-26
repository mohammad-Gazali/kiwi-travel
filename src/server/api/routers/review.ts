import {
  addReviewFormSchema,
} from "@/validators/review-schema";
import { authProtectedProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";
import { review as reviewTableSchema } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  create: authProtectedProcedure
    .input(addReviewFormSchema)
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.query.tripBooking.findFirst({
        where: ({ id, userId }, { eq, and }) =>
          and(eq(userId, ctx.userId), eq(id, input.bookingId)),
        columns: {
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
        userEmail: user.emailAddresses[0]!.emailAddress,
        userId: ctx.userId,
        userImageUrl: user.hasImage ? user.imageUrl : null,
        userFullName: user.fullName,
      });

      // TODO
      return {
        message: "review has been added successfully",
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

      // TODO
      return {
        message: "review has been deleted successfully",
      };
    }),
});
