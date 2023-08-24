import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const nurseFilesRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        text: z.string().optional(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const nurseComment = await opts.ctx.prisma.nurseFile.upsert({
        create: {
          text: input.text,
          emergencyConsultId: input.emergencyConsultId,
        },
        update: {
          text: input.text,
        },
        where: {
          emergencyConsultId: input.emergencyConsultId,
        },
      });
      return nurseComment;
    }),
  getAllById: publicProcedure
    .input(
      z.object({
        emergencyConsultId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.nurseFile.findFirst({
        where: {
          emergencyConsultId: input.emergencyConsultId,
        },
      });
    }),
});
