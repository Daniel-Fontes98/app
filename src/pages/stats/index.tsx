import { useState } from "react";
import { api } from "~/utils/api";

const History = () => {
  const { data } = api.companyAppointment.getAll.useQuery();
  const [companyFilter, setCompanyFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState<Date>();
  const [endDateFilter, setEndDateFilter] = useState<Date>();

  if (!data) {
    return;
  }

  let totalAppointments =
    companyFilter === ""
      ? data
      : data?.filter((field) =>
          field.company.name.toLowerCase().includes(companyFilter.toLowerCase())
        );
  let totalAttendedAppointments =
    companyFilter === ""
      ? data.filter((field) => field.wasPresent)
      : data?.filter(
          (field) =>
            field.company.name
              .toLowerCase()
              .includes(companyFilter.toLowerCase()) && field.wasPresent
        );
  let totalFitForWorkPercentage =
    companyFilter === ""
      ? data.filter((field) => field.certificate?.finalState === "fitCheck")
      : data?.filter(
          (field) =>
            field.company.name
              .toLowerCase()
              .includes(companyFilter.toLowerCase()) &&
            field.certificate?.finalState === "fitCheck"
        );

  let totalAttendedMenPercentage = totalAttendedAppointments.filter(
    (field) =>
      field.user.gender?.toLowerCase().includes("masculino".toLowerCase()) ||
      field.user.gender?.toLowerCase() === "m"
  );

  let totalAttendedFemalePercentage = totalAttendedAppointments.filter(
    (field) =>
      field.user.gender?.toLowerCase().includes("feminino".toLowerCase())
  );

  if (startDateFilter !== undefined && !isNaN(startDateFilter.getTime())) {
    totalAppointments = totalAppointments.filter(
      (field) =>
        field.date.getMonth() >= startDateFilter.getMonth() &&
        field.date.getFullYear() >= startDateFilter.getFullYear() &&
        field.date.getDate() >= startDateFilter.getDate()
    );

    totalAttendedAppointments = totalAttendedAppointments.filter(
      (field) =>
        field.date.getMonth() >= startDateFilter.getMonth() &&
        field.date.getFullYear() >= startDateFilter.getFullYear() &&
        field.date.getDate() >= startDateFilter.getDate()
    );

    totalFitForWorkPercentage = totalFitForWorkPercentage.filter(
      (field) =>
        field.date.getMonth() >= startDateFilter.getMonth() &&
        field.date.getFullYear() >= startDateFilter.getFullYear() &&
        field.date.getDate() >= startDateFilter.getDate()
    );

    totalAttendedMenPercentage = totalAttendedMenPercentage.filter(
      (field) =>
        field.date.getMonth() >= startDateFilter.getMonth() &&
        field.date.getFullYear() >= startDateFilter.getFullYear() &&
        field.date.getDate() >= startDateFilter.getDate()
    );

    totalAttendedFemalePercentage = totalAttendedFemalePercentage.filter(
      (field) =>
        field.date.getMonth() >= startDateFilter.getMonth() &&
        field.date.getFullYear() >= startDateFilter.getFullYear() &&
        field.date.getDate() >= startDateFilter.getDate()
    );
  }

  if (endDateFilter !== undefined && !isNaN(endDateFilter.getTime())) {
    totalAppointments = totalAppointments.filter(
      (field) =>
        field.date.getMonth() <= endDateFilter.getMonth() &&
        field.date.getFullYear() <= endDateFilter.getFullYear() &&
        field.date.getDate() <= endDateFilter.getDate()
    );

    totalAttendedAppointments = totalAttendedAppointments.filter(
      (field) =>
        field.date.getMonth() <= endDateFilter.getMonth() &&
        field.date.getFullYear() <= endDateFilter.getFullYear() &&
        field.date.getDate() <= endDateFilter.getDate()
    );

    totalFitForWorkPercentage = totalFitForWorkPercentage.filter(
      (field) =>
        field.date.getMonth() <= endDateFilter.getMonth() &&
        field.date.getFullYear() <= endDateFilter.getFullYear() &&
        field.date.getDate() <= endDateFilter.getDate()
    );

    totalAttendedMenPercentage = totalAttendedMenPercentage.filter(
      (field) =>
        field.date.getMonth() <= endDateFilter.getMonth() &&
        field.date.getFullYear() <= endDateFilter.getFullYear() &&
        field.date.getDate() <= endDateFilter.getDate()
    );

    totalAttendedFemalePercentage = totalAttendedFemalePercentage.filter(
      (field) =>
        field.date.getMonth() <= endDateFilter.getMonth() &&
        field.date.getFullYear() <= endDateFilter.getFullYear() &&
        field.date.getDate() <= endDateFilter.getDate()
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-slate-100 px-10">
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Estatísticas
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-8">
        <div className="flex w-1/4 justify-end">
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4  pl-10 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
              placeholder="Procurar empresa..."
              onChange={(e) => setCompanyFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex w-1/4 justify-end">
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
                type="date"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                placeholder="Seleciona a data de inicio..."
                onChange={(e) => setStartDateFilter(new Date(e.target.value))}
              />
            </div>
          </div>
          <div className="flex w-1/4 justify-end">
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
                type="date"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                placeholder="Seleciona uma data de fim..."
                onChange={(e) => setEndDateFilter(new Date(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Quantidade total de trabalhadores agendados:{" "}
            {totalAppointments.length}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Quantidade de trabalhadores que vieram aos agendamentos:{" "}
            {totalAttendedAppointments.length}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de homens que vieram aos agendamentos:{" "}
            {(
              (totalAttendedMenPercentage.length /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de mulheres que vieram aos agendamentos:{" "}
            {(
              (totalAttendedFemalePercentage.length /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de aptos:
            {(
              (totalFitForWorkPercentage.length /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
        </>
      </div>
    </div>
  );
};

export default History;
