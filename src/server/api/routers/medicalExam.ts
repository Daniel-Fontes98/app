import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const medicalExamRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        date: z.string(),
        hour: z.string(),
        name: z.string(),
        description: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const company = await opts.ctx.prisma.medicalExams.create({
        data: {
          date: input.date,
          hour: input.hour,
          name: input.name,
          description: input.description,
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
