import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/utils/store";

type phaseOneKeys =
  | "pacientName"
  | "pacientAge"
  | "pacientGender"
  | "pacientHeight"
  | "pacientWeight"
  | "pacientBirthDate"
  | "companyName"
  | "pacientRole";

export interface certificateState {
  pacientName: string;
  pacientAge: string;
  pacientGender: string;
  pacientHeight: string;
  pacientWeight: string;
  pacientBirthDate: string;
  companyName: string;
  pacientRole: string;
  medicalHistoryArray: string[];
  cancerType: string;
  dateOfCancerDiagnostic: string;
  dateOfEndCancerTreatment: string;
  psychicPatologyType: string;
  otherMedicalHistory: string;
  riskFactorsArray: string[];
  pregnantHowMany: string;
  tobbacoAmount: string;
  alcoholAmount: string;
  hospitalizedWhen: string;
  visitedDoctorWhen: string;
  surgeryWhen: string;
  badReactionWhen: string;
  allergicReactionCause: string;
  otherAllergicReactionsWhichOnes: string;
  takeMedicineName: string;
  takeMedicineDose: string;
  takeMedicineAmountDaily: string;
  clinicExam: string;
  examValidUntil: string;
}

const initialState: certificateState = {
  pacientName: "",
  pacientAge: "",
  pacientGender: "",
  pacientHeight: "",
  pacientWeight: "",
  pacientBirthDate: "",
  companyName: "",
  pacientRole: "",
  medicalHistoryArray: [],
  cancerType: "",
  dateOfCancerDiagnostic: "",
  dateOfEndCancerTreatment: "",
  psychicPatologyType: "",
  otherMedicalHistory: "",
  riskFactorsArray: [],
  pregnantHowMany: "",
  tobbacoAmount: "",
  alcoholAmount: "",
  hospitalizedWhen: "",
  visitedDoctorWhen: "",
  surgeryWhen: "",
  badReactionWhen: "",
  allergicReactionCause: "",
  otherAllergicReactionsWhichOnes: "",
  takeMedicineName: "",
  takeMedicineDose: "",
  takeMedicineAmountDaily: "",
  clinicExam: "",
  examValidUntil: "",
};

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    phaseOne: (state, action: PayloadAction<Record<phaseOneKeys, string>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { phaseOne } = certificateSlice.actions;

export default certificateSlice.reducer;
