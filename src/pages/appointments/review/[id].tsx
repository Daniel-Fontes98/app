import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";

const ReviewCompanyAppointment = () => {
  const router = useRouter();
  const appointmentId = router.query.id as string;
  const companyAppointmentQuery = api.companyAppointment.getById.useQuery({
    id: appointmentId,
  });

  const { mutateAsync, isLoading } =
    api.companyAppointment.updateByIdAndMarkPresent.useMutation();

  const formSchema = z.object({
    name: z.string({
      required_error: "É necessário indicar um nome",
    }),
    gender: z.string({
      required_error: "É necessário indicar um genero",
    }),
    nacionality: z.string({
      required_error: "É necessário indicar uma nacionalidade",
    }),
    birthDate: z.string({
      required_error: "É necessário indicar uma data de nascimento",
    }),
    idNumber: z.string({
      required_error: "É necessário indicar um número de BI",
    }),
    number: z
      .string({
        required_error: "É necessário indicar um número",
      })
      .min(9, "O número tem de conter no mínimo 9 caracteres"),
    companyRole: z.string({
      required_error: "É necessário indicar a função",
    }),
    planType: z
      .string({
        required_error: "É necessário indicar o plano do utente",
      })
      .min(2, "É necessário que o plano tenha mais de dois caracteres"),
    companyName: z.string({
      required_error: "É necessário indicar o nome da empresa",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("name", companyAppointmentQuery.data?.user.name!);
    setValue("gender", companyAppointmentQuery.data?.user.gender!);
    setValue("nacionality", companyAppointmentQuery.data?.user.nacionality!);
    setValue("birthDate", companyAppointmentQuery.data?.user.birthDate!);
    setValue("idNumber", companyAppointmentQuery.data?.user.idNumber!);
    setValue("number", companyAppointmentQuery.data?.user.number!);
    setValue("companyRole", companyAppointmentQuery.data?.companyRole!);
    setValue("planType", companyAppointmentQuery.data?.planType!);
    setValue("companyName", companyAppointmentQuery.data?.company.name!);
  }, [companyAppointmentQuery.isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutateAsync({
          id: appointmentId,
          date: companyAppointmentQuery.data?.date!,
          ...data,
        }),
        {
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Utilizador carregado com sucesso",
          loading: "A carregar...",
        }
      )
      .then(() => {
        router.back();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 ">
      <div className="flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Revisão de Agendamento
        </div>
      </div>
      <div className="mt-16 flex items-center justify-center">
        <section className=" w-5/6 rounded-2xl bg-white  px-8 py-6 shadow-2xl">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Informação do Utente
          </h1>
          <form
            className=" flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="companyRole"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Função
                </label>
                <input
                  id="companyRole"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("companyRole")}
                />
                {errors.companyRole && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.companyRole?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Sexo
                </label>
                <input
                  id="gender"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("gender")}
                />
                {errors.gender && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.gender?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nacionality"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Nacionalidade
                </label>
                <input
                  id="nacionality"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("nacionality")}
                />
                {errors.nacionality && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.nacionality?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="planType"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Tipo de Plano
                </label>
                <input
                  id="planType"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("planType")}
                />
                {errors.planType && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.planType?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="birthDate"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Data de Nascimento
                </label>
                <input
                  id="birthDate"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("birthDate")}
                />
                {errors.birthDate && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.birthDate?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="idNumber"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Número de Identificação
                </label>
                <input
                  id="idNumber"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("idNumber")}
                />
                {errors.idNumber && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.idNumber?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Número de telemóvel
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
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Empresa
                </label>
                <input
                  id="companyName"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.companyName?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-10 mt-6 text-center">
              <button
                className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
                disabled={isLoading}
              >
                Marcar Presença
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ReviewCompanyAppointment;
