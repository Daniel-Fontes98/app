import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyAppointmentMedicalFileRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        app: z.string().optional(),
        apf: z.string().optional(),
        etilicHabits: z.string().optional(),
        tobaccoHabits: z.string().optional(),
        surgerys: z.string().optional(),
        allergys: z.string().optional(),
        admissions: z.string().optional(),
        epis: z.string().optional(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const medicalFile =
        await opts.ctx.prisma.companyAppointmentMedicalFile.upsert({
          create: {
            app: input.app,
            apf: input.apf,
            etilicHabits: input.etilicHabits,
            tobaccoHabits: input.tobaccoHabits,
            surgerys: input.surgerys,
            allergys: input.allergys,
            admissions: input.admissions,
            epis: input.epis,
            companyAppointment: {
              connect: {
                id: input.companyAppointmentId,
              },
            },
          },
          update: {
            app: input.app,
            apf: input.apf,
            etilicHabits: input.etilicHabits,
            tobaccoHabits: input.tobaccoHabits,
            surgerys: input.surgerys,
            allergys: input.allergys,
            admissions: input.admissions,
            epis: input.epis,
          },
          where: {
            companyAppointmentId: input.companyAppointmentId,
          },
        });
      return medicalFile;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.companyAppointmentMedicalFile.findMany();
  }),
});
