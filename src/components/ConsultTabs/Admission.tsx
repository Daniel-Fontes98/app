import type { Admission, EmergencyMeals } from "@prisma/client";
import { useRouter } from "next/router";

interface AdmissionProps {
  admission: Admission & { emergencyMeals: EmergencyMeals[] };
}

const AdmissionTab = ({ admission }: AdmissionProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-8">
      <div className="flex w-1/2 flex-col gap-2">
        <h2 className="text-xl font-bold">Informação Internamento</h2>
        <div className="w-full rounded-b-md bg-white p-4 shadow-md">
          <div className="flex flex-col justify-start gap-2">
            <p>Data de internamento: {admission.entryDate}</p>
            <p>Hora de internamento: {admission.entryHour} </p>
            <p>Cama: {admission.bedNumber}</p>
            <p>Razão de internamento: {admission.description}</p>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-2">
        <h2 className="text-xl font-bold">Refeições</h2>
        <div className="w-full rounded-b-md bg-white p-4 shadow-md">
          <div className="flex w-1/2 flex-col justify-end gap-2">
            <p>
              Pequenos almoços consumidos:{" "}
              {admission?.emergencyMeals.reduce(
                (acc, curr) =>
                  curr.typeOfMeal === "breakfast" ? acc + 1 : acc,
                0
              )}
            </p>
            <p>
              Almoços consumidos:{" "}
              {admission?.emergencyMeals.reduce(
                (acc, curr) => (curr.typeOfMeal === "lunch" ? acc + 1 : acc),
                0
              )}
            </p>
            <p>
              Jantares consumidos:{" "}
              {admission?.emergencyMeals.reduce(
                (acc, curr) => (curr.typeOfMeal === "dinner" ? acc + 1 : acc),
                0
              )}
            </p>
            <p>
              Lanches consumidos:{" "}
              {admission?.emergencyMeals.reduce(
                (acc, curr) => (curr.typeOfMeal === "snack" ? acc + 1 : acc),
                0
              )}
            </p>
          </div>
          <button
            onClick={() =>
              router.push(`/emergencys/meals/${admission.emergencyConsultId}`)
            }
            className="float-right rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          >
            + Refeição
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionTab;
