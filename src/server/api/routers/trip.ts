import { mainImage } from "@/lib/utils";
import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  country,
  destination,
  trip,
  tripBooking,
  tripToFeature,
} from "@/server/db/schema";
import { tripFormSchema, tripSearchFormSchema } from "@/validators/trip-schema";
import { format } from "date-fns";
import {
  and,
  eq,
  isNotNull,
  isNull,
  or,
  sql,
  inArray,
  gte,
  lte,
  sum,
  ilike,
  count,
} from "drizzle-orm";
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
        isAvailable: true,
        isFeatured: true,
        tripType: true,
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
  listSearch: publicProcedure
    .input(tripSearchFormSchema)
    .query(async ({ ctx, input }) => {
      // ========= query conditions =========
      const dateCondition =
        input.date &&
        sql`${tripBooking.tripStartDate} = ${format(input.date, "yyyy-MM-dd")}::date`;

      const typeCondition =
        input.type && input.type.length !== 0
          ? inArray(trip.tripType, input.type)
          : undefined;

      const priceLowerCondition =
        input.price?.lower !== undefined
          ? gte(trip.tripPriceInCents, input.price.lower * 100)
          : undefined;

      const priceGreaterCondition =
        input.price?.greater !== undefined
          ? lte(trip.tripPriceInCents, input.price.greater * 100)
          : undefined;

      const destinationsCondition =
        input.destinations && input.destinations.length !== 0
          ? inArray(destination.id, input.destinations)
          : undefined;

      const countriesCondition =
        input.countries && input.countries.length !== 0
          ? inArray(country.id, input.countries)
          : undefined;

      const travelersCountNullBookingCountCondition =
        input.travelersCount !== undefined
          ? gte(trip.bookingsLimitCount, input.travelersCount)
          : undefined;

      const searchCondition =
        input.search !== undefined && input.search.length !== 0
          ? or(
              ilike(trip.titleEn, `%${input.search}%`),
              ilike(trip.titleRu, `%${input.search}%`),
              ilike(destination.nameEn, `%${input.search}%`),
              ilike(destination.nameRu, `%${input.search}%`),
              ilike(country.nameEn, `%${input.search}%`),
              ilike(country.nameRu, `%${input.search}%`),
            )
          : undefined;

      // ========= query itself =========
      const subquery = ctx.db
        .select({
          tripId: tripBooking.tripId,
          bookingCount: sum(tripBooking.travelersCount).as("booking_count"),
        })
        .from(tripBooking)
        .where(dateCondition)
        .groupBy(tripBooking.tripId)
        .as("bookings_count");

      // ========= depending on subquery condition =========
      const travelersCountNotNullBookingCountCondition =
        input.travelersCount !== undefined
          ? sql`${subquery.bookingCount} + ${input.travelersCount} <= ${trip.bookingsLimitCount}`
          : undefined;

      // ========= pagination control ==========
      const PAGE_SIZE = 6;
      const pageIndex = input.page ?? 0;

      return await ctx.db
        .select({
          id: trip.id,
          titleEn: trip.titleEn,
          titleRu: trip.titleRu,
          assets: trip.assetsUrls,
          type: trip.tripType,
          priceInCents: trip.tripPriceInCents,
          duration: trip.duration,
          isFeatured: trip.isFeatured,
          countryEn: country.nameEn,
          countryRu: country.nameRu,
          destinationEn: destination.nameEn,
          destinationRu: destination.nameRu,
          totalCount: count(),
        })
        .from(trip)
        .leftJoin(subquery, eq(trip.id, subquery.tripId))
        .innerJoin(destination, eq(trip.destinationId, destination.id))
        .innerJoin(country, eq(destination.countryId, country.id))
        .where(
          and(
            eq(trip.isAvailable, true),
            or(
              and(
                isNull(subquery.bookingCount),
                travelersCountNullBookingCountCondition,
              ),
              and(
                isNotNull(subquery.bookingCount),
                lte(subquery.bookingCount, trip.bookingsLimitCount),
                travelersCountNotNullBookingCountCondition,
              ),
            ),
            typeCondition,
            priceLowerCondition,
            priceGreaterCondition,
            destinationsCondition,
            countriesCondition,
            searchCondition,
          ),
        )
        .orderBy(trip.isFeatured)
        .limit(PAGE_SIZE)
        .offset(pageIndex * PAGE_SIZE)
        .then((result) => ({
          totalCount: result[0]?.totalCount ?? 0,
          items: result.map((item) => ({
            id: item.id,
            titleEn: item.titleEn,
            titleRu: item.titleRu,
            locationEn: `${item.countryEn}, ${item.destinationEn}`,
            locationRu: `${item.countryRu}, ${item.destinationRu}`,
            price: Math.floor(item.priceInCents / 100),
            type: item.type,
            duration: item.duration,
            isFeatured: item.isFeatured,
            image: mainImage(item.assets),
            reviewsValue: 4.7, // TODO: continue after finishing reviews
            reviewsCount: 128, // TODO: continue after finishing reviews
          })),
        }));
    }),
  view: publicProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.trip.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
        with: {
          destination: {
            with: {
              country: true,
            },
          },
          features: {
            with: {
              feature: true,
            },
          },
        },
      }),
  ),
});

interface A {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  features: string[];
  status: string;
  country: string;
  location: string;
  price: number;
  duration: number;
  rating: number;
  reviewCount: number;
}
