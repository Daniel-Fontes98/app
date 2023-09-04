import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const xRayRequisitionRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        examDescription: z.string(),
        isPrinted: z.boolean(),
        name: z.string(),
        birthDate: z.string(),
        idNumber: z.string(),
        company: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const xRayRequisition = await opts.ctx.prisma.xRayRequisition.create({
        data: {
          examDescription: input.examDescription,
          isPrinted: input.isPrinted,
          company: input.company,
          user: {
            connectOrCreate: {
              create: {
                name: input.name,
                birthDate: input.birthDate,
                idNumber: input.idNumber,
              },
              where: {
                idNumber: input.idNumber,
              },
            },
          },
        },
      });
      return xRayRequisition;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.xRayRequisition.findMany({
      include: {
        user: true,
      },
    });
  }),
  getAllByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.xRayRequisition.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          xRayObject: true,
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
      return await opts.ctx.prisma.xRayRequisition.findFirst({
        where: {
          id: input.id,
        },
        include: {
          xRayObject: true,
          user: true,
        },
      });
    }),
});
