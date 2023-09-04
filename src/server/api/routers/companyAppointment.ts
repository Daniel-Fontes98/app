import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyAppointmentrouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.string(),
        examType: z.string(),
        companyRole: z.string(),
        planType: z.string(),
        consultDate: z.date(),
        phoneNumber: z.string(),
        companyName: z.string(),
        companyIndustry: z.string(),
        companyLocation: z.string(),
        gender: z.string().optional(),
        nacionality: z.string().optional(),
        idNumber: z.string().optional(),
        addInfo: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const companyAppointment =
        await opts.ctx.prisma.companyAppointment.create({
          data: {
            date: input.consultDate,
            examType: input.examType,
            planType: input.planType,
            companyRole: input.companyRole,
            location: input.companyLocation,
            addInfo: input.addInfo,
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
      return companyAppointment;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.companyAppointment.findMany();
  }),
  getAllByDate: publicProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return opts.ctx.prisma.companyAppointment.findMany({
        where: {
          AND: [
            {
              date: {
                lt: new Date(
                  input.date.getFullYear(),
                  input.date.getMonth(),
                  input.date.getDate() + 1
                ),
              },
            },
            {
              date: {
                gt: new Date(
                  input.date.getFullYear(),
                  input.date.getMonth(),
                  input.date.getDate()
                ),
              },
            },
          ],
        },
        include: {
          company: true,
          user: true,
        },
      });
    }),
});
