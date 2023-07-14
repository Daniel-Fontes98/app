import { MedicalComments } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ee = new EventEmitter();
const t = initTRPC.create();

export const medicalCommentsRouter = createTRPCRouter({
  onInsert: t.procedure.subscription(() => {
    return observable<MedicalComments>((emit) => {
      const onInsert = (data: MedicalComments) => {
        emit.next(data);
      };
      ee.on("insertOne", onInsert);

      return () => {
        ee.off("insertOne", onInsert);
      };
    });
  }),
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
      const medicalComment = await opts.ctx.prisma.medicalComments.create({
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

      ee.emit("insertOne", medicalComment);
      return medicalComment;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.medicalComments.findMany();
  }),
});
