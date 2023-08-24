import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.string(),
        gender: z.string().optional(),
        nacionality: z.string().optional(),
        number: z.string().optional(),
        idnumber: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.user.create({ data: input });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      include: {
        companyAppointments: true,
        personalAppointment: true,
      },
    });
  }),
});
