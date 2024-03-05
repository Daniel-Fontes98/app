import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Input from "~/components/Forms/Input";
import Radio from "~/components/Forms/Radio";
import { api } from "~/utils/api";

const BackToWork = () => {
  //const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const backToWorkMutation =
    api.certificate.createBackToWorkCertificate.useMutation();

  const formSchema = z.object({
    username: z.string(),
    birthDate: z.string(),
    company: z.string(),
    role: z.string(),
    finalState: z.string(),
    location: z.string(),
    assistantDoctor: z.string(),
    oma: z.string(),
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    userInput
  ) => {
    //setIsButtonDisabled(true);
    console.log("hello");
    try {
      await backToWorkMutation
        .mutateAsync({
          ...userInput,
        })
        .then(() => {
          toast.success("Criado com sucesso !");
        });
    } catch (err) {
      toast.error("Ocorreu um erro, por favor tentar novamente");
      console.error(err);
      //setIsButtonDisabled(false);
    }
    //setIsButtonDisabled(false);
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
          name="Nome do utente:"
          error={errors.username}
          registerReturn={register("username")}
          type="text"
        />
        <div className="flex w-full items-center gap-4">
          <Input
            name="Data de Nascimento:"
            error={errors.birthDate}
            registerReturn={register("birthDate")}
            type="text"
          />
          <Input
            name="Empresa:"
            error={errors.company}
            registerReturn={register("company")}
            type="text"
          />
          <Input
            name="Função:"
            error={errors.role}
            registerReturn={register("role")}
            type="text"
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <Input
            name="Nome do médico:"
            error={errors.birthDate}
            registerReturn={register("assistantDoctor")}
            type="text"
          />
          <Input
            name="Número da ordem:"
            error={errors.company}
            registerReturn={register("oma")}
            type="text"
          />
        </div>

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

export default BackToWork;
