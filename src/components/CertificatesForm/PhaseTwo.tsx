import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBox from "../Forms/Checkbox";
import Input from "../Forms/Input";
import toast, { Toaster } from "react-hot-toast";

interface PhaseTwoProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const checkBoxOptionsArray = [
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
      toast(
        "Nenhum histórico médico selecionado, por favor selecionar a opção: 'Nenhuma das opções anteriores'"
      );
      setIsButtonDisabled(false);
      return;
    }

    if (
      userInput.medicalHistoryArray.includes("noneOfTheAboveCheck") &&
      userInput.medicalHistoryArray.length > 1
    ) {
      toast(
        "Não é possível selecionar 'Nenhuma das opções anteriores' e ter outras opções selecionadas"
      );
      setIsButtonDisabled(false);
      return;
    }

    if (userInput.medicalHistoryArray.includes("cancerCheck")) {
      if (userInput.cancerType === "") {
        toast("Por favor indicar o tipo de cancro no espaço indicado");
        setIsButtonDisabled(false);
        return;
      }

      if (userInput.dateOfCancerDiagnostic === "") {
        toast(
          "Por favor indicar a data de diagnóstico de cancro no espaço indicado"
        );
        setIsButtonDisabled(false);
        return;
      }

      if (userInput.dateOfEndCancerTreatment === "") {
        toast(
          "Por favor indicar a data de fim de tratamento de cancro no espaço indicado"
        );
        setIsButtonDisabled(false);
        return;
      }
    }

    try {
      await addHistory.mutateAsync({
        ...userInput,
        companyAppointmentId: companyAppointmentId,
      });
      await addHistoryField.mutateAsync({
        userCheckedList: userInput.medicalHistoryArray,
        userHistoryId: data?.id!,
      });
    } catch (err) {
      console.error(err);
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
      <div className="flex w-3/4 justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">Histórico</h1>
      </div>
      <div className="flex w-3/4 justify-center">
        <CheckBox
          error={errors.medicalHistoryArray}
          registerReturn={register("medicalHistoryArray")}
          options={checkBoxOptionsArray}
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
            Cancro
          </label>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Input
            name="Tipo"
            error={errors.cancerType}
            registerReturn={register("cancerType")}
            type="text"
            disabled={!watch("medicalHistoryArray").includes("cancerCheck")}
          />
          <Input
            name="Data de diagnóstico"
            error={errors.dateOfCancerDiagnostic}
            registerReturn={register("dateOfCancerDiagnostic")}
            type="date"
            disabled={!watch("medicalHistoryArray").includes("cancerCheck")}
          />
          <Input
            name="Fim de tratamento"
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
              Patologia psiquiátrica:
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
              Outros:
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
              Nenhuma das opções anteriores
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => props.setPhaseNumber(props.phaseNumber - 1)}
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Anterior
        </button>
        <div>{props.phaseNumber + 1} - 7</div>
        <button
          disabled={isButtonDisabled}
          type="submit"
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Próximo
        </button>
      </div>
    </form>
  );
};

export default PhaseTwo;
