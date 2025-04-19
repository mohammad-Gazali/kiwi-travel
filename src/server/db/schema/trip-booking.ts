import { relations, sql } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";
import { trip } from "./trip";

export const tripBooking = pgTable(
  "trip_bookings",
  (c) => ({
    id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: c.text("user_id").notNull(),
    priceInCents: c.integer("price_in_cents").notNull(),
    tripId: c.integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    tripStartDate: c.date("trip_start_date"),
    travelersCount: c.integer("travelers_count").notNull(),
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

// ======================== relations ======================== 

export const tripBookRelations = relations(tripBooking, ({ one }) => ({
  trip: one(trip, {
    fields: [tripBooking.tripId],
    references: [trip.id],
  }),
}));