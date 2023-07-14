import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const nurseCommentsRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        createdBy: z.string(),
        comment: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const nurseComment = await opts.ctx.prisma.nurseComments.create({
        data: {
          comment: input.comment,
          createdBy: input.createdBy,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return nurseComment;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.nurseComments.findMany();
  }),
});
