import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  transportType: z.string({
    required_error: "É necessário escolher o transporte",
  }),
  whereTo: z
    .string({
      required_error: "É necessário escolher um destino",
    })
    .min(2, {
      message: "Minimo de dois caracteres",
    }),
  reason: z
    .string({
      required_error: "É necessário uma descrição",
    })
    .min(2, {
      message: "Minimo de dois caracteres",
    }),
});

const PatientTransfer = () => {
  const router = useRouter();
  const id = router.query.id;
  const mutation = api.emergencyTransfer.insertOne.useMutation();
  const consult = api.emergencyConsults.getById.useQuery({
    id: id as string,
  }).data;
  const { isLoaded, isSignedIn, user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      whereTo: "Prenda",
    },
  });

  if (!isLoaded || !isSignedIn) return null;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      emergencyConsultId: id as string,
      ...data,
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      orderBy: user.fullName!,
    });
    void router.push("/emergencys/triage");
  };

  if (consult) {
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
        <div className="mb-32 flex items-center justify-center">
          <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
            Transferir - {consult.user.name}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <form
            className="w-1/2 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-8 text-center text-3xl font-bold">
              Formulário de Transferência
            </h1>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mb-0 md:mr-2">
                <label
                  htmlFor="transportType"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Transporte
                </label>
                <select
                  id="transporteType"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("transportType")}
                >
                  <option value="Ambulancia">Ambulância</option>
                  <option value="Proprio">Proprio</option>
                </select>
                {errors.transportType && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.transportType?.message}
                  </p>
                )}
              </div>
              <div className="md:ml-2">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="whereTo"
                >
                  Destino
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                  id="whereTo"
                  type="text"
                  placeholder="Hospital..."
                  {...register("whereTo")}
                />
                {errors.whereTo && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.whereTo?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="adicionalInfo"
              >
                Informação Adicional
              </label>
              <input
                className="focus:shadow-outline h-16 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                id="adicionalInfo"
                type="text"
                {...register("reason")}
              />
              {errors.reason && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.reason?.message}
                </p>
              )}
            </div>
            <div className="mb-16 mt-8 text-center">
              <button
                className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Submeter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div className="animate-pulse">Loading....</div>;
  }
};

export default PatientTransfer;
