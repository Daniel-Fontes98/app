import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userHistoryFieldsRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        userHistoryId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const allCheckBoxOptions = [
        "hiperTension",
        "cardiacPatology",
        "cardioDisease",
        "diabetes",
        "glaucoma",
        "epilepsy",
        "avc",
        "migranes",
        "fracture",
        "asma",
        "cronicArticularCheck",
        "muscleSkeletonDisease",
        "cancerCheck",
        "psychicPatologyCheck",
        "otherMedicalHistoryCheck",
        "noneOfTheAboveCheck",
      ];

      const { input } = opts;
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = allCheckBoxOptions.map(async (checkBox) => {
          return tx.userHistoryFields.upsert({
            create: {
              name: checkBox,
              isChecked: input.userCheckedList.includes(checkBox),
              userHistory: {
                connect: {
                  id: input.userHistoryId,
                },
              },
            },
            update: {
              isChecked: input.userCheckedList.includes(checkBox),
            },
            where: {
              name_userHistoryId: {
                name: checkBox,
                userHistoryId: input.userHistoryId,
              },
            },
          });
        });
        await Promise.all(upsertOperations);
      });
    }),
});
