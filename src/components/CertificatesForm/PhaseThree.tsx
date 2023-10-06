import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import CheckBox from "../Forms/Checkbox";
import InputInLine from "../Forms/InputInLine";

interface PhaseThreeProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  riskFactors: z.string().array(),
  pregnantHowMany: z.string().optional(),
  tobaccoAmount: z.string().optional(),
  alcoholAmount: z.string().optional(),
  hospitalizedWhen: z.string().optional(),
  visitedDoctorWhen: z.string().optional(),
  surgeryWhen: z.string().optional(),
});

const PhaseThree = (props: PhaseThreeProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const addRiskFactors = api.riskFactors.insertOrUpdate.useMutation();
  const addRiskFactorsFields =
    api.riskFactorsFields.insertOrUpdatePhaseThree.useMutation();
  const { data, isFetchedAfterMount } = api.riskFactors.getById.useQuery({
    companyAppointmentId,
  });

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("pregnantHowMany", data?.pregnantHowMany ?? "");
    setValue("tobaccoAmount", data?.tobaccoAmount ?? "");
    setValue("alcoholAmount", data?.alcoholAmount ?? "");
    setValue("hospitalizedWhen", data?.hospitalizedWhen ?? "");
    setValue("visitedDoctorWhen", data?.visitedDoctorWhen ?? "");
    setValue("surgeryWhen", data?.surgeryWhen ?? "");
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
          Factores de Risco
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            1. Gravidez(es):{" "}
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "pregnantYes" },
                { label: "NÃO", value: "pregnantNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quantas e se se verificaram complicações"
              registerReturn={register("pregnantHowMany")}
              error={errors.pregnantHowMany}
              type="text"
              disabled={!watch("riskFactors").includes("pregnantYes")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            2. Tabaco:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "tobaccoYes" },
                { label: "NÃO", value: "tobaccoNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, número de maços/ano:"
              registerReturn={register("tobaccoAmount")}
              error={errors.tobaccoAmount}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            3. Álcool:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "alcoholYes" },
                { label: "NÃO", value: "alcoholNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quantidade/dia:"
              registerReturn={register("alcoholAmount")}
              error={errors.alcoholAmount}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            4. Drogas(cannabis, cocaína, etc):
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "drugsYes" },
                { label: "NÃO", value: "drugsNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            5. Alguma vez foi hospitalizado:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "hospitalizedYes" },
                { label: "NÃO", value: "hospitalizedNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, porquê e quando:"
              registerReturn={register("hospitalizedWhen")}
              error={errors.hospitalizedWhen}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            6. Consultou médico nos últimos 12 meses:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "doctorVisitYes" },
                { label: "NÃO", value: "doctorVisitNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, porquê e quando:"
              registerReturn={register("visitedDoctorWhen")}
              error={errors.visitedDoctorWhen}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 whitespace-nowrap">
            7. Cirurgias:
            <CheckBox
              registerReturn={register("riskFactors")}
              error={errors.riskFactors}
              options={[
                { label: "SIM", value: "surgeryYes" },
                { label: "NÃO", value: "surgeryNo" },
              ]}
              numberOfColumnsGrid={2}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quais e quando:"
              registerReturn={register("surgeryWhen")}
              error={errors.surgeryWhen}
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

export default PhaseThree;
