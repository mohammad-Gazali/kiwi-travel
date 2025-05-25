import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { tripType } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { tripTypeFormSchema } from "@/validators/trip-type-schema";

export const tripTypeRouter = createTRPCRouter({
  list: adminProcedure.query(
    async ({ ctx }) => await ctx.db.query.tripType.findMany(),
  ),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.tripType.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
      }),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tripType).where(eq(tripType.id, input));

      return {
        message: "Deleted successfully",
      };
    }),
  adminCreate: adminProcedure
    .input(tripTypeFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(tripType).values(input);

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(tripTypeFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(tripType)
        .set(input)
        .where(eq(tripType.id, input.id));

      return {
        message: "Updated successfully",
      };
    }),
});
