import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import type { z } from "zod";
import Input from "~/components/Forms/Input";
import useItems from "~/components/HookForms/useItem";
import { api } from "~/utils/api";

const CreateItem = () => {
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.medicalItems.insertOne.useMutation();
  const { formSchema, register, errors, handleSubmit } = useItems();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast
      .promise(
        mutation.mutateAsync({
          ...data,
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
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12  pb-32">
      <Toaster />
      <div className="mb-10 flex items-center justify-center ">
        <div className=" rounded-b-2xl bg-emerald-600 px-16 py-2 text-white">
          Adicionar Item
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <Input
            name="Descritivo do item"
            registerReturn={register("name")}
            error={errors.name}
            type="text"
          />
          <Input
            name="Quantidade"
            registerReturn={register("quantity")}
            error={errors.quantity}
            type="number"
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

export default CreateItem;
