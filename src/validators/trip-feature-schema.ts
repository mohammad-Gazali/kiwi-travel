import { z } from "zod";

export const tripFeatureSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameRu: z.string().min(1, "Russian name is required")
})

export type TripFeatureFormValues = z.infer<typeof tripFeatureSchema>;