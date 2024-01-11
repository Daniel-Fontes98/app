import { DataTable } from "~/components/DataTable";
import { api } from "~/utils/api";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import useNurseryColumns from "~/components/Hooks/useNurseryColumns";
import { toast, Toaster } from "react-hot-toast";

const ShowWaitingPeopleNursery = () => {
  const { isLoading, data, refetch } =
    api.companyAppointment.getAllAwaitingNursery.useQuery();
  const setNurseryExamsDoneMutation =
    api.companyAppointment.setNurseryExamsToDone.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedCompanyAppointment, setSelectedCompanyAppointment] =
    useState("");
  const { awaitingNurseryColumns } = useNurseryColumns(
    setIsModalOpen,
    setSelectedCompanyAppointment
  );

  useEffect(() => {
    Modal.setAppElement(document.getElementById("NurseModalElement")!);
  }, []);

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
        setNurseryExamsDoneMutation.mutateAsync({
          id: selectedCompanyAppointment,
        }),
        {
          error: (err) => `Erro ao submeter exames: ${err}`,
          success: () => "Exames submetidos com sucesso !",
          loading: "A submeter exames...",
        }
      )
      .then(() => {
        refetch();
        setIsModalOpen(false);
        setIsButtonDisabled(false);
      })
      .catch((err) => {
        setIsButtonDisabled(false);
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
          Enfermagem
        </div>
      </div>
      {!isLoading ? (
        <div className="container mt-16 flex items-center justify-center">
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
                  ?.nurseryExams.map((exam) => (
                    <div className="ml-2">{exam.examName}</div>
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

          <DataTable columns={awaitingNurseryColumns} data={data!} />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowWaitingPeopleNursery;
