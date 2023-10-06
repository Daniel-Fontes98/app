import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBoxAligned from "../Forms/CheckBoxAligned";

interface PhaseFiveProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  riskFactors: z.string().array(),
});

const PhaseFive = (props: PhaseFiveProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const addRiskFactors = api.riskFactors.insertOrUpdate.useMutation();
  const addRiskFactorsFields =
    api.riskFactorsFields.insertOrUpdatePhaseFive.useMutation();
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
          Factores de Risco (fim)
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-2 whitespace-nowrap">
          12. Tem uma tosse persistente há mais de uma semana:
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "persistentCoughYes" },
              { label: "NÃO", value: "persistentCoughNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          13. Alguma vez teve suores nocturnos inexplicados:
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "nightSweatsYes" },
              { label: "NÃO", value: "nightSweatsNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          14. Alguma vez teve uma perda de peso repentina inexplicada:
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "weightLossYes" },
              { label: "NÃO", value: "weightLossNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          15. Doou sangue nos últimos 12 meses:
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "donatedBloodYes" },
              { label: "NÃO", value: "donatedBloodNo" },
            ]}
            numberOfColumnsGrid={2}
          />
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

export default PhaseFive;
