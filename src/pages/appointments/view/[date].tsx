import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import { ViewPersonalAppointment } from "~/components/Appointments/ViewPersonalAppointments";
import { DataTable } from "~/components/DataTable";
import useAppointmentColumns from "~/components/Hooks/useAppointmentColumns";
import { api } from "~/utils/api";

const ViewAllByDate = () => {
  const [tableFilter, setTableFilter] = useState("company");
  const router = useRouter();
  const selectedDateAsString = router.query.date as string;
  const [day, month, year] = selectedDateAsString.split("-").map(Number);
  const [filter, setFilter] = useState("");
  const selectedDate = new Date(year!, month! - 1, day);
  const personalAppointmentsQuery =
    api.personalAppointment.getAllByDate.useQuery({ date: selectedDate });
  const companyAppointmentsQuery = api.companyAppointment.getAllByDate.useQuery(
    { date: selectedDate }
  );
  const { awaitingAppointmentColumns } = useAppointmentColumns();

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTableFilter(e.target.value);
  };

  return (
    <div className="container min-h-screen bg-slate-100">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            {`${selectedDate.getDate()}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getFullYear()}`}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-12">
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="companyId">Empresas</label>
            <input
              name="type"
              id="companyId"
              checked={tableFilter === "company"}
              value="company"
              type="radio"
              onChange={(e) => onOptionChange(e)}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="personalId">Particulares</label>
            <input
              name="type"
              id="personalId"
              checked={tableFilter === "personal"}
              value="personal"
              type="radio"
              onChange={(e) => onOptionChange(e)}
            />
          </div>
        </div>
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
        {tableFilter === "company" &&
        !companyAppointmentsQuery.isLoading &&
        companyAppointmentsQuery.data ? (
          <div>
            <DataTable
              columns={awaitingAppointmentColumns}
              data={
                filter === ""
                  ? companyAppointmentsQuery.data
                  : companyAppointmentsQuery.data.filter((data) =>
                      data.user.name
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                    )
              }
              onRowClick={(id: string) =>
                router.push(`/appointments/review/${id}`)
              }
            />
          </div>
        ) : (
          <div>
            <div className="mt-2 flex gap-4 pl-14 ">
              <div className="w-2/6 font-semibold text-emerald-600">NOME</div>
              <div className=" border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">NÚMERO</div>
              <div className="border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">
                ESPECIALIDADE
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4 px-10">
              {personalAppointmentsQuery.data?.map((appointment) => (
                <ViewPersonalAppointment
                  key={appointment.id}
                  name={appointment.user.name}
                  number={appointment.user.number}
                  consultType={appointment.consultType}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 px-10"></div>
      </div>
    </div>
  );
};

export default ViewAllByDate;
