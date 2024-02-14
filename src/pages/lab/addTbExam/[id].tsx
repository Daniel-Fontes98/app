import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import useFileUploader from "~/components/Hooks/useFileUploader";
import { api } from "~/utils/api";

const AddTbExam = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { isLoading, data } = api.companyAppointment.getById.useQuery({
    id: companyAppointmentId,
  });
  const addExamMutation = api.tbExams.insertOne.useMutation();
  const { onFileUploadChange, onUploadFile } = useFileUploader();

  const formSchema = z.object({
    testResult: z.string({
      invalid_type_error: "Por favor selecionar uma das opções",
    }),
    testType: z.string({
      invalid_type_error: "Por favor selecionar uma das opções",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const CheckboxesArrayResult = [
    { label: "Positivo", value: "Positivo" },
    { label: "Negativo", value: "Negativo" },
  ];

  const CheckboxesArrayType = [
    {
      label: "Teste IGRA para Tuberculose do tipo QuantiFERON-TB Gold (QFT)",
      value: "Teste IGRA para Tuberculose do tipo QuantiFERON-TB Gold (QFT)",
    },
    { label: "Teste TB-Ag", value: "Teste TB-Ag" },
  ];

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
            error: `Ocorreu um erro por favor tentar novamente`,
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
                Anexar Exame Tuberculose
              </h1>
              <div className="mt-2 flex w-full flex-col">
                <div>
                  <span className="text-md font-bold text-gray-700">
                    Tipo de Teste elaborado:
                  </span>
                </div>
                <div className="mt-2 flex flex-col justify-start gap-4">
                  {CheckboxesArrayType.map(({ label, value }, idx) => (
                    <label key={idx}>
                      <input
                        className="mr-2 rounded-md  accent-emerald-600"
                        value={value}
                        type="radio"
                        {...register("testType")}
                      />
                      <span className="font-medium text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.testType && (
                  <p className="mt-2 whitespace-normal text-xs italic text-red-500">
                    {" "}
                    {errors.testType.message}
                  </p>
                )}
              </div>
              <div className="mt-8 flex w-full flex-col">
                <div>
                  <span className="text-md font-bold text-gray-700">
                    Resultado do Teste:
                  </span>
                </div>
                <div className="mt-2 flex justify-start gap-4">
                  {CheckboxesArrayResult.map(({ label, value }, idx) => (
                    <label key={idx}>
                      <input
                        className="mr-2 rounded-md  accent-emerald-600"
                        value={value}
                        type="radio"
                        {...register("testResult")}
                      />
                      <span className="font-medium text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.testType && (
                  <p className="mt-2 whitespace-normal text-xs italic text-red-500">
                    {" "}
                    {errors.testType.message}
                  </p>
                )}
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

export default AddTbExam;
