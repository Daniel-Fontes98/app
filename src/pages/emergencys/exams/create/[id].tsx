import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useExam from "~/components/Forms/useExam";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";

const CreateExam = () => {
  const { errors, formSchema, handleSubmit, register } = useExam();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.medicalExams.insertOne.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      date: convertDateString(data.date),
      emergencyConsultId: emergencyConsultId as string,
    });
    router.push(`/emergencys/consult/${emergencyConsultId}`);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Adicionar exame
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <label className="mb-2 block text-lg text-emerald-600">
              Data de realização *
            </label>
            <input
              className="w-full rounded-md p-2 shadow-md"
              type="date"
              {...register("date")}
              required
            />
            {errors.date && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.date?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="mb-2 block text-lg text-emerald-600">
              Hora de realização *
            </label>
            <input
              className="w-full rounded-md p-2 shadow-md"
              type="time"
              {...register("hour")}
              required
            />
            {errors.hour && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.hour?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-lg text-emerald-600">
            Tipo de Exame
          </label>
          <select
            className=" w-full rounded-md p-2 shadow-md"
            {...register("name")}
          >
            <option value="Radiografia">Radiografia</option>
            <option value="Ecográfia Renal e Suprarenal">
              Ecográfia Renal e Suprarenal
            </option>
            <option value="Ecografia Osteoarticular">
              Ecografia Osteoarticular
            </option>
            <option value="Ecografia da Próstata">Ecografia da Próstata</option>
            <option value="Ecografia Ginecológica - Pélvica">
              Ecografia Ginecológica - Pélvica
            </option>
            <option value="Ecografia - Torácica">Ecografia - Torácica</option>
            <option value="Ecografia Abdominal Total">
              Ecografia Abdominal Total
            </option>
            <option value="Ecografia Mamária">Ecografia Mamária</option>
            <option value="Ecografia Tiroide">Ecografia Tiroide</option>
            <option value="Ecografia Testículos">Ecografia Testículos</option>
            <option value="Ecografia às Partes Moles">
              Ecografia às Partes Moles
            </option>
            <option value="Ecografia Trans-vaginal e Trans-rectal">
              Ecografia Trans-vaginal e Trans-rectal
            </option>
            <option value="Eco-Doppler">Eco-Doppler</option>
            <option value="Doppler Transcraniano">Doppler Transcraniano</option>
            <option value="Eco-transfontanelar">Eco-transfontanelar</option>
          </select>
          {errors.name && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-lg text-emerald-600">
            Descrição
          </label>
          <textarea
            className="h-20 w-full rounded-md shadow-md"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.description?.message}
            </p>
          )}
        </div>
        <hr className="mt-12 h-0.5 bg-blue-400" />

        <div className="float-right mt-4 py-4">
          <button
            type="submit"
            className=" rounded-full bg-blue-900 px-8 py-4 text-white"
          >
            Submeter
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
