import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import useFileUploader from "~/components/Hooks/useFileUploader";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  addInfo: z.string().optional(),
});

const UploadXRayFile = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { onFileUploadChange, onUploadFile } = useFileUploader();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const mutation = api.xRayObject.insertOne.useMutation();
  const xRayRequisitionQuery = api.xRayRequisition.getById.useQuery({
    id: id,
  }).data;
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsButtonDisabled(true);
    toast("A carregar ficheiro...");
    const url = await onUploadFile();
    if (typeof url === "object") {
      mutation
        .mutateAsync({
          fileLocation: url[0]!,
          xRayRequisitionId: id,
          addInfo: data.addInfo,
        })
        .then(() => {
          toast("Raio-X carregado com sucesso!");
          void router.push("/xray/completed");
        })
        .catch((err) => {
          toast("Ocorreu um erro a inserir na base de dados =(");
          console.log(err);
        });
    } else {
      toast("Ocorreu um erro ao carregar o ficheiro =(");
    }
    setIsButtonDisabled(false);
  };

  if (xRayRequisitionQuery) {
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
        <Toaster />
        <div className="mb-32 flex items-center justify-center">
          <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
            {xRayRequisitionQuery.user.name}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <form
            className="w-3/4 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-8 text-center text-3xl font-bold">Raio-X</h1>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="adicionalInfo"
              >
                Informação Adicional
              </label>
              <input
                className="focus:shadow-outline h-16 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                id="adicionalInfo"
                type="text"
                {...register("addInfo")}
              />
            </div>
            <div className="mt-4">
              <input type="file" name="file" onChange={onFileUploadChange} />
            </div>
            <div className="mb-16 mt-8 text-center">
              <button
                disabled={isButtonDisabled}
                className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Submeter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div className="animate-pulse">Loading....</div>;
  }
};

export default UploadXRayFile;
