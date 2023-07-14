import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const medicalItemRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const company = await opts.ctx.prisma.medicalItems.create({
        data: {
          name: input.name,
          quantity: input.quantity,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return company;
    }),
});
