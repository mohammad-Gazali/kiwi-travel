import { sql, relations } from "drizzle-orm";
import { index, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { destination } from "./destination";

export const trip = pgTable("trips", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  titleEn: c.text("title_en").notNull(),
  titleRu: c.text("title_ru").notNull(),
  descriptionEn: c.text("description_en").notNull(),
  descriptionRu: c.text("description_ru").notNull(),
  longDescriptionEn: c.text("long_description_en").notNull(),
  longDescriptionRu: c.text("long_description_ru").notNull(),
  /**
   * each asset consists of this format:
   * `{url}?type=video` if video
   * `{url}?type=image` if image
   */
  assetsUrls: c.text("assets_urls").array().notNull(),
  travelTime: c.time("travel_time").notNull(),
  destinationId: c.integer("destination_id")
    .notNull()
    .references(() => destination.id, { onDelete: "restrict" }),
  tripPriceInCents: c.integer("trip_price_in_cents").notNull(),
  isAvailable: c.boolean("is_available").notNull(),
  isFeatured: c.boolean("is_featured").notNull(),
  bookingsLimitCount: c.integer("bookings_limit_count").notNull(),
  duration: c.text("duration").notNull(),
  availableDays: c.text("available_days", {
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
  createdAt: c.timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: c.timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
}));

export const tripBooking = pgTable(
  "trip_bookings",
  (c) => ({
    id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: c.text("user_id").notNull(),
    priceInCents: c.integer("price_in_cents").notNull(),
    tripId: c.integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    tripStartTime: c.timestamp("trip_start_time", { withTimezone: true }),
    status: c.text("status", {
      enum: ["pending", "cancelled", "done", "missed"],
    }),
    createdAt: c.timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: c.timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  }),
  (t) => [index("user_id_idx").on(t.userId)],
);

export const tripFeature = pgTable("trip_features", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  contentEn: c.text("content_en").notNull(),
  contentRu: c.text("content_ru").notNull(),
}));

export const tripToFeature = pgTable(
  "trip_to_feature",
  (c) => ({
    tripId: c.integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    featureId: c.integer("feature_id")
      .notNull()
      .references(() => tripFeature.id, { onDelete: "cascade" }),
  }),
  (t) => [primaryKey({ columns: [t.tripId, t.featureId] })],
);

// ======================== relations ========================
export const tripRelations = relations(trip, ({ many, one }) => ({
  bookings: many(tripBooking),
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
  trip: one(trip, {
    fields: [tripToFeature.tripId],
    references: [trip.id],
  })
}));
