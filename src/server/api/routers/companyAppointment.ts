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
      return await opts.ctx.prisma.companyAppointment.findMany({
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
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.findFirst({
        where: {
          id: input.id,
        },
        include: {
          company: true,
          user: true,
          triage: true,
          labExams: true,
          nurseryExams: true,
          medicalFile: true,
        },
      });
    }),
  updateByIdAndMarkPresent: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        nacionality: z.string(),
        birthDate: z.string(),
        idNumber: z.string(),
        number: z.string(),
        companyRole: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const lastArrivedPerson = await opts.ctx.prisma.companyAppointment.count({
        where: {
          wasPresent: true,
        },
      });
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          companyRole: input.companyRole,
          wasPresent: true,
          presentAt: new Date(),
          orderOfPresence: lastArrivedPerson + 1,
          user: {
            update: {
              name: input.name,
              nacionality: input.nacionality,
              birthDate: input.birthDate,
              idNumber: input.idNumber,
              number: input.number,
            },
          },
        },
      });
    }),
  getAllAwaitingNursery: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.companyAppointment.findMany({
      where: {
        wasPresent: true,
        areNurseryExamsDone: false,
      },
      include: {
        user: true,
        company: true,
        nurseryExams: true,
      },
    });
  }),
  getAllAwaitingLab: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.companyAppointment.findMany({
      where: {
        wasPresent: true,
        areLabExamsDone: false,
      },
      include: {
        user: true,
        company: true,
        labExams: true,
      },
    });
  }),
  getAllAwaitingDoctor: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.companyAppointment.findMany({
      where: {
        areLabExamsDone: true,
        areNurseryExamsDone: true,
        isArquived: false,
      },
      include: {
        user: true,
        company: true,
        labExams: true,
        nurseryExams: true,
      },
    });
  }),
  setNurseryExamsToDone: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          areNurseryExamsDone: true,
        },
      });
    }),
  setLabExamsToDone: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          areLabExamsDone: true,
        },
      });
    }),
  setIsArquived: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          isArquived: true,
        },
      });
    }),
});
