import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { faq } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { faqFormSchema } from "@/validators/faq-schema";

export const faqRouter = createTRPCRouter({
  list: publicProcedure.query(
    async ({ ctx }) => await ctx.db.query.faq.findMany(),
  ),
  adminView: adminProcedure.input(z.number().int()).query(
    async ({ ctx, input }) =>
      await ctx.db.query.faq.findFirst({
        where: ({ id }, { eq }) => eq(id, input),
      }),
  ),
  adminDelete: adminProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(faq).where(eq(faq.id, input));

      return {
        message: "Deleted Successfully",
      };
    }),
  adminCreate: adminProcedure
    .input(faqFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(faq).values(input);

      return {
        message: "Created successfully",
      };
    }),
  adminUpdate: adminProcedure
    .input(faqFormSchema.extend({ id: z.number().int() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.update(faq).set(input).where(eq(faq.id, input.id));

      return {
        message: "Updated successfully",
      };
    }),
});
