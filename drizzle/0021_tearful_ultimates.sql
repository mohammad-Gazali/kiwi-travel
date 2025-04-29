ALTER TABLE "confirm_notifications" ALTER COLUMN "is_shown" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "is_confirmation_required" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_bookings" ALTER COLUMN "is_seen_by_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "is_hidden_by_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "review_notifications" ALTER COLUMN "is_shown" SET NOT NULL;