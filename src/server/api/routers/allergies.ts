import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const allergiesRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        riskFactorsId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const phaseFourCheckBox = [
        "penicilina",
        "iodo",
        "lidocaina",
        "sulfamida",
        "morfina",
        "quinino",
        "outros",
      ];
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = phaseFourCheckBox.map(async (checkBox) => {
          return tx.allergies.upsert({
            create: {
              name: checkBox,
              isChecked: input.userCheckedList.includes(checkBox),
              riskFactors: {
                connect: {
                  id: input.riskFactorsId,
                },
              },
            },
            update: {
              isChecked: input.userCheckedList.includes(checkBox),
            },
            where: {
              name_riskFactorsId: {
                name: checkBox,
                riskFactorsId: input.riskFactorsId,
              },
            },
          });
        });
        await Promise.all(upsertOperations);
      });
    }),
});
