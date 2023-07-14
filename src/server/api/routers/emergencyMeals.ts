import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emergencyMealsRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        date: z.string(),
        time: z.string(),
        typeOfMeal: z.string(),
        description: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const meal = await opts.ctx.prisma.emergencyMeals.create({
        data: {
          date: input.date,
          time: input.time,
          typeOfMeal: input.typeOfMeal,
          description: input.description,
          admission: {
            connect: {
              emergencyConsultId: input.emergencyConsultId,
            },
          },
        },
      });
      return meal;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.emergencyMeals.findMany();
  }),
});
