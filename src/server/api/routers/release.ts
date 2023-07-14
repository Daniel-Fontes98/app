import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const releaseRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        exitDate: z.string(),
        exitTime: z.string(),
        addInfo: z.string().optional(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const release = await opts.ctx.prisma.release.create({ data: input });
      return release;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.release.findMany();
  }),
});
