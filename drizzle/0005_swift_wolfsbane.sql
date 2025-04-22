ALTER TABLE "trip_bookings" ADD COLUMN "user_phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_bookings" ADD COLUMN "booking_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_bookings" DROP COLUMN "trip_start_date";