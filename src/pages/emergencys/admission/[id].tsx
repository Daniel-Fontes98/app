import type { NextPage } from "next";
import { useRouter } from "next/router";
import { type SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { type z } from "zod";
import Input from "~/components/Forms/Input";
import useAdmission from "~/components/HookForms/useAdmission";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";

const AdmitPatientForm: NextPage = () => {
  const { errors, formSchema, handleSubmit, register } = useAdmission();
  const router = useRouter();
  const id = router.query.id;
  const mutation = api.admission.insertOne.useMutation();

  if (!id) {
    return <div>Ocorreu um erro</div>;
  }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          entryDate: convertDateString(data.entryDate),
          emergencyConsultId: id as string,
        }),
        {
          loading: "A carregar",
          error: `Ocorreu um erro por favor tentar novamente`,
          success: "",
        }
      )
      .then(() => void router.push(`/emergencys/consult/${id as string}`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <Toaster />
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Internamento
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <Input
            error={errors.entryDate}
            name="Data de internamento"
            registerReturn={register("entryDate")}
            type="date"
          />
          <Input
            error={errors.entryDate}
            name="Hora de internamento"
            registerReturn={register("entryTime")}
            type="time"
          />
        </div>
        <div className="mt-8">
          <Input
            error={errors.bedNumber}
            name="Cama número"
            registerReturn={register("bedNumber")}
            type="number"
          />
        </div>
        <div className="mt-8">
          <Input
            error={errors.description}
            name="Razão de internamento"
            registerReturn={register("description")}
            type="text"
          />
        </div>
        <div className="float-right mt-4 py-4">
          <button
            type="submit"
            className=" rounded-full bg-blue-900 px-8 py-4 text-white"
          >
            Submeter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmitPatientForm;
