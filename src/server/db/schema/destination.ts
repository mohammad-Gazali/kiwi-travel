import { relations } from "drizzle-orm"
import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const country = pgTable("contries", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: text("name_en").notNull(),
  nameRu: text("name_ru").notNull(),
});

export const destination = pgTable("destinations", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: text("name_en").notNull(),
  nameRu: text("name_ru").notNull(),
  country: integer("country_id")
    .notNull()
    .references(() => country.id),
});


// ======================== relations ========================
export const countryRelations = relations(country, ({ many }) => ({
  destinations: many(country),
}));

export const destinationRelations = relations(destination, ({ one }) => ({
  country: one(country, {
    fields: [destination.country],
    references: [country.id],
  }),
}))