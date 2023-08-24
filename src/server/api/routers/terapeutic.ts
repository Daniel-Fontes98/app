import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const terapeuticRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        description: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const terapeutic = await opts.ctx.prisma.terapeutic.create({
        data: {
          description: input.description,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return terapeutic;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    const terapeuticsList = ctx.prisma.terapeutic.findMany({
      include: {
        appliedTerapeutic: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return terapeuticsList;
  }),
  retireOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await opts.ctx.prisma.terapeutic.update({
        where: {
          id: input.id,
        },
        data: {
          active: false,
        },
      });
    }),
});
