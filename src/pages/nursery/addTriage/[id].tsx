import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";

const AddTriage = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { isLoading, data } = api.companyAppointment.getById.useQuery({
    id: companyAppointmentId,
  });

  const addTriageMutation = api.triage.insertOne.useMutation();
  const triageQuery = api.triage.getByCompanyAppointmentId.useQuery({
    companyAppointmentId,
  });

  const formSchema = z.object({
    arterialTension: z.string(),
    pulse: z.string(),
    weight: z.string(),
    height: z.string(),
    temperature: z.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("arterialTension", triageQuery.data?.arterialTension ?? "");
    setValue("pulse", triageQuery.data?.pulse ?? "");
    setValue("weight", triageQuery.data?.weight ?? "");
    setValue("height", triageQuery.data?.height ?? "");
    setValue("temperature", triageQuery.data?.temperature ?? "");
  }, [triageQuery.isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsButtonDisabled(true);
    toast
      .promise(
        addTriageMutation.mutateAsync({
          ...data,
          companyAppointmentId: companyAppointmentId,
        }),
        {
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Triagem adicionada com sucesso",
          loading: "A carregar...",
        }
      )
      .then(() => {
        router.back();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isLoading) {
    return <div className="animate-pulse">A carregar...</div>;
  } else {
    return (
      <div>
        <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
          <Toaster />
          <div className="mb-32 flex items-center justify-center">
            <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
              {data?.user.name}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <form
              className="w-3/4 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="mb-8 text-center text-3xl font-bold">Triagem</h1>
              <div className="flex w-full gap-4">
                <div className="mb-4 w-full">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="arterialTension"
                  >
                    Tensão Arterial
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                    id="arterialTension"
                    type="text"
                    {...register("arterialTension")}
                  />
                  {errors.arterialTension && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.arterialTension?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="pulse"
                  >
                    Pulso
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                    id="pulse"
                    type="text"
                    {...register("pulse")}
                  />
                  {errors.pulse && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.pulse?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="weight"
                  >
                    Peso
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                    id="weight"
                    type="text"
                    {...register("weight")}
                  />
                  {errors.weight && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.weight?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mb-4 w-1/3">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="height"
                  >
                    Altura
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                    id="height"
                    type="text"
                    {...register("height")}
                  />
                  {errors.height && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.height?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-1/3">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="temperature"
                  >
                    Temperatura
                  </label>

                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                    id="temperature"
                    type="text"
                    {...register("temperature")}
                  />
                  {errors.temperature && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.temperature?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-16 mt-8 text-center">
                <button
                  disabled={isButtonDisabled}
                  className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AddTriage;
