import { z } from "zod";

export const faqFormSchema = z.object({
  questionEn: z.string().min(1, "English Question is required"),
  questionRu: z.string().min(1, "Russian Question is required"),
  answerEn: z.string().min(1, "English Answer is required"),
  answerRu: z.string().min(1, "Russian Answer is required"),
})

export type FAQFormValues = z.infer<typeof faqFormSchema>;