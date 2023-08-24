import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";

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
    createPersonalAppointment.mutate({
      appointmentDate: data.consultDate,
      consultType: data.consultType,
      name: data.name,
      number: data.number,
    });
    toast("Adicionado com sucesso");
    void router.push("/appointments");
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
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Nome
        </label>
        <input
          id="name"
          className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-2 text-xs italic text-red-500">
            {" "}
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="flex w-full justify-center gap-6 ">
        <div className="flex-grow">
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Data da Consulta
          </label>
          <input
            id="date"
            type="date"
            className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
            {...register("consultDate")}
          />
          {errors.consultDate && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.consultDate?.message}
            </p>
          )}
        </div>
        <div className="flex-grow">
          <label
            htmlFor="number"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Número
          </label>
          <input
            id="number"
            className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
            {...register("number")}
          />
          {errors.number && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.number?.message}
            </p>
          )}
        </div>
        <div className="flex-grow">
          <label
            htmlFor="consultType"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Especialidade
          </label>
          <input
            id="consultType"
            className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
            {...register("consultType")}
          />
          {errors.consultType && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.consultType?.message}
            </p>
          )}
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
