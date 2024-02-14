import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tbExamsRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        testResult: z.string(),
        testType: z.string(),
        fileLocation: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const tbExam = await opts.ctx.prisma.tbExam.create({
        data: {
          testResult: input.testResult,
          testType: input.testType,
          fileLocation: input.fileLocation,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
      });
      return tbExam;
    }),
  getAll: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.tbExam.findMany({
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
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.tbExam.findFirst({
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
        include: {
          tbCertificate: true,
        },
      });
    }),
});
