import { useRouter } from "next/router";
import { orderByDateAndTime } from "~/components/UrgencyConsumables";
import { calculateAge } from "~/components/UserInfo";
import { api } from "~/utils/api";
import { convertDate } from "~/utils/dates";

const Index = () => {
  const router = useRouter();
  const id = router.query.id;
  const consult = api.emergencyConsults.getById.useQuery({
    id: id as string,
  }).data;
  if (consult) {
    return (
      <div className=" min-h-screen items-center justify-center bg-slate-100">
        <div className="mb-10 flex items-center justify-center">
          <div className="whitespace-nowrap rounded-b-2xl bg-emerald-600 px-4 py-2 text-center text-white">
            Toda a informação - {consult?.user.name}
          </div>
        </div>
        <div className="mx-8 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Informação Paciente</h2>
            <div className="w-full rounded-b-md bg-white p-4 shadow-md">
              <div className="flex flex-col items-start justify-center gap-2">
                <p>ID: {consult.user.idNumber}</p>
                <p>Data de Nascimento: {consult.user.birthDate}</p>
                <p>Idade: {calculateAge(consult.user.birthDate!)}</p>
                <p>Gênero: {consult.user.gender}</p>
                <p>Nacionalidade: {consult.user.nacionality}</p>
                <p>Telemóvel: {consult.user.number}</p>
                <p>Seguro: {consult.insurance!.name}</p>
                {consult.insurance!.name !== "Particular" && (
                  <p>Apólice: {consult.insurance!.idNumber}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-xl font-bold">Informação Triagem</h2>
            <div className="mr-4 mt-2 w-full rounded-b-md bg-white p-4 shadow-md">
              <div className="flex flex-col items-start justify-center gap-2">
                <p>Peso(kg): {consult.emergencyTriage?.weight}</p>
                <p>Altura(m): {consult.emergencyTriage?.height}</p>
                <p>Tipo de Sangue: {consult.emergencyTriage?.bloodType}</p>
                <p>Temperatura (ºC): {consult.emergencyTriage?.degrees}</p>
                <p>
                  Saturação de oxigénio (PO<span className="text-xs">2</span>):{" "}
                  {consult.emergencyTriage?.oxygen}
                </p>
                <p>Tensão Miníma: {consult.emergencyTriage?.tMin}</p>
                <p>Tensão Maxima: {consult.emergencyTriage?.tMax}</p>
                <p>Queixa Principal: {consult.emergencyTriage?.complaint}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8 mt-8 flex gap-4">
          {consult.emergencyTriage?.sintoms && (
            <div className="flex w-full flex-col">
              <h2 className="text-xl font-bold">Sintomas Triagem</h2>
              <div className="mr-4 mt-2 w-full rounded-b-md bg-white p-4 shadow-md">
                <div className="flex flex-col items-start justify-center gap-2">
                  {consult.emergencyTriage?.sintoms?.split(",").map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex w-1/2 flex-col gap-2">
            <h2 className="text-xl font-bold">Refeições</h2>
            <div className="w-full rounded-b-md bg-white p-4 shadow-md">
              <div className="flex w-1/2 flex-col justify-end gap-2">
                <p>
                  Pequenos almoços :{" "}
                  {consult.admission?.emergencyMeals.reduce(
                    (acc, curr) =>
                      curr.typeOfMeal === "breakfast" ? acc + 1 : acc,
                    0
                  )}
                </p>
                <p>
                  Almoços :{" "}
                  {consult.admission?.emergencyMeals.reduce(
                    (acc, curr) =>
                      curr.typeOfMeal === "lunch" ? acc + 1 : acc,
                    0
                  )}
                </p>
                <p>
                  Jantares :{" "}
                  {consult.admission?.emergencyMeals.reduce(
                    (acc, curr) =>
                      curr.typeOfMeal === "dinner" ? acc + 1 : acc,
                    0
                  )}
                </p>
                <p>
                  Lanches :{" "}
                  {consult.admission?.emergencyMeals.reduce(
                    (acc, curr) =>
                      curr.typeOfMeal === "snack" ? acc + 1 : acc,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8 mt-8">
          <h2 className="text-xl font-bold">Exames realizados:</h2>
          <div className="mt-2 rounded-b-md bg-white p-4 shadow-md">
            {consult.medicalExams.length !== 0 ? (
              orderByDateAndTime(consult.medicalExams).map((exam) => {
                return (
                  <div>
                    <div className="flex gap-8">
                      <div>
                        {exam.date} {exam.hour}, {exam.name} -{" "}
                        {exam.description}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-black">Sem exames registados</div>
            )}
          </div>
        </div>
        <div className="mx-8 mt-8">
          <h2 className="text-xl font-bold">Material utilizado:</h2>
          <div className="mt-2 rounded-b-md bg-white p-4 shadow-md">
            {consult.medicalItems.length !== 0 ? (
              consult.medicalItems.map((item) => {
                return (
                  <p key={item.id}>
                    {item.quantity}x {item.name}
                  </p>
                );
              })
            ) : (
              <div className="text-black">Sem material registado</div>
            )}
          </div>
        </div>
        <div className="mx-8 mt-8">
          <h2 className="text-xl font-bold">Histórico Médico:</h2>
          <div className="mt-8 flex w-full min-w-full max-w-screen-md flex-col justify-center gap-2 rounded-b-md bg-white shadow-md">
            {consult.medicalFile ? (
              consult.medicalFile.map((comm) => (
                <div key={comm.id}>
                  <div className="flex w-full flex-grow items-center justify-center gap-4 ">
                    <span className="ml-2 w-1/2">{comm.comment}</span>
                    <span className="w-1/4 font-semibold">
                      {comm.createdBy}
                    </span>
                    <span className="w-1/4">{convertDate(comm.createdAt)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="mx-8 mt-8">
          <h2 className="text-xl font-bold">Histórico Enfermeiros:</h2>
          <div className="mt-8 flex w-full min-w-full max-w-screen-md flex-col justify-center gap-2 rounded-b-md bg-white shadow-md">
            {consult.nurseFile ? (
              consult.nurseFile.map((comm) => (
                <div key={comm.id}>
                  <div className="flex w-full flex-grow items-center justify-center gap-4 ">
                    <span className="ml-2 w-1/2">{comm.comment}</span>
                    <span className="w-1/4 font-semibold">
                      {comm.createdBy}
                    </span>
                    <span className="w-1/4">{convertDate(comm.createdAt)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="mx-8 mt-8"></div>
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
};

export default Index;
