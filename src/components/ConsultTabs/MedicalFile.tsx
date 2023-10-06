import { useRouter } from "next/router";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import type { z } from "zod";
import { api } from "~/utils/api";
import TextArea from "../Forms/Textarea";
import useMedicalFile from "../HookForms/useMedicalFile";

interface MedicalFileProps {
  emergencyConsultId: string;
}

const MedicalFile = ({ emergencyConsultId }: MedicalFileProps) => {
  const { data, isLoading, isFetchedAfterMount } =
    api.medicalFiles.getAllById.useQuery({
      emergencyConsultId: emergencyConsultId,
    });
  const mutation = api.medicalFiles.insertOrUpdate.useMutation();
  const router = useRouter();

  const { register, handleSubmit, errors, formSchema, setValue } =
    useMedicalFile();

  useEffect(() => {
    if (data) {
      setValue("app", data.app ?? "");
      setValue("apf", data.apf ?? "");
      setValue("hd", data.hd ?? "");
      setValue("hda", data.hda ?? "");
      setValue("treatment", data?.treatment ?? "");
    }
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          emergencyConsultId: emergencyConsultId,
        }),
        {
          loading: "A gravar...",
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Gravado com sucesso !",
        }
      )
      .catch((err) => console.log(err));
  };

  if (isLoading)
    return <div className="animate-pulse">A carregar dados...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Toaster />
      <div className="flex gap-4">
        <div className="w-1/2">
          <TextArea
            error={errors.app}
            name="Antecedentes Patológicos Pessoais"
            className="h-20 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            registerReturn={register("app")}
          />
        </div>
        <div className="w-1/2">
          <TextArea
            error={errors.apf}
            name="Antecedentes Patológicos Familiares"
            className="h-20 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            registerReturn={register("apf")}
          />
        </div>
      </div>
      <div className="w-full">
        <TextArea
          error={errors.hda}
          name="História da Doença Actual"
          className="h-40 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          registerReturn={register("hda")}
        />
      </div>
      <div className="w-full">
        <TextArea
          error={errors.hd}
          name="Hipótese Diagnóstica"
          className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          registerReturn={register("hd")}
        />
      </div>
      <div className="w-full">
        <TextArea
          error={errors.treatment}
          name="Tratamento"
          className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
          registerReturn={register("treatment")}
        />
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
