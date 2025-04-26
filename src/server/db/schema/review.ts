import { pgTable } from "drizzle-orm/pg-core";
import { tripBooking } from "./trip-booking";
import { relations, sql } from "drizzle-orm";

export const review = pgTable("reviews", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  tripBookingId: c
    .integer("trip_booking_id")
    .notNull()
    .references(() => tripBooking.id, { onDelete: "cascade" }),
  userId: c.text("user_id").notNull(),
  userEmail: c.text("user_email").notNull(),
  userImageUrl: c.text("user_image_url"),
  userFullName: c.text("user_full_name"),
  message: c.text("message").notNull(),
  ratingValue: c.integer().notNull(),
  createdAt: c
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

// ======================== relations ========================
export const reviewRelations = relations(review, ({ one }) => ({
  tripBooking: one(tripBooking, {
    fields: [review.tripBookingId],
    references: [tripBooking.id],
  }),
}));
