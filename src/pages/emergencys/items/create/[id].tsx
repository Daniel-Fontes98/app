import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import useItems from "~/components/HookForms/useItem";
import { api } from "~/utils/api";

const CreateItem = () => {
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const mutation = api.medicalItems.insertOne.useMutation();
  const { formSchema, register, errors, handleSubmit } = useItems();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      emergencyConsultId: emergencyConsultId as string,
    });
    void router.push(`/emergencys/consult/${emergencyConsultId as string}`);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 px-12  pb-32">
      <div className="mb-10 flex items-center justify-center ">
        <div className=" rounded-b-2xl bg-emerald-600 px-16 py-2 text-white">
          Adicionar Item
        </div>
      </div>
      <form className="mx-12" onSubmit={handleSubmit(onSubmit)}>
        <div className=" mt-6 grid grid-cols-2 gap-12">
          <div className="w-full">
            <label
              className="mb-2 block text-lg text-emerald-600"
              htmlFor="name"
            >
              Descritivo do item
            </label>
            <input
              id="name"
              className="w-full rounded-md p-2 shadow-md"
              type="text"
              {...register("name")}
              required
            />
            {errors.name && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label
              className="mb-2 block text-lg text-emerald-600"
              htmlFor="quantity"
            >
              Quantidade
            </label>
            <input
              id="quantity"
              className="w-full rounded-md p-2 shadow-md"
              type="number"
              {...register("quantity")}
              required
            />
            {errors.quantity && (
              <p className="mt-2 text-xs italic text-red-500">
                {" "}
                {errors.quantity?.message}
              </p>
            )}
          </div>
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
