import { z } from "zod";

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export const tripTypes = [
  'adventure',
  'cultural',
  'beach',
  'nature',
  'road',
  'cruise',
  'wellness',
  'city',
  'food_wine',
  'volunteer',
  'family',
  'romantic',
  'solo',
  'eco_tourism',
  'festival',
] as const;


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
  tripType: z.enum(tripTypes, { message: "Trip type is required" }),
  duration: z.string().min(1, "Duration is required"),
  bookingsLimitCount: z.number({ message: "Bookings limit is required" }).int().positive("Bookings limit count must be a positive integer"),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  destinationId: z
    .number({ message: "Destination is required" })
    .int()
    .positive("Destination ID must be a positive integer"),
  price: z
    .number({ message: "Price is required" })
    .positive("Price must be a positive number"),
});

export const tripSearchFormSchema = z.object({
  search: z.string().optional(),
  date: z.date().min(new Date()).optional(),
  travelersCount: z.number().optional(),
  price: z.object({
    lower: z.number().optional(),
    greater: z.number().optional(),
  }).optional(),
  destinations: z.array(z.number()).optional(),
  countries: z.array(z.number()).optional(),
  type: z.array(z.enum(tripTypes)).optional(),
  page: z.number().optional(),
})

export type TripFormValues = z.infer<typeof tripFormSchema>;

export type TripSearchFormValues = z.infer<typeof tripSearchFormSchema>;

export type Day = typeof days[number];
