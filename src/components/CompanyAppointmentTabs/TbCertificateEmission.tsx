import { z } from "zod";
import Input from "../Forms/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { processString } from "../ConsultTabs/UrgencyConsumables";

const formSchema = z.object({
  doctorsName: z.string().min(3, "Por favor preencher este campo"),
  doctorsId: z.string().min(3, "Por favor preencher este campo"),
});

interface TbCertificateEmissionProps {
  companyAppointmentId: string;
}

const TbCertificateEmission = ({
  companyAppointmentId,
}: TbCertificateEmissionProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const createTbCertificate = api.tbCertificate.insertOrUpdate.useMutation();
  const { data, isFetchedAfterMount } = api.tbExams.getById.useQuery({
    companyAppointmentId: companyAppointmentId,
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!data?.tbCertificate) return;
    setValue("doctorsName", data.tbCertificate.doctorsName);
    setValue("doctorsId", data.tbCertificate.doctorsId);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (userInput) => {
    setIsButtonDisabled(true);
    void toast.promise(
      createTbCertificate.mutateAsync({
        companyAppointmentId: companyAppointmentId,
        doctorsName: userInput.doctorsName,
        doctorsId: userInput.doctorsId,
      }),
      {
        error: `Ocorreu um erro por favor tentar novamente`,
        success: `Certificado de Tb criado com sucesso`,
        loading: `A criar certificado`,
      }
    );
    setIsButtonDisabled(false);
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-start">
        <h1 className="text-lg text-emerald-600">
          Emissão do Certificado de Tb
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-10 py-4 shadow-md"
      >
        <Input
          name="Nome do médico:"
          error={errors.doctorsName}
          registerReturn={register("doctorsName")}
          type="text"
        />
        <div className="flex w-full items-center gap-4">
          <Input
            name="Número da ordem dos médicos:"
            error={errors.doctorsId}
            registerReturn={register("doctorsId")}
            type="text"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Emitir Certificado Tb
          </button>
          {!data ? (
            <></>
          ) : (
            <a
              href={processString(data?.fileLocation)}
              className="mb-2 mr-2 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              target="_blank"
              download
            >
              Ver Exame Tb
            </a>
          )}
          {!data?.tbCertificate ? (
            <></>
          ) : (
            <a
              href={processString(data?.tbCertificate.fileLocation)}
              className="mb-2 mr-2 rounded-lg bg-lime-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-lime-800 focus:outline-none focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
              target="_blank"
              download
            >
              Ver Certificado Tb
            </a>
          )}
        </div>
      </form>
    </>
  );
};

export default TbCertificateEmission;
