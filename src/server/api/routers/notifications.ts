import { reviewNotification, confirmNotification } from "@/server/db/schema";
import { authProtectedProcedure, createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";

export const notificationsRouter = createTRPCRouter({
  viewReviewNotification: authProtectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.transaction(async (tx) => {
        const result = await tx.query.reviewNotification.findFirst({
          where: ({ userId, isShown }, { eq, and }) =>
            and(eq(isShown, false), eq(userId, ctx.userId)),
        });

        if (!result) return null;

        await tx
          .update(reviewNotification)
          .set({
            isShown: true,
          })
          .where(eq(reviewNotification.id, result.id));

        return result;
      }),
  ),
  viewConfirmNotification: authProtectedProcedure.query(
    async ({ ctx }) =>
      await ctx.db.transaction(async (tx) => {
        const result = await tx.query.confirmNotification.findFirst({
          where: ({ userId, isShown }, { eq, and }) =>
            and(eq(isShown, false), eq(userId, ctx.userId)),
        });

        if (!result) return null;

        await tx
          .update(confirmNotification)
          .set({
            isShown: true,
          })
          .where(eq(confirmNotification.id, result.id));

        return result;
      }),
  ),
});
