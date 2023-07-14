import { columns } from "~/components/columns";
import { DataTable } from "~/components/data-table";
import { api } from "~/utils/api";

export default function Page() {
  const data = api.emergencyConsults.getAll.useQuery().data;

  if (data) {
    return (
      <div>
        <div className=" flex flex-col items-center justify-center gap-16 overflow-x-auto">
          <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
            Histórico das urgências
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    );
  } else {
    return <div>Loading.....</div>;
  }
}
