import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import Input from "./Input";

const CreatePersonalAppointment = () => {
  const createPersonalAppointment =
    api.personalAppointment.insertOne.useMutation();
  const router = useRouter();
  const formSchema = z.object({
    name: z
      .string({
        required_error: "É necessário indicar um nome",
      })
      .min(4, "Nome tem de conter no mínimo 4 caracteres"),
    consultDate: z.coerce.date({
      required_error: "É necessário indicar um data",
    }),
    number: z
      .string({
        required_error: "É necessário indicar um número",
      })
      .min(9, "O número tem de conter no mínimo 9 caracteres"),
    consultType: z
      .string({
        required_error: "É necessário indicar uma especialidade",
      })
      .min(3, "Especialidade tem de conter no mínimo 3 caraceres"),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        createPersonalAppointment.mutateAsync({
          appointmentDate: data.consultDate,
          consultType: data.consultType,
          name: data.name,
          number: data.number,
        }),
        {
          loading: "A carregar...",
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Adicionado com sucesso!",
        }
      )
      .then(() => router.push("/appointments"))
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form className=" flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <Input
        name="Nome"
        error={errors.name}
        registerReturn={register("name")}
        type="text"
      />
      <div className="flex w-full justify-center gap-6 ">
        <div className="flex-grow">
          <Input
            name="Data da Consulta"
            error={errors.consultDate}
            registerReturn={register("consultDate")}
            type="date"
          />
        </div>
        <div className="flex-grow">
          <Input
            name="Número"
            error={errors.number}
            registerReturn={register("number")}
            type="text"
          />
        </div>
        <div className="flex-grow">
          <Input
            name="Especialidade"
            error={errors.consultType}
            registerReturn={register("consultType")}
            type="text"
          />
        </div>
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
