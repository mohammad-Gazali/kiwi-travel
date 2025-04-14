import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { destination } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { destinationFormSchema } from "@/validators/destination-schema";

export const destinationRouter = createTRPCRouter({
  adminList: adminProcedure.query(
    async ({ ctx }) =>
      await ctx.db.query.destination.findMany({
        with: {
          country: true,
        },
      }),
  ),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.destination.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
      }),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(destination).where(eq(destination.id, input));

      return {
        message: "Deleted successfully",
      };
    }),
  adminCreate: adminProcedure
    .input(destinationFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(destination).values(input);

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(destinationFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(destination)
        .set(input)
        .where(eq(destination.id, input.id));

      return {
        message: "Updated successfully",
      };
    }),
  list: publicProcedure.input(z.object({ isPopularOnly: z.boolean().nullish() })).query(async ({ ctx, input }) => {
    return await ctx.db.query.destination.findMany({
      where: input.isPopularOnly 
        ? ({ isPopular }, { eq }) => eq(isPopular, true)
        : undefined,
    })
  })
});
