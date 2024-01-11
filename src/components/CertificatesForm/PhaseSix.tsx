import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import Radio from "../Forms/Radio";
import toast, { Toaster } from "react-hot-toast";

interface PhaseSixProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  isLoudWork: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isVibratingMachine: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isWelding: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isConfinedWorkspace: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isHeightWork: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isAirplaneTravelling: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isHelicopterTravelling: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isFastCrewBoat: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isSubmarineDive: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isChemicalSubstances: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isManualElevations: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isOfficeWork: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isHotWork: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isFoodHandler: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isFirstAid: z
    .string()
    .min(1, { message: "Por favor selecionar uma das opções" }),
});

const PhaseSix = (props: PhaseSixProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data, isFetchedAfterMount } =
    api.riskFactors.getByIdPhaseSix.useQuery({ companyAppointmentId });
  const addRiskFactors = api.riskFactors.updatePhaseSix.useMutation();
  const markHistoryAsFilled =
    api.companyAppointment.markHistoryFilled.useMutation();
  const createHistoryFile = api.certificate.createHistoryFile.useMutation();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!data) return;
    setValue("isLoudWork", data.isLoudWork ?? "");
    setValue("isVibratingMachine", data.isVibratingMachine ?? "");
    setValue("isWelding", data.isWelding ?? "");
    setValue("isConfinedWorkspace", data.isConfinedWorkspace ?? "");
    setValue("isHeightWork", data.isHeightWork ?? "");
    setValue("isAirplaneTravelling", data.isAirplaneTravelling ?? "");
    setValue("isHelicopterTravelling", data.isHelicopterTravelling ?? "");
    setValue("isFastCrewBoat", data.isFastCrewBoat ?? "");
    setValue("isSubmarineDive", data.isSubmarineDive ?? "");
    setValue("isChemicalSubstances", data.isChemicalSubstances ?? "");
    setValue("isManualElevations", data.isManualElevations ?? "");
    setValue("isOfficeWork", data.isOfficeWork ?? "");
    setValue("isHotWork", data.isHotWork ?? "");
    setValue("isFoodHandler", data.isFoodHandler ?? "");
    setValue("isFirstAid", data.isFirstAid ?? "");
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    setIsButtonDisabled(true);

    await markHistoryAsFilled.mutateAsync({
      id: companyAppointmentId,
    });

    await addRiskFactors
      .mutateAsync({ ...userInput, companyAppointmentId })
      .catch((err) => toast.error(`Ocorreu um erro: ${err}`));

    await createHistoryFile.mutateAsync({ companyAppointmentId }).then(() => {
      toast.success("Submetido com sucesso !");
      router.push("/nursery/FinalScreen");
    });

    setIsButtonDisabled(false);
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Questionário de Exposição aos Perigos
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          16. Trabalho em zonas barulhentas com mais de 85db(A):
          <Radio
            registerReturn={register("isLoudWork")}
            error={errors.isLoudWork}
            options={[
              { label: "SIM", value: "loudWorkYes" },
              { label: "NÃO", value: "loudWorkNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          17. Trabalhos com manuseio de máquinas vibratórias:
          <Radio
            registerReturn={register("isVibratingMachine")}
            error={errors.isVibratingMachine}
            options={[
              { label: "SIM", value: "vibratingMachineYes" },
              { label: "NÃO", value: "vibratingMachineNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          18. Soldadura:
          <Radio
            registerReturn={register("isWelding")}
            error={errors.isWelding}
            options={[
              { label: "SIM", value: "weldingYes" },
              { label: "NÃO", value: "weldingNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          19. Trabalho em espaço confinado:
          <Radio
            registerReturn={register("isConfinedWorkspace")}
            error={errors.isConfinedWorkspace}
            options={[
              { label: "SIM", value: "confinedWorkspaceYes" },
              { label: "NÃO", value: "confinedWorkspaceNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          20. Trabalho em altura:
          <Radio
            registerReturn={register("isHeightWork")}
            error={errors.isHeightWork}
            options={[
              { label: "SIM", value: "heightWorkYes" },
              { label: "NÃO", value: "heightWorkNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          21. Deslocação em avião:
          <Radio
            registerReturn={register("isAirplaneTravelling")}
            error={errors.isAirplaneTravelling}
            options={[
              { label: "SIM", value: "airplaneTravellingYes" },
              { label: "NÃO", value: "airplaneTravellingNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          22. Deslocação em helicóptero:
          <Radio
            registerReturn={register("isHelicopterTravelling")}
            error={errors.isHelicopterTravelling}
            options={[
              { label: "SIM", value: "helicopterTravellingYes" },
              { label: "NÃO", value: "helicopterTravellingNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          23. Deslocação em fast crew boat:
          <Radio
            registerReturn={register("isFastCrewBoat")}
            error={errors.isFastCrewBoat}
            options={[
              { label: "SIM", value: "fastCrewBoatYes" },
              { label: "NÃO", value: "fastCrewBoatNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          24. Mergulho Submarino:
          <Radio
            registerReturn={register("isSubmarineDive")}
            error={errors.isSubmarineDive}
            options={[
              { label: "SIM", value: "submarineDiveYes" },
              { label: "NÃO", value: "submarineDiveNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          25. Manuseio de substâncias químicas:
          <Radio
            registerReturn={register("isChemicalSubstances")}
            error={errors.isChemicalSubstances}
            options={[
              { label: "SIM", value: "chemicalSubstancesYes" },
              { label: "NÃO", value: "chemicalSubstancesNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          26. Manuseamento e elevações manuais:
          <Radio
            registerReturn={register("isManualElevations")}
            error={errors.isManualElevations}
            options={[
              { label: "SIM", value: "manualElevationsYes" },
              { label: "NÃO", value: "manualElevationsNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          27. Trabalho de escritório/com ecrã:
          <Radio
            registerReturn={register("isOfficeWork")}
            error={errors.isOfficeWork}
            options={[
              { label: "SIM", value: "officeWorkYes" },
              { label: "NÃO", value: "officeWorkNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          28. Trabalho em ambiente quente:
          <Radio
            registerReturn={register("isHotWork")}
            error={errors.isHotWork}
            options={[
              { label: "SIM", value: "hotWorkYes" },
              { label: "NÃO", value: "hotWorkNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          29. Manuseio de alimentos:
          <Radio
            registerReturn={register("isFoodHandler")}
            error={errors.isFoodHandler}
            options={[
              { label: "SIM", value: "foodHandlerYes" },
              { label: "NÃO", value: "foodHandlerNo" },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          30. Actos médicos, primeiros socorros, contactos com resíduos
          biológicos:
          <Radio
            registerReturn={register("isFirstAid")}
            error={errors.isFirstAid}
            options={[
              { label: "SIM", value: "firstAidYes" },
              { label: "NÃO", value: "firstAidNo" },
            ]}
            name=""
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
        <div>{props.phaseNumber + 1} - 6</div>
        <button
          disabled={isButtonDisabled}
          type="submit"
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submeter
        </button>
      </div>
    </form>
  );
};

export default PhaseSix;
