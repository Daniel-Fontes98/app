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
        companyRoles: true,
        appointments: {
          include: {
            company: true,
          },
        },
      },
    });
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.user.findFirst({
        where: { id: input.id },
        include: {
          companyRoles: true,
          appointments: {
            include: {
              company: true,
            },
          },
        },
      });
    }),

  insertEntry: publicProcedure
    .input(
      z.object({
        date: z.string(),
        nome: z.string(),
        gender: z.string(),
        nacionality: z.string(),
        birthDate: z.string(),
        idnumber: z.string(),
        number: z.string().nullish(),
        role: z.string().nullish(),
        companyName: z.string(),
        industry: z.string(),
        location: z.string(),
        examType: z.string(),
        local: z.string().optional(),
        planType: z.string().optional(),
        adicionalInfo: z.string().optional(),
        covid: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const company = await opts.ctx.prisma.company.upsert({
        where: {
          name: input.companyName,
        },
        update: {},
        create: {
          name: input.companyName,
          industry: input.industry,
        },
      });

      const user = await opts.ctx.prisma.user.create({
        data: {
          name: input.nome,
          birthDate: input.birthDate,
          gender: input.gender,
          nacionality: input.nacionality,
          number: input.number,
          idNumber: input.idnumber,
          companyRoles: {
            create: {
              role: input.role,
              company: {
                connect: {
                  id: company.id,
                },
              },
            },
          },
          appointments: {
            create: {
              date: input.date,
              examType: input.examType,
              planType: input.planType,
              covid: input.covid,
              local: input.local,
              location: input.location,
              company: {
                connect: {
                  id: company.id,
                },
              },
            },
          },
        },
      });

      return user;
    }),
});
