import { relations, sql } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";
import { trip } from "./trip";
import { review } from "./review";

export const tripBooking = pgTable(
  "trip_bookings",
  (c) => ({
    id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: c.text("user_id").notNull(),
    userPhone: c.text("user_phone").notNull(),
    priceInCents: c.integer("price_in_cents").notNull(),
    tripId: c.integer("trip_id")
      .notNull()
      .references(() => trip.id, { onDelete: "cascade" }),
    bookingDate: c.date("booking_date").notNull(),
    travelersCount: c.integer("travelers_count").notNull(),
    isSeenByAdmin: c.boolean("is_seen_by_admin").default(false),
    status: c.text("status", {
      enum: ["pending", "accepted", "cancelled", "done", "missed"],
    }).notNull(),
    createdAt: c.timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: c.timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  }),
  (t) => [
    index("user_id_idx").on(t.userId),
    index("booking_date_idx").on(t.bookingDate),
  ],
);

// ======================== relations ======================== 

export const tripBookRelations = relations(tripBooking, ({ one }) => ({
  review: one(review),
  trip: one(trip, {
    fields: [tripBooking.tripId],
    references: [trip.id],
  }),
}));