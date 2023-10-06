import { z } from "zod";
import { calculateAgeFormatYYYY } from "~/components/ConsultTabs/UserInfo";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fillPDFForm } from "~/utils/certificate";

export const certificateRouter = createTRPCRouter({
  createCertificate: publicProcedure
    .input(
      z.object({
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
            riskFactors: {
              include: {
                riskFactorsFields: true,
              },
            },
            company: true,
            triage: true,
            user: true,
            userHistory: {
              include: {
                userHistoryFields: true,
              },
            },
          },
        });

      //Add Info From User
      const fieldsForCertificate: Record<string, string> = {};
      fieldsForCertificate.pacientName = companyAppointment?.user.name!;
      fieldsForCertificate.pacientBirthDate =
        companyAppointment?.user.birthDate!;
      fieldsForCertificate.pacientGender = companyAppointment?.user.gender!;
      fieldsForCertificate.pacientRole = companyAppointment?.companyRole!;
      fieldsForCertificate.pacientAge = calculateAgeFormatYYYY(
        companyAppointment?.user.birthDate!
      );

      //Add Info From Company
      fieldsForCertificate.companyName = companyAppointment?.company.name!;

      //Add Info From Triage
      fieldsForCertificate.pacientHeight = companyAppointment?.triage?.height!;
      fieldsForCertificate.pacientWeight = companyAppointment?.triage?.weight!;

      //Add Info From UserHistory
      const keysFromUserHistory = [
        "cancerType",
        "dateOfCancerDiagnostic",
        "dateOfEndCancerTreatment",
        "psychicPatologyType",
        "otherMedicalHistory",
      ] as const;
      for (const key of keysFromUserHistory) {
        fieldsForCertificate[key] = companyAppointment?.userHistory![key]!;
      }

      //Add Info From RiskFactors
      const keysFromRiskFactors = [
        "pregnantHowMany",
        "tobaccoAmount",
        "alcoholAmount",
        "hospitalizedWhen",
        "visitedDoctorWhen",
        "surgeryWhen",
        "badReactionWhen",
        "allergicReactionCause",
        "otherAllergicReactionsWhichOnes",
        "takeMedicineName",
        "takeMedicineDose",
        "takeMedicineAmountDaily",
        "takeMedicineReason",
        "clinicExam",
      ] as const;
      for (const key of keysFromRiskFactors) {
        fieldsForCertificate[key] = companyAppointment?.riskFactors![key]!;
      }

      //Add Info From RiskFactorsFields
      const checkBoxesFromRiskFactorsFields =
        companyAppointment?.riskFactors?.riskFactorsFields
          .filter((field) => field.isChecked)
          .map((field) => field.name);

      //Add Info From UserHistoryFields
      const checkBoxesFromUserHistoryFields =
        companyAppointment?.userHistory?.userHistoryFields
          .filter((field) => field.isChecked)
          .map((field) => field.name);
      const checkBoxesForCertificate = checkBoxesFromRiskFactorsFields!.concat(
        checkBoxesFromUserHistoryFields!
      );
      const pdfPath = "src/certificateModels/Certifcado.pdf";
      const output = "output.pdf";
      await fillPDFForm(
        pdfPath,
        output,
        fieldsForCertificate,
        checkBoxesForCertificate
      );
    }),
});
