import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import useRelease from "~/components/HookForms/useRelease";
import { convertDateString } from "~/utils/dates";
import Input from "~/components/Forms/Input";

const PatientRelease = () => {
  const router = useRouter();
  const id = router.query.id;
  const mutation = api.release.insertOne.useMutation();
  const consult = api.emergencyConsults.getById.useQuery({
    id: id as string,
  }).data;
  const { isLoaded, isSignedIn } = useUser();
  const { register, handleSubmit, errors, formSchema } = useRelease();

  if (!isLoaded || !isSignedIn || !id) return null;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      exitDate: convertDateString(data.exitDate),
      emergencyConsultId: id as string,
    });
    void router.push(`/emergencys/analytics/${id as string}`);
  };

  if (consult) {
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-100  ">
        <div className="mb-24 flex items-center justify-center">
          <div className=" whitespace-nowrap rounded-b-2xl bg-emerald-600 px-4 py-2 text-center text-white">
            Emitir alta - {consult.user.name}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <form
            className="w-1/2 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-8 text-center text-3xl font-bold">
              Formulário de Alta
            </h1>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mb-0 md:mr-2">
                <Input
                  error={errors.exitDate}
                  name="Data de saída"
                  registerReturn={register("exitDate")}
                  type="date"
                />
              </div>
              <div className="md:ml-2">
                <Input
                  error={errors.exitTime}
                  name="Hora de saída"
                  registerReturn={register("exitTime")}
                  type="time"
                />
              </div>
            </div>
            <div className="mb-4">
              <Input
                error={errors.addInfo}
                name="Informação Adicional"
                registerReturn={register("addInfo")}
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

export default PatientRelease;
