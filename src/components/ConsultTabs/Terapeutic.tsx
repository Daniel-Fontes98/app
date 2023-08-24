import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import { convertDate } from "~/utils/dates";

interface TerapeuticProps {
  emergencyConsultId: string;
}

const TerapeuticTab = ({ emergencyConsultId }: TerapeuticProps) => {
  const getTerapeutics = api.terapeutic.getAll.useQuery();
  const insertTerapeutic = api.terapeutic.insertOne.useMutation();
  const applyTerapeutic = api.applyTerapeutic.insertOne.useMutation();
  const deleteTerapeutic = api.terapeutic.retireOne.useMutation();

  const [medicine, setMedicine] = useState("");

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleApplyTerapeutic = (id: string) => {
    const result = applyTerapeutic.mutateAsync({
      terapeuticId: id,
      appliedBy: user.username!,
    });

    result
      .then(async () => {
        await getTerapeutics.refetch();
      })
      .catch((err) => {
        console.log(err);
      });

    toast("Aplicado com sucesso!");
  };

  const handleRetireTerapeutic = (id: string) => {
    const result = deleteTerapeutic.mutateAsync({
      id: id,
    });

    result
      .then(async () => {
        await getTerapeutics.refetch();
      })
      .catch((err) => {
        console.log(err);
      });

    toast("Removido com sucesso!");
  };

  const handleAddTerapeutic = () => {
    if (medicine.length < 4) {
      toast("Mínimo de 5 caracteres");
    } else {
      const result = insertTerapeutic.mutateAsync({
        description: medicine,
        emergencyConsultId: emergencyConsultId,
      });
      result
        .then(async () => {
          await getTerapeutics.refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Toaster />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Fármacos Activos</h2>
          <div className="flex flex-col gap-4">
            {getTerapeutics.data
              ?.filter(
                (terapeutic) =>
                  terapeutic.emergencyConsultId === emergencyConsultId
              )
              .map(
                (terapeutic) =>
                  terapeutic.active && (
                    <div key={terapeutic.id}>
                      <div className="flex w-full max-w-screen-lg items-center gap-4 whitespace-nowrap">
                        <div>{terapeutic.description}</div>
                        <div className="flex w-full gap-4 overflow-x-hidden whitespace-nowrap hover:overflow-x-auto">
                          {terapeutic.appliedTerapeutic?.map((applied) => (
                            <div key={applied.id}>
                              <Popover>
                                <PopoverTrigger>
                                  <div>{convertDate(applied.createdAt)}</div>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white">
                                  {applied.appliedBy}
                                </PopoverContent>
                              </Popover>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-grow justify-end gap-2 ">
                          <button
                            type="button"
                            onClick={() => handleApplyTerapeutic(terapeutic.id)}
                            className="mb-2 mr-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            Medicar
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleRetireTerapeutic(terapeutic.id)
                            }
                            className="mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Retirar
                          </button>
                        </div>
                      </div>
                      <hr className="h-1 w-full " />
                    </div>
                  )
              )}
          </div>
          <div className="mt-4 flex gap-4">
            <input
              className="p-1 shadow-md"
              placeholder="Soro 200ml 8/8h..."
              onChange={(e) => setMedicine(e.target.value)}
              value={medicine}
            />
            <button
              type="button"
              onClick={() => handleAddTerapeutic()}
              className=" rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
            >
              + Adicionar
            </button>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-12">
          <h2 className="text-xl font-bold">Retirados da Terapêutica</h2>
          <div className="flex flex-col gap-12">
            {getTerapeutics.data
              ?.filter(
                (terapeutic) =>
                  terapeutic.emergencyConsultId === emergencyConsultId
              )
              .map(
                (terapeutic) =>
                  !terapeutic.active && (
                    <div key={terapeutic.id}>
                      <div className="flex w-full max-w-screen-lg items-center gap-4 whitespace-nowrap">
                        <div className="font-semibold">
                          {terapeutic.description}
                        </div>
                        <div className="flex w-full gap-4 overflow-x-hidden whitespace-nowrap hover:overflow-x-auto">
                          {terapeutic.appliedTerapeutic?.map((applied) => (
                            <div key={applied.id}>
                              <Popover>
                                <PopoverTrigger>
                                  <div>{convertDate(applied.createdAt)}</div>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white">
                                  {applied.appliedBy}
                                </PopoverContent>
                              </Popover>
                            </div>
                          ))}
                        </div>
                      </div>
                      <hr className="mt-4 h-1 w-full " />
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TerapeuticTab;
