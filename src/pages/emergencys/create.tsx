import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import type { z } from "zod";
import Input from "~/components/Forms/Input";
import Radio from "~/components/Forms/Radio";
import Select from "~/components/Forms/Select";
import useEmergency from "~/components/HookForms/useEmergency";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";
import { genders } from "~/utils/genders";
import { insuranceList } from "~/utils/insurancesList";

const CreateUrgencyForm = () => {
  const mutation = api.emergencyConsults.createConsult.useMutation();
  const router = useRouter();
  const { register, handleSubmit, errors, formSchema, watch } = useEmergency();
  const insurance = watch("insuranceName");

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          birthDate: convertDateString(data.birthDate),
          entryDate: convertDateString(data.entryDate),
        }),
        {
          loading: "A carregar...",
          error: `Ocorreu um erro por favor tentar novamente`,
          success: "Submetido com sucesso !",
        }
      )
      .then(() => void router.push("/emergencys/triage/awaiting"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Toaster />
      <div className="bg-slate-100">
        <div className="ml-40 mr-40 min-h-screen items-center justify-center ">
          <div className="flex w-full  flex-col ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center ">
                <div className="flex w-full justify-center rounded-b-2xl bg-emerald-600  py-6 text-2xl text-white">
                  Formulário de Admissão Urgências
                </div>
              </div>
              <div className="ml-12 mr-12 mt-14 grid grid-cols-2 gap-12">
                <Input
                  error={errors.entryDate}
                  name="Data"
                  registerReturn={register("entryDate")}
                  type="date"
                />
                <Input
                  error={errors.entryTime}
                  name="Hora"
                  registerReturn={register("entryTime")}
                  type="time"
                />
              </div>
              <div className="mx-8 mt-16">
                <div className="w-full rounded-b-2xl bg-emerald-600 p-4 text-center">
                  <h1 className="text-2xl text-white">Informação Geral</h1>
                </div>
                <div className="mx-8">
                  <div className="mt-8">
                    <Input
                      error={errors.name}
                      name="Nome"
                      registerReturn={register("name")}
                      type="text"
                    />
                  </div>
                  <div className="mt-8 flex flex-row gap-12 ">
                    <Input
                      error={errors.idNumber}
                      name="Número Identificação"
                      registerReturn={register("idNumber")}
                      type="text"
                    />
                    <Input
                      error={errors.birthDate}
                      name="Data de Nascimento"
                      registerReturn={register("birthDate")}
                      type="date"
                    />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-12">
                    <div>
                      <Radio
                        error={errors.gender}
                        name="Sexo"
                        options={genders}
                        registerReturn={register("gender")}
                      />
                    </div>
                    <Input
                      error={errors.nacionality}
                      name="Nacionalidade"
                      registerReturn={register("nacionality")}
                      type="text"
                    />
                  </div>
                  <div className="mt-8 flex flex-row gap-12 ">
                    <Input
                      error={errors.number}
                      name="Contacto"
                      registerReturn={register("number")}
                      type="number"
                    />
                    <Input
                      error={errors.email}
                      name="Email"
                      registerReturn={register("email")}
                      type="email"
                    />
                  </div>
                  <div className="mt-8">
                    <Input
                      error={errors.address}
                      name="Morada"
                      registerReturn={register("address")}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-8">
                <div className="mt-16 rounded-b-2xl bg-emerald-600 p-4 text-center">
                  <h1 className="text-2xl text-white">Informação seguradora</h1>
                </div>
                <div className="mx-8 mt-8">
                  <Select
                    error={errors.insuranceName}
                    name="Seguros"
                    options={insuranceList}
                    registerReturn={register("insuranceName")}
                  />
                </div>
                {insurance !== "Particular" && (
                  <div className="mx-8 mt-8">
                    <Input
                      error={errors.insuranceNumber}
                      name="Número"
                      registerReturn={register("insuranceNumber")}
                      type="text"
                    />
                  </div>
                )}
              </div>
              <hr className="mt-12 h-0.5 bg-blue-400" />
              <div className=" mt-4 pb-5">
                <div className=" text-sm text-red-500">
                  Campos marcados com (*) são de carácter obrigatório
                </div>
                <div className="float-right ">
                  <button
                    type="submit"
                    className=" mb-16 rounded-full bg-blue-900 px-8 py-4 text-white"
                  >
                    Submeter <span>→</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUrgencyForm;
