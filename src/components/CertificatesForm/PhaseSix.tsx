import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBoxAligned from "../Forms/CheckBoxAligned";

interface PhaseSixProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  riskFactors: z.string().array(),
});

const PhaseSix = (props: PhaseSixProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const addRiskFactors = api.riskFactors.insertOrUpdate.useMutation();
  const addRiskFactorsFields =
    api.riskFactorsFields.insertOrUpdatePhaseSix.useMutation();
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
          Questionário de Exposição aos Perigos
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex gap-2 whitespace-nowrap">
          16. Trabalho em zonas barulhentas com mais de 85db(A)
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "loudWorkYes" },
              { label: "NÃO", value: "loudWorkNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          17. Trabalhos com manuseio de máquinas vibratórias
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "vibratingMachineYes" },
              { label: "NÃO", value: "vibratingMachineNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          18. Soldadura
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "weldingYes" },
              { label: "NÃO", value: "weldingNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          19. Trabalho em espaço confinado
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "confinedWorkspaceYes" },
              { label: "NÃO", value: "confinedWorkspaceNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          20. Trabalho em altura
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "heightWorkYes" },
              { label: "NÃO", value: "heightWorkNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          21. Deslocação em avião
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "airplaneTravellingYes" },
              { label: "NÃO", value: "airplaneTravellingNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          22. Deslocação em helicóptero
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "helicopterTravellingYes" },
              { label: "NÃO", value: "helicopterTravellingNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          23. Deslocação em fast crew boat
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "fastCrewBoatYes" },
              { label: "NÃO", value: "fastCrewBoatNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          24. Mergulho Submarino
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "submarineDiveYes" },
              { label: "NÃO", value: "submarineDiveNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          25. Manuseio de substâncias químicas
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "chemicalSubstancesYes" },
              { label: "NÃO", value: "chemicalSubstancesNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          26. Manuseamento e elevações manuais
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "manualElevationsYes" },
              { label: "NÃO", value: "manualElevationsNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          27. Trabalho de escritório/com ecrã
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "officeWorkYes" },
              { label: "NÃO", value: "officeWorkNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          28. Trabalho em ambiente quente
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "hotWorkYes" },
              { label: "NÃO", value: "hotWorkNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          29. Manuseio de alimentos
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "foodHandlerYes" },
              { label: "NÃO", value: "foodHandlerNo" },
            ]}
            numberOfColumnsGrid={2}
          />
        </div>
        <div className="flex gap-2 whitespace-nowrap">
          30. Actos médicos, primeiros socorros, contactos com resíduos
          biológicos
          <CheckBoxAligned
            registerReturn={register("riskFactors")}
            error={errors.riskFactors}
            options={[
              { label: "SIM", value: "firstAidYes" },
              { label: "NÃO", value: "firstAidNo" },
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

export default PhaseSix;
