import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  index,
  timestamp,
  time,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { destination } from "./destination";

export const trip = pgTable("trips", {
  id: integer("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleRu: text("title_ru").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionRu: text("description_ru").notNull(),
  longDescriptionEn: text("long_description_en").notNull(),
  longDescriptionRu: text("long_description_ru").notNull(),
  /**
   * each asset consists of this format:
   * `{url}?type=video` if video
   * `{url}?type=image` if image
   */
  assetsUrls: text("assets_urls").array().notNull(),
  travelTime: time("travel_time").notNull(),
  destinationId: integer("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "restrict" }),
  tripPriceInCents: integer("trip_price_in_cents").notNull(),
  isAvailable: boolean("is_available").notNull(),
  isFeatured: boolean("is_featured").notNull(),
  bookingsLimitCount: integer("bookings_limit_count").notNull(),
  duration: text("duration").notNull(),
  availableDays: text("available_days", {
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  })
    .array()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const tripBooking = pgTable(
  "trip_bookings",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: text("user_id").notNull(),
    priceInCents: integer("price_in_cents").notNull(),
    tripId: integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    tripStartTime: timestamp("trip_start_time", { withTimezone: true }),
    status: text("status", {
      enum: ["pending", "cancelled", "done", "missed"],
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => [index("user_id_idx").on(t.userId)],
);

export const tripFeature = pgTable("trip_features", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  contentEn: text("content_en").notNull(),
  contentRu: text("content_ru").notNull(),
});

export const tripToFeature = pgTable(
  "trip_to_feature",
  {
    tripId: integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    featureId: integer("feature_id")
      .notNull()
      .references(() => tripFeature.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.tripId, t.featureId] })],
);

// ======================== relations ========================
export const tripRelations = relations(trip, ({ many, one }) => ({
  bookings: many(trip),
  features: many(tripToFeature),
  destination: one(destination, {
    fields: [trip.destinationId],
    references: [destination.id],
  }),
}));

export const tripBookRelations = relations(tripBooking, ({ one }) => ({
  trip: one(trip, {
    fields: [tripBooking.tripId],
    references: [trip.id],
  }),
}));

export const tripToFeatureRelations = relations(tripToFeature, ({ one }) => ({
  feature: one(tripFeature, {
    fields: [tripToFeature.featureId],
    references: [tripFeature.id],
  }),
}));
