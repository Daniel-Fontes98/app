import { createTRPCRouter } from "~/server/api/trpc";
import { admissionRouter } from "./routers/admission";
import { applyTerapeuticRouter } from "./routers/applyTerapeutic";
import { companyAppointmentrouter } from "./routers/companyAppointment";
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
import { userRouter } from "./routers/user";
import { xRayObjectRouter } from "./routers/xRayObject";
import { xRayRequisitionRouter } from "./routers/xRayRequisition";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
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
  applyTerapeutic: applyTerapeuticRouter,
  personalAppointment: personalAppointmentrouter,
  companyAppointment: companyAppointmentrouter,
  xRayRequisition: xRayRequisitionRouter,
  xRayObject: xRayObjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
