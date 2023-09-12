import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const triageRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        arterialTension: z.string(),
        pulse: z.string(),
        weight: z.string(),
        height: z.string(),
        temperature: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const triage = await opts.ctx.prisma.triage.upsert({
        create: {
          arterialTension: input.arterialTension,
          pulse: input.pulse,
          weight: input.weight,
          height: input.height,
          temperature: input.temperature,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
        update: {
          arterialTension: input.arterialTension,
          pulse: input.pulse,
          weight: input.weight,
          height: input.height,
          temperature: input.temperature,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });
      return triage;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.triage.findMany();
  }),
  getByCompanyAppointmentId: publicProcedure
    .input(
      z.object({
        companyAppointmentId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.triage.findFirst({
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });
    }),
});
