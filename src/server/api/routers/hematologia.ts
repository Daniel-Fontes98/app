import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const hematologiaRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      const hematologiaAnalysis = await opts.ctx.prisma.hematologia.findFirst({
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });

      if (!hematologiaAnalysis) {
        throw new Error("exame de hematologia não encontrado");
      }

      return hematologiaAnalysis;
    }),
});
