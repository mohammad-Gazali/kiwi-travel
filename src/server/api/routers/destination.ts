import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { country, destination, trip } from "@/server/db/schema";
import { asc, count, eq, ilike, or, sql } from "drizzle-orm";
import { destinationFormSchema } from "@/validators/destination-schema";

export const destinationRouter = createTRPCRouter({
  adminList: adminProcedure.query(
    async ({ ctx }) =>
      await ctx.db
        .select()
        .from(destination)
        .innerJoin(country, eq(destination.countryId, country.id))
        .orderBy(asc(country.nameEn), asc(destination.nameEn))
        .then((res) =>
          res.map((item) => ({
            ...item.destinations,
            country: item.contries,
          })),
        ),
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
  list: publicProcedure
    .input(
      z.object({
        isPopularOnly: z.boolean().nullish(),
        limitFour: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.destination.findMany({
        where: input.isPopularOnly
          ? ({ isPopular }, { eq }) => eq(isPopular, true)
          : undefined,
        orderBy: input.limitFour ? sql`random()` : undefined,
        limit: input.limitFour ? 4 : undefined,
      });
    }),
  tinyListSearch: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: destination.id,
          destinationEn: destination.nameEn,
          destinationRu: destination.nameRu,
          countryEn: country.nameEn,
          countryRu: country.nameRu,
          image: destination.imageUrl,
          tripsCount: count(trip.id),
        })
        .from(destination)
        .innerJoin(country, eq(destination.countryId, country.id))
        .leftJoin(trip, eq(trip.destinationId, destination.id))
        .where(
          input
            ? or(
                ilike(destination.nameEn, `%${input}%`),
                ilike(destination.nameRu, `%${input}%`),
                ilike(country.nameEn, `%${input}%`),
                ilike(country.nameRu, `%${input}%`),
              )
            : undefined,
        )
        .groupBy(
          destination.id,
          destination.nameEn,
          destination.nameRu,
          destination.imageUrl,
          country.nameEn,
          country.nameRu,
        )
        .then((res) =>
          res.map((item) => ({
            id: item.id,
            locationEn: `${item.countryEn}, ${item.destinationEn}`,
            locationRu: `${item.countryRu}, ${item.destinationRu}`,
            image: item.image,
            tripsCount: item.tripsCount,
          })),
        );
    }),
});
