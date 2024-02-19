import type { LabExams, NurseryExam } from "@prisma/client";
import { DataTable } from "../DataTable";
import { doctorLabExams } from "../TableColumns/DoctorLabExams";
import { doctorNurseExams } from "../TableColumns/DoctorNurseExams";
import { useState } from "react";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

interface ExamsProps {
  labExams: LabExams[];
  nurseExams: NurseryExam[];
  id: string;
  isPending: boolean;
}

const Exams = (props: ExamsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const markAsPending = api.companyAppointment.markAsPending.useMutation();
  Modal.setAppElement(document.getElementById("PendingModalElement")!);

  const handleButtonSubmit = async () => {
    setIsButtonDisabled(true);
    try {
      await toast.promise(
        markAsPending.mutateAsync({
          companyAppointmentId: props.id,
        }),
        {
          error: `Erro ao marcar utente como pendente, por favor tentar novamente`,
          loading: "A marcar utente como pendente...",
          success: "Utente marcado como pendente com sucesso !",
        }
      );
      setIsButtonDisabled(false);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      setIsButtonDisabled(false);
      setIsModalOpen(false);
    }
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
  return (
    <div className="relative" id="PendingModalElement">
      <Toaster />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex w-full  flex-col items-center justify-center gap-6">
            <h2 className="font-bold">Marcar Utente como pendente</h2>
          </div>
          <p className="my-6">
            Tem a certeza que pretende marcar este utente como pendente?
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
      {!props.isPending ? (
        <div className="absolute right-0 top-0">
          <button
            className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Marcar Como Pendente
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex items-center justify-center gap-8">
        <div>
          <DataTable columns={doctorNurseExams} data={props.nurseExams} />
        </div>
        <div>
          <DataTable columns={doctorLabExams} data={props.labExams} />
        </div>
      </div>
    </div>
  );
};

export default Exams;
