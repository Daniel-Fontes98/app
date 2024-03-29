import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyAppointmentrouter = createTRPCRouter({
  markTriageFilled: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          isTriageFilled: true,
        },
        where: {
          id: opts.input.id,
        },
      });
    }),
  markHistoryFilled: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          isHistoryFilled: true,
        },
        where: {
          id: opts.input.id,
        },
      });
    }),
  getAllArchived: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.companyAppointment.findMany({
      where: {
        isArquived: true,
      },
      include: {
        user: true,
        company: true,
        certificate: true,
      },
    });
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.string(),
        examType: z.string().optional(),
        companyRole: z.string().optional(),
        planType: z.string().optional(),
        consultDate: z.date(),
        phoneNumber: z.string(),
        companyName: z.string(),
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
                  name: input.name.toUpperCase(),
                  gender: input.gender,
                  nacionality: input.nacionality,
                  birthDate: input.birthDate,
                  idNumber: input.idNumber,
                  number: input.phoneNumber,
                },
                where: {
                  name_number: {
                    name: input.name.toUpperCase(),
                    number: input.phoneNumber,
                  },
                },
              },
            },
            company: {
              connect: {
                name: input.companyName.toUpperCase(),
              },
            },
          },
        });
      return companyAppointment;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.companyAppointment.findMany({
      include: {
        user: true,
        company: true,
        certificate: true,
        triage: true,
        medicalFile: true,
      },
    });
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
  getByIdUserHematology: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          Hematologia: true,
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
        planType: z.string(),
        date: z.date(),
        hasTbCertificate: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const lastArrivedPerson = await opts.ctx.prisma.companyAppointment.count({
        where: {
          wasPresent: true,
          date: {
            equals: input.date,
          },
        },
      });
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          companyRole: input.companyRole,
          planType: input.planType,
          wasPresent: true,
          presentAt: new Date(),
          orderOfPresence: lastArrivedPerson + 1,
          hasTbCertificate: input.hasTbCertificate,
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
  updateById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        nacionality: z.string(),
        birthDate: z.string(),
        idNumber: z.string(),
        number: z.string(),
        companyRole: z.string(),
        planType: z.string(),
        hasTbCertificate: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          companyRole: input.companyRole,
          planType: input.planType,
          hasTbCertificate: input.hasTbCertificate,
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
        tbExams: true,
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
        certificate: true,
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
  setTbExamToAttached: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        where: {
          id: input.id,
        },
        data: {
          isTbExamAttached: true,
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
  updateByIdCertificateForm: publicProcedure
    .input(
      z.object({
        companyAppointmentId: z.string(),
        name: z.string(),
        birthDate: z.string(),
        gender: z.string(),
        weight: z.string(),
        height: z.string(),
        companyName: z.string(),
        role: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          user: {
            update: {
              name: input.name,
              birthDate: input.birthDate,
              gender: input.gender,
            },
          },
          companyRole: input.role,
          company: {
            update: {
              name: input.companyName,
            },
          },
          userHistory: {
            connectOrCreate: {
              create: {},
              where: {
                companyAppointmentId: input.companyAppointmentId,
              },
            },
          },
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
  markAsPending: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          isPendingConsult: true,
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
  markLabExamsIncomplete: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          areLabExamsDone: false,
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
  markNurseryExamsIncomplete: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.companyAppointment.update({
        data: {
          areNurseryExamsDone: false,
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
  createHematologia: publicProcedure
    .input(
      z.object({
        companyAppointmentId: z.string(),
        hematologia: z.array(
          z.object({
            parametro: z.string(),
            resultado: z.number(),
            intervaloInferior: z.number(),
            intervaloSuperior: z.number(),
            unidade: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const definedAlerts = input.hematologia.map((result) => {
        if (result.resultado < result.intervaloInferior)
          return { ...result, alert: "L" };
        if (result.resultado > result.intervaloSuperior)
          return { ...result, alert: "H" };
        return result;
      });

      return await ctx.prisma.companyAppointment.update({
        data: {
          Hematologia: {
            create: definedAlerts,
          },
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
  getUserName: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.companyAppointment.findFirst({
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: input.companyAppointmentId,
        },
      });
    }),
});
