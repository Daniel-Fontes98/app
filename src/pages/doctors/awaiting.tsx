import { DataTable } from "~/components/DataTable";
import useDoctorColumns from "~/components/TableColumns/useDoctorColumns";
import Modal from "react-modal";
import { api } from "~/utils/api";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ShowWaitingForDoctor = () => {
  const { isLoading, data, refetch } =
    api.companyAppointment.getAllAwaitingDoctor.useQuery();
  const setIsArquivedMutation =
    api.companyAppointment.setIsArquived.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedCompanyAppointment, setSelectedCompanyAppointment] =
    useState("");
  const { awaitingDoctorColumns } = useDoctorColumns(
    setIsModalOpen,
    setSelectedCompanyAppointment
  );
  Modal.setAppElement(document.getElementById("DoctorModalElement")!);

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
        setIsArquivedMutation.mutateAsync({
          id: selectedCompanyAppointment,
        }),
        {
          error: (err) => `Erro ao arquivar utente: ${err}`,
          success: () => "Utente arquivado com sucesso !",
          loading: "A arquivar utente...",
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
      id="DoctorModalElement"
    >
      <Toaster />
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          A aguardar atendimento
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
              <p className="mb-6 flex items-center justify-center">
                Quer mesmo arquivar este utente ?
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
          <DataTable columns={awaitingDoctorColumns} data={data!} />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowWaitingForDoctor;
