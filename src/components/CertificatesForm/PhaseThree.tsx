import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import InputInLine from "../Forms/InputInLine";
import Radio from "../Forms/Radio";
import toast, { Toaster } from "react-hot-toast";

interface PhaseThreeProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  isPregnant: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isSmoking: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  isDrinking: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  doesDrugs: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  wasHospitalized: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  wentToDoctor: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
  didSurgery: z
    .string({
      required_error: "Por favor selecionar uma das opções",
    })
    .min(1, { message: "Por favor selecionar uma das opções" }),
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

  const addRiskFactors = api.riskFactors.insertOrUpdatePhaseThree.useMutation();
  const { data, isFetchedAfterMount } =
    api.riskFactors.getByIdPhaseThree.useQuery({
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
    setIsButtonDisabled(true);
    setValue("isPregnant", data?.isPregnant ?? "");
    setValue("isSmoking", data?.isSmoking ?? "");
    setValue("isDrinking", data?.isDrinking ?? "");
    setValue("doesDrugs", data?.doesDrugs ?? "");
    setValue("wasHospitalized", data?.wasHospitalized ?? "");
    setValue("wentToDoctor", data?.wentToDoctor ?? "");
    setValue("didSurgery", data?.didSurgery ?? "");
    setValue("pregnantHowMany", data?.pregnantHowMany ?? "");
    setValue("tobaccoAmount", data?.tobaccoAmount ?? "");
    setValue("alcoholAmount", data?.alcoholAmount ?? "");
    setValue("hospitalizedWhen", data?.hospitalizedWhen ?? "");
    setValue("visitedDoctorWhen", data?.visitedDoctorWhen ?? "");
    setValue("surgeryWhen", data?.surgeryWhen ?? "");
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    setIsButtonDisabled(true);
    await addRiskFactors
      .mutateAsync({
        ...userInput,
        companyAppointmentId: companyAppointmentId,
      })
      .then(() => props.setPhaseNumber(props.phaseNumber + 1))
      .catch((err) => toast.error(`Ocorreu um erro: ${err}`));
    setIsButtonDisabled(false);
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Factores de Risco
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            1. Gravidez(es):{" "}
            <Radio
              registerReturn={register("isPregnant")}
              error={errors.isPregnant}
              options={[
                { label: "SIM", value: "pregnantYes" },
                { label: "NÃO", value: "pregnantNo" },
              ]}
              name={""}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quantas e se se verificaram complicações"
              registerReturn={register("pregnantHowMany")}
              error={errors.pregnantHowMany}
              type="text"
              disabled={watch("isPregnant") !== "pregnantYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            2. Tabaco:
            <Radio
              registerReturn={register("isSmoking")}
              error={errors.isSmoking}
              options={[
                { label: "SIM", value: "tobaccoYes" },
                { label: "NÃO", value: "tobaccoNo" },
              ]}
              name={""}
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, número de maços/ano:"
              registerReturn={register("tobaccoAmount")}
              error={errors.tobaccoAmount}
              type="text"
              disabled={watch("isSmoking") !== "tobaccoYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            3. Álcool:
            <Radio
              registerReturn={register("isDrinking")}
              error={errors.isDrinking}
              options={[
                { label: "SIM", value: "alcoholYes" },
                { label: "NÃO", value: "alcoholNo" },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quantidade/dia:"
              registerReturn={register("alcoholAmount")}
              error={errors.alcoholAmount}
              type="text"
              disabled={watch("isDrinking") !== "alcoholYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            4. Drogas(cannabis, cocaína, etc):
            <Radio
              registerReturn={register("doesDrugs")}
              error={errors.doesDrugs}
              options={[
                { label: "SIM", value: "drugsYes" },
                { label: "NÃO", value: "drugsNo" },
              ]}
              name=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            5. Alguma vez foi hospitalizado:
            <Radio
              registerReturn={register("wasHospitalized")}
              error={errors.wasHospitalized}
              options={[
                { label: "SIM", value: "hospitalizedYes" },
                { label: "NÃO", value: "hospitalizedNo" },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, porquê e quando:"
              registerReturn={register("hospitalizedWhen")}
              error={errors.hospitalizedWhen}
              type="text"
              disabled={watch("wasHospitalized") !== "hospitalizedYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            6. Consultou médico nos últimos 12 meses:
            <Radio
              registerReturn={register("wentToDoctor")}
              error={errors.wentToDoctor}
              options={[
                { label: "SIM", value: "doctorVisitYes" },
                { label: "NÃO", value: "doctorVisitNo" },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, porquê e quando:"
              registerReturn={register("visitedDoctorWhen")}
              error={errors.visitedDoctorWhen}
              type="text"
              disabled={watch("wentToDoctor") !== "doctorVisitYes"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            7. Cirurgias:
            <Radio
              registerReturn={register("didSurgery")}
              error={errors.didSurgery}
              options={[
                { label: "SIM", value: "surgeryYes" },
                { label: "NÃO", value: "surgeryNo" },
              ]}
              name=""
            />
          </div>
          <div className="flex items-center justify-end gap-4 whitespace-nowrap">
            <InputInLine
              name="Se SIM, quais e quando:"
              registerReturn={register("surgeryWhen")}
              error={errors.surgeryWhen}
              type="text"
              disabled={watch("didSurgery") !== "surgeryYes"}
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
        <div>{props.phaseNumber + 1} - 6</div>
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
          <span>Próximo</span>
        </button>
      </div>
    </form>
  );
};

export default PhaseThree;
