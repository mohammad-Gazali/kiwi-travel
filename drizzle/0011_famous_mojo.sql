ALTER TABLE "reviews" ALTER COLUMN "trip_booking_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "updated_at";