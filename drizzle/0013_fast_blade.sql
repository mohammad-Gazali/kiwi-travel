ALTER TABLE "reviews" RENAME COLUMN "ratingValue" TO "rating_value";--> statement-breakpoint
ALTER TABLE "trip_bookings" ADD COLUMN "is_seen_by_admin" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "is_hidden_by_admin" boolean DEFAULT false;