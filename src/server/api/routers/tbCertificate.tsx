import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { calculateAgeFormatYYYY } from "~/components/ConsultTabs/UserInfo";
import { fillTbPdfForm } from "~/utils/tbCertificate";

export const tbCertificateRouter = createTRPCRouter({
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        doctorsName: z.string(),
        doctorsId: z.string(),
        companyAppointmentId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const companyAppointment =
        await opts.ctx.prisma.companyAppointment.findFirst({
          where: {
            id: input.companyAppointmentId,
          },
          include: {
            tbExams: true,
            user: true,
            company: true,
          },
        });

      if (!companyAppointment) throw new Error("No company appointment found");
      if (!companyAppointment.user) throw new Error("No user found");
      if (!companyAppointment.user.birthDate)
        throw new Error("No birthDate found");
      if (!companyAppointment.user.idNumber)
        throw new Error("No id number found");
      if (!companyAppointment.tbExams) throw new Error("No tb exam found");
      if (!companyAppointment.company) throw new Error("No company found");

      const fieldsForCertificate: Record<string, string> = {};
      fieldsForCertificate.pacientName = companyAppointment.user.name;
      fieldsForCertificate.pacientAge = calculateAgeFormatYYYY(
        companyAppointment.user.birthDate
      );
      fieldsForCertificate.idNumber = companyAppointment.user.idNumber;
      fieldsForCertificate.testType = companyAppointment.tbExams.testType;
      fieldsForCertificate.testResult = companyAppointment.tbExams.testResult;
      fieldsForCertificate.doctorsName = input.doctorsName;
      fieldsForCertificate.doctorsId = input.doctorsId;
      fieldsForCertificate.presentDate = new Date().toLocaleDateString("en-GB");

      const outputFull = `./uploads/tbCertificates/${new Date()
        .getFullYear()
        .toString()}/${companyAppointment.company.name}/${
        companyAppointment.user.name
      }.pdf`;

      try {
        await fillTbPdfForm(
          fieldsForCertificate,
          outputFull,
          companyAppointment.tbExams.fileLocation,
          fieldsForCertificate["doctorsName"].includes("Faria") ? true : false
        );

        await opts.ctx.prisma.tbCertificate.upsert({
          create: {
            doctorsId: input.doctorsId,
            doctorsName: input.doctorsName,
            fileLocation: outputFull,
            tbExam: {
              connect: {
                companyAppointmentId: input.companyAppointmentId,
              },
            },
          },
          update: {
            doctorsId: input.doctorsId,
            doctorsName: input.doctorsName,
            fileLocation: outputFull,
            tbExam: {
              connect: {
                companyAppointmentId: input.companyAppointmentId,
              },
            },
          },
          where: {
            tbExamId: companyAppointment.tbExams.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  getById: publicProcedure
    .input(z.object({ companyAppointmentId: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.tbCertificate.findFirst({
        where: {
          tbExam: {
            companyAppointmentId: input.companyAppointmentId,
          },
        },
      });
    }),
});
