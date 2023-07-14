import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import useRelease from "~/components/Forms/useRelease";
import { convertDateString } from "~/utils/dates";

const PatientRelease = () => {
  const router = useRouter();
  const id = router.query.id;
  const mutation = api.release.insertOne.useMutation();
  const consult = api.emergencyConsults.getById.useQuery({
    id: id as string,
  }).data;
  const { isLoaded, isSignedIn } = useUser();
  const { register, handleSubmit, errors, formSchema } = useRelease();

  if (!isLoaded || !isSignedIn) return null;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      exitDate: convertDateString(data.exitDate),
      emergencyConsultId: id as string,
    });
    router.push("/emergencys/triage");
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
                <label
                  htmlFor="exitDate"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Data de saída
                </label>
                <input
                  id="exitDate"
                  type="date"
                  className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                  {...register("exitDate")}
                />
                {errors.exitDate && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.exitDate?.message}
                  </p>
                )}
              </div>
              <div className="md:ml-2">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="exitTime"
                >
                  Hora de saída
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                  id="exitTime"
                  type="time"
                  placeholder="Hospital..."
                  {...register("exitTime")}
                />
                {errors.exitTime && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {" "}
                    {errors.exitTime?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="addInfo"
              >
                Informação Adicional
              </label>
              <input
                className="focus:shadow-outline h-16 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                id="addInfo"
                type="text"
                {...register("addInfo")}
              />
              {errors.addInfo && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.addInfo?.message}
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

export default PatientRelease;
