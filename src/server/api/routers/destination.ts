import { adminProcedure, createTRPCRouter } from "../trpc";

export const destinationRouter = createTRPCRouter({
  adminList: adminProcedure.query(
    async ({ ctx }) => await ctx.db.query.destination.findMany({
      with: {
        country: true,
      }
    }),
  ),
});
