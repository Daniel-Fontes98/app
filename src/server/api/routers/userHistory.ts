import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userHistoryRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        cancerType: z.string().optional(),
        dateOfCancerDiagnostic: z.string().optional(),
        dateOfEndCancerTreatment: z.string().optional(),
        psychicPatologyType: z.string().optional(),
        otherMedicalHistory: z.string().optional(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const userHistory = await opts.ctx.prisma.userHistory.upsert({
        create: {
          cancerType: input.cancerType,
          dateOfCancerDiagnostic: input.dateOfCancerDiagnostic,
          dateOfEndCancerTreatment: input.dateOfEndCancerTreatment,
          psychicPatologyType: input.psychicPatologyType,
          otherMedicalHistory: input.otherMedicalHistory,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
        update: {
          cancerType: input.cancerType,
          dateOfCancerDiagnostic: input.dateOfCancerDiagnostic,
          dateOfEndCancerTreatment: input.dateOfEndCancerTreatment,
          psychicPatologyType: input.psychicPatologyType,
          otherMedicalHistory: input.otherMedicalHistory,
        },
      });
      return userHistory;
    }),
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.userHistory.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        include: {
          userHistoryFields: true,
        },
      });
    }),
});
