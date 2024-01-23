import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import Input from "./Input";
import Select from "./Select";
import { format } from "date-fns";

export const createCompanyAppointmentSchema = z.object({
  consultDate: z.coerce.date({
    required_error: "É necessário indicuar uma data",
  }),
  name: z
    .string({
      required_error: "É necessário indicar um nome",
    })
    .min(4, "Nome tem de conter no mínimo 4 caracteres"),
  gender: z.string({
    required_error: "É necessário indicar um sexo",
  }),
  nacionality: z.string({
    required_error: "É necessário indicar uma nacionalidade",
  }),
  birthDate: z.string().optional(),
  idNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  companyRole: z.string().optional(),
  companyName: z.string({
    required_error: "É necessário indicar o nome da empresa",
  }),
  companyIndustry: z.string({
    required_error: "É necessário indicar a industria",
  }),
  companyLocation: z.string({
    required_error: "É necessário indicar uma localização",
  }),
  examType: z.string().optional(),
  planType: z.string().optional(),
  addInfo: z.string().optional(),
});

const CreatePersonalAppointment = () => {
  const createAppointmentMutation =
    api.companyAppointment.insertOne.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<
    z.infer<typeof createCompanyAppointmentSchema>
  > = (data) => {
    toast
      .promise(
        createAppointmentMutation.mutateAsync({
          ...data,
          birthDate:
            data.birthDate && format(new Date(data.birthDate), "dd-MM-yyyy"),
        }),
        {
          error: (err) => `Ocorreu um erro: ${err}`,
          loading: "A carregar...",
          success: () => "Adicionado com sucesso!",
        }
      )
      .then(() => router.back())
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createCompanyAppointmentSchema>>({
    resolver: zodResolver(createCompanyAppointmentSchema),
  });

  return (
    <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className="flex gap-4">
        <Input
          error={errors.name}
          registerReturn={register("name")}
          type="text"
          name="Nome"
        />
        <Select
          error={errors.gender}
          registerReturn={register("gender")}
          name="Gênero"
          options={[
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
          ]}
        />
        <Input
          error={errors.nacionality}
          registerReturn={register("nacionality")}
          type="text"
          name="Nacionalidade"
        />
      </div>
      <div className="flex gap-4">
        <Input
          error={errors.birthDate}
          registerReturn={register("birthDate")}
          type="date"
          name="Data de Nascimento"
        />
        <Input
          error={errors.idNumber}
          registerReturn={register("idNumber")}
          type="text"
          name="Número de Identificação"
        />
        <Input
          error={errors.phoneNumber}
          registerReturn={register("phoneNumber")}
          type="text"
          name="Número de Telemóvel"
        />
      </div>
      <div className="flex w-full gap-4">
        <Input
          error={errors.companyRole}
          registerReturn={register("companyRole")}
          type="text"
          name="Função"
        />
        <Input
          error={errors.companyName}
          registerReturn={register("companyName")}
          type="text"
          name="Nome da Empresa"
        />
        <Input
          error={errors.companyIndustry}
          registerReturn={register("companyIndustry")}
          type="text"
          name="Indústria"
        />
      </div>
      <div className="flex w-full gap-4">
        <Input
          error={errors.companyLocation}
          registerReturn={register("companyLocation")}
          type="text"
          name="Localização"
        />
        <Input
          error={errors.planType}
          registerReturn={register("planType")}
          type="text"
          name="Tipo de Plano"
        />
        <Input
          error={errors.examType}
          registerReturn={register("examType")}
          type="text"
          name="Tipo de Exame"
        />
      </div>
      <div className="flex gap-4">
        <Input
          error={errors.consultDate}
          registerReturn={register("consultDate")}
          type="date"
          name="Data da Consulta"
        />
        <Input
          error={errors.addInfo}
          registerReturn={register("addInfo")}
          type="text"
          name="Informação Adicional"
        />
      </div>

      <div className="mb-10 mt-6 text-center">
        <button
          className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          Submeter
        </button>
      </div>
    </form>
  );
};

export default CreatePersonalAppointment;
