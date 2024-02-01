import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";

interface MedicalFileProps {
  app: string | null;
  apf: string | null;
  etilicHabits: string | null;
  tobaccoHabits: string | null;
  surgerys: string | null;
  allergys: string | null;
  admissions: string | null;
  epis: string | null;
  workTime: string | null;
  workAcident: string | null;
  companyAppointmentId: string;
}

const MedicalFile = (props: MedicalFileProps) => {
  const mutation =
    api.companyAppointmentMedicalFile.insertOrUpdate.useMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formSchema = z.object({
    app: z.string().optional(),
    apf: z.string().optional(),
    etilicHabits: z.string().optional(),
    tobaccoHabits: z.string().optional(),
    surgerys: z.string().optional(),
    allergys: z.string().optional(),
    admissions: z.string().optional(),
    epis: z.string().optional(),
    workTime: z.string().optional(),
    workAcident: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      app: props.app ?? "",
      apf: props.apf ?? "",
      etilicHabits: props.etilicHabits ?? "",
      tobaccoHabits: props.tobaccoHabits ?? "",
      surgerys: props.surgerys ?? "",
      allergys: props.allergys ?? "",
      admissions: props.admissions ?? "",
      epis: props.epis ?? "",
      workTime: props.workTime ?? "",
      workAcident: props.workAcident ?? "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsButtonDisabled(true);
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          companyAppointmentId: props.companyAppointmentId,
        }),
        {
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Ficha alterada com sucesso",
          loading: "A carregar...",
        }
      )
      .then()
      .catch((err) => console.log(err));
    setIsButtonDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <Toaster />
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="mb-2 block text-lg text-emerald-600" htmlFor="app">
            Antecedentes Patológicos Pessoais
          </label>
          <textarea
            id="app"
            className="h-20 w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
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
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="etilicHabits"
          >
            Hábitos Etílicos
          </label>
          <input
            id="etilicHabits"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("etilicHabits")}
          />
          {errors.etilicHabits && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.etilicHabits?.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="tobaccoHabits"
          >
            Hábitos Tabágicos
          </label>
          <input
            id="tobaccoHabits"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("tobaccoHabits")}
          />
          {errors.tobaccoHabits && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.tobaccoHabits?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/3">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="Cirurgias"
          >
            Cirurgias
          </label>
          <textarea
            id="Cirurgias"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("surgerys")}
          />
          {errors.surgerys && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.surgerys?.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="Alergias"
          >
            Alergias
          </label>
          <textarea
            id="Alergias"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("allergys")}
          />
          {errors.allergys && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.allergys?.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="Internamentos"
          >
            Internamentos
          </label>
          <textarea
            id="Internamentos"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("admissions")}
          />
          {errors.admissions && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.admissions?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/3">
          <label className="mb-2 block text-lg text-emerald-600" htmlFor="EPIs">
            EPIs
          </label>
          <textarea
            id="EPIs"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("epis")}
          />
          {errors.epis && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.epis?.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="tempoDeTrabalho"
          >
            Tempo de Trabalho
          </label>
          <textarea
            id="tempoDeTrabalho"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("workTime")}
          />
          {errors.workTime && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.workTime?.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <label
            className="mb-2 block text-lg text-emerald-600"
            htmlFor="Acidente de Trabalho"
          >
            Acidente de Trabalho
          </label>
          <textarea
            id="Acidente de Trabalho"
            className="w-full whitespace-pre-line rounded-md p-2 shadow-md focus:outline-0"
            {...register("workAcident")}
          />
          {errors.workAcident && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.workAcident?.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          type="submit"
          disabled={isButtonDisabled}
        >
          Gravar
        </button>
      </div>
    </form>
  );
};

export default MedicalFile;
