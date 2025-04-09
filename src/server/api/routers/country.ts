import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { country } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const countryRouter = createTRPCRouter({
  list: publicProcedure.query(
    async ({ ctx }) => await ctx.db.query.country.findMany(),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(country).where(eq(country.id, input));

      return {
        message: "Deleted Successfully",
      };
    }),
});
