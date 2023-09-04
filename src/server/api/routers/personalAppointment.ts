import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const personalAppointmentrouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        appointmentDate: z.date(),
        consultType: z.string(),
        name: z.string(),
        number: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const personalAppointment =
        await opts.ctx.prisma.personalAppointment.create({
          data: {
            consultType: input.consultType,
            appointmentDate: input.appointmentDate,
            user: {
              connectOrCreate: {
                where: {
                  name_number: {
                    name: input.name,
                    number: input.number,
                  },
                },
                create: {
                  name: input.name,
                  number: input.number,
                },
              },
            },
          },
        });
      return personalAppointment;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.personalAppointment.findMany();
  }),
  getAllByDate: publicProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.personalAppointment.findMany({
        where: {
          AND: [
            {
              appointmentDate: {
                lt: new Date(
                  input.date.getFullYear(),
                  input.date.getMonth(),
                  input.date.getDate() + 1
                ),
              },
            },
            {
              appointmentDate: {
                gt: new Date(
                  input.date.getFullYear(),
                  input.date.getMonth(),
                  input.date.getDate()
                ),
              },
            },
          ],
        },
        include: {
          user: true,
        },
      });
    }),
});
