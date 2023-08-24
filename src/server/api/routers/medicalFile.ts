import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const medicalFileRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        app: z.string().optional(),
        apf: z.string().optional(),
        hda: z.string().optional(),
        hd: z.string().optional(),
        treatment: z.string().optional(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const medicalFile = await opts.ctx.prisma.medicalFile.upsert({
        create: {
          app: input.app,
          apf: input.apf,
          hda: input.hda,
          hd: input.hd,
          treatment: input.treatment,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
        update: {
          app: input.app,
          apf: input.apf,
          hda: input.hda,
          hd: input.hd,
          treatment: input.treatment,
        },
        where: {
          emergencyConsultId: input.emergencyConsultId,
        },
      });
      return medicalFile;
    }),
  getAllById: publicProcedure
    .input(
      z.object({
        emergencyConsultId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.medicalFile.findFirst({
        where: {
          emergencyConsultId: input.emergencyConsultId,
        },
      });
    }),
});
