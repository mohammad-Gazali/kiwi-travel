import { z } from "zod";

export const destinationFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameRu: z.string().min(1, "Russian name is required"),
  imageUrl: z.string().url("Must be a valid URL").min(1, "Image is required"),
  isPopular: z.boolean().default(false),
  country: z.number({ message: "Country is required" }).int().positive(),
});

export type DestinationFormValues = z.infer<typeof destinationFormSchema>;