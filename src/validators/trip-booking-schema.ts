import { z } from "zod";

// TODO: translate error messages

export const tripBookingFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  travelersCount: z
    .number({
      required_error: "Please select number of travelers",
    })
    .min(1, "At least 1 traveler is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+?(\d{1,3}))?[-. (]*([\d]{1,14})(?:[-. ]*([\d]{1,14}))?(?:[-. ]*([\d]{1,14}))?(?: *x(\d+))?$/,
      "Please enter a valid phone number",
    ),
});

export type TripBookingFormValues = z.infer<typeof tripBookingFormSchema>