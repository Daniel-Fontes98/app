import { DataTable } from "~/components/DataTable";
import { completedXRayColumns } from "~/components/TableColumns/CompletedXRayColumns";
import { api } from "~/utils/api";

const ShowCompletedXRay = () => {
  const xRayObjectQuery =
    api.xRayObject.getAllIncludeUserAndRequisition.useQuery().data;

  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-slate-100">
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Histórico de Exames Radiológicos
        </div>
      </div>
      {xRayObjectQuery ? (
        <div className="container mt-16 flex items-center justify-center">
          <DataTable columns={completedXRayColumns} data={xRayObjectQuery} />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowCompletedXRay;
