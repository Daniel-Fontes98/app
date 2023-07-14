import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useState } from "react";
import TextArea from "~/components/ConsultTextArea";
import UrgencyConsumables from "~/components/UrgencyConsumables";
import UserInfo from "~/components/UserInfo";
import { api } from "~/utils/api";

const Index: NextPage = () => {
  const [tab, setTab] = useState(0);
  const [medicalFile, setMedicalFile] = useState<string>("");
  const [nurseFile, setNurseFile] = useState<string>("");
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const router = useRouter();
  const id = router.query.id;
  const consult = api.emergencyConsults.getById.useQuery({
    id: id as string,
  }).data;

  const medicalCommentMutation = api.medicalComments.insertOne.useMutation();
  const nurseCommentMutation = api.nurseComments.insertOne.useMutation();
  const handleMedicalClick = () => {
    medicalCommentMutation.mutate({
      emergencyConsultId: id as string,
      comment: medicalFile,
      createdBy: user.firstName!,
    });
    setMedicalFile("");
  };

  const handleNurseClick = async () => {
    nurseCommentMutation.mutate({
      emergencyConsultId: id as string,
      comment: nurseFile,
      createdBy: user.firstName!,
    });
    setNurseFile("");
  };

  const unselected =
    "hover:cursor-pointer inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
  const selected =
    "hover:cursor-pointer active inline-block rounded-t-lg border-b-2 border-emerald-600 p-4 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500";

  if (consult) {
    return (
      <div className="min-h-screen w-full  bg-slate-100 px-8 pb-4">
        <div className="mb-10 flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            Urgências - {consult.user.name}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <ul className="-mb-px flex flex-wrap">
              <li className="mr-2">
                <section
                  className={tab === 0 ? selected : unselected}
                  onClick={() => setTab(0)}
                >
                  Ficha Paciente
                </section>
              </li>
              <li className="mr-2">
                <section
                  className={tab === 1 ? selected : unselected}
                  onClick={() => setTab(1)}
                >
                  Exames & Material
                </section>
              </li>
              {consult.admission !== null ? (
                <li className="mr-2">
                  <section
                    className={tab === 2 ? selected : unselected}
                    onClick={() => setTab(2)}
                  >
                    Internamento
                  </section>
                </li>
              ) : (
                <div></div>
              )}
              <li className="mr-2">
                <section
                  className={tab === 3 ? selected : unselected}
                  onClick={() => setTab(3)}
                >
                  Ficha Médica
                </section>
              </li>
              <li className="mr-2">
                <section
                  className={tab === 4 ? selected : unselected}
                  onClick={() => setTab(4)}
                >
                  Ficha Enfermeiros
                </section>
              </li>
            </ul>
          </div>
          <div>
            {tab === 0 ? (
              <div>
                <UserInfo
                  user={consult.user}
                  emergencyTriage={consult.emergencyTriage}
                  insurance={consult.insurance}
                />
                <div className="mt-8">
                  {consult.admission !== null ? (
                    <div></div>
                  ) : (
                    <button
                      className="float-right h-3/4 rounded-xl bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-800"
                      onClick={() => router.push(`/emergencys/admission/${id}`)}
                    >
                      Internar
                    </button>
                  )}

                  <button
                    className="float-right mr-4 h-3/4 rounded-xl bg-cyan-600 px-4 py-2  text-white shadow-sm hover:bg-cyan-800"
                    onClick={() => router.push(`/emergencys/release/${id}`)}
                  >
                    Emitir Alta
                  </button>
                  <button
                    className="float-right mr-4 h-3/4 rounded-xl bg-amber-600 px-4 py-2  text-white shadow-sm hover:bg-cyan-800"
                    onClick={() => router.push(`/emergencys/transfer/${id}`)}
                  >
                    Transferir
                  </button>
                </div>
              </div>
            ) : tab === 1 ? (
              <UrgencyConsumables
                items={consult.medicalItems}
                exams={consult.medicalExams}
                emergencyConsultId={consult.id}
              />
            ) : tab === 2 ? (
              <div className="flex gap-8">
                <div className="flex w-1/2 flex-col gap-2">
                  <h2 className="text-xl font-bold">Informação Internamento</h2>
                  <div className="w-full rounded-b-md bg-white p-4 shadow-md">
                    <div className="flex flex-col justify-start gap-2">
                      <p>
                        Data de internamento: {consult.admission?.entryDate}
                      </p>
                      <p>
                        Hora de internamento: {consult.admission?.entryHour}{" "}
                      </p>
                      <p>Cama: {consult.admission?.bedNumber}</p>
                      <p>
                        Razão de internamento: {consult.admission?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <h2 className="text-xl font-bold">Refeições</h2>
                  <div className="w-full rounded-b-md bg-white p-4 shadow-md">
                    <div className="flex w-1/2 flex-col justify-end gap-2">
                      <p>
                        Pequenos almoços consumidos:{" "}
                        {consult.admission?.emergencyMeals.reduce(
                          (acc, curr) =>
                            curr.typeOfMeal === "breakfast" ? acc + 1 : acc,
                          0
                        )}
                      </p>
                      <p>
                        Almoços consumidos:{" "}
                        {consult.admission?.emergencyMeals.reduce(
                          (acc, curr) =>
                            curr.typeOfMeal === "lunch" ? acc + 1 : acc,
                          0
                        )}
                      </p>
                      <p>
                        Jantares consumidos:{" "}
                        {consult.admission?.emergencyMeals.reduce(
                          (acc, curr) =>
                            curr.typeOfMeal === "dinner" ? acc + 1 : acc,
                          0
                        )}
                      </p>
                      <p>
                        Lanches consumidos:{" "}
                        {consult.admission?.emergencyMeals.reduce(
                          (acc, curr) =>
                            curr.typeOfMeal === "snack" ? acc + 1 : acc,
                          0
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/emergencys/meals/${id}`)}
                      className="float-right rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
                    >
                      + Refeição
                    </button>
                  </div>
                </div>
              </div>
            ) : tab === 3 ? (
              <TextArea
                comment={medicalFile}
                handleClick={handleMedicalClick}
                setComment={setMedicalFile}
                commentsList={consult.medicalFile}
              />
            ) : (
              <TextArea
                comment={nurseFile}
                handleClick={handleNurseClick}
                setComment={setNurseFile}
                commentsList={consult.nurseFile}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-pulse text-2xl">A carregar a página...</div>
      </div>
    );
  }
};

export default Index;
