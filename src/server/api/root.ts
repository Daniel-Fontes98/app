import { createTRPCRouter } from "~/server/api/trpc";
import { admissionRouter } from "./routers/admission";
import { companyRouter } from "./routers/company";
import { companyAppointmentsRouter } from "./routers/companyAppointment";
import { emergencyConsultRouter } from "./routers/emergencyConsult";
import { emergencyMealsRouter } from "./routers/emergencyMeals";
import { emergencyTransferRouter } from "./routers/emergencyTransfer";
import { emergencyTriageRouter } from "./routers/emergencyTriage";
import { medicalCommentsRouter } from "./routers/medicalComments";
import { medicalExamRouter } from "./routers/medicalExam";
import { medicalItemRouter } from "./routers/medicalItem";
import { nurseCommentsRouter } from "./routers/nurseComments";
import { releaseRouter } from "./routers/release";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  company: companyRouter,
  user: userRouter,
  companyAppointments: companyAppointmentsRouter,
  emergencyConsults: emergencyConsultRouter,
  emergencyTriage: emergencyTriageRouter,
  emergencyTransfer: emergencyTransferRouter,
  emergencyMeals: emergencyMealsRouter,
  medicalExams: medicalExamRouter,
  medicalItems: medicalItemRouter,
  medicalComments: medicalCommentsRouter,
  release: releaseRouter,
  nurseComments: nurseCommentsRouter,
  admission: admissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
