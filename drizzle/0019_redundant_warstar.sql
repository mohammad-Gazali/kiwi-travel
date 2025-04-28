ALTER TABLE "confirm_notifications" DROP CONSTRAINT "confirm_notifications_trip_id_trips_id_fk";
--> statement-breakpoint
ALTER TABLE "confirm_notifications" DROP COLUMN "trip_id";