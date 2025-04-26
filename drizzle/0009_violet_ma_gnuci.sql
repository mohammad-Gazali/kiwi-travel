ALTER TABLE "reviews" ALTER COLUMN "ratingValue" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_image_url" text;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "user_full_name" text;