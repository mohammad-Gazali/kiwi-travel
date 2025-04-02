import { integer, pgTable } from "drizzle-orm/pg-core";

export const faq = pgTable("faqs", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
})