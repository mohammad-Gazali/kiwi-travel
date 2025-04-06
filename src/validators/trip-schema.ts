import { z } from "zod";

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export const tripFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleRu: z.string().min(1, "Russian title is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionRu: z.string().min(1, "Russian description is required"),
  longDescriptionEn: z.string().min(1, "English long description is required"),
  longDescriptionRu: z.string().min(1, "Russian long description is required"),
  features: z.array(z.number().int()).min(1, "At least one feature is required"),
  assets: z
    .array(z.string().url("Must be a valid URL"))
    .min(1, "At least one asset URL is required"),
  travelTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be in format HH:MM",
    ),
  availableDays: z.array(z.enum(days)).min(1, "At least one day must be an available day"),
  duration: z.string().min(1, "Duration is required"),
  bookingsLimitCount: z.number().int().positive("Bookings limit count must be a positive integer"),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  destinationId: z
    .number({ message: "Destination is required" })
    .int()
    .positive("Destination ID must be a positive integer"),
  price: z
    .number()
    .positive("Price must be a positive number"),
});

export type TripFormValues = z.infer<typeof tripFormSchema>;

export type Day = typeof days[number];
