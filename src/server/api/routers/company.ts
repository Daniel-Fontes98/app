import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        industry: z.string(),
        number: z.string().optional(),
        altNumber: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const company = await opts.ctx.prisma.company.create({ data: input });
      return company;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.findMany();
  }),
});
