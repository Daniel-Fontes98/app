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

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setIsButtonDisabled(true);
    updateCompanyAppointmentMutation
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
        toast.error(`Ocorreu um erro: ${err}`)
        console.log(err)
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
      <div className="flex w-3/4 gap-4">
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
      <div className="flex w-3/4 gap-4">
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
      <div className="flex w-3/4 gap-4">
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
        <div>{props.phaseNumber + 1} - 7</div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Próximo
        </button>
      </div>
    </form>
  );
};

export default PhaseOne;
