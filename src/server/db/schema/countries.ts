import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
});