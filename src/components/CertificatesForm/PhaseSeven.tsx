import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import TextArea from "../Forms/Textarea";

interface PhaseSevenProps {
  phaseNumber: number;
  setPhaseNumber: Dispatch<SetStateAction<number>>;
}

const formSchema = z.object({
  clinicExam: z.string().optional(),
});

const PhaseSeven = (props: PhaseSevenProps) => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data, isFetchedAfterMount } = api.riskFactors.getById.useQuery({
    companyAppointmentId,
  });

  const addRiskFactors = api.riskFactors.insertOrUpdate.useMutation();
  const createCertificate = api.certificate.createCertificate.useMutation();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("clinicExam", data?.clinicExam ?? "");
    setIsButtonDisabled(false);
  }, [isFetchedAfterMount]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    setIsButtonDisabled(true);
    try {
      await addRiskFactors.mutateAsync({
        ...userInput,
        companyAppointmentId: companyAppointmentId,
      });
      await createCertificate.mutateAsync({
        companyAppointmentId: companyAppointmentId,
      });
    } catch (err) {
      console.error(err);
      setIsButtonDisabled(false);
    }
    setIsButtonDisabled(false);
  };

  return (
    <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Exame Clínico
        </h1>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <TextArea
          name={
            "O paciente deve estar isento de qualquer sintomatologia neurológica, psíquica, cardiovascular,respiratória, abdominal, nefro-urológica, ORL, musculo-esquelética, cutânea, dentária (os dentes devem estar sãos ou tratados). Em caso de sintomas aparentes, queira especificar:"
          }
          registerReturn={register("clinicExam")}
          error={errors.clinicExam}
          className="focus:shadow-outline h-40  w-full  appearance-none rounded border text-sm leading-tight text-gray-700 focus:outline-none"
        />
      </div>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => props.setPhaseNumber(props.phaseNumber - 1)}
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Anterior
        </button>
        <div>{props.phaseNumber + 1} - 7</div>
        <button
          disabled={isButtonDisabled}
          type="submit"
          className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          SUBMETER
        </button>
      </div>
    </form>
  );
};

export default PhaseSeven;
