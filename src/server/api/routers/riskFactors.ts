import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const riskFactorsRouter = createTRPCRouter({
  getByIdPhaseThree: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.riskFactors.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        select: {
          isPregnant: true,
          isSmoking: true,
          isDrinking: true,
          doesDrugs: true,
          wasHospitalized: true,
          wentToDoctor: true,
          didSurgery: true,
          pregnantHowMany: true,
          tobaccoAmount: true,
          alcoholAmount: true,
          hospitalizedWhen: true,
          visitedDoctorWhen: true,
          surgeryWhen: true,
        },
      });
    }),
  insertOrUpdatePhaseThree: publicProcedure
    .input(
      z.object({
        isPregnant: z.string(),
        isSmoking: z.string(),
        isDrinking: z.string(),
        doesDrugs: z.string(),
        wasHospitalized: z.string(),
        wentToDoctor: z.string(),
        didSurgery: z.string(),
        pregnantHowMany: z.string().optional(),
        tobaccoAmount: z.string().optional(),
        alcoholAmount: z.string().optional(),
        hospitalizedWhen: z.string().optional(),
        visitedDoctorWhen: z.string().optional(),
        surgeryWhen: z.string().optional(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { companyAppointmentId, ...createData } = input;
      return await opts.ctx.prisma.riskFactors.upsert({
        create: {
          ...createData,
          companyAppointment: {
            connect: {
              id: companyAppointmentId,
            },
          },
        },
        update: {
          ...createData,
        },
        where: {
          companyAppointmentId: companyAppointmentId,
        },
      });
    }),

  getByIdPhaseFour: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.riskFactors.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        select: {
          id: true,
          everHadBadReaction: true,
          everHadAllergicReaction: true,
          isTakingMedicine: true,
          badReactionWhen: true,
          allergicReactionCause: true,
          otherAllergicReactionsWhichOnes: true,
          takeMedicineName: true,
          takeMedicineDose: true,
          takeMedicineAmountDaily: true,
          takeMedicineReason: true,
          allergies: true,
        },
      });
    }),
  updatePhaseFour: publicProcedure
    .input(
      z.object({
        everHadBadReaction: z.string(),
        everHadAllergicReaction: z.string(),
        isTakingMedicine: z.string(),
        badReactionWhen: z.string().optional(),
        allergicReactionCause: z.string().optional(),
        otherAllergicReactionsWhichOnes: z.string().optional(),
        takeMedicineName: z.string().optional(),
        takeMedicineDose: z.string().optional(),
        takeMedicineAmountDaily: z.string().optional(),
        takeMedicineReason: z.string().optional(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { companyAppointmentId, ...createData } = input;
      return await opts.ctx.prisma.riskFactors.update({
        data: {
          ...createData,
        },
        where: {
          companyAppointmentId: companyAppointmentId,
        },
      });
    }),

  getByIdPhaseFive: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.riskFactors.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        select: {
          id: true,
          isPersistentCoughing: true,
          isNightSweats: true,
          isWeightLoss: true,
          isDonatedBlood: true,
        },
      });
    }),
  updatePhaseFive: publicProcedure
    .input(
      z.object({
        isPersistentCoughing: z.string(),
        isNightSweats: z.string(),
        isWeightLoss: z.string(),
        isDonatedBlood: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { companyAppointmentId, ...createData } = input;
      return await opts.ctx.prisma.riskFactors.update({
        data: {
          ...createData,
        },
        where: {
          companyAppointmentId: companyAppointmentId,
        },
      });
    }),

  getByIdPhaseSix: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      return await opts.ctx.prisma.riskFactors.findFirst({
        where: { companyAppointmentId: opts.input.companyAppointmentId },
        select: {
          id: true,
          isLoudWork: true,
          isVibratingMachine: true,
          isWelding: true,
          isConfinedWorkspace: true,
          isHeightWork: true,
          isAirplaneTravelling: true,
          isHelicopterTravelling: true,
          isFastCrewBoat: true,
          isSubmarineDive: true,
          isChemicalSubstances: true,
          isManualElevations: true,
          isOfficeWork: true,
          isHotWork: true,
          isFoodHandler: true,
          isFirstAid: true,
        },
      });
    }),

  updatePhaseSix: publicProcedure
    .input(
      z.object({
        isLoudWork: z.string(),
        isVibratingMachine: z.string(),
        isWelding: z.string(),
        isConfinedWorkspace: z.string(),
        isHeightWork: z.string(),
        isAirplaneTravelling: z.string(),
        isHelicopterTravelling: z.string(),
        isFastCrewBoat: z.string(),
        isSubmarineDive: z.string(),
        isChemicalSubstances: z.string(),
        isManualElevations: z.string(),
        isOfficeWork: z.string(),
        isHotWork: z.string(),
        isFoodHandler: z.string(),
        isFirstAid: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { companyAppointmentId, ...createData } = input;
      return await opts.ctx.prisma.riskFactors.update({
        data: {
          ...createData,
        },
        where: {
          companyAppointmentId: companyAppointmentId,
        },
      });
    }),
});
