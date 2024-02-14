import { format } from "date-fns";
import { z } from "zod";
import { calculateAgeFormatYYYY } from "~/components/ConsultTabs/UserInfo";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fillPDFForm } from "~/utils/certificate";
import { convertDateFormat, parseDate } from "~/utils/dates";
import { fillHistoryForm } from "~/utils/history";

export const certificateRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        companyAppointmentId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.certificate.findFirst({
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });
    }),
  insertOrUpdate: publicProcedure
    .input(
      z.object({
        companyAppointmentId: z.string(),
        assistantDoctorName: z.string(),
        assistantDoctorNumber: z.string(),
        examValidUntil: z.string(),
        clinicExam: z.string().optional(),
        finalState: z.string(),
        location: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await opts.ctx.prisma.certificate.upsert({
        create: {
          assistantDoctorName: input.assistantDoctorName,
          assistantDoctorNumber: input.assistantDoctorNumber,
          examValidUntil: input.examValidUntil,
          clinicExam: input.clinicExam,
          finalState: input.finalState,
          location: input.location,
          companyAppointment: {
            connect: {
              id: input.companyAppointmentId,
            },
          },
        },
        update: {
          assistantDoctorName: input.assistantDoctorName,
          assistantDoctorNumber: input.assistantDoctorNumber,
          examValidUntil: input.examValidUntil,
          clinicExam: input.clinicExam,
          finalState: input.finalState,
          location: input.location,
        },
        where: {
          companyAppointmentId: input.companyAppointmentId,
        },
      });
    }),

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
                allergies: true,
              },
            },
            certificate: true,
            company: true,
            triage: true,
            user: true,
            userHistory: {
              include: {
                userHistoryFields: true,
              },
            },
            labExams: true,
            nurseryExams: true,
          },
        });

      if (!companyAppointment) return;
      if (!companyAppointment.riskFactors) return;
      if (!companyAppointment.userHistory) return;
      if (!companyAppointment.certificate) return;
      if (!companyAppointment.triage) throw new Error("Triagem nao preenchida");

      //Add Info From User
      const fieldsForCertificate: Record<string, string> = {};
      fieldsForCertificate.pacientName =
        companyAppointment.user.name!.toUpperCase();
      try {
        fieldsForCertificate.pacientBirthDate = format(
          parseDate(companyAppointment.user.birthDate!)!,
          "dd-MM-yyyy"
        );
      } catch (err) {
        fieldsForCertificate.pacientBirthDate =
          companyAppointment.user.birthDate!;
      }

      fieldsForCertificate.pacientGender = companyAppointment.user.gender!;
      fieldsForCertificate.pacientRole =
        companyAppointment.companyRole!.toUpperCase();
      fieldsForCertificate.pacientAge = calculateAgeFormatYYYY(
        companyAppointment.user.birthDate!
      );
      //Add Info From Company
      fieldsForCertificate.companyName =
        companyAppointment?.company.name!.toUpperCase();

      //Add Info From Triage
      fieldsForCertificate.pacientHeight = companyAppointment?.triage?.height;
      fieldsForCertificate.pacientWeight = companyAppointment?.triage?.weight;
      fieldsForCertificate.pacientPA =
        companyAppointment?.triage?.arterialTension;
      fieldsForCertificate.pacientPulse = companyAppointment?.triage?.pulse;

      if (companyAppointment.userHistory.dateOfCancerDiagnostic)
        companyAppointment.userHistory.dateOfCancerDiagnostic =
          convertDateFormat(
            companyAppointment.userHistory.dateOfCancerDiagnostic
          );

      if (companyAppointment.userHistory.dateOfEndCancerTreatment)
        companyAppointment.userHistory.dateOfEndCancerTreatment =
          convertDateFormat(
            companyAppointment.userHistory.dateOfEndCancerTreatment
          );

      fieldsForCertificate.cancerType =
        companyAppointment.userHistory.cancerType ?? "";
      fieldsForCertificate.dateOfCancerDiagnostic =
        companyAppointment.userHistory.dateOfCancerDiagnostic ?? "";
      fieldsForCertificate.dateOfEndCancerTreatment =
        companyAppointment.userHistory.dateOfEndCancerTreatment ?? "";
      fieldsForCertificate.psychicPatologyType =
        companyAppointment.userHistory.psychicPatologyType ?? "";
      fieldsForCertificate.otherMedicalHistory =
        companyAppointment.userHistory.otherMedicalHistory ?? "";

      fieldsForCertificate.pregnantHowMany =
        companyAppointment.riskFactors.pregnantHowMany ?? "";
      fieldsForCertificate.tobaccoAmount =
        companyAppointment.riskFactors.tobaccoAmount ?? "";
      fieldsForCertificate.alcoholAmount =
        companyAppointment.riskFactors.alcoholAmount ?? "";
      fieldsForCertificate.hospitalizedWhen =
        companyAppointment.riskFactors.hospitalizedWhen ?? "";
      fieldsForCertificate.visitedDoctorWhen =
        companyAppointment.riskFactors.visitedDoctorWhen ?? "";
      fieldsForCertificate.badReactionWhen =
        companyAppointment.riskFactors.badReactionWhen ?? "";
      fieldsForCertificate.surgeryWhen =
        companyAppointment.riskFactors.surgeryWhen ?? "";
      fieldsForCertificate.allergicReactionCause =
        companyAppointment.riskFactors.allergicReactionCause ?? "";
      fieldsForCertificate.otherAllergicReactionsWhichOnes =
        companyAppointment.riskFactors.otherAllergicReactionsWhichOnes ?? "";
      fieldsForCertificate.takeMedicineName =
        companyAppointment.riskFactors.takeMedicineName ?? "";
      fieldsForCertificate.takeMedicineDose =
        companyAppointment.riskFactors.takeMedicineDose ?? "";
      fieldsForCertificate.takeMedicineAmountDaily =
        companyAppointment.riskFactors.takeMedicineAmountDaily ?? "";
      fieldsForCertificate.takeMedicineReason =
        companyAppointment.riskFactors.takeMedicineReason ?? "";

      const { allergies, ...riskFactorsWithoutAllergies } =
        companyAppointment.riskFactors;

      const checkBoxesFromAllergies = allergies
        .filter((field) => field.isChecked)
        .map((field) => field.name);

      const checkBoxesFromRiskFactors: string[] = [];
      Object.entries(riskFactorsWithoutAllergies)
        .filter(
          (entry) =>
            !fieldsForCertificate[entry[0]] &&
            entry[0] !== "id" &&
            entry[0] !== "companyAppointmentId"
        )
        .forEach((entry) => {
          const value = entry[1];
          if (typeof value === "string") {
            checkBoxesFromRiskFactors.push(value);
          }
        });

      //Add Info From UserHistoryFields
      const checkBoxesFromUserHistoryFields =
        companyAppointment?.userHistory?.userHistoryFields
          .filter((field) => field.isChecked)
          .map((field) => field.name);
      const checkBoxesForCertificate = checkBoxesFromRiskFactors.concat(
        checkBoxesFromUserHistoryFields,
        checkBoxesFromAllergies,
        companyAppointment.certificate.finalState,
        companyAppointment.certificate.location!
      );

      fieldsForCertificate["currentDate"] = new Date().toLocaleDateString(
        "en-GB"
      );
      fieldsForCertificate["assistantDoctorName"] =
        companyAppointment.certificate?.assistantDoctorName ?? "";
      fieldsForCertificate["assistantDoctorNumber"] =
        companyAppointment.certificate?.assistantDoctorNumber ?? "";
      if (companyAppointment.presentAt)
        fieldsForCertificate["examDate"] =
          companyAppointment.presentAt.toLocaleDateString("en-GB");
      fieldsForCertificate["ref"] = companyAppointment.id;
      fieldsForCertificate["examValidUntil"] =
        companyAppointment.certificate?.examValidUntil ?? "";
      fieldsForCertificate["clinicExam"] =
        companyAppointment.certificate.clinicExam ?? "";

      const pdfPath = "src/certificateModels/CertificadoNovo.pdf";
      const offPdfPath = "src/certificateModels/CertificadoOff.pdf";
      const outputFull = `./uploads/certificates/${new Date()
        .getFullYear()
        .toString()}/${companyAppointment.company.name}/${
        companyAppointment.user.name
      }.pdf`;

      const outputSingle = `./uploads/certificates/${new Date()
        .getFullYear()
        .toString()}/${companyAppointment.company.name}/${
        companyAppointment.user.name
      }Single.pdf`;

      //Add lab and nursery exams
      const examsLocations: string[] = [];
      companyAppointment.nurseryExams.map((exam) => {
        examsLocations.push(exam.fileLocation);
      });

      companyAppointment.labExams.map((exam) => {
        examsLocations.push(exam.fileLocation);
      });

      try {
        await fillPDFForm(
          companyAppointment.certificate.location! === "N/D"
            ? offPdfPath
            : pdfPath,
          outputFull,
          outputSingle,
          fieldsForCertificate,
          checkBoxesForCertificate,
          examsLocations,
          fieldsForCertificate["assistantDoctorName"].includes("Faria")
            ? true
            : false
        );
        await opts.ctx.prisma.companyAppointment.update({
          data: {
            certificateLocation: outputFull,
          },
          where: {
            id: input.companyAppointmentId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  createHistoryFile: publicProcedure
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
                allergies: true,
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
            labExams: true,
            nurseryExams: true,
          },
        });

      if (!companyAppointment)
        throw new Error("Não existe marcação no sistema");
      if (!companyAppointment.riskFactors)
        throw new Error("Nao existem factores de risco");
      if (!companyAppointment.userHistory)
        throw new Error("Nao existe historico");

      //Add Info From User
      const fieldsForCertificate: Record<string, string> = {};
      fieldsForCertificate.pacientName = companyAppointment.user.name!;
      fieldsForCertificate.pacientBirthDate =
        companyAppointment.user.birthDate!;
      fieldsForCertificate.pacientGender = companyAppointment.user.gender!;
      fieldsForCertificate.pacientRole = companyAppointment.companyRole!;
      fieldsForCertificate.pacientAge = calculateAgeFormatYYYY(
        companyAppointment.user.birthDate!
      );
      //Add Info From Company
      fieldsForCertificate.companyName = companyAppointment.company.name!;

      //Add Info From Triage
      if (companyAppointment.triage) {
        fieldsForCertificate.pacientHeight = companyAppointment.triage.height;
        fieldsForCertificate.pacientWeight = companyAppointment.triage.weight;
      }

      if (companyAppointment.userHistory.dateOfCancerDiagnostic)
        companyAppointment.userHistory.dateOfCancerDiagnostic =
          convertDateFormat(
            companyAppointment.userHistory.dateOfCancerDiagnostic
          );

      if (companyAppointment.userHistory.dateOfEndCancerTreatment)
        companyAppointment.userHistory.dateOfEndCancerTreatment =
          convertDateFormat(
            companyAppointment.userHistory.dateOfEndCancerTreatment
          );

      fieldsForCertificate.cancerType =
        companyAppointment.userHistory.cancerType ?? "";
      fieldsForCertificate.dateOfCancerDiagnostic =
        companyAppointment.userHistory.dateOfCancerDiagnostic ?? "";
      fieldsForCertificate.dateOfEndCancerTreatment =
        companyAppointment.userHistory.dateOfEndCancerTreatment ?? "";
      fieldsForCertificate.psychicPatologyType =
        companyAppointment.userHistory.psychicPatologyType ?? "";
      fieldsForCertificate.otherMedicalHistory =
        companyAppointment.userHistory.otherMedicalHistory ?? "";

      fieldsForCertificate.pregnantHowMany =
        companyAppointment.riskFactors.pregnantHowMany ?? "";
      fieldsForCertificate.tobaccoAmount =
        companyAppointment.riskFactors.tobaccoAmount ?? "";
      fieldsForCertificate.alcoholAmount =
        companyAppointment.riskFactors.alcoholAmount ?? "";
      fieldsForCertificate.hospitalizedWhen =
        companyAppointment.riskFactors.hospitalizedWhen ?? "";
      fieldsForCertificate.visitedDoctorWhen =
        companyAppointment.riskFactors.visitedDoctorWhen ?? "";
      fieldsForCertificate.badReactionWhen =
        companyAppointment.riskFactors.badReactionWhen ?? "";
      fieldsForCertificate.surgeryWhen =
        companyAppointment.riskFactors.surgeryWhen ?? "";
      fieldsForCertificate.allergicReactionCause =
        companyAppointment.riskFactors.allergicReactionCause ?? "";
      fieldsForCertificate.otherAllergicReactionsWhichOnes =
        companyAppointment.riskFactors.otherAllergicReactionsWhichOnes ?? "";
      fieldsForCertificate.takeMedicineName =
        companyAppointment.riskFactors.takeMedicineName ?? "";
      fieldsForCertificate.takeMedicineDose =
        companyAppointment.riskFactors.takeMedicineDose ?? "";
      fieldsForCertificate.takeMedicineAmountDaily =
        companyAppointment.riskFactors.takeMedicineAmountDaily ?? "";
      fieldsForCertificate.takeMedicineReason =
        companyAppointment.riskFactors.takeMedicineReason ?? "";

      const { allergies, ...riskFactorsWithoutAllergies } =
        companyAppointment.riskFactors;

      const checkBoxesFromAllergies = allergies
        .filter((field) => field.isChecked)
        .map((field) => field.name);

      const checkBoxesFromRiskFactors: string[] = [];
      Object.entries(riskFactorsWithoutAllergies)
        .filter(
          (entry) =>
            !fieldsForCertificate[entry[0]] &&
            entry[0] !== "id" &&
            entry[0] !== "companyAppointmentId"
        )
        .forEach((entry) => {
          const value = entry[1];
          if (typeof value === "string") {
            checkBoxesFromRiskFactors.push(value);
          }
        });

      //Add Info From UserHistoryFields
      const checkBoxesFromUserHistoryFields =
        companyAppointment?.userHistory?.userHistoryFields
          .filter((field) => field.isChecked)
          .map((field) => field.name);
      const checkBoxesForCertificate = checkBoxesFromRiskFactors.concat(
        checkBoxesFromUserHistoryFields,
        checkBoxesFromAllergies
      );

      fieldsForCertificate["currentDate"] = new Date().toLocaleDateString(
        "en-GB"
      );

      if (companyAppointment.presentAt)
        fieldsForCertificate["examDate"] =
          companyAppointment.presentAt.toLocaleDateString("en-GB");
      fieldsForCertificate["ref"] = companyAppointment.id;

      const pdfPath = "src/certificateModels/Historico.pdf";
      const outputFull = `./uploads/certificates/${new Date()
        .getFullYear()
        .toString()}/${companyAppointment.company.name}/${
        companyAppointment.user.name
      }History.pdf`;

      //Add lab and nursery exams
      const examsLocations: string[] = [];
      companyAppointment.nurseryExams.map((exam) => {
        examsLocations.push(exam.fileLocation);
      });

      companyAppointment.labExams.map((exam) => {
        examsLocations.push(exam.fileLocation);
      });

      try {
        await fillHistoryForm(
          pdfPath,
          outputFull,
          fieldsForCertificate,
          checkBoxesForCertificate
        );
        await opts.ctx.prisma.companyAppointment.update({
          data: {
            historyLocation: outputFull,
          },
          where: {
            id: input.companyAppointmentId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
});
