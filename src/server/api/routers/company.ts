import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.company.findMany();
  }),
  insertOne: publicProcedure
    .input(z.object({ name: z.string(), industry: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.company.create({
        data: {
          name: input.name.toUpperCase(),
          industry: input.industry,
        },
      });
    }),
});
