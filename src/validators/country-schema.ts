import { z } from "zod";

export const countryFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
})

export type CountryFormValues = z.infer<typeof countryFormSchema>;