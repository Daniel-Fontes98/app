import { createTRPCRouter } from "~/server/api/trpc";
import { admissionRouter } from "./routers/admission";
import { applyTerapeuticRouter } from "./routers/applyTerapeutic";
import { companyAppointmentrouter } from "./routers/companyAppointment";
import { companyAppointmentMedicalFileRouter } from "./routers/companyAppointmentMedicalFile";
import { emergencyConsultRouter } from "./routers/emergencyConsult";
import { emergencyMealsRouter } from "./routers/emergencyMeals";
import { emergencyTransferRouter } from "./routers/emergencyTransfer";
import { emergencyTriageRouter } from "./routers/emergencyTriage";
import { labExamsRouter } from "./routers/labExam";
import { medicalExamRouter } from "./routers/medicalExam";
import { medicalFileRouter } from "./routers/medicalFile";
import { medicalItemRouter } from "./routers/medicalItem";
import { nurseFilesRouter } from "./routers/nurseFile";
import { nurseryExamRouter } from "./routers/nurseryExam";
import { personalAppointmentrouter } from "./routers/personalAppointment";
import { releaseRouter } from "./routers/release";
import { terapeuticRouter } from "./routers/terapeutic";
import { triageRouter } from "./routers/triage";
import { userRouter } from "./routers/user";
import { xRayObjectRouter } from "./routers/xRayObject";
import { xRayRequisitionRouter } from "./routers/xRayRequisition";
import { userHistoryRouter } from "./routers/userHistory";
import { userHistoryFieldsRouter } from "./routers/userHistoryFields";
import { riskFactorsRouter } from "./routers/riskFactors";
import { certificateRouter } from "./routers/certificate";
import { allergiesRouter } from "./routers/allergies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  allergies: allergiesRouter,
  companyAppointmentMedicalFile: companyAppointmentMedicalFileRouter,
  certificate: certificateRouter,
  emergencyConsults: emergencyConsultRouter,
  emergencyTriage: emergencyTriageRouter,
  emergencyTransfer: emergencyTransferRouter,
  emergencyMeals: emergencyMealsRouter,
  labExams: labExamsRouter,
  medicalExams: medicalExamRouter,
  medicalItems: medicalItemRouter,
  medicalFiles: medicalFileRouter,
  release: releaseRouter,
  nurseFiles: nurseFilesRouter,
  nurseryExams: nurseryExamRouter,
  admission: admissionRouter,
  terapeutic: terapeuticRouter,
  triage: triageRouter,
  applyTerapeutic: applyTerapeuticRouter,
  personalAppointment: personalAppointmentrouter,
  companyAppointment: companyAppointmentrouter,
  xRayRequisition: xRayRequisitionRouter,
  xRayObject: xRayObjectRouter,
  riskFactors: riskFactorsRouter,
  userHistory: userHistoryRouter,
  userHistoryFields: userHistoryFieldsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
