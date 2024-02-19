import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const labExamsRouter = createTRPCRouter({
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
      const labExams = await opts.ctx.prisma.labExams.create({
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
      return labExams;
    }),
  getAll: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.labExams.findMany({
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
  removeByCompanyId: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.labExams.deleteMany({
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });
    }),
});
