import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { trip, tripToFeature } from "@/server/db/schema";
import { tripFormSchema } from "@/validators/trip-schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const tripRouter = createTRPCRouter({
  adminList: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.trip.findMany({
      with: {
        destination: {
          with: {
            country: true,
          },
          columns: {
            nameEn: true,
          },
        },
      },
      columns: {
        id: true,
        assetsUrls: true,
        titleEn: true,
        duration: true,
        tripPriceInCents: true,
      },
    });
  }),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.trip.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
        with: {
          destination: true,
          features: true,
        },
      }),
  ),
  adminViewDetailed: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.trip.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
        with: {
          destination: true,
          bookings: true,
          features: {
            with: {
              feature: true,
            },
          },
        },
      }),
  ),
  adminCreate: adminProcedure
    .input(tripFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.transaction(async (tx) => {
        const result = await tx
          .insert(trip)
          .values({
            ...input,
            assetsUrls: input.assets,
            tripPriceInCents: Math.floor(input.price * 100),
          })
          .returning({ id: trip.id });

        const tripId = result[0]!.id;

        await tx.insert(tripToFeature).values(
          input.features.map((featureId) => ({
            tripId,
            featureId,
          })),
        );
      });

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(tripFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(trip)
          .set({
            ...input,
            assetsUrls: input.assets,
            tripPriceInCents: Math.floor(input.price * 100),
          })
          .where(eq(trip.id, input.id));

        await tx
          .delete(tripToFeature)
          .where(eq(tripToFeature.tripId, input.id));

        await tx.insert(tripToFeature).values(
          input.features.map((featureId) => ({
            tripId: input.id,
            featureId,
          })),
        );
      });

      return {
        message: "Updated successfully",
      };
    }),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(trip).where(eq(trip.id, input));

      return {
        message: "Deleted successfully",
      };
    }),
});
