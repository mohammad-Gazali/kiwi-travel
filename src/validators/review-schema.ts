import { z } from "zod";

export const ratingValues = [1, 2, 3, 4, 5] as const;

export const addReviewFormSchema = z.object({
  bookingId: z.number(),
  message: z.string().min(1, "message is required"),
  ratingValue: z
    .number({
      required_error: "rating is required",
    })
    .int()
    .refine(
      (rating) => ratingValues.includes(rating as any),
      "rating must be between 1 and 5",
    ),
});
