import type { LabExams, NurseryExam } from "@prisma/client";
import { DataTable } from "../DataTable";
import { useState } from "react";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import useDoctorLabColumns from "../TableColumns/DoctorLabExams";
import useDoctorNurseColumns from "../TableColumns/DoctorNurseExams";

interface ExamsProps {
  labExams: LabExams[];
  nurseExams: NurseryExam[];
  id: string;
  isPending: boolean;
  callRefetch: () => Promise<void>;
}

const Exams = (props: ExamsProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLabButtonDisabled, setIsLabButtonDisabled] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  const [isRemoveLabButtonDisabled, setIsRemoveLabButtonDisabled] =
    useState(false);
  const [isRemoveLabModalOpen, setIsRemoveLabModalOpen] = useState(false);

  const [isNurseryButtonDisabled, setIsNurseryButtonDisabled] = useState(false);
  const [isNurseryModalOpen, setIsNurseryModalOpen] = useState(false);

  const [isRemoveNurseryButtonDisabled, setIsRemoveNurseryButtonDisabled] =
    useState(false);
  const [isRemoveNurseryModalOpen, setIsRemoveNurseryModalOpen] =
    useState(false);

  const [selectedLabExam, setSelectedLabExam] = useState("");
  const [selectedNurseryExam, setSelectedNurseryExam] = useState("");

  const { doctorLabExams } = useDoctorLabColumns(
    setSelectedLabExam,
    setIsRemoveLabModalOpen
  );

  const { doctorNurseryExams } = useDoctorNurseColumns(
    setSelectedNurseryExam,
    setIsRemoveNurseryModalOpen
  );

  const markAsPending = api.companyAppointment.markAsPending.useMutation();

  const removeLabExam = api.labExams.removeByLabExamId.useMutation();
  const markLabExamsAsIncomplete =
    api.companyAppointment.markLabExamsIncomplete.useMutation();

  const removeNurseryExam =
    api.nurseryExams.removeByNurseryExamId.useMutation();
  const markNurseryExamsAsIncomplete =
    api.companyAppointment.markNurseryExamsIncomplete.useMutation();

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

  const handleButtonLabOnRemove = async () => {
    setIsRemoveLabButtonDisabled(true);
    try {
      await toast.promise(
        removeLabExam.mutateAsync({
          labExamId: selectedLabExam,
        }),
        {
          error: `Erro ao apagar exame, por favor tentar novamente`,
          loading: `A apagar exame...`,
          success: `Exame apagado com sucesso !`,
        }
      );
      setIsRemoveLabButtonDisabled(false);
      setIsRemoveLabModalOpen(false);
      props.callRefetch();
    } catch (err) {
      console.log(err);
      setIsRemoveLabButtonDisabled(false);
      setIsRemoveLabModalOpen(false);
    }
  };

  const handleButtonNurseryOnRemove = async () => {
    setIsRemoveNurseryButtonDisabled(true);
    try {
      await toast.promise(
        removeNurseryExam.mutateAsync({
          nurseryExamId: selectedNurseryExam,
        }),
        {
          error: `Erro ao apagar exame, por favor tentar novamente`,
          loading: `A apagar exame...`,
          success: `Exame apagado com sucesso !`,
        }
      );
      setIsRemoveNurseryButtonDisabled(false);
      setIsRemoveNurseryModalOpen(false);
      props.callRefetch();
    } catch (err) {
      console.log(err);
      setIsRemoveNurseryButtonDisabled(false);
      setIsRemoveNurseryModalOpen(false);
    }
  };

  const handleButtonMarkLabIncomplete = async () => {
    setIsLabButtonDisabled(true);
    try {
      await toast.promise(
        markLabExamsAsIncomplete.mutateAsync({
          companyAppointmentId: props.id,
        }),
        {
          error: `Erro ao remeter ao laboratório, por favor tentar novamente`,
          loading: `A processar...`,
          success: `Remetido ao laboratório com sucesso !!`,
        }
      );
      setIsLabModalOpen(false);
      setIsLabButtonDisabled(false);
    } catch (err) {
      console.log(err);
      setIsLabModalOpen(false);
      setIsLabButtonDisabled(false);
    }
  };

  const handleButtonMarkNurseryIncomplete = async () => {
    setIsNurseryButtonDisabled(true);
    try {
      await toast.promise(
        markNurseryExamsAsIncomplete.mutateAsync({
          companyAppointmentId: props.id,
        }),
        {
          error: `Erro ao remeter à enfermagem, por favor tentar novamente`,
          loading: `A processar...`,
          success: `Remetido à enfermagem com sucesso !!`,
        }
      );
      setIsNurseryModalOpen(false);
      setIsNurseryButtonDisabled(false);
    } catch (err) {
      console.log(err);
      setIsNurseryModalOpen(false);
      setIsNurseryButtonDisabled(false);
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
      <Modal
        isOpen={isRemoveLabModalOpen}
        onRequestClose={() => setIsRemoveLabModalOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex w-full  flex-col items-center justify-center gap-6">
            <h2 className="font-bold">Apagar exame de utente</h2>
          </div>
          <p className="my-6">Tem a certeza que pretende apagar este exame?</p>
          <div className="flex items-center justify-center gap-8">
            <button
              className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isRemoveLabButtonDisabled}
              onClick={() => handleButtonLabOnRemove()}
            >
              Sim
            </button>
            <button
              className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => setIsRemoveLabModalOpen(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isLabModalOpen}
        onRequestClose={() => setIsLabModalOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex w-full  flex-col items-center justify-center gap-6">
            <h2 className="font-bold">Remeter a laboratório</h2>
          </div>
          <p className="my-6">
            Tem a certeza que pretende continuar com esta acção?
          </p>
          <div className="flex items-center justify-center gap-8">
            <button
              className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLabButtonDisabled}
              onClick={() => handleButtonMarkLabIncomplete()}
            >
              Sim
            </button>
            <button
              className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => setIsLabModalOpen(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isRemoveNurseryModalOpen}
        onRequestClose={() => setIsRemoveNurseryModalOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex w-full  flex-col items-center justify-center gap-6">
            <h2 className="font-bold">Apagar exame de utente</h2>
          </div>
          <p className="my-6">Tem a certeza que pretende apagar este exame?</p>
          <div className="flex items-center justify-center gap-8">
            <button
              className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isRemoveNurseryButtonDisabled}
              onClick={() => handleButtonNurseryOnRemove()}
            >
              Sim
            </button>
            <button
              className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => setIsRemoveNurseryModalOpen(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isNurseryModalOpen}
        onRequestClose={() => setIsNurseryModalOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex w-full  flex-col items-center justify-center gap-6">
            <h2 className="font-bold">Remeter a enfermagem</h2>
          </div>
          <p className="my-6">
            Tem a certeza que pretende continuar com esta acção?
          </p>
          <div className="flex items-center justify-center gap-8">
            <button
              className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isNurseryButtonDisabled}
              onClick={() => handleButtonMarkNurseryIncomplete()}
            >
              Sim
            </button>
            <button
              className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => setIsNurseryModalOpen(false)}
            >
              Não
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center justify-center gap-8">
        <div>
          <DataTable columns={doctorNurseryExams} data={props.nurseExams} />
        </div>
        <div>
          <DataTable columns={doctorLabExams} data={props.labExams} />
        </div>
      </div>
      <div className="mt-16 flex items-center justify-center gap-4">
        <button
          className="rounded-full bg-cyan-500 px-4 py-2 font-bold text-white hover:bg-cyan-700"
          disabled={isNurseryButtonDisabled}
          onClick={() => setIsNurseryModalOpen(true)}
        >
          Remeter a enfermagem
        </button>
        <button
          className="rounded-full bg-amber-500 px-4 py-2 font-bold text-white hover:bg-amber-700"
          disabled={isLabButtonDisabled}
          onClick={() => setIsLabModalOpen(true)}
        >
          Remeter a laboratório
        </button>
        {!props.isPending ? (
          <button
            className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Marcar Como Pendente
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Exams;
