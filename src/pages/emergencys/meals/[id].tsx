import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import type { z } from "zod";
import Input from "~/components/Forms/Input";
import Select from "~/components/Forms/Select";
import useMeal from "~/components/HookForms/useMeal";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";

const CreateEmergencyMeal = () => {
  const { errors, formSchema, handleSubmit, register } = useMeal();
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.emergencyMeals.insertOne.useMutation();

  if (!emergencyConsultId) {
    return <div>Ocorreu um erro</div>;
  }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
          date: convertDateString(data.date),
          emergencyConsultId: emergencyConsultId as string,
        }),
        {
          loading: "A carregar...",
          error: `Ocorreu um erro por favor tentar novamente`,
          success: "Adicionado com sucesso !",
        }
      )
      .then(
        () =>
          void router.push(
            `/emergencys/consult/${emergencyConsultId as string}`
          )
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12 pb-32">
      <Toaster />
      <div className="mb-10 flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Adicionar Refeição
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <Input
            error={errors.date}
            name="Data"
            registerReturn={register("date")}
            type="date"
          />
          <Input
            error={errors.time}
            name="Hora"
            registerReturn={register("time")}
            type="time"
          />
        </div>
        <div className="mt-4">
          <Select
            error={errors.typeOfMeal}
            name="Tipo de Refeição"
            options={[
              { label: "Pequeno Almoço", value: "breakfast" },
              { label: "Almoço", value: "lunch" },
              { label: "Jantar", value: "dinner" },
              { label: "Lanche", value: "snack" },
            ]}
            registerReturn={register("typeOfMeal")}
          />
        </div>
        <div className="mt-4">
          <Input
            error={errors.description}
            name="Descrição"
            registerReturn={register("description")}
            type="text"
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
