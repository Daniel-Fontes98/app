import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Input from "~/components/Forms/Input";
import { api } from "~/utils/api";

const AddTriage = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { isLoading, data } = api.companyAppointment.getById.useQuery({
    id: companyAppointmentId,
  });

  const markTriageMutation =
    api.companyAppointment.markTriageFilled.useMutation();
  const addTriageMutation = api.triage.insertOne.useMutation();
  const triageQuery = api.triage.getByCompanyAppointmentId.useQuery({
    companyAppointmentId,
  });

  const formSchema = z.object({
    arterialTension: z
      .string()
      .min(1, { message: "Por favor preencher este campo" }),
    pulse: z.string().min(1, { message: "Por favor preencher este campo" }),
    weight: z.string().min(1, { message: "Por favor preencher este campo" }),
    height: z.string().min(1, { message: "Por favor preencher este campo" }),
    temperature: z
      .string()
      .min(1, { message: "Por favor preencher este campo" }),
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

    try {
      await addTriageMutation.mutateAsync({
        ...data,
        companyAppointmentId: companyAppointmentId,
      });
      await markTriageMutation.mutateAsync({
        id: companyAppointmentId,
      });
      toast.success("Adicionado com sucesso !");
      router.back();
    } catch (err) {
      toast.error(`Ocorreu um erro, por favor tentar novamente`);
      console.log(err);
      setIsButtonDisabled(false);
    }
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
              <div className="mb-4  flex gap-4">
                <Input
                  name="Tensão Arterial"
                  error={errors.arterialTension}
                  registerReturn={register("arterialTension")}
                  type="text"
                />
                <Input
                  name="Pulso"
                  error={errors.pulse}
                  registerReturn={register("pulse")}
                  type="text"
                />
                <Input
                  name="Peso"
                  error={errors.weight}
                  registerReturn={register("weight")}
                  type="text"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  name="Altura"
                  error={errors.height}
                  registerReturn={register("height")}
                  type="text"
                />
                <Input
                  name="Temperatura"
                  error={errors.temperature}
                  registerReturn={register("temperature")}
                  type="text"
                />
                <div className="w-full"></div>
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
