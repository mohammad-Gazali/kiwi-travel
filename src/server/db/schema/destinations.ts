import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const destinations = pgTable("destinations", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
});