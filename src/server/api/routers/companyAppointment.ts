import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const companyAppointmentsRouter = createTRPCRouter({
  getAllByDate: publicProcedure
    .input(
      z.object({
        date: z.string(),
      })
    )
    .query(async (opts) => {
      return await opts.ctx.prisma.companyAppointment.findMany({
        where: { date: opts.input.date },
        include: {
          user: true,
          company: true,
        },
      });
    }),
});
