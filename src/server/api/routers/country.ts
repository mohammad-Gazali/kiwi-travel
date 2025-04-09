import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { country } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { countryFormSchema } from "@/validators/country-schema";

export const countryRouter = createTRPCRouter({
  list: publicProcedure.query(
    async ({ ctx }) => await ctx.db.query.country.findMany(),
  ),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.country.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
      }),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(country).where(eq(country.id, input));

      return {
        message: "Deleted Successfully",
      };
    }),
  adminCreate: adminProcedure
    .input(countryFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(country).values(input);

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(countryFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.update(country).set(input).where(eq(country.id, input.id));

      return {
        message: "Updated successfully",
      };
    }),
});
