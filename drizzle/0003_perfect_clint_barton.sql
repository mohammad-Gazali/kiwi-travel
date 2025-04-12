ALTER TABLE "trip_bookings" RENAME COLUMN "trip_start_time" TO "trip_start_date";--> statement-breakpoint
ALTER TABLE "trip_bookings" ADD COLUMN "travelers_count" integer NOT NULL;