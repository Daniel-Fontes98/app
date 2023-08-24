import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { api } from "~/utils/api";
import useNurseFile from "../HookForms/useNurseFile";

interface NurseFileProps {
  emergencyConsultId: string;
}

const NurseFile = ({ emergencyConsultId }: NurseFileProps) => {
  const { data, isLoading } = api.nurseFiles.getAllById.useQuery({
    emergencyConsultId: emergencyConsultId,
  });
  const mutation = api.nurseFiles.insertOrUpdate.useMutation();
  const router = useRouter();

  const { register, handleSubmit, errors, formSchema } = useNurseFile();
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
    <form
      onSubmit={() => void handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="flex gap-4">
        <div className="w-full">
          <label className="mb-2 block text-lg text-emerald-600" htmlFor="app">
            Histórico de Enfermagem
          </label>
          <textarea
            id="app"
            className="h-60 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            defaultValue={!data ? "" : data.text ? data.text : ""}
            {...register("text")}
            required
          />
          {errors.text && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.text?.message}
            </p>
          )}
        </div>
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

export default NurseFile;
