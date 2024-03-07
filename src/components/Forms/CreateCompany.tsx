import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import Input from "./Input";

const CreatePersonalAppointment = () => {
  const createCompanyMutation = api.company.insertOne.useMutation();
  const router = useRouter();

  const createCompanySchema = z.object({
    name: z
      .string({
        required_error: "É necessário indicar um nome",
      })
      .min(4, "Nome tem de conter no mínimo 4 caracteres"),
    industry: z.string({
      required_error: "É necessário indicar a industria",
    }),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createCompanySchema>> = (
    data
  ) => {
    toast
      .promise(
        createCompanyMutation.mutateAsync({
          ...data,
        }),
        {
          error: `Ocorreu um erro por favor tentar novamente`,
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
  } = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
  });

  return (
    <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <Input
        error={errors.name}
        registerReturn={register("name")}
        type="text"
        name="Nome da empresa"
      />
      <Input
        error={errors.industry}
        registerReturn={register("industry")}
        type="text"
        name="Industria"
      />

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
