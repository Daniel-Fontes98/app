import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const hematologiaRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      const hematologiaAnalysis = await opts.ctx.prisma.hematologia.findMany({
        select: {
          parametro: true,
          resultado: true,
          intervaloInferior: true,
          intervaloSuperior: true,
          unidade: true,
        },
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });

      return hematologiaAnalysis.map((record) => {
        return {
          ...record,
          resultado: String(record.resultado),
          intervaloInferior: String(record.intervaloInferior),
          intervaloSuperior: String(record.intervaloSuperior),
        };
      });
    }),
});
