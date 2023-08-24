import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyAppointmentrouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        consultDate: z.string(),
        name: z.string(),
        gender: z.string().optional(),
        nacionality: z.string().optional(),
        birthDate: z.string(),
        idNumber: z.string().optional(),
        phoneNumber: z.string(),
        companyRole: z.string(),
        companyName: z.string(),
        companyIndustry: z.string(),
        companyLocation: z.string(),
        examType: z.string(),
        planType: z.string(),
        addInfo: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const admission = await opts.ctx.prisma.companyAppointment.create({
        data: {
          date: input.consultDate,
          examType: input.examType,
          planType: input.planType,
          companyRole: input.companyRole,
          location: input.companyLocation,
          user: {
            connectOrCreate: {
              create: {
                name: input.name,
                gender: input.gender,
                nacionality: input.nacionality,
                birthDate: input.birthDate,
                idNumber: input.idNumber,
                number: input.phoneNumber,
              },
              where: {
                name_number: {
                  name: input.name,
                  number: input.phoneNumber,
                },
              },
            },
          },
          company: {
            connectOrCreate: {
              create: {
                industry: input.companyIndustry,
                name: input.companyName,
              },
              where: {
                name: input.companyName,
              },
            },
          },
        },
      });
      return admission;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.admission.findMany();
  }),
});
