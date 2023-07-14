import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useTriage from "~/components/Forms/useTriage";
import { api } from "~/utils/api";
import { getColourCode } from "~/utils/manchesterTriage";
import { sintoms } from "~/utils/sintoms";

const bloodList = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];

const CreateEmergencyTriage = () => {
  const { register, handleSubmit, errors, formSchema } = useTriage();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.emergencyTriage.insertOne.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      emergencyConsultId: emergencyConsultId as string,
      manchesterDegree: getColourCode(data.sintoms),
      sintoms: data.sintoms.join(","),
    });

    router.push("/emergencys/triage");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex items-center justify-center ">
        <div className="flex w-1/4 justify-center rounded-b-2xl bg-emerald-600 py-2 text-2xl text-white">
          Formulário Triagem
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 mt-16 flex flex-col gap-8">
          <div className=" flex gap-4">
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="weight">
                Peso:
              </label>
              <input
                className="p-2 shadow-sm focus:outline-[0.5px]"
                id="weight"
                type="text"
                {...register("weight")}
              />
              {errors.weight && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.weight?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="height">
                Altura:
              </label>
              <input
                className="outline- p-2 shadow-sm"
                id="height"
                type="text"
                {...register("height")}
              />
              {errors.height && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.height?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="blood">
                Grupo Sanguíneo:
              </label>
              <select
                className="p-2 shadow-sm"
                {...register("bloodType")}
                id="blood"
              >
                {bloodList.map((blood, idx) => (
                  <option key={idx}>{blood}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="tMax">
                Tensão Arterial Máxima:
              </label>
              <input
                className="p-2 shadow-sm"
                id="tMax"
                type="text"
                {...register("tMax")}
              />
              {errors.tMax && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.tMax?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="tMin">
                Tensão Arterial Mínima :
              </label>
              <input
                className="p-2 shadow-sm"
                id="tMin"
                type="text"
                {...register("tMin")}
              />
              {errors.tMin && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.tMin?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="degrees">
                Temperatura axilar:
              </label>
              <input
                className="p-2 shadow-sm"
                id="degrees"
                type="text"
                {...register("degrees")}
              />
              {errors.degrees && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.degrees?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <label className=" text-emerald-600" htmlFor="oxygen">
                Saturação de oxigénio (PO<span className="text-xs">2</span>) :
              </label>
              <input
                className="p-2 shadow-sm"
                id="oxygen"
                type="text"
                {...register("oxygen")}
              />
              {errors.oxygen && (
                <p className="mt-2 text-xs italic text-red-500">
                  {" "}
                  {errors.oxygen?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <span className="text-emerald-600">Sintomas:</span>
            <div className="grid grid-cols-3 gap-x-4">
              {sintoms.map((sintom) => (
                <div className="flex gap-2" key={sintom.id}>
                  <input
                    id={sintom.name}
                    className="accent-emerald-500"
                    value={sintom.name}
                    type="checkbox"
                    {...register("sintoms")}
                  />
                  <label htmlFor={sintom.name}>{sintom.name}</label>
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
          <div className="flex flex-col  gap-4">
            <label className=" text-emerald-600" htmlFor="complaint">
              Queixa Principal:
            </label>
            <textarea
              id="complaint"
              className="h-40 shadow-sm outline-emerald-300"
              {...register("complaint")}
            />
            {errors.complaint && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.complaint?.message}
              </p>
            )}
          </div>
          <hr className="mt-12 h-0.5 bg-blue-400" />
          <div className="flex flex-col gap-8 pb-5">
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
        </div>
      </form>
    </div>
  );
};

export default CreateEmergencyTriage;
