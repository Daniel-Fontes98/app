import { DataTable } from "~/components/DataTable";
import useCompletedDoctorTable from "~/components/TableColumns/useCompletedDoctorTable";
import { api } from "~/utils/api";

const History = () => {
  const { isFetched, data } = api.companyAppointment.getAllArchived.useQuery();
  const { completedDoctorColumns } = useCompletedDoctorTable();

  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-slate-100">
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Histórico de Atendimentos Médicos
        </div>
      </div>
      {isFetched ? (
        <div className="container mt-16 flex items-center justify-center">
          <DataTable columns={completedDoctorColumns} data={data!} />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default History;
