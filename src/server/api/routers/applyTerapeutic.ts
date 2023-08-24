import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const applyTerapeuticRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        appliedBy: z.string(),
        terapeuticId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const applyTerapeutic = await opts.ctx.prisma.appliedTerapeutic.create({
        data: {
          appliedBy: input.appliedBy,
          terapeutic: {
            connect: {
              id: input.terapeuticId,
            },
          },
        },
      });
      return applyTerapeutic;
    }),
});
