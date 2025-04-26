ALTER TABLE "reviews" ADD COLUMN "trip_booking_id" integer;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "message" text;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "ratingValue" integer;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "updated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_trip_booking_id_trip_bookings_id_fk" FOREIGN KEY ("trip_booking_id") REFERENCES "public"."trip_bookings"("id") ON DELETE cascade ON UPDATE no action;