import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import type { z } from "zod";
import Input from "~/components/Forms/Input";
import Select from "~/components/Forms/Select";
import TextArea from "~/components/Forms/Textarea";
import useTriage from "~/components/HookForms/useTriage";
import { api } from "~/utils/api";
import { bloodTypes } from "~/utils/bloodTypes";
import { getColourCode } from "~/utils/manchesterTriage";
import { sintoms } from "~/utils/sintoms";

const CreateEmergencyTriage = () => {
  const { register, handleSubmit, errors, formSchema } = useTriage();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.emergencyTriage.insertOne.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          emergencyConsultId: emergencyConsultId as string,
          manchesterDegree: getColourCode(data.sintoms),
          sintoms: data.sintoms.join(","),
        }),
        {
          loading: "A carregar...",
          error: (err) => `Ocorreu um erro: ${err}`,
          success: "Criado com sucesso!",
        }
      )
      .then(() => void router.push("/emergencys/triage"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster />
      <div className="flex items-center justify-center ">
        <div className="flex w-1/4 justify-center rounded-b-2xl bg-emerald-600 py-2 text-2xl text-white">
          Formulário Triagem
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 mt-16 flex flex-col items-center justify-center gap-8">
          <div className=" flex w-full  gap-4">
            <Input
              error={errors.weight}
              name="Peso"
              registerReturn={register("weight")}
              type="text"
            />
            <Input
              error={errors.height}
              name="Altura"
              registerReturn={register("height")}
              type="text"
            />
            <Select
              error={errors.bloodType}
              name="Grupo Sanguíneo"
              registerReturn={register("bloodType")}
              options={bloodTypes}
            />
            <Input
              error={errors.oxygen}
              name="Saturação de Oxigénio"
              registerReturn={register("oxygen")}
              type="text"
            />
          </div>
          <div className="flex w-full gap-4">
            <Input
              error={errors.tMax}
              name="Tensão Arterial Máxima"
              registerReturn={register("tMax")}
              type="text"
            />
            <Input
              error={errors.tMin}
              name="Tensão Arterial Mínima"
              registerReturn={register("tMin")}
              type="text"
            />
            <Input
              error={errors.degrees}
              name="Temperatura axilar"
              registerReturn={register("degrees")}
              type="text"
            />
          </div>
          <div className="flex gap-6">
            <span className="font-bold text-gray-700">Sintomas:</span>
            <div className="grid grid-cols-3 gap-x-3">
              {sintoms.map((sintom) => (
                <div className="flex items-center gap-2" key={sintom.id}>
                  <input
                    id={sintom.name}
                    className=" accent-emerald-500"
                    value={sintom.name}
                    type="checkbox"
                    {...register("sintoms")}
                  />
                  <label
                    className="text-base text-gray-700"
                    htmlFor={sintom.name}
                  >
                    {sintom.name}
                  </label>
                </div>
              ))}
              {errors.sintoms && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.sintoms?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex w-full  flex-col gap-4">
            <TextArea
              error={errors.complaint}
              name="Queixa Principal"
              className="focus:shadow-outline h-40 w-full  appearance-none  rounded  border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 shadow-sm focus:outline-none"
              registerReturn={register("complaint")}
            />
          </div>
        </div>
        <hr className="mx-10 mt-16 h-0.5 bg-blue-400" />
        <div className="mx-10 flex flex-col gap-8 pb-5">
          <div className=" text-sm text-red-500">
            Campos marcados com (*) são de carácter obrigatório
          </div>
          <div className="flex">
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className=" mb-16 rounded-full bg-blue-900 px-8 py-4 text-white"
              >
                Submeter
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEmergencyTriage;
