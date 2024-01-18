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
  currentLanguage: string;
  setCurrentLanguage: Dispatch<SetStateAction<string>>;
}

const PhaseSix = (props: PhaseSixProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = z.object({
    isLoudWork: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isVibratingMachine: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isWelding: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isConfinedWorkspace: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isHeightWork: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isAirplaneTravelling: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isHelicopterTravelling: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isFastCrewBoat: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isSubmarineDive: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isChemicalSubstances: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isManualElevations: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isOfficeWork: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isHotWork: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isFoodHandler: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
    isFirstAid: z
      .string()
      .min(1, {
        message:
          props.currentLanguage === "pt"
            ? "Por favor selecionar uma das opções"
            : "Please select one of the options",
      }),
  });

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
          {props.currentLanguage === "pt"
            ? "Questionário de Exposição aos Perigos"
            : "Hazard Exposure Questionnaire"}
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "16. Trabalho em zonas barulhentas com mais de 85db(A):"
            : "16. Work in noisy areas with more than 85db(A):"}
          <Radio
            registerReturn={register("isLoudWork")}
            error={errors.isLoudWork}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "loudWorkYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "loudWorkNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "17. Trabalhos com manuseio de máquinas vibratórias:"
            : "17. Work with vibrating machines:"}
          <Radio
            registerReturn={register("isVibratingMachine")}
            error={errors.isVibratingMachine}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "vibratingMachineYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "vibratingMachineNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt" ? "18. Soldadura:" : "18. Welding:"}

          <Radio
            registerReturn={register("isWelding")}
            error={errors.isWelding}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "weldingYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "weldingNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "19. Trabalho em espaço confinado:"
            : "19. Work in confined spaces:"}
          <Radio
            registerReturn={register("isConfinedWorkspace")}
            error={errors.isConfinedWorkspace}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "confinedWorkspaceYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "confinedWorkspaceNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "20. Trabalho em altura:"
            : "20. Working at heights:"}
          <Radio
            registerReturn={register("isHeightWork")}
            error={errors.isHeightWork}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "heightWorkYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "heightWorkNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "21. Deslocação em avião:"
            : "21. Travel by plane:"}
          <Radio
            registerReturn={register("isAirplaneTravelling")}
            error={errors.isAirplaneTravelling}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "airplaneTravellingYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "airplaneTravellingNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "22. Deslocação em helicóptero:"
            : "22. Travel by helicopter:"}
          <Radio
            registerReturn={register("isHelicopterTravelling")}
            error={errors.isHelicopterTravelling}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "helicopterTravellingYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "helicopterTravellingNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "23. Deslocação em fast crew boat:"
            : "23. Travel by fast crew boat:"}

          <Radio
            registerReturn={register("isFastCrewBoat")}
            error={errors.isFastCrewBoat}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "fastCrewBoatYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "fastCrewBoatNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "24. Mergulho Submarino:"
            : "24. Scuba Diving:"}
          <Radio
            registerReturn={register("isSubmarineDive")}
            error={errors.isSubmarineDive}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "submarineDiveYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "submarineDiveNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "25. Manuseio de substâncias químicas:"
            : "25. Handling of chemical substances:"}
          <Radio
            registerReturn={register("isChemicalSubstances")}
            error={errors.isChemicalSubstances}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "chemicalSubstancesYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "chemicalSubstancesNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "26. Manuseamento e elevações manuais:"
            : "26. Manual handling and lifting:"}
          <Radio
            registerReturn={register("isManualElevations")}
            error={errors.isManualElevations}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "manualElevationsYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "manualElevationsNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "27. Trabalho de escritório/com ecrã:"
            : "27. Office/screen work:"}
          <Radio
            registerReturn={register("isOfficeWork")}
            error={errors.isOfficeWork}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "officeWorkYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "officeWorkNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "28. Trabalho em ambiente quente:"
            : "28. Working in a hot environment:"}
          <Radio
            registerReturn={register("isHotWork")}
            error={errors.isHotWork}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "hotWorkYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "hotWorkNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "29. Manuseio de alimentos:"
            : "29. Food handling:"}

          <Radio
            registerReturn={register("isFoodHandler")}
            error={errors.isFoodHandler}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "foodHandlerYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "foodHandlerNo",
              },
            ]}
            name=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2  md:grid-cols-2 md:whitespace-nowrap">
          {props.currentLanguage === "pt"
            ? "30. Actos médicos, primeiros socorros, contactos com resíduos biológicos:"
            : "30. Medical acts, first aid, contact with biological waste:"}
          <Radio
            registerReturn={register("isFirstAid")}
            error={errors.isFirstAid}
            options={[
              {
                label: props.currentLanguage === "pt" ? "SIM" : "YES",
                value: "firstAidYes",
              },
              {
                label: props.currentLanguage === "pt" ? "NÃO" : "NO",
                value: "firstAidNo",
              },
            ]}
            name=""
          />
        </div>
      </div>
      <div className="mt-8 grid w-full grid-cols-4 items-center">
        <div className="ml-10">
          <button
            className="text-blue-500"
            type="button"
            onClick={() => props.setCurrentLanguage("en")}
          >
            English
          </button>
        </div>
        <div className="col-span-2 flex items-center justify-center gap-6">
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={() => props.setPhaseNumber(props.phaseNumber - 1)}
            className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {props.currentLanguage === "pt" ? "Anterior" : "Previous"}
          </button>
          <div>{props.phaseNumber + 1} - 6</div>
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {props.currentLanguage === "pt" ? "Submeter" : "Submit"}
          </button>
        </div>
        <div className="ml-9">
          <button
            className="text-blue-500"
            onClick={() => props.setCurrentLanguage("pt")}
            type="button"
          >
            Português
          </button>
        </div>
      </div>
    </form>
  );
};

export default PhaseSix;
