import { z } from "zod";

export const tripFeatureFormSchema = z.object({
  contentEn: z.string().min(1, "English content is required"),
  contentRu: z.string().min(1, "Russian content is required")
})

export type TripFeatureFormValues = z.infer<typeof tripFeatureFormSchema>;