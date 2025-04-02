import { createTRPCRouter, publicProcedure } from "../trpc";

export const destinationRouter = createTRPCRouter({
  list: publicProcedure.query(
    async ({ ctx }) => await ctx.db.query.country.findMany({
      with: {
        destinations: true,
      }
    }),
  ),
});
