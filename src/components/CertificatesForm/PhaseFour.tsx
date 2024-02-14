import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBox from "../Forms/Checkbox";
import InputInLine from "../Forms/InputInLine";
import Radio from "../Forms/Radio";
import toast, { Toaster } from "react-hot-toast";

interface PhaseFourProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
  currentLanguage: string;
  setCurrentLanguage: Dispatch<SetStateAction<string>>;
}

const PhaseFour = (props: PhaseFourProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data, isFetchedAfterMount } =
    api.riskFactors.getByIdPhaseFour.useQuery({
      companyAppointmentId: companyAppointmentId,
    });
  const addRiskFactors = api.riskFactors.updatePhaseFour.useMutation();
  const addAllergies = api.allergies.insertOrUpdate.useMutation();

  const formSchema = z.object({
    allergies: z.string().array(),
    everHadBadReaction: z.string().min(1, {
      message:
        props.currentLanguage === "pt"
          ? "Por favor selecionar uma das opções"
          : "Please select one of the options",
    }),
    everHadAllergicReaction: z.string().min(1, {
      message:
        props.currentLanguage === "pt"
          ? "Por favor selecionar uma das opções"
          : "Please select one of the options",
    }),
    isTakingMedicine: z.string().min(1, {
      message:
        props.currentLanguage === "pt"
          ? "Por favor selecionar uma das opções"
          : "Please select one of the options",
    }),
    badReactionWhen: z.string().optional(),
    allergicReactionCause: z.string().optional(),
    otherAllergicReactionsWhichOnes: z.string().optional(),
    takeMedicineName: z.string().optional(),
    takeMedicineDose: z.string().optional(),
    takeMedicineAmountDaily: z.string().optional(),
    takeMedicineReason: z.string().optional(),
  });

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: [],
    },
  });

  useEffect(() => {
    if (!data) return;
    setValue("everHadBadReaction", data.everHadBadReaction ?? "");
    setValue("everHadAllergicReaction", data.everHadAllergicReaction ?? "");
    setValue("isTakingMedicine", data.isTakingMedicine ?? "");
    setValue("badReactionWhen", data.badReactionWhen ?? "");
    setValue("allergicReactionCause", data.allergicReactionCause ?? "");
    setValue(
      "otherAllergicReactionsWhichOnes",
      data?.otherAllergicReactionsWhichOnes ?? ""
    );
    setValue("takeMedicineName", data.takeMedicineName ?? "");
    setValue("takeMedicineDose", data.takeMedicineDose ?? "");
    setValue("takeMedicineAmountDaily", data.takeMedicineAmountDaily ?? "");
    setValue("takeMedicineReason", data.takeMedicineReason ?? "");
    setValue(
      "allergies",
      data.allergies
        .filter((field) => field.isChecked)
        .map((field) => field.name)
    );
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    if (!data) {
      toast.error("Ocorreu um erro, por favor recarregar a página");
      return;
    }

    const { allergies, ...riskFactors } = userInput;
    setIsButtonDisabled(true);

    await addRiskFactors
      .mutateAsync({ ...riskFactors, companyAppointmentId })
      .catch(() => toast.error(`Ocorreu um erro por favor tentar novamente`));
    await addAllergies.mutateAsync({
      riskFactorsId: data.id,
      userCheckedList: allergies,
    });

    setIsButtonDisabled(false);
    props.setPhaseNumber(props.phaseNumber + 1);
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className="flex items-center justify-center gap-8">
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
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          {props.currentLanguage === "pt"
            ? "Factores de Risco (continuação)"
            : "Risk Factors (continuation)"}
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-1 items-center justify-center gap-2 md:grid-cols-2">
            <div className="w-full md:w-3/4">
              {props.currentLanguage === "pt"
                ? "8. Alguma vez teve uma reacção adversa à anestesia durante uma intervenção cirúrgica, ou uma reacção adversa após consulta no dentista:"
                : "8. Had you ever had an allergic reaction to anestesy during a surgery, or an allergic reaction in the dentist:"}
            </div>
            <div className="flex w-1/4 whitespace-nowrap">
              <Radio
                registerReturn={register("everHadBadReaction")}
                error={errors.everHadBadReaction}
                options={[
                  {
                    label: props.currentLanguage === "pt" ? "SIM" : "YES",
                    value: "badReactionYes",
                  },
                  {
                    label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                    value: "badReactionNo",
                  },
                ]}
                name=""
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={
                props.currentLanguage === "pt"
                  ? "Se SIM, quais e quando"
                  : "If YES, why and when"
              }
              registerReturn={register("badReactionWhen")}
              error={errors.badReactionWhen}
              type="text"
              disabled={watch("everHadBadReaction") !== "badReactionYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {props.currentLanguage === "pt"
              ? "9. Alguma vez teve reacções alérgicas:"
              : "9. Have you ever had an allergic reaction:"}
            <Radio
              registerReturn={register("everHadAllergicReaction")}
              error={errors.everHadAllergicReaction}
              options={[
                {
                  label: props.currentLanguage === "pt" ? "SIM" : "YES",
                  value: "allergicReactionsYes",
                },
                {
                  label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                  value: "allergicReactionsNo",
                },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={
                props.currentLanguage === "pt"
                  ? "Se SIM, queira indicar a causa:"
                  : "If YES, please indicate the cause"
              }
              registerReturn={register("allergicReactionCause")}
              error={errors.allergicReactionCause}
              type="text"
              disabled={
                watch("everHadAllergicReaction") !== "allergicReactionsYes"
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 whitespace-nowrap">
            {props.currentLanguage === "pt"
              ? "10. É alérgico a algum destes medicamentos:"
              : "10. Are you allergic to any of these medicines:"}
            <CheckBox
              registerReturn={register("allergies")}
              error={errors.allergies}
              options={[
                {
                  label:
                    props.currentLanguage === "pt"
                      ? "Penicilina"
                      : "Penicillin",
                  value: "penicilina",
                },
                {
                  label: props.currentLanguage === "pt" ? "Iodo" : "Iodine",
                  value: "iodo",
                },
                {
                  label:
                    props.currentLanguage === "pt" ? "Lidocaíne" : "Lidocaine",
                  value: "lidocaina",
                },
                {
                  label:
                    props.currentLanguage === "pt" ? "Sulfamida" : "Sulfamide",
                  value: "sulfamida",
                },
                {
                  label:
                    props.currentLanguage === "pt" ? "Morfina" : "Morphine",
                  value: "morfina",
                },
                {
                  label: props.currentLanguage === "pt" ? "Quinino" : "Quinine",
                  value: "quinino",
                },
                {
                  label: props.currentLanguage === "pt" ? "Outros" : "Others",
                  value: "outros",
                },
              ]}
              numberOfColumnsGrid={3}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={props.currentLanguage === "pt" ? "Quais:" : "Which Ones:"}
              registerReturn={register("otherAllergicReactionsWhichOnes")}
              error={errors.otherAllergicReactionsWhichOnes}
              type="text"
              disabled={!watch("allergies").includes("outros")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {props.currentLanguage === "pt"
              ? "11. Toma medicamentos:"
              : "11. Do you take medicine:"}
            <Radio
              registerReturn={register("isTakingMedicine")}
              error={errors.isTakingMedicine}
              options={[
                {
                  label: props.currentLanguage === "pt" ? "SIM" : "YES",
                  value: "takeMedicineYes",
                },
                {
                  label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                  value: "takeMedicineNo",
                },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={
                props.currentLanguage === "pt"
                  ? "Se SIM, nome internacional dos medicamentos:"
                  : "If YES, international name of the medicines:"
              }
              registerReturn={register("takeMedicineName")}
              error={errors.takeMedicineName}
              type="text"
              disabled={watch("isTakingMedicine") !== "takeMedicineYes"}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={props.currentLanguage === "pt" ? "Dosagem:" : "Dosage:"}
              registerReturn={register("takeMedicineDose")}
              error={errors.takeMedicineDose}
              type="text"
              disabled={watch("isTakingMedicine") !== "takeMedicineYes"}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={
                props.currentLanguage === "pt"
                  ? "Quantidade/dia:"
                  : "Quantity/day:"
              }
              registerReturn={register("takeMedicineAmountDaily")}
              error={errors.takeMedicineAmountDaily}
              type="text"
              disabled={watch("isTakingMedicine") !== "takeMedicineYes"}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name={
                props.currentLanguage === "pt"
                  ? "Motivo da toma do medicamento/indicação:"
                  : "Reason for taking the medication/indication:"
              }
              registerReturn={register("takeMedicineReason")}
              error={errors.takeMedicineReason}
              type="text"
              disabled={watch("isTakingMedicine") !== "takeMedicineYes"}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => props.setPhaseNumber(props.phaseNumber - 1)}
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {props.currentLanguage === "pt" ? "Anterior" : "Previous"}
        </button>
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

export default PhaseFour;
