import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useState } from "react";

const inputKeys = [
  "wbcResult",
  "wbcUpperBound",
  "wbcLowerBound",
  "neutResult",
  "neutUpperBound",
  "neutLowerBound",
  "monoResult",
  "monoUpperBound",
  "monoLowerBound",
  "eoResult",
  "eoUpperBound",
  "eoLowerBound",
  "basoResult",
  "basoUpperBound",
  "basoLowerBound",
  "lymphResult",
  "lymphUpperBound",
  "lymphLowerBound",
  "rbcResult",
  "rbcUpperBound",
  "rbcLowerBound",
  "hgbResult",
  "hgbUpperBound",
  "hgbLowerBound",
  "hctResult",
  "hctUpperBound",
  "hctLowerBound",
  "mcvResult",
  "mcvUpperBound",
  "mcvLowerBound",
  "mchResult",
  "mchUpperBound",
  "mchLowerBound",
  "mchcResult",
  "mchcUpperBound",
  "mchcLowerBound",
  "rdw_SdResult",
  "rdw_SdUpperBound",
  "rdw_SdLowerBound",
  "rdw_CvResult",
  "rdw_CvUpperBound",
  "rdw_CvLowerBound",
  "pltResult",
  "pltUpperBound",
  "pltLowerBound",
  "mpvResult",
  "mpvUpperBound",
  "mpvLowerBound",
  "pdwResult",
  "pdwUpperBound",
  "pdwLowerBound",
  "pctResult",
  "pctUpperBound",
  "pctLowerBound",
  "p_LcrResult",
  "p_LcrUpperBound",
  "p_LcrLowerBound",
] as const;

const Index = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const { data, isLoading } =
    api.companyAppointment.getByIdUserHematology.useQuery({
      id: companyAppointmentId,
    });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formSchema = z.object({
    wbcResult: z.number().nullable(),
    wbcUpperBound: z.number().nullable(),
    wbcLowerBound: z.number().nullable(),
    neutResult: z.number().nullable(),
    neutUpperBound: z.number().nullable(),
    neutLowerBound: z.number().nullable(),
    monoResult: z.number().nullable(),
    monoUpperBound: z.number().nullable(),
    monoLowerBound: z.number().nullable(),
    eoResult: z.number().nullable(),
    eoUpperBound: z.number().nullable(),
    eoLowerBound: z.number().nullable(),
    basoResult: z.number().nullable(),
    basoUpperBound: z.number().nullable(),
    basoLowerBound: z.number().nullable(),
    lymphResult: z.number().nullable(),
    lymphUpperBound: z.number().nullable(),
    lymphLowerBound: z.number().nullable(),
    rbcResult: z.number().nullable(),
    rbcUpperBound: z.number().nullable(),
    rbcLowerBound: z.number().nullable(),
    hgbResult: z.number().nullable(),
    hgbUpperBound: z.number().nullable(),
    hgbLowerBound: z.number().nullable(),
    hctResult: z.number().nullable(),
    hctUpperBound: z.number().nullable(),
    hctLowerBound: z.number().nullable(),
    mcvResult: z.number().nullable(),
    mcvUpperBound: z.number().nullable(),
    mcvLowerBound: z.number().nullable(),
    mchResult: z.number().nullable(),
    mchUpperBound: z.number().nullable(),
    mchLowerBound: z.number().nullable(),
    mchcResult: z.number().nullable(),
    mchcUpperBound: z.number().nullable(),
    mchcLowerBound: z.number().nullable(),
    rdw_SdResult: z.number().nullable(),
    rdw_SdUpperBound: z.number().nullable(),
    rdw_SdLowerBound: z.number().nullable(),
    rdw_CvResult: z.number().nullable(),
    rdw_CvUpperBound: z.number().nullable(),
    rdw_CvLowerBound: z.number().nullable(),
    pltResult: z.number().nullable(),
    pltUpperBound: z.number().nullable(),
    pltLowerBound: z.number().nullable(),
    mpvResult: z.number().nullable(),
    mpvUpperBound: z.number().nullable(),
    mpvLowerBound: z.number().nullable(),
    pdwResult: z.number().nullable(),
    pdwUpperBound: z.number().nullable(),
    pdwLowerBound: z.number().nullable(),
    pctResult: z.number().nullable(),
    pctUpperBound: z.number().nullable(),
    pctLowerBound: z.number().nullable(),
    p_LcrResult: z.number().nullable(),
    p_LcrUpperBound: z.number().nullable(),
    p_LcrLowerBound: z.number().nullable(),
  });

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (input) => {
    console.log(input);
    setIsButtonDisabled(true);
  };

  if (data && !isLoading) {
    return (
      <>
        <div className="  items-center justify-center overflow-y-scroll bg-slate-100 px-12 pb-8">
          <Toaster />
          <div className="mb-12 flex items-center justify-center">
            <div className="rounded-b-2xl bg-emerald-600 px-4 py-4 text-center text-white">
              {data.user.name}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <form
              className="w-3/4 rounded-2xl bg-white px-8  pt-6 shadow-2xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="mb-8 text-center text-3xl font-bold">
                Hemograma/Hematologia
              </h1>
              <div className="grid grid-cols-4 gap-4">
                {/*Headers */}
                <div className="flex items-center justify-center font-bold text-emerald-600">
                  Parâmetro
                </div>
                <div className="flex items-center justify-center font-bold text-emerald-600">
                  Resultado
                </div>
                <div className="flex items-center justify-center font-bold text-emerald-600">
                  Unidade
                </div>
                <div className="flex items-center justify-center font-bold text-emerald-600">
                  Valores de Referência
                </div>
                {inputKeys.map((key) => {
                  if (key.includes("Result")) {
                    return (
                      <div
                        key={key}
                        className="col-span-2 flex w-full items-center justify-center gap-8"
                      >
                        <div className="flex w-1/2 items-center justify-center border-b">
                          {key.replace("Result", "").toUpperCase()}
                        </div>
                        <div className="flex w-1/2 items-center justify-center">
                          <input
                            className=" border shadow-sm"
                            {...register(key)}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="flex items-center justify-center">
                      <input className=" border shadow-sm" {...register(key)} />
                    </div>
                  );
                })}
              </div>
              <div className="mb-16 mt-16 text-center">
                <button
                  disabled={isButtonDisabled}
                  className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return <>A carregar pagina...</>;
  }
};

export default Index;
