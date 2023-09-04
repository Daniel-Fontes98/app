import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import useExam from "~/components/HookForms/useExam";
import useFileUploader from "~/components/Hooks/useFileUploader";
import { api } from "~/utils/api";

const CreateExam = () => {
  const { errors, formSchema, handleSubmit, register } = useExam();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.medicalExams.insertOne.useMutation();
  const { onUploadFile, onFileUploadChange } = useFileUploader();

  if (!emergencyConsultId) {
    return <div>Ocorreu um erro </div>;
  }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const url = await onUploadFile();
    if (typeof url === "object") {
      mutation.mutate({
        ...data,
        fileLocation: url[0],
        emergencyConsultId: emergencyConsultId as string,
      });
    } else {
      mutation.mutate({
        ...data,
        emergencyConsultId: emergencyConsultId as string,
      });
    }
    void router.push(`/emergencys/consult/${emergencyConsultId as string}`);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Adicionar exame
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <label
              className="mb-2 block text-lg text-emerald-600"
              htmlFor="date"
            >
              Data de realização *
            </label>
            <input
              id="date"
              className="w-full rounded-md p-2 shadow-md"
              type="date"
              {...register("date")}
              required
            />
            {errors.date && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.date?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label
              className="mb-2 block text-lg text-emerald-600"
              htmlFor="hour"
            >
              Hora de realização *
            </label>
            <input
              id="hour"
              className="w-full rounded-md p-2 shadow-md"
              type="time"
              {...register("hour")}
              required
            />
            {errors.hour && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.hour?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="examType"
          >
            Tipo de Exame
          </label>
          <input
            id="examType"
            className=" w-full rounded-md p-2 shadow-md"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="description"
          >
            Descrição
          </label>
          <textarea
            id="description"
            className="h-20 w-full rounded-md shadow-md"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <input type="file" name="file" onChange={onFileUploadChange} />
        </div>

        <div className="float-right mt-4 w-full border-t-2 py-4">
          <button
            type="submit"
            className="float-right mt-4 rounded-full  bg-gradient-to-t from-teal-700 to-emerald-500 px-4 py-3 text-white"
          >
            Submeter
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
