import { DataTable } from "~/components/DataTable";
import { api } from "~/utils/api";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import useNurseryColumns from "~/components/Hooks/useNurseryColumns";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const ShowWaitingPeopleNursery = () => {
  const { isLoading, data, refetch } =
    api.companyAppointment.getAllAwaitingNursery.useQuery();
  const setNurseryExamsDoneMutation =
    api.companyAppointment.setNurseryExamsToDone.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedCompanyAppointment, setSelectedCompanyAppointment] =
    useState("");
  const { awaitingNurseryColumns } = useNurseryColumns(
    setIsModalOpen,
    setSelectedCompanyAppointment
  );
  const router = useRouter();

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

    const appointment = data?.find(
      (element) => element.id === selectedCompanyAppointment
    );

    if (appointment?.isHistoryFilled === false) {
      toast.error("Por favor preencher o historico primeiro");
      setIsModalOpen(false);
      setIsButtonDisabled(false);
      return;
    }

    if (appointment?.isTriageFilled === false) {
      toast.error("Por favor preencher a triagem primeiro");
      setIsModalOpen(false);
      setIsButtonDisabled(false);
      return;
    }

    toast
      .promise(
        setNurseryExamsDoneMutation.mutateAsync({
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
      .catch((err) => {
        console.log(err);
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

      {!isLoading && data ? (
        <div className="container mt-8 flex flex-col items-center justify-center">
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
            columns={awaitingNurseryColumns}
            data={data.filter((companyAppointment) =>
              companyAppointment.user.name
                .toLowerCase()
                .includes(filter.toLowerCase())
            )}
            onRowClick={(id: string) => router.push(`/nursery/userPanel/${id}`)}
          />
          <div className="flex w-full justify-start">
            <p>Total de Utentes: {data.length}</p>
          </div>
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowWaitingPeopleNursery;
