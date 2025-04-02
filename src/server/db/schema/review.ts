import { integer, pgTable } from "drizzle-orm/pg-core";

export const review = pgTable("reviews", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
})