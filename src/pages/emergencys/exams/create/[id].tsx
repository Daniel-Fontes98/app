import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import type { z } from "zod";
import Input from "~/components/Forms/Input";
import TextArea from "~/components/Forms/Textarea";
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
      toast.promise(
        mutation.mutateAsync({
          ...data,
          fileLocation: url[0],
          emergencyConsultId: emergencyConsultId as string,
        }),
        {
          loading: "A carregar",
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Adicionado com sucesso !",
        }
      );
    } else {
      toast.promise(
        mutation.mutateAsync({
          ...data,
          emergencyConsultId: emergencyConsultId as string,
        }),
        {
          loading: "A carregar",
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "",
        }
      );
    }
    void router.push(`/emergencys/consult/${emergencyConsultId as string}`);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <Toaster />
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Adicionar exame
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <Input
              error={errors.date}
              name="Data de realização"
              registerReturn={register("date")}
              type="date"
            />
          </div>
          <div className="w-full">
            <Input
              error={errors.hour}
              name="Hora de realização"
              registerReturn={register("hour")}
              type="time"
            />
          </div>
        </div>
        <div className="mt-4">
          <Input
            name="Tipo de Exame"
            error={errors.name}
            registerReturn={register("name")}
            type="name"
          />
        </div>
        <div className="mt-4">
          <TextArea
            error={errors.description}
            name="Descrição"
            registerReturn={register("description")}
            className="h-20 w-full rounded-md shadow-md"
          />
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
