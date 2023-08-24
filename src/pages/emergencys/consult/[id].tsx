import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";
import Admission from "~/components/ConsultTabs/Admission";
import MedicalFile from "~/components/ConsultTabs/MedicalFile";
import NurseFile from "~/components/ConsultTabs/NurseFile";
import Terapeutic from "~/components/ConsultTabs/Terapeutic";
import UrgencyConsumables from "~/components/ConsultTabs/UrgencyConsumables";
import UserInfo from "~/components/ConsultTabs/UserInfo";
import { api } from "~/utils/api";

const Index: NextPage = () => {
  const [tab, setTab] = useState(0);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const id = router.query.id as string;
  const consult = api.emergencyConsults.getById.useQuery({
    id: id,
  });

  const unselected =
    "hover:cursor-pointer inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
  const selected =
    "hover:cursor-pointer active inline-block rounded-t-lg border-b-2 border-emerald-600 p-4 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500";

  if (!consult.isLoading && consult.data && id) {
    return (
      <div className="min-h-screen w-full  bg-slate-100 px-8 pb-4">
        <div className="mb-10 flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            Urgências - {consult.data?.user.name}
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
                  Ficha Médica
                </section>
              </li>
              <li className="mr-2">
                <section
                  className={tab === 2 ? selected : unselected}
                  onClick={() => setTab(2)}
                >
                  Exames & Material
                </section>
              </li>
              {consult.data?.admission !== null ? (
                <li className="mr-2">
                  <section
                    className={tab === 3 ? selected : unselected}
                    onClick={() => setTab(3)}
                  >
                    Internamento
                  </section>
                </li>
              ) : (
                <div></div>
              )}
              {consult.data?.admission !== null ? (
                <li className="mr-2">
                  <section
                    className={tab === 4 ? selected : unselected}
                    onClick={() => setTab(4)}
                  >
                    Terapêutica
                  </section>
                </li>
              ) : (
                <div></div>
              )}
              {consult.data?.admission !== null ? (
                <li className="mr-2">
                  <section
                    className={tab === 5 ? selected : unselected}
                    onClick={() => setTab(5)}
                  >
                    Ficha Enfermeiros
                  </section>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
          <div>
            {tab === 0 && id ? (
              <div>
                <UserInfo
                  user={consult.data?.user}
                  emergencyTriage={consult.data?.emergencyTriage}
                  insurance={consult.data?.insurance}
                />
                <div className="mt-8">
                  {consult.data?.admission !== null ? (
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
              <MedicalFile emergencyConsultId={id} />
            ) : tab === 2 ? (
              <UrgencyConsumables
                items={consult.data?.medicalItems}
                exams={consult.data?.medicalExams}
                emergencyConsultId={consult.data.id}
              />
            ) : tab === 3 && consult.data.admission ? (
              <Admission admission={consult.data.admission} />
            ) : tab === 4 ? (
              <div>
                <Terapeutic emergencyConsultId={id} />
              </div>
            ) : (
              <NurseFile emergencyConsultId={id} />
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
