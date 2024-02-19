import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

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
    rdwSdResult: z.number().nullable(),
    rdwSdUpperBound: z.number().nullable(),
    rdwSdLowerBound: z.number().nullable(),
    rdwCvResult: z.number().nullable(),
    rdwCvUpperBound: z.number().nullable(),
    rdwCvLowerBound: z.number().nullable(),
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
    pLcrResult: z.number().nullable(),
    pLcrUpperBound: z.number().nullable(),
    pLcrLowerBound: z.number().nullable(),
  });

  const parameterMapping: Record<
    string,
    { result: string; upperBound: string; lowerBound: string; unit: string }
  > = {
    WBC: {
      result: "wbcResult",
      upperBound: "wbcUpperBound",
      lowerBound: "wbcLowerBound",
      unit: "10*9/L",
    },
    NEUT: {
      result: "neutResult",
      upperBound: "neutUpperBound",
      lowerBound: "neutLowerBound",
      unit: "10*9/L",
    },
    MONO: {
      result: "monoResult",
      upperBound: "monoUpperBound",
      lowerBound: "monoLowerBound",
      unit: "10*9/L",
    },
    EO: {
      result: "eoResult",
      upperBound: "eoUpperBound",
      lowerBound: "eoLowerBound",
      unit: "10*9/L",
    },
    BASO: {
      result: "basoResult",
      upperBound: "basoUpperBound",
      lowerBound: "basoLowerBound",
      unit: "10*9/L",
    },
    LYMPH: {
      result: "lymphResult",
      upperBound: "lymphUpperBound",
      lowerBound: "lymphLowerBound",
      unit: "10*9/L",
    },
    RBC: {
      result: "rbcResult",
      upperBound: "rbcUpperBound",
      lowerBound: "rbcLowerBound",
      unit: "10*12/L",
    },
    HGB: {
      result: "hgbResult",
      upperBound: "hbgUpperBound",
      lowerBound: "hbgLowerBound",
      unit: "g/dL",
    },
    HCT: {
      result: "hctResult",
      upperBound: "hctUpperBound",
      lowerBound: "hctLowerBound",
      unit: "%",
    },
    MCV: {
      result: "mcvResult",
      upperBound: "mcvUpperBound",
      lowerBound: "mcvLowerBound",
      unit: "fL",
    },
    MCH: {
      result: "mchResult",
      upperBound: "mchUpperBound",
      lowerBound: "mchLowerBound",
      unit: "pg",
    },
    MCHC: {
      result: "mchcResult",
      upperBound: "mchcUpperBound",
      lowerBound: "mchcLowerBound",
      unit: "g/dL",
    },
    RDWSD: {
      result: "rdwSdResult",
      upperBound: "rdwSdUpperBound",
      lowerBound: "rdwSdLowerBound",
      unit: "fL",
    },
    RDWCV: {
      result: "rdwSvResult",
      upperBound: "rdwSvUpperBound",
      lowerBound: "rdwSvLowerBound",
      unit: "%",
    },
    PLT: {
      result: "pltResult",
      upperBound: "pltUpperBound",
      lowerBound: "pltLowerBound",
      unit: "10*9/L",
    },
    MPV: {
      result: "mpvResult",
      upperBound: "mpvUpperBound",
      lowerBound: "mpvLowerBound",
      unit: "fL",
    },
    PDW: {
      result: "pdwResult",
      upperBound: "pdwUpperBound",
      lowerBound: "pdwLowerBound",
      unit: "%",
    },
    PCT: {
      result: "pctResult",
      upperBound: "pctUpperBound",
      lowerBound: "pctLowerBound",
      unit: "%",
    },
    PLCR: {
      result: "pLcrResult",
      upperBound: "pLcrUpperBound",
      lowerBound: "pLcrLowerBound",
      unit: "%",
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    Object.entries(parameterMapping).forEach(([parametro, keys]) => {
      const dataToFill = data?.Hematologia.find(
        (x) => x.parametro === parametro
      );
      if (dataToFill) {
        setValue(
          keys.result as keyof z.infer<typeof formSchema>,
          dataToFill.resultado
        );
        setValue(
          keys.upperBound as keyof z.infer<typeof formSchema>,
          dataToFill.intervaloSuperior
        );
        setValue(
          keys.lowerBound as keyof z.infer<typeof formSchema>,
          dataToFill.intervaloInferior
        );
      }
    });
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = () => {
    setIsButtonDisabled(true);
  };

  if (data && !isLoading) {
    return (
      <>
        <div className=" min-h-screen items-center justify-center bg-slate-100 px-12 ">
          <Toaster />
          <div className="mb-32 flex items-center justify-center">
            <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
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
                <div>Parâmetro</div>
                <div>Resultado</div>
                <div>Unidade</div>
                <div>Valores de Referência</div>
                {Object.entries(parameterMapping).map(([key, parameter]) => (
                  <>
                    <div>{key}</div>
                    <input
                      type="text"
                      {...register(
                        parameter.result as keyof z.infer<typeof formSchema>
                      )}
                    />
                    <div>{parameter.unit}</div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-10 border-2"
                        {...register(
                          parameter.lowerBound as keyof z.infer<
                            typeof formSchema
                          >
                        )}
                      />{" "}
                      -{" "}
                      <input
                        type="text"
                        className="w-10  border-2"
                        {...register(
                          parameter.lowerBound as keyof z.infer<
                            typeof formSchema
                          >
                        )}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="mb-16 mt-8 text-center">
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
