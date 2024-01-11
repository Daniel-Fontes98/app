import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { calculateAgeFormatYYYY } from "../ConsultTabs/UserInfo";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import toast, { Toaster } from "react-hot-toast";

interface PhaseOneProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  pacientName: z.string(),
  pacientAge: z.string(),
  pacientGender: z.string(),
  pacientHeight: z.string(),
  pacientWeight: z.string(),
  pacientBirthDate: z.string(),
  companyName: z.string(),
  pacientRole: z.string(),
});

const PhaseOne = (props: PhaseOneProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data, isFetchedAfterMount } = api.companyAppointment.getById.useQuery(
    {
      id: companyAppointmentId,
    }
  );

  const updateCompanyAppointmentMutation =
    api.companyAppointment.updateByIdCertificateForm.useMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("pacientName", data?.user.name ?? "");
    setValue(
      "pacientAge",
      data?.user.birthDate ? calculateAgeFormatYYYY(data.user.birthDate) : ""
    );
    setValue("pacientGender", data?.user.gender ?? "");
    setValue("pacientHeight", data?.triage?.height ?? "");
    setValue("pacientWeight", data?.triage?.weight ?? "");
    setValue("pacientBirthDate", data?.user.birthDate ?? "");
    setValue("companyName", data?.company.name ?? "");
    setValue("pacientRole", data?.companyRole ?? "");
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsButtonDisabled(true);

    await updateCompanyAppointmentMutation
      .mutateAsync({
        birthDate: data.pacientBirthDate,
        height: data.pacientHeight,
        weight: data.pacientWeight,
        name: data.pacientName,
        companyAppointmentId: companyAppointmentId,
        companyName: data.companyName,
        gender: data.pacientGender,
        role: data.pacientRole,
      })
      .then(() => props.setPhaseNumber(props.phaseNumber + 1))
      .catch((err) => {
        toast.error(`Ocorreu um erro: ${err}`);
        console.log(err);
      });
    setIsButtonDisabled(false);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster />
      <div className="flex w-3/4 justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Informações do Utente
        </h1>
      </div>
      <div className="grid w-3/4 grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          name="Nome"
          registerReturn={register("pacientName")}
          error={errors.pacientName}
          type="text"
        />
        <Input
          name="Idade"
          registerReturn={register("pacientAge")}
          error={errors.pacientAge}
          type="text"
          disabled={true}
        />
        <Input
          name="Data de Nascimento"
          registerReturn={register("pacientBirthDate")}
          error={errors.pacientBirthDate}
          type="date"
        />
      </div>
      <div className="grid w-3/4 grid-cols-1 gap-4 md:grid-cols-3">
        <Select
          name="Sexo"
          registerReturn={register("pacientGender")}
          error={errors.pacientGender}
          options={[
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
          ]}
        />
        <Input
          name="Peso"
          registerReturn={register("pacientWeight")}
          error={errors.pacientWeight}
          type="text"
        />
        <Input
          name="Altura"
          registerReturn={register("pacientHeight")}
          error={errors.pacientHeight}
          type="text"
        />
      </div>
      <div className="grid w-3/4 grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          name="Nome da Empresa"
          registerReturn={register("companyName")}
          error={errors.companyName}
          type="text"
        />
        <Input
          name="Função"
          registerReturn={register("pacientRole")}
          error={errors.pacientRole}
          type="text"
        />
      </div>
      <div className="mt-8 flex items-center justify-center gap-6">
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

export default PhaseOne;
