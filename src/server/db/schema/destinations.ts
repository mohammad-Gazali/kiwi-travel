import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const destinations = pgTable("destinations", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: text("nameEn").notNull(),
  nameRu: text("nameRu").notNull(),
});