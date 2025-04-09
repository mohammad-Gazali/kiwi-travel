import { pgTable } from "drizzle-orm/pg-core";

export const review = pgTable("reviews", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
}))