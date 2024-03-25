import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  const router = useRouter();
  const companyAppointmentId = router.query.id as string;
  const getUserName = api.companyAppointment.getUserName.useQuery({
    companyAppointmentId: companyAppointmentId,
  });
  const insertHematologyResults =
    api.companyAppointment.createHematologia.useMutation();
  const { data, isLoading } = api.hematologia.getById.useQuery({
    companyAppointmentId: companyAppointmentId,
  });

  const formSchema = z.object({
    hematologia: z.array(
      z.object({
        parametro: z.string().min(2, {
          message: "Mínimo de dois caracteres",
        }),
        resultado: z.string(),
        intervaloInferior: z.string(),
        intervaloSuperior: z.string(),
        unidade: z.string(),
        alert: z.string().optional(),
      })
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      hematologia: data ? data : [],
    },
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const { fields, append } = useFieldArray({
    name: "hematologia",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const hematologiaArray = values.hematologia.map((record) => {
      if (
        record.resultado.includes(",") ||
        record.intervaloSuperior.includes(",") ||
        record.intervaloInferior.includes(",")
      ) {
        toast.error("Por favor utilizar pontos '.' em vez de virgulas ','");
      }
      return {
        ...record,
        resultado: Number(record.resultado),
        intervaloInferior: Number(record.intervaloInferior),
        intervaloSuperior: Number(record.intervaloSuperior),
      };
    });

    if (hematologiaArray.some((record) => Object.keys(record).length === 0))
      return;

    toast
      .promise(
        insertHematologyResults.mutateAsync({
          companyAppointmentId: companyAppointmentId,
          hematologia: hematologiaArray,
        }),
        {
          error: "Ocorreu um erro, por favor tentar novamente",
          loading: "A submeter...",
          success: "Submetido com sucesso !",
        }
      )
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <div className=" min-h-screen  items-center justify-center bg-slate-100 ">
        <Toaster />
        <div className="mb-32 flex items-center justify-center">
          <div className="w-fit rounded-b-2xl bg-emerald-600 px-4 py-2 text-center text-white">
            {getUserName.data?.user.name}
          </div>
        </div>
        <div className="mx-auto w-3/4 space-y-6 rounded-2xl bg-white p-16 shadow-2xl">
          <div>
            <h3 className="text-lg font-medium">Hematologia</h3>
          </div>
          <Separator />
          {data ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.parametro`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Paramêtro
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.resultado`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Resultado
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.intervaloInferior`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Intervalo Inferior
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.intervaloSuperior`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Intervalo Superior
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.unidade`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Unidade
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hematologia.${index}.alert`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Alerta
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="ml-auto mt-4"
                      onClick={() =>
                        append({
                          parametro: "",
                          resultado: "",
                          intervaloInferior: "",
                          intervaloSuperior: "",
                          unidade: "",
                        })
                      }
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
                <button
                  className="focus:shadow-outline  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Submeter
                </button>
              </form>
            </Form>
          ) : (
            <>A carregar página</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
