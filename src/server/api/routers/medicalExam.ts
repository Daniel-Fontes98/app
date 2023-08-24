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
        fileLocation: z.string().optional(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const exam = await opts.ctx.prisma.medicalExams.create({
        data: {
          date: input.date,
          hour: input.hour,
          name: input.name,
          fileLocation: input.fileLocation,
          description: input.description,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return exam;
    }),
});
