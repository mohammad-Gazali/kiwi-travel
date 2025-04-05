import { z } from "zod";

// TODO: add missing fields
export const tripFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleRu: z.string().min(1, "Russian title is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionRu: z.string().min(1, "Russian description is required"),
  longDescriptionEn: z.string().min(1, "English long description is required"),
  longDescriptionRu: z.string().min(1, "Russian long description is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  assets: z
    .array(z.string().url("Must be a valid URL"))
    .min(1, "At least one asset URL is required"),
  travelTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be in format HH:MM",
    ),
  status: z.enum(["available", "full", "ended"]),
  destinationId: z
    .number()
    .int()
    .positive("Destination ID must be a positive integer"),
  tripPriceInCents: z
    .number()
    .int()
    .positive("Price must be a positive integer"),
});

export type TripFormValues = z.infer<typeof tripFormSchema>;
