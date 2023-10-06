import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBox from "../Forms/Checkbox";
import InputInLine from "../Forms/InputInLine";

interface PhaseFourProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  riskFactors: z.string().array(),
  badReactionWhen: z.string().optional(),
  allergicReactionCause: z.string().optional(),
  otherAllergicReactionsWhichOnes: z.string().optional(),
  takeMedicineName: z.string().optional(),
  takeMedicineDose: z.string().optional(),
  takeMedicineAmountDaily: z.string().optional(),
  takeMedicineReason: z.string().optional(),
});

const PhaseFour = (props: PhaseFourProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const addRiskFactors = api.riskFactors.insertOrUpdate.useMutation();
  const addRiskFactorsFields =
    api.riskFactorsFields.insertOrUpdatePhaseFour.useMutation();
  const { data, isFetchedAfterMount } = api.riskFactors.getById.useQuery({
    companyAppointmentId,
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("badReactionWhen", data?.badReactionWhen ?? "");
    setValue("allergicReactionCause", data?.allergicReactionCause ?? "");
    setValue(
      "otherAllergicReactionsWhichOnes",
      data?.otherAllergicReactionsWhichOnes ?? ""
    );
    setValue("takeMedicineName", data?.takeMedicineName ?? "");
    setValue("takeMedicineDose", data?.takeMedicineDose ?? "");
    setValue("takeMedicineAmountDaily", data?.takeMedicineAmountDaily ?? "");
    if (data) {
      setValue(
        "riskFactors",
        data?.riskFactorsFields
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
    try {
      await addRiskFactors.mutateAsync({
        ...userInput,
        companyAppointmentId: companyAppointmentId,
      });

      await addRiskFactorsFields.mutateAsync({
        userCheckedList: userInput.riskFactors,
        riskFactorsId: data?.id!,
      });
    } catch (err) {
      console.error(err);
      setIsButtonDisabled(false);
    }
    setIsButtonDisabled(false);
    props.setPhaseNumber(props.phaseNumber + 1);
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Factores de Risco (continuação)
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3/4">
              8. Alguma vez teve uma reacção adversa à anestesia durante uma
              intervenção cirúrgica, ou uma reacção adversa após consulta no
              dentista:
            </div>
            <div className="flex w-1/4 whitespace-nowrap">
              <CheckBox
                registerReturn={register("riskFactors")}
                error={errors.riskFactors}
                options={[
                  { label: "SIM", value: "badReactionYes" },
                  { label: "NÃO", value: "badReactionNo" },
                ]}
                numberOfColumnsGrid={2}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quais e quando"
              registerReturn={register("badReactionWhen")}
              error={errors.badReactionWhen}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            9. Alguma vez teve reacções alérgicas:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "allergicReactionsYes" },
                { label: "NÃO", value: "allergicReactionsNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, queira indicar a causa:"
              registerReturn={register("allergicReactionCause")}
              error={errors.allergicReactionCause}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 whitespace-nowrap">
            <div>10. É alérgico a algum destes medicamentos:</div>
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "Penicilina", value: "penicilina" },
                { label: "Iodo", value: "iodo" },
                { label: "Lidocaína", value: "lidocaina" },
                { label: "Sulfamida", value: "sulfamida" },
                { label: "Morfina", value: "morfina" },
                { label: "Quinino", value: "quinino" },
                { label: "Outros", value: "outros" },
              ]}
              numberOfColumnsGrid={3}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Quais:"
              registerReturn={register("otherAllergicReactionsWhichOnes")}
              error={errors.otherAllergicReactionsWhichOnes}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            11. Toma medicamentos:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "takeMedicineYes" },
                { label: "NÃO", value: "takeMedicineNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, nome internacional dos medicamentos:"
              registerReturn={register("takeMedicineName")}
              error={errors.takeMedicineName}
              type="text"
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Dosagem:"
              registerReturn={register("takeMedicineDose")}
              error={errors.takeMedicineDose}
              type="text"
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Quantidade/dia:"
              registerReturn={register("takeMedicineAmountDaily")}
              error={errors.takeMedicineAmountDaily}
              type="text"
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Motivo da toma do medicamento/indicação:"
              registerReturn={register("takeMedicineReason")}
              error={errors.takeMedicineReason}
              type="text"
            />
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

export default PhaseFour;
