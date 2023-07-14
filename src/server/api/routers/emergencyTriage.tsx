import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emergencyTriageRouter = createTRPCRouter({
  insertOne: publicProcedure
    .input(
      z.object({
        manchesterDegree: z.string(),
        weight: z.string(),
        height: z.string(),
        bloodType: z.string(),
        tMin: z.string(),
        tMax: z.string(),
        degrees: z.string(),
        oxygen: z.string(),
        complaint: z.string().optional(),
        sintoms: z.string(),
        emergencyConsultId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const triage = await opts.ctx.prisma.emergencyTriage.create({
        data: {
          manchesterDegree: input.manchesterDegree,
          weight: input.weight,
          height: input.height,
          bloodType: input.bloodType,
          tMin: input.tMin,
          tMax: input.tMax,
          degrees: input.degrees,
          oxygen: input.oxygen,
          complaint: input.complaint,
          sintoms: input.sintoms,
          emergencyConsult: {
            connect: {
              id: input.emergencyConsultId,
            },
          },
        },
      });
      return triage;
    }),
});
