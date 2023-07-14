import { useRouter } from "next/router";
import { api } from "~/utils/api";
import {
  calculateTotalHoursElapsedBetweenDateAndString,
  calculateTotalHoursElapsedBetweenTwoDates,
} from "~/utils/dates";

const TotalConsumed = () => {
  const router = useRouter();
  const emergencyConsultId = router.query.id;
  const consult = api.emergencyConsults.getById.useQuery({
    id: emergencyConsultId as string,
  }).data;

  if (consult) {
    return (
      <>
        <div className="min-h-screen bg-slate-100">
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
                  <div className="mt-4 flex w-full flex-col gap-2 border-b-2 pb-4">
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
                <div className="mt-2 grid grid-cols-2 gap-2">
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
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div className="animate-pulse">A carregar dados...</div>;
  }
};

export default TotalConsumed;
