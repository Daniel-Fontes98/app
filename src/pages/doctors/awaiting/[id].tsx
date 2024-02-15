import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";
import UserInfo from "~/components/CompanyAppointmentTabs/UserInfo";
import MedicalFile from "~/components/CompanyAppointmentTabs/MedicalFile";
import Exams from "~/components/CompanyAppointmentTabs/Exams";
import { api } from "~/utils/api";
import CertificateEmission from "~/components/CompanyAppointmentTabs/CertificateEmission";
import { processString } from "~/components/ConsultTabs/UrgencyConsumables";
import TbCertificateEmission from "~/components/CompanyAppointmentTabs/TbCertificateEmission";

const Index: NextPage = () => {
  const [tab, setTab] = useState(0);
  const router = useRouter();

  const id = router.query.id as string;
  const { isLoading, data, refetch } = api.companyAppointment.getById.useQuery({
    id: id,
  });

  const callRefetch = async () => {
    await refetch();
  };

  const unselected =
    "hover:cursor-pointer inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
  const selected =
    "hover:cursor-pointer active inline-block rounded-t-lg border-b-2 border-emerald-600 p-4 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500";

  if (!isLoading) {
    return (
      <div className="min-h-screen w-full  bg-slate-100 px-8 pb-4">
        <div className="mb-10 flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            {data?.user.name}
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
                  Exames
                </section>
              </li>
              {data?.historyLocation && (
                <li className="mr-2">
                  <a
                    href={processString(data.historyLocation)}
                    className={unselected}
                    target="_blank"
                    download
                  >
                    Ver Histórico
                  </a>
                </li>
              )}
              <li className="mr-2">
                <section
                  className={tab === 3 ? selected : unselected}
                  onClick={() => setTab(3)}
                >
                  Emitir Certificado
                </section>
              </li>
              {data?.isTbExamAttached ? (
                <>
                  <li className="mr-2">
                    <section
                      className={tab === 4 ? selected : unselected}
                      onClick={() => setTab(4)}
                    >
                      Emitir TB
                    </section>
                  </li>
                </>
              ) : (
                <></>
              )}
              {data?.certificateLocation ? (
                <>
                  <li className="mr-2">
                    <a
                      href={processString(data.certificateLocation)}
                      className={unselected}
                      target="_blank"
                      download
                    >
                      Ver Dossier
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href={processString(
                        data.certificateLocation.replace(".pdf", "Single.pdf")
                      )}
                      className={unselected}
                      target="_blank"
                      download
                    >
                      Ver Certificado
                    </a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div>
            {tab === 0 && id ? (
              <div>
                <UserInfo
                  user={data?.user}
                  triage={data?.triage}
                  role={data?.companyRole}
                  company={data?.company}
                  planType={data?.planType}
                />
              </div>
            ) : tab === 1 ? (
              <MedicalFile
                {...data?.medicalFile}
                companyAppointmentId={id}
                callRefetch={callRefetch}
              />
            ) : tab === 2 && data?.labExams && data?.nurseryExams ? (
              <Exams
                labExams={data?.labExams}
                nurseExams={data?.nurseryExams}
              />
            ) : tab === 3 ? (
              <CertificateEmission companyAppointmentId={id} />
            ) : tab === 4 ? (
              <TbCertificateEmission companyAppointmentId={id} />
            ) : (
              <div>Error...</div>
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
