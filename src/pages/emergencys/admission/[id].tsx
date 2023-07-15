import { NextPage } from "next";
import { useRouter } from "next/router";
import { type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import useAdmission from "~/components/Forms/useAdmission";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";

const AdmitPatientForm: NextPage = () => {
  const { errors, formSchema, handleSubmit, register } = useAdmission();
  const router = useRouter();
  const id = router.query.id;

  const mutation = api.admission.insertOne.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      entryDate: convertDateString(data.entryDate),
      emergencyConsultId: id as string,
    });

    void router.push("/emergencys/consult/" + id);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Internamento
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <label className="mb-2 block text-lg text-emerald-600">
              Data de internamento *aa
            </label>
            <input
              className="w-full rounded-md p-2 shadow-md"
              type="date"
              {...register("entryDate")}
              required
            />
            {errors.entryDate && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.entryDate?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="mb-2 block text-lg text-emerald-600">
              Hora de internamento *
            </label>
            <input
              className="w-full rounded-md p-2 shadow-md"
              type="time"
              {...register("entryTime")}
              required
            />
            {errors.entryTime && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.entryTime?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <label className="text-lg text-emerald-600">Cama número*</label>
          <input
            className="ml-2 rounded-md p-2 shadow-md"
            type="number"
            {...register("bedNumber")}
            required
          />
          {errors.bedNumber && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.bedNumber?.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <label
            className="mb'2 block text-lg text-emerald-600"
            htmlFor="description"
          >
            Razão de internamento
          </label>
          <textarea
            id="description"
            className="h-40 w-full rounded-md p-2 shadow-md"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.description?.message}
            </p>
          )}
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
