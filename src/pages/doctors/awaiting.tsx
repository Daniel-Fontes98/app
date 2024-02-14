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
  const [filter, setFilter] = useState("");
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
          error: `Erro ao arquivar utente por favor tentar novamente`,
          success: () => "Utente arquivado com sucesso !",
          loading: "A arquivar utente...",
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
        <div className="container flex flex-col items-center justify-center">
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
          <div className="mb-8 flex w-full justify-end">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                placeholder="Procurar nome..."
                onChange={(e) => setFilter(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 right-2.5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              >
                Procurar
              </button>
            </div>
          </div>
          <DataTable
            columns={awaitingDoctorColumns}
            data={
              filter === ""
                ? data!
                : data!.filter((object) => object.user.name.includes(filter))
            }
          />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowWaitingForDoctor;
