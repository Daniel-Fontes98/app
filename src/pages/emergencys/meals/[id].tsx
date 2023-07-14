import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useMeal from "~/components/Forms/useMeal";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";

const CreateEmergencyMeal = () => {
  const { errors, formSchema, handleSubmit, register } = useMeal();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.emergencyMeals.insertOne.useMutation();

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
          Adicionar Refeição
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <label className="mb-2 block text-lg text-emerald-600">Data*</label>
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
            <label className="mb-2 block text-lg text-emerald-600">Hora*</label>
            <input
              className="w-full rounded-md p-2 shadow-md"
              type="time"
              {...register("time")}
              required
            />
            {errors.time && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.time?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-lg text-emerald-600">
            Tipo de Refeição
          </label>
          <select
            className=" w-full rounded-md p-2 shadow-md"
            {...register("typeOfMeal")}
          >
            <option value="breakfast">Pequeno Almoço</option>
            <option value="lunch">Almoço</option>
            <option value="dinner">Jantar</option>
            <option value="snack">Lanche</option>
          </select>
          {errors.typeOfMeal && (
            <p className="mt-2 text-xs italic text-red-500">
              {" "}
              {errors.typeOfMeal?.message}
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

export default CreateEmergencyMeal;
