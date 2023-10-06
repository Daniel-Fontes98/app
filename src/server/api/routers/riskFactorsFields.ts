import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const riskFactorsFieldsRouter = createTRPCRouter({
  insertOrUpdatePhaseThree: publicProcedure
    .input(
      z.object({
        riskFactorsId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const phaseThreeCheckBox = [
        "pregnantYes",
        "pregnantNo",
        "tobaccoYes",
        "tobaccoNo",
        "alcoholYes",
        "alcoholNo",
        "drugsYes",
        "drugsNo",
        "hospitalizedYes",
        "hospitalizedNo",
        "doctorVisitYes",
        "doctorVisitNo",
        "surgeryYes",
        "surgeryNo",
      ];
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = phaseThreeCheckBox.map(async (checkBox) => {
          return tx.riskFactorsFields.upsert({
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
  insertOrUpdatePhaseFour: publicProcedure
    .input(
      z.object({
        riskFactorsId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const phaseFourCheckBox = [
        "badReactionYes",
        "badReactionNo",
        "allergicReactionsYes",
        "allergicReactionsNo",
        "penicilina",
        "iodo",
        "lidocaina",
        "sulfamida",
        "morfina",
        "quinino",
        "outros",
        "takeMedicineYes",
        "takeMedicineNo",
      ];
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = phaseFourCheckBox.map(async (checkBox) => {
          return tx.riskFactorsFields.upsert({
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
  insertOrUpdatePhaseFive: publicProcedure
    .input(
      z.object({
        riskFactorsId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const phaseFiveCheckBox = [
        "persistentCoughYes",
        "persistentCoughNo",
        "nightSweatsYes",
        "nightSweatsNo",
        "weightLossYes",
        "weightLossNo",
        "donatedBloodYes",
        "donatedBloodNo",
      ];
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = phaseFiveCheckBox.map(async (checkBox) => {
          return tx.riskFactorsFields.upsert({
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
  insertOrUpdatePhaseSix: publicProcedure
    .input(
      z.object({
        riskFactorsId: z.string(),
        userCheckedList: z.string().array(),
      })
    )
    .mutation(async (opts) => {
      const phaseSixCheckBox = [
        "loudWorkYes",
        "loudWorkNo",
        "vibratingMachineYes",
        "vibratingMachineNo",
        "weldingYes",
        "weldingNo",
        "confinedWorkspaceYes",
        "confinedWorkspaceNo",
        "heightWorkYes",
        "heightWorkNo",
        "airplaneTravellingYes",
        "airplaneTravellingNo",
        "helicopterTravellingYes",
        "helicopterTravellingNo",
        "fastCrewBoatYes",
        "fastCrewBoatNo",
        "submarineDiveYes",
        "submarineDiveNo",
        "chemicalSubstancesYes",
        "chemicalSubstancesNo",
        "manualElevationsYes",
        "manualElevationsNo",
        "officeWorkYes",
        "officeWorkNo",
        "hotWorkYes",
        "hotWorkNo",
        "foodHandlerYes",
        "foodHandlerNo",
        "firstAidYes",
        "firstAidNo",
      ];
      const { input } = opts;
      await opts.ctx.prisma.$transaction(async (tx) => {
        const upsertOperations = phaseSixCheckBox.map(async (checkBox) => {
          return tx.riskFactorsFields.upsert({
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
