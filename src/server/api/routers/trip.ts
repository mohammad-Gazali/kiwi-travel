import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { tripFormSchema } from "@/validators/trip-schema";

export const tripRouter = createTRPCRouter({
  adminCreate: adminProcedure.input(tripFormSchema).mutation(({ input }) => {
    
  }),
})