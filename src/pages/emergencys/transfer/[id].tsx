import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Select from "~/components/Forms/Select";
import Input from "~/components/Forms/Input";
import { toast, Toaster } from "react-hot-toast";

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
    toast.promise(
      mutation.mutateAsync({
        ...data,
        emergencyConsultId: id as string,
        orderBy: user.fullName!,
      }),
      {
        loading: "A carregar...",
        error: (err) => `Ocorreu um erro: ${err}`,
        success: "Submetido com sucesso !",
      }
    );

    void router.push("/emergencys/triage");
  };

  if (consult) {
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
        <Toaster />
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
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <Select
                  error={errors.transportType}
                  name="Transporte"
                  registerReturn={register("transportType")}
                  options={[
                    { label: "Ambulância", value: "Ambulancia" },
                    { label: "Próprio", value: "Proprio" },
                  ]}
                />
              </div>

              <div className="w-1/2">
                <Input
                  error={errors.whereTo}
                  name="Destino"
                  registerReturn={register("whereTo")}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-4">
              <Input
                error={errors.reason}
                name="Informação Adicional"
                registerReturn={register("reason")}
                type="text"
              />
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
