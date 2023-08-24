import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { api } from "~/utils/api";
import useMedicalFile from "../HookForms/useMedicalFile";

interface MedicalFileProps {
  emergencyConsultId: string;
}

const MedicalFile = ({ emergencyConsultId }: MedicalFileProps) => {
  const { data, isLoading } = api.medicalFiles.getAllById.useQuery({
    emergencyConsultId: emergencyConsultId,
  });
  const mutation = api.medicalFiles.insertOrUpdate.useMutation();
  const router = useRouter();

  const { register, handleSubmit, errors, formSchema } = useMedicalFile();
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      emergencyConsultId: emergencyConsultId,
    });
    router.reload();
  };

  if (isLoading)
    return <div className="animate-pulse">A carregar dados...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="mb-2 block text-lg text-emerald-600" htmlFor="app">
            Antecedentes Patológicos Pessoais
          </label>
          <textarea
            id="app"
            className="h-20 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            defaultValue={!data ? "" : data.app ? data.app : ""}
            {...register("app")}
          />
          {errors.app && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.app?.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label className="mb-2 block text-lg text-emerald-600" htmlFor="apf">
            Antecedentes Patológicos Familiares
          </label>
          <textarea
            id="apf"
            className="h-20 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            defaultValue={!data ? "" : data.apf ? data.apf : ""}
            {...register("apf")}
          />
          {errors.apf && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.apf?.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full">
        <label className="mb-2 block text-lg text-emerald-600" htmlFor="hda">
          História da Doença Actual
        </label>
        <textarea
          id="hda"
          className="h-40 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          defaultValue={!data ? "" : data.hda ? data.hda : ""}
          {...register("hda")}
        />
        {errors.hda && (
          <p className="mt-2 text-xs italic text-red-500">
            {" "}
            {errors.hda?.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <label className="mb-2 block text-lg text-emerald-600" htmlFor="hd">
          Hipótese Diagnóstica
        </label>
        <textarea
          id="hd"
          className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          defaultValue={!data ? "" : data.hd ? data.hd : ""}
          {...register("hd")}
        />
        {errors.hd && (
          <p className="mt-2 text-xs italic text-red-500">
            {" "}
            {errors.hd?.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <label
          className="mb-2 block text-lg text-emerald-600"
          htmlFor="tratamento"
        >
          Tratamento
        </label>
        <textarea
          id="tratamento"
          className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          defaultValue={!data ? "" : data.treatment ? data.treatment : ""}
          {...register("treatment")}
        />
        {errors.treatment && (
          <p className="mt-2 text-xs italic text-red-500">
            {" "}
            {errors.treatment?.message}
          </p>
        )}
      </div>
      <div>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          type="submit"
        >
          Gravar
        </button>
      </div>
    </form>
  );
};

export default MedicalFile;
