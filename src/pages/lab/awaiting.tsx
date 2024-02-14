import { DataTable } from "~/components/DataTable";
import { api } from "~/utils/api";
import Modal from "react-modal";
import { type ChangeEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import useLabColumns from "~/components/Hooks/useLabColumns";
import useLabTbColumns from "~/components/TableColumns/useLabTBColumns";

const ShowWaitingPeopleLab = () => {
  const { isLoading, data, refetch } =
    api.companyAppointment.getAllAwaitingLab.useQuery();
  const setLabExamsToDone =
    api.companyAppointment.setLabExamsToDone.useMutation();
  const setTbExamToAttached =
    api.companyAppointment.setTbExamToAttached.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTbModalOpen, setIsTbModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTbButtonDisabled, setIsTbButtonDisabled] = useState(false);
  const [selectedCompanyAppointment, setSelectedCompanyAppointment] =
    useState("");
  const { awaitingLabExamsColumns } = useLabColumns(
    setIsModalOpen,
    setSelectedCompanyAppointment
  );

  const { awaitingLabTbColumns } = useLabTbColumns(
    setIsTbModalOpen,
    setSelectedCompanyAppointment
  );
  const [tableFilter, setTableFilter] = useState("occupationalMedicine");
  Modal.setAppElement(document.getElementById("NurseModalElement")!);

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTableFilter(e.target.value);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleButtonSubmit = () => {
    setIsButtonDisabled(true);
    toast
      .promise(
        setLabExamsToDone.mutateAsync({
          id: selectedCompanyAppointment,
        }),
        {
          error: `Erro ao submeter exames por favor tentar novamente`,
          success: () => "Exames submetidos com sucesso !",
          loading: "A submeter exames...",
        }
      )
      .then(() => {
        void refetch();
        setIsModalOpen(false);
        setIsButtonDisabled(false);
      })
      .catch(() => {
        setIsButtonDisabled(false);
      });
  };

  const handleTbButtonSubmit = () => {
    setIsTbButtonDisabled(true);
    toast
      .promise(
        setTbExamToAttached.mutateAsync({
          id: selectedCompanyAppointment,
        }),
        {
          error: `Erro ao submeter exame por favor tentar novamente`,
          success: () => `Exame submetido com sucesso !`,
          loading: "A submeter exame...",
        }
      )
      .then(() => {
        void refetch();
        setIsTbModalOpen(false);
        setIsTbButtonDisabled(false);
      })
      .catch(() => {
        setIsTbButtonDisabled(false);
      });
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col gap-8 bg-slate-100"
      id="NurseModalElement"
    >
      <Toaster />
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Laboratório
        </div>
      </div>
      {!isLoading ? (
        <div className="container flex flex-col items-center justify-center gap-6">
          <div className="mt-2 flex items-center justify-center gap-12">
            <div className="flex items-center justify-center gap-2">
              <input
                name="type"
                id="occupationalMedicine"
                checked={tableFilter === "occupationalMedicine"}
                value="occupationalMedicine"
                type="radio"
                onChange={(e) => onOptionChange(e)}
              />
              <label htmlFor="occupationalMedicine">Medicina do Trabalho</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                name="type"
                id="tuberculosis"
                checked={tableFilter === "tuberculosis"}
                value="tuberculosis"
                type="radio"
                onChange={(e) => onOptionChange(e)}
              />
              <label htmlFor="tuberculosis">Certificado TB</label>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
          >
            <div>
              <div className="flex w-full  flex-col items-center justify-center gap-6">
                <h2 className="font-bold">Exames Realizados:</h2>
              </div>
              <div className="flex flex-col items-start justify-start">
                {data
                  ?.find(
                    (companyAppointment) =>
                      companyAppointment.id === selectedCompanyAppointment
                  )
                  ?.labExams.map((exam) => (
                    <div key={exam.id} className="ml-2">
                      {exam.examName}
                    </div>
                  ))}
              </div>
              <p className="mt-6">
                Se marcar este utente como feito, não poderá adicionar mais
                exames.
              </p>
              <p className="mb-6 flex items-center justify-center">
                Deseja continuar ?
              </p>
              <div className="flex items-center justify-center gap-8">
                <button
                  className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isButtonDisabled}
                  onClick={() => handleButtonSubmit()}
                >
                  Sim
                </button>
                <button
                  className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => setIsModalOpen(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isTbModalOpen}
            onRequestClose={() => setIsTbModalOpen(false)}
            style={customStyles}
          >
            <div>
              <div className="flex w-full  flex-col items-center justify-center gap-6">
                <h2 className="font-bold">Exames Realizados:</h2>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="ml-2">
                  {
                    data?.find(
                      (companyAppointment) =>
                        companyAppointment.id === selectedCompanyAppointment
                    )?.tbExams?.testType
                  }
                </div>
              </div>
              <p className="mt-6">
                Se marcar este utente como feito, não poderá adicionar mais
                exames.
              </p>
              <p className="mb-6 flex items-center justify-center">
                Deseja continuar ?
              </p>
              <div className="flex items-center justify-center gap-8">
                <button
                  className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isTbButtonDisabled}
                  onClick={() => handleTbButtonSubmit()}
                >
                  Sim
                </button>
                <button
                  className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => setIsTbModalOpen(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </Modal>
          {tableFilter === "occupationalMedicine" ? (
            <DataTable columns={awaitingLabExamsColumns} data={data!} />
          ) : (
            <div>
              <DataTable
                columns={awaitingLabTbColumns}
                data={data!.filter(
                  (field) =>
                    field.hasTbCertificate === true &&
                    field.isTbExamAttached === false
                )}
              />
            </div>
          )}
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowWaitingPeopleLab;
