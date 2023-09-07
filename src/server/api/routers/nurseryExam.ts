import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const nurseryExamRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        examName: z.string(),
        addInfo: z.string().optional(),
        fileLocation: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const nurseryExam = await opts.ctx.prisma.nurseryExam.create({
        data: {
          examName: input.examName,
          addInfo: input.addInfo,
          fileLocation: input.fileLocation,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
      });
      return nurseryExam;
    }),
  getAll: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.nurseryExam.findMany({
      include: {
        companyAppointment: {
          include: {
            user: true,
            company: true,
          },
        },
      },
    });
  }),
});
