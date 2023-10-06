import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import Input from "~/components/Forms/Input";

const formSchema = z.object({
  name: z
    .string({
      required_error: "É necessário indicar um nome",
    })
    .min(2, {
      message: "Tamanho minimo não atingido",
    }),
  idNumber: z
    .string({
      required_error: "É necessário indicar o número do BI",
    })
    .min(2, {
      message: "Tamanho minimo não atingido",
    }),
  birthDate: z.string({
    required_error: "É necessário indicar uma data de nascimento",
  }),
  requestedExam: z
    .string({
      required_error: "É necessário indicar o exame pedido",
    })
    .min(2, {
      message: "Tamanho minimo não atingido",
    }),
  isPrinted: z.boolean(),
  companyName: z.string().optional(),
});

const XRay = () => {
  const router = useRouter();
  const [isCompanyPicked, setIsCompanyPicked] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const xRayRequisitionMutation = api.xRayRequisition.insertOne.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    setIsButtonDisabled(true);
    xRayRequisitionMutation
      .mutateAsync({
        birthDate: data.birthDate,
        examDescription: data.requestedExam,
        name: data.name,
        idNumber: data.idNumber,
        company: data.companyName,
        isPrinted: data.isPrinted,
      })
      .then(() => {
        toast("Requisição de raio-x adicionada com sucesso");
        setIsButtonDisabled(false);
        router
          .push("/xray/pending")
          .then()
          .catch((err) => toast("Ocorreu um erro ao mudar de página"));
      })
      .catch((err) => {
        toast("Ocorreu um erro =(");
        console.log(err);
        setIsButtonDisabled(false);
      });
  };

  return (
    <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
      <Toaster />
      <div className="mb-20 flex items-center justify-center">
        <div className="w-72 rounded-b-2xl bg-emerald-600 px-2 py-2 text-center text-white">
          Requisição de exame Radiológico
        </div>
      </div>
      <div className="flex items-center justify-center">
        <form
          className="w-3/4 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-8 text-center text-3xl font-bold">
            Formulário Raio-X
          </h1>
          <div className="mb-4 flex gap-4">
            <div className="w-2/4 ">
              <Input
                name="Nome Completo"
                error={errors.name}
                registerReturn={register("name")}
                type="text"
              />
            </div>
            <div className="w-1/4">
              <Input
                name="Número Bi"
                error={errors.idNumber}
                registerReturn={register("idNumber")}
                type="text"
              />
            </div>
            <div className="w-1/4">
              <Input
                name="Data de Nascimento"
                error={errors.birthDate}
                registerReturn={register("birthDate")}
                type="date"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <div className="flex flex-grow items-center  gap-4">
              <input
                id="company"
                type="radio"
                name="radio"
                value="company"
                className=" accent-emerald-600"
                checked={isCompanyPicked}
                onChange={() => setIsCompanyPicked(!isCompanyPicked)}
              />
              <label htmlFor="company">Empresa</label>
              <input
                disabled={!isCompanyPicked}
                type="text"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 focus:outline-none"
                {...register("companyName")}
              />
            </div>
            <div className="flex flex-grow items-center justify-center gap-4">
              <input
                id="personal"
                value="personal"
                type="radio"
                name="radio"
                className="accent-emerald-600"
                onChange={() => setIsCompanyPicked(!isCompanyPicked)}
              />
              <label htmlFor="personal">Particular</label>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input id="print" type="checkbox" {...register("isPrinted")} />
            <label className="ml-4" htmlFor="print">
              Imprimir
            </label>
          </div>
          <div className="mb-4">
            <Input
              name="Exame Pedido"
              error={errors.requestedExam}
              registerReturn={register("requestedExam")}
              type="text"
            />
          </div>
          <div className="mb-16 mt-8 text-center">
            <button
              className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
              disabled={isButtonDisabled}
            >
              <div className="flex items-center justify-center gap-4">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={isButtonDisabled ? "animate-spin" : "hidden"}
                >
                  <path
                    d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                    stroke="white"
                  />
                </svg>
                Submeter
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default XRay;
