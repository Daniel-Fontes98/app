import { useState } from "react";
import { DataTable } from "~/components/DataTable";
import { completedNurseryExamsColumns } from "~/components/TableColumns/CompletedNurseryExamsColumns";
import { api } from "~/utils/api";

const ShowCompletedNurseryExam = () => {
  const [filter, setFilter] = useState("");
  const { isFetched, data } = api.nurseryExams.getAll.useQuery();

  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-slate-100">
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Histórico de Exames Enfermagem
        </div>
      </div>
      {isFetched && data ? (
        <div className="container mt-16 flex flex-col items-center justify-center">
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
            columns={completedNurseryExamsColumns}
            data={
              filter === ""
                ? data
                : data.filter((nurseryExam) =>
                    nurseryExam.companyAppointment.user.name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  )
            }
          />
        </div>
      ) : (
        <div>A carregar dados...</div>
      )}
    </div>
  );
};

export default ShowCompletedNurseryExam;
