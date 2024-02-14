import { z } from "zod";
import Input from "../Forms/Input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../Forms/Textarea";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Radio from "../Forms/Radio";
import { format } from "date-fns";

const formSchema = z.object({
  assistantDoctorName: z.string().min(3, "Por favor preencher este campo"),
  assistantDoctorNumber: z.string().min(3, "Por favor preencher este campo"),
  examValidUntil: z.string().min(3, "Por favor preencher este campo"),
  finalState: z.string(),
  location: z.string(),
  clinicExam: z.string().optional(),
});

interface CertificateEmissionProps {
  companyAppointmentId: string;
}

const CertificateEmission = ({
  companyAppointmentId,
}: CertificateEmissionProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const addCertificateInfo = api.certificate.insertOrUpdate.useMutation();
  const createCertificate = api.certificate.createCertificate.useMutation();
  const { data, isFetchedAfterMount } = api.certificate.getById.useQuery({
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
    if (!data) return;
    setValue("assistantDoctorName", data.assistantDoctorName);
    setValue("assistantDoctorNumber", data.assistantDoctorNumber);
    setValue("examValidUntil", data.examValidUntil);
    setValue("clinicExam", data.clinicExam ?? "");
    setValue("finalState", data.finalState);
    setValue("location", data.location ?? "");
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    setIsButtonDisabled(true);
    try {
      await addCertificateInfo.mutateAsync({
        ...userInput,
        examValidUntil: format(
          new Date(userInput.examValidUntil),
          "dd-MM-yyyy"
        ),
        companyAppointmentId: companyAppointmentId,
      });
      await createCertificate
        .mutateAsync({
          companyAppointmentId: companyAppointmentId,
        })
        .then(() => {
          toast.success("Criado com sucesso !");
        });
    } catch (err) {
      toast.error("Ocorreu um erro, por favor tentar novamente");
      console.error(err);
      setIsButtonDisabled(false);
    }
    setIsButtonDisabled(false);
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-start">
        <h1 className="text-lg text-emerald-600">Emissão do Certificado</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-10 py-4 shadow-md"
      >
        <Input
          name="Nome do médico:"
          error={errors.assistantDoctorName}
          registerReturn={register("assistantDoctorName")}
          type="text"
        />
        <div className="flex w-full items-center gap-4">
          <Input
            name="Número da ordem dos médicos:"
            error={errors.assistantDoctorNumber}
            registerReturn={register("assistantDoctorNumber")}
            type="text"
          />
          <Input
            name="Exame válido até:"
            error={errors.examValidUntil}
            registerReturn={register("examValidUntil")}
            type="date"
          />
        </div>
        <TextArea
          name={
            "O paciente deve estar isento de qualquer sintomatologia neurológica, psíquica, cardiovascular,respiratória, abdominal, nefro-urológica, ORL, musculo-esquelética, cutânea, dentária (os dentes devem estar sãos ou tratados). Em caso de sintomas aparentes, queira especificar:"
          }
          registerReturn={register("clinicExam")}
          error={errors.clinicExam}
          className="focus:shadow-outline h-40 w-full appearance-none  whitespace-pre-line rounded border text-sm leading-tight text-gray-700 focus:outline-none"
        />
        <div className="flex w-full">
          <Radio
            name="Avaliação:"
            options={[
              { label: "Apto", value: "fitCheck" },
              {
                label: "Inapto Temporariamente",
                value: "tempUnfitCheck",
              },
              {
                label: "Inapto Definitivamente",
                value: "defUnfitCheck",
              },
            ]}
            error={errors.finalState}
            registerReturn={register("finalState")}
          />
          <div className="flex w-full justify-center">
            <Radio
              name="Localização:"
              options={[
                { label: "Onshore", value: "onShoreCheck" },
                {
                  label: "Offshore",
                  value: "offShoreCheck",
                },
                { label: "N/D", value: "N/D" },
              ]}
              error={errors.location}
              registerReturn={register("location")}
            />
          </div>
        </div>
        <div>
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Emitir Certificado
          </button>
        </div>
      </form>
    </>
  );
};

export default CertificateEmission;
