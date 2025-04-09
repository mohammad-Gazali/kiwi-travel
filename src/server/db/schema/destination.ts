import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core";

export const country = pgTable("contries", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: c.text("name_en").notNull(),
  nameRu: c.text("name_ru").notNull(),
}));

export const destination = pgTable("destinations", (c) => ({
  id: c.integer("id").primaryKey().generatedByDefaultAsIdentity(),
  nameEn: c.text("name_en").notNull(),
  nameRu: c.text("name_ru").notNull(),
  imageUrl: c.text("image_url").notNull(),
  isPopular: c.boolean("is_popular").notNull(),
  country: c.integer("country_id")
    .notNull()
    .references(() => country.id, { onDelete: "restrict" }),
}));


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