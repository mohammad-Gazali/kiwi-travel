import { pgTable } from "drizzle-orm/pg-core";

export const faq = pgTable("faqs", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  questionEn: c.text().notNull(),
  questionRu: c.text().notNull(),
  answerEn: c.text().notNull(),
  answerRu: c.text().notNull(),
}))