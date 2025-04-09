import { pgTable } from "drizzle-orm/pg-core";

export const faq = pgTable("faqs", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
}))