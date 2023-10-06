import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const riskFactorsRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        pregnantHowMany: z.string().optional(),
        tobaccoAmount: z.string().optional(),
        alcoholAmount: z.string().optional(),
        hospitalizedWhen: z.string().optional(),
        visitedDoctorWhen: z.string().optional(),
        surgeryWhen: z.string().optional(),
        companyAppointmentId: z.string(),
        badReactionWhen: z.string().optional(),
        allergicReactionCause: z.string().optional(),
        otherAllergicReactionsWhichOnes: z.string().optional(),
        takeMedicineName: z.string().optional(),
        takeMedicineDose: z.string().optional(),
        takeMedicineAmountDaily: z.string().optional(),
        takeMedicineReason: z.string().optional(),
        clinicExam: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.riskFactors.upsert({
        create: {
          pregnantHowMany: input.pregnantHowMany,
          tobaccoAmount: input.tobaccoAmount,
          alcoholAmount: input.alcoholAmount,
          hospitalizedWhen: input.hospitalizedWhen,
          visitedDoctorWhen: input.visitedDoctorWhen,
          surgeryWhen: input.surgeryWhen,
          badReactionWhen: input.badReactionWhen,
          allergicReactionCause: input.allergicReactionCause,
          otherAllergicReactionsWhichOnes:
            input.otherAllergicReactionsWhichOnes,
          takeMedicineName: input.takeMedicineName,
          takeMedicineDose: input.takeMedicineDose,
          takeMedicineAmountDaily: input.takeMedicineAmountDaily,
          takeMedicineReason: input.takeMedicineReason,
          clinicExam: input.clinicExam,
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
          pregnantHowMany: input.pregnantHowMany,
          tobaccoAmount: input.tobaccoAmount,
          alcoholAmount: input.alcoholAmount,
          hospitalizedWhen: input.hospitalizedWhen,
          visitedDoctorWhen: input.visitedDoctorWhen,
          surgeryWhen: input.surgeryWhen,
          badReactionWhen: input.badReactionWhen,
          allergicReactionCause: input.allergicReactionCause,
          otherAllergicReactionsWhichOnes:
            input.otherAllergicReactionsWhichOnes,
          takeMedicineName: input.takeMedicineName,
          takeMedicineDose: input.takeMedicineDose,
          takeMedicineAmountDaily: input.takeMedicineAmountDaily,
          takeMedicineReason: input.takeMedicineReason,
          clinicExam: input.clinicExam,
        },
      });
    }),
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.riskFactors.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        include: {
          riskFactorsFields: true,
        },
      });
    }),
});
