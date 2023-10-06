import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Input from "~/components/Forms/Input";
import useFileUploader from "~/components/Hooks/useFileUploader";
import { api } from "~/utils/api";

const AddExam = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { isLoading, data } = api.companyAppointment.getById.useQuery({
    id: companyAppointmentId,
  });
  const addExamMutation = api.labExams.insertOne.useMutation();
  const { onFileUploadChange, onUploadFile } = useFileUploader();

  const formSchema = z.object({
    examName: z
      .string({
        required_error: "É necessário fornecer um nome para o exame",
      })
      .min(2, "Minimo de caracteres não atingido"),
    addInfo: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsButtonDisabled(true);
    const url = await onUploadFile();
    if (typeof url === "object") {
      toast
        .promise(
          addExamMutation.mutateAsync({
            ...data,
            fileLocation: url[0]!,
            companyAppointmentId: companyAppointmentId,
          }),
          {
            error: (err) => `Ocorreu um erro: ${err}`,
            success: "Análise adicionada com sucesso",
            loading: "A carregar...",
          }
        )
        .then(() => {
          router.back();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast("Ficheiro inválido, por favor inserir outro ficheiro", {
        duration: 4000,
      });
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
              <h1 className="mb-8 text-center text-3xl font-bold">
                Anexar Análise
              </h1>
              <div className="mb-4">
                <Input
                  error={errors.examName}
                  registerReturn={register("examName")}
                  name="Nome da análise"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <Input
                  error={errors.addInfo}
                  registerReturn={register("addInfo")}
                  name="Informação Adicional"
                  type="text"
                />
              </div>
              <div className="mt-4">
                <input type="file" name="file" onChange={onFileUploadChange} />
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

export default AddExam;
