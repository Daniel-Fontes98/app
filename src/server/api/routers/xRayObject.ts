import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const xRayObjectRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        fileLocation: z.string(),
        addInfo: z.string().optional(),
        xRayRequisitionId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const xRayObject = await opts.ctx.prisma.xRayObject.create({
        data: {
          fileLocation: input.fileLocation,
          addInfo: input.addInfo,
          xRayRequisition: {
            connect: {
              id: input.xRayRequisitionId,
            },
          },
        },
      });
      return xRayObject;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.xRayObject.findMany();
  }),
  getAllIncludeUserAndRequisition: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.xRayObject.findMany({
      include: {
        xRayRequisition: {
          include: {
            user: true,
          },
        },
      },
    });
  }),
  getAllById: publicProcedure
    .input(
      z.object({
        xRayRequisitionId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.xRayObject.findMany({
        where: {
          xRayRequisitionId: input.xRayRequisitionId,
        },
      });
    }),
});
