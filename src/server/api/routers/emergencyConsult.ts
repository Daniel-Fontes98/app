import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emergencyConsultRouter = createTRPCRouter({
  createConsult: publicProcedure
    .input(
      z.object({
        entryDate: z.string(),
        entryTime: z.string(),
        name: z.string(),
        idNumber: z.string().optional(),
        birthDate: z.string(),
        gender: z.string(),
        nacionality: z.string(),
        number: z.string(),
        email: z.string().optional(),
        address: z.string().optional(),
        insuranceName: z.string(),
        insuranceNumber: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const newConsult = await opts.ctx.prisma.emergencyConsult.create({
        data: {
          entryDate: input.entryDate,
          entryTime: input.entryTime,
          user: {
            connectOrCreate: {
              where: {
                name_number: {
                  name: input.name,
                  number: input.number,
                },
              },
              create: {
                name: input.name,
                birthDate: input.birthDate,
                gender: input.gender,
                nacionality: input.nacionality,
                number: input.number,
                idNumber: input.idNumber,
                email: input.email,
                address: input.address,
              },
            },
          },
          insurance: {
            create: {
              name: input.insuranceName,
              idNumber: input.insuranceNumber,
            },
          },
        },
      });
      return newConsult;
    }),
  getAll: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.emergencyConsult.findMany({
      include: {
        user: true,
        medicalItems: true,
        medicalExams: true,
        admission: true,
        insurance: true,
        emergencyTriage: true,
        emergencyTransfer: true,
        medicalFile: true,
        nurseFile: true,
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
      return await opts.ctx.prisma.emergencyConsult.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          medicalItems: true,
          medicalExams: true,
          admission: {
            include: {
              emergencyMeals: true,
            },
          },
          medicalFile: true,
          nurseFile: true,
          insurance: true,
          emergencyTriage: true,
          release: true,
          emergencyTransfer: true,
          terapeutic: {
            include: {
              appliedTerapeutic: true,
            },
          },
        },
      });
    }),
  getAllAwaitingTriage: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.emergencyConsult.findMany({
      where: {
        emergencyTriage: null,
      },
      include: {
        user: true,
      },
    });
  }),
  getAllWithTriage: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.emergencyConsult.findMany({
      where: {
        NOT: {
          emergencyTriage: null,
        },
        emergencyTransfer: null,
        release: null,
      },
      include: {
        user: true,
        medicalItems: true,
        medicalExams: true,
        admission: true,
        insurance: true,
        emergencyTriage: true,
      },
    });
  }),
  getAllNotPayed: publicProcedure.query(async (opts) => {
    return await opts.ctx.prisma.emergencyConsult.findMany({
      where: {
        isPaid: false,
      },
      include: {
        user: true,
      },
    });
  }),
  payDebt: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.emergencyConsult.update({
        where: {
          id: input.id,
        },
        data: {
          isPaid: true,
        },
      });
    }),
});
