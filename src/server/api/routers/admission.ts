import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const admissionRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        entryDate: z.string(),
        entryTime: z.string(),
        bedNumber: z.string(),
        emergencyConsultId: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const admission = await opts.ctx.prisma.admission.create({
        data: {
          entryDate: input.entryDate,
          entryHour: input.entryTime,
          bedNumber: input.bedNumber,
          description: input.description,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return admission;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.admission.findMany();
  }),
});
