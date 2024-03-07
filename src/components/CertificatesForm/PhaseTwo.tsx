import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBox from "../Forms/Checkbox";
import Input from "../Forms/Input";
import toast, { Toaster } from "react-hot-toast";

interface PhaseTwoProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
  currentLanguage: string;
  setCurrentLanguage: Dispatch<SetStateAction<string>>;
}

const checkBoxOptionsArrayPt = [
  { label: "Hipertensão Arterial", value: "hiperTension" },
  { label: "Patologia Cardíaca", value: "cardiacPatology" },
  { label: "Doença Cardiovascular", value: "cardioDisease" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Glaucoma", value: "glaucoma" },
  { label: "Epilepsia", value: "epilepsy" },
  { label: "AVC", value: "avc" },
  { label: "Enxaquecas", value: "migranes" },
  { label: "Fracturas", value: "fracture" },
  { label: "Asma", value: "asma" },
  {
    label: "Doença Articular Crónica inflamatória",
    value: "cronicArticularCheck",
  },
  {
    label: "Problemas músculo-esqueléticos",
    value: "muscleSkeletonDisease",
  },
];

const checkBoxOptionsArrayEn = [
  { label: "Arterial Hypertension", value: "hiperTension" },
  { label: "Cardiac Pathology", value: "cardiacPatology" },
  { label: "Cardiovascular Disease", value: "cardioDisease" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Glaucoma", value: "glaucoma" },
  { label: "Epilepsy", value: "epilepsy" },
  { label: "Stroke", value: "avc" },
  { label: "Migranes", value: "migranes" },
  { label: "Fractures", value: "fracture" },
  { label: "Asthma", value: "asma" },
  {
    label: "Chronic Inflammatory Joint Disease",
    value: "cronicArticularCheck",
  },
  {
    label: "Musculoskeletal problems",
    value: "muscleSkeletonDisease",
  },
];

const formSchema = z.object({
  medicalHistoryArray: z.string().array(),
  cancerType: z.string().optional(),
  dateOfCancerDiagnostic: z.string().optional(),
  dateOfEndCancerTreatment: z.string().optional(),
  psychicPatologyType: z.string().optional(),
  otherMedicalHistory: z.string().optional(),
});

const PhaseTwo = (props: PhaseTwoProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const addHistoryField = api.userHistoryFields.insertOrUpdate.useMutation();
  const addHistory = api.userHistory.insertOrUpdate.useMutation();
  const { data, isFetchedAfterMount } = api.userHistory.getById.useQuery({
    companyAppointmentId,
  });

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicalHistoryArray: [],
      psychicPatologyType: "",
      otherMedicalHistory: "",
    },
  });

  useEffect(() => {
    setValue("cancerType", data?.cancerType ?? "");
    setValue("dateOfCancerDiagnostic", data?.dateOfCancerDiagnostic ?? "");
    setValue("dateOfEndCancerTreatment", data?.dateOfEndCancerTreatment ?? "");
    setValue("psychicPatologyType", data?.psychicPatologyType ?? "");
    setValue("otherMedicalHistory", data?.otherMedicalHistory ?? "");
    if (data?.userHistoryFields) {
      setValue(
        "medicalHistoryArray",
        data?.userHistoryFields
          .filter((field) => field.isChecked)
          .map((field) => field.name)
      );
    }
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    setIsButtonDisabled(true);

    if (userInput.medicalHistoryArray.length === 0) {
      toast.error(
        props.currentLanguage === "pt"
          ? "Nenhum histórico médico selecionado, por favor selecionar a opção: 'Nenhuma das opções anteriores'"
          : "None of the above answers picked, please select 'None of the above'"
      );
      setIsButtonDisabled(false);
      return;
    }

    if (
      userInput.medicalHistoryArray.includes("noneOfTheAboveCheck") &&
      userInput.medicalHistoryArray.length > 1
    ) {
      toast.error(
        props.currentLanguage === "pt"
          ? "Não é possível selecionar 'Nenhuma das opções anteriores' e ter outras opções selecionadas"
          : "Can't select 'None of the above and have other options selected"
      );
      setIsButtonDisabled(false);
      return;
    }

    if (userInput.medicalHistoryArray.includes("cancerCheck")) {
      if (userInput.cancerType === "") {
        toast.error(
          props.currentLanguage === "pt"
            ? "Por favor indicar o tipo de cancro no espaço indicado"
            : "Please indicate the type of cancer in the indicated space"
        );
        setIsButtonDisabled(false);
        return;
      }

      if (userInput.dateOfCancerDiagnostic === "") {
        toast.error(
          props.currentLanguage === "pt"
            ? "Por favor indicar a data de diagnóstico de cancro no espaço indicado"
            : "Please indicate the cancer date of diagnostic in the indicated space "
        );
        setIsButtonDisabled(false);
        return;
      }

      if (userInput.dateOfEndCancerTreatment === "") {
        toast.error(
          props.currentLanguage === "pt"
            ? "Por favor indicar a data de fim de tratamento de cancro no espaço indicado"
            : "Please indicate the cancer end of treatment date in the indicated space"
        );
        setIsButtonDisabled(false);
        return;
      }
    }

    try {
      const addHistoryResult = await addHistory.mutateAsync({
        ...userInput,
        companyAppointmentId: companyAppointmentId,
      });

      if (!addHistoryResult.id) {
        toast.error("Ocorreu um erro por favor tentar novamente");
        throw new Error("Ocorreu um erro com o addHistory");
      }

      await addHistoryField.mutateAsync({
        userCheckedList: userInput.medicalHistoryArray,
        userHistoryId: addHistoryResult.id,
      });
    } catch (err) {
      console.error(err);
      setIsButtonDisabled(false);
      return;
    }
    setIsButtonDisabled(false);
    props.setPhaseNumber(props.phaseNumber + 1);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 p-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster />
      <div className="flex gap-8">
        <div className="">
          <button
            className="text-blue-500"
            type="button"
            onClick={() => props.setCurrentLanguage("en")}
          >
            English
          </button>
        </div>
        <div className="">
          <button
            className="text-blue-500"
            type="button"
            onClick={() => props.setCurrentLanguage("pt")}
          >
            Português
          </button>
        </div>
      </div>
      <div className="flex w-3/4 justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          {props.currentLanguage === "pt"
            ? "Histórico Médico"
            : "Medical History"}
        </h1>
      </div>
      <div className="flex w-3/4 justify-center">
        <CheckBox
          error={errors.medicalHistoryArray}
          registerReturn={register("medicalHistoryArray")}
          options={
            props.currentLanguage === "pt"
              ? checkBoxOptionsArrayPt
              : checkBoxOptionsArrayEn
          }
          numberOfColumnsGrid={3}
        />
      </div>
      <hr className="w-4/5 border " />
      <div className="flex w-4/5 flex-col gap-4">
        <div className="flex  gap-2">
          <input
            id="cancro"
            type="checkbox"
            value="cancerCheck"
            className="rounded-md accent-emerald-600"
            {...register("medicalHistoryArray")}
          />
          <label htmlFor="cancro" className=" font-medium text-gray-700">
            {props.currentLanguage === "pt" ? "Cancro" : "Cancer"}
          </label>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-2 md:grid-cols-3">
          <Input
            name={props.currentLanguage === "pt" ? "Tipo" : "Type"}
            error={errors.cancerType}
            registerReturn={register("cancerType")}
            type="text"
            disabled={!watch("medicalHistoryArray").includes("cancerCheck")}
          />
          <Input
            name={
              props.currentLanguage === "pt"
                ? "Data de Diagnóstico"
                : "Date of Diagnostic"
            }
            error={errors.dateOfCancerDiagnostic}
            registerReturn={register("dateOfCancerDiagnostic")}
            type="date"
            disabled={!watch("medicalHistoryArray").includes("cancerCheck")}
          />
          <Input
            name={
              props.currentLanguage === "pt"
                ? "Fim de Tratamento"
                : "End of Treatment"
            }
            error={errors.dateOfEndCancerTreatment}
            registerReturn={register("dateOfEndCancerTreatment")}
            type="date"
            disabled={!watch("medicalHistoryArray").includes("cancerCheck")}
          />
        </div>
        <hr className=" border " />
        <div className="">
          <div className="flex items-center justify-center gap-2">
            <input
              id="psiqui"
              type="checkbox"
              value="psychicPatologyCheck"
              className="rounded-md  bg-white accent-emerald-600"
              {...register("medicalHistoryArray")}
            />
            <label
              htmlFor="psiqui"
              className="whitespace-nowrap font-medium text-gray-700"
            >
              {props.currentLanguage === "pt"
                ? "Patologia psiquiátrica"
                : "Psychiatric Pathology"}
            </label>
            <Input
              name=""
              error={errors.psychicPatologyType}
              registerReturn={register("psychicPatologyType")}
              type="text"
              disabled={
                !watch("medicalHistoryArray").includes("psychicPatologyCheck")
              }
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              id="outros"
              type="checkbox"
              value="otherMedicalHistoryCheck"
              className="rounded-md  bg-white accent-emerald-600"
              {...register("medicalHistoryArray")}
            />
            <label htmlFor="outros" className="font-medium text-gray-700">
              {props.currentLanguage === "pt" ? "Outros" : "Others"}
            </label>
            <Input
              name=""
              error={errors.otherMedicalHistory}
              registerReturn={register("otherMedicalHistory")}
              type="text"
              disabled={
                !watch("medicalHistoryArray").includes(
                  "otherMedicalHistoryCheck"
                )
              }
            />
          </div>
          <div className="mt-2 flex gap-2">
            <input
              id="nenhum"
              type="checkbox"
              value="noneOfTheAboveCheck"
              className="rounded-md  bg-white accent-emerald-600"
              {...register("medicalHistoryArray")}
            />
            <label
              htmlFor="nenhum"
              className="whitespace-nowrap font-medium text-gray-700"
            >
              {props.currentLanguage === "pt"
                ? "Nenhuma das opções anteriores"
                : "None of the above"}
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div>{props.phaseNumber} - 5</div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="mb-2 mr-2 flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isButtonDisabled && (
            <div className="flex items-center">
              <svg
                className="mr-2 inline h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          <span>{props.currentLanguage === "pt" ? "Próximo" : "Next"}</span>
        </button>
      </div>
    </form>
  );
};

export default PhaseTwo;
