import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  index,
  timestamp,
  time,
} from "drizzle-orm/pg-core";
import { countries } from "./countries";

// TODO: handle availability dates for trips

export const trip = pgTable("trips", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  imagesUrls: text("images_urls").array().notNull(),
  travelTime: time("travel_time").notNull(),
  status: text("status", { enum: ["available", "full", "ended"] }).notNull(),
  countryId: integer("country_id")
    .notNull()
    .references(() => countries.id),
  tripPriceInCents: integer("trip_price_in_cents").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const tripBook = pgTable(
  "trip_books",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: text("user_id").notNull(),
    priceInCents: integer("price_in_cents").notNull(),
    tripId: integer("trip_id")
      .notNull()
      .references(() => trip.id),
		tripStartTime: timestamp("trip_start_time", { withTimezone: true }),
		status: text("status", { enum: ["pending", "cancelled", "done", "missed"] }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId),
  }),
);


// ======================== relations ========================
export const tripRelations = relations(trip, ({ many, one }) => ({
	books: many(trip),
  country: one(countries, {
    fields: [trip.countryId],
    references: [countries.id],
  }),
}));

export const tripBookRelations = relations(tripBook, ({ one }) => ({
  trip: one(trip, {
    fields: [tripBook.tripId],
    references: [trip.id],
  }),
}));
