import { useRouter } from "next/router";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import {
  calculateTotalHoursElapsedBetweenDateAndString,
  calculateTotalHoursElapsedBetweenTwoDates,
} from "~/utils/dates";

const TotalConsumed = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const emergencyConsultId = router.query.id as string;
  const consult = api.emergencyConsults.getById.useQuery({
    id: emergencyConsultId,
  }).data;
  const payMutation = api.emergencyConsults.payDebt.useMutation();

  const handleButtonClick = () => {
    setIsLoading(true);
    const result = payMutation.mutateAsync({
      id: emergencyConsultId,
    });

    result
      .then(() => {
        void router.push("/emergencys/payment");
      })
      .catch(() => {
        toast("Ocorreu um erro =(");
      });
  };

  if (consult) {
    return (
      <>
        <div className="min-h-screen bg-slate-100">
          <Toaster />
          <div className="flex items-center justify-center ">
            <h1 className=" rounded-b-2xl bg-emerald-600 px-6 py-2 text-white ">
              Total de gastos
            </h1>
          </div>
          <div className="mt-12 flex items-center justify-center ">
            <div className="w-3/4 bg-white p-4 shadow-md">
              {/*List of exams taken */}
              {consult.medicalExams.length !== 0 && (
                <div>
                  <div className=" grid grid-cols-2">
                    <h2 className="text-lg font-semibold">Exames</h2>
                    <h2 className="text-lg font-semibold">Data / Hora</h2>
                  </div>

                  <div className="flex w-full flex-col border-b-2 pb-4">
                    {consult.medicalExams.map((exam) => (
                      <div key={exam.id} className="grid grid-cols-2 ">
                        <div>{exam.name}</div>
                        <div>
                          {exam.date} / {exam.hour}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/*List of used material */}
              {consult.medicalItems.length !== 0 && (
                <div>
                  <div className="mt-4 grid grid-cols-2">
                    <h2 className="text-lg font-semibold">Material</h2>
                    <h2 className="text-lg font-semibold">Quantidade</h2>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 border-b-2 pb-4">
                    {consult.medicalItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-2">
                        <div>{item.name}</div>
                        <div>{item.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/*If admitted */}
              {consult.admission && (
                <div className="mt-2 grid grid-cols-2 gap-2 border-b-2 pb-4">
                  <h3>Pequenos almoços consumidos: </h3>
                  <div>
                    {consult.admission?.emergencyMeals.reduce(
                      (acc, curr) =>
                        curr.typeOfMeal === "breakfast" ? acc + 1 : acc,
                      0
                    )}
                  </div>
                  <h3>Almoços consumidos: </h3>
                  <div>
                    {consult.admission?.emergencyMeals.reduce(
                      (acc, curr) =>
                        curr.typeOfMeal === "lunch" ? acc + 1 : acc,
                      0
                    )}
                  </div>
                  <h3>Jantares consumidos: </h3>
                  <div>
                    {consult.admission?.emergencyMeals.reduce(
                      (acc, curr) =>
                        curr.typeOfMeal === "dinner" ? acc + 1 : acc,
                      0
                    )}
                  </div>
                  <h3>Lanches consumidos: </h3>
                  <div>
                    {consult.admission?.emergencyMeals.reduce(
                      (acc, curr) =>
                        curr.typeOfMeal === "snack" ? acc + 1 : acc,
                      0
                    )}
                  </div>
                </div>
              )}
              <div>
                <div className="mt-4 grid grid-cols-2">
                  <h2 className="text-lg font-semibold">Receitas</h2>
                  <h2 className="text-lg font-semibold">
                    Quantidade Consumida
                  </h2>
                </div>
                <div className="mt-4 flex w-full flex-col gap-2 border-b-2 pb-4">
                  {consult.terapeutic?.map((terapeutic) => (
                    <div key={terapeutic.id} className="grid grid-cols-2">
                      <div>{terapeutic.description}</div>
                      <div>{terapeutic.appliedTerapeutic.length}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/*If admitted and released */}
              {consult.admission && consult.release && (
                <div>
                  <div className="mt-4 grid grid-cols-2">
                    <h2 className="text-lg font-semibold">
                      Total de horas internado:{" "}
                    </h2>
                    <div>
                      {calculateTotalHoursElapsedBetweenTwoDates(
                        consult.admission.entryDate,
                        consult.admission.entryHour,
                        consult.release.exitDate,
                        consult.release.exitTime
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/*If admitted and transfered */}
              {consult.admission && consult.emergencyTransfer && (
                <div>
                  <div className="mt-4 grid grid-cols-2">
                    <h2 className="text-lg font-semibold">
                      Total de horas internado:{" "}
                    </h2>
                    <div>
                      {calculateTotalHoursElapsedBetweenDateAndString(
                        consult.admission.entryDate,
                        consult.admission.entryHour,
                        consult.emergencyTransfer.createdAt
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/*If admitted but not yet transfered or released*/}
              {consult.admission &&
                !consult.emergencyTransfer &&
                !consult.release && (
                  <div>
                    <div className="mt-4 grid grid-cols-2">
                      <h2 className="text-lg font-semibold">
                        Total de horas internado:{" "}
                      </h2>
                      <div>
                        {calculateTotalHoursElapsedBetweenDateAndString(
                          consult.admission.entryDate,
                          consult.admission.entryHour,
                          new Date()
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div>
            <button
              className="float-right mr-4 mt-8 h-3/4 rounded-xl bg-amber-600 px-4 py-2  text-white shadow-sm hover:bg-amber-800"
              onClick={() => handleButtonClick()}
              disabled={isLoading}
            >
              Arquivar & Pagar
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return <div className="animate-pulse">A carregar dados...</div>;
  }
};

export default TotalConsumed;
