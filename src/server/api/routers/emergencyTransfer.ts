import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emergencyTransferRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        transportType: z.string(),
        whereTo: z.string(),
        reason: z.string(),
        orderBy: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const emergencyTransfer = await opts.ctx.prisma.emergencyTransfer.create({
        data: {
          orderBy: input.orderBy,
          reason: input.reason,
          transportType: input.transportType,
          whereTo: input.whereTo,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return emergencyTransfer;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.findMany();
  }),
});
