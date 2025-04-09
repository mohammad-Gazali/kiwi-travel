import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { tripFeature } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { tripFeatureFormSchema } from "@/validators/trip-feature-schema";

export const tripFeatureRouter = createTRPCRouter({
  adminList: adminProcedure.query(
    async ({ ctx }) => await ctx.db.query.tripFeature.findMany(),
  ),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.tripFeature.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
      }),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tripFeature).where(eq(tripFeature.id, input));

      return {
        message: "Deleted successfully",
      };
    }),
  adminCreate: adminProcedure
    .input(tripFeatureFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(tripFeature).values(input);

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(tripFeatureFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(tripFeature)
        .set(input)
        .where(eq(tripFeature.id, input.id));

      return {
        message: "Updated successfully",
      };
    }),
});
