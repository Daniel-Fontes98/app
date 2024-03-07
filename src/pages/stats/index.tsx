import { useState } from "react";
import { calculateAgeFormatYYYY } from "~/components/ConsultTabs/UserInfo";
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
      <div className="grid grid-cols-2">
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
          Total de mulheres : {totalAttendedFemalePercentage.length}
        </p>
        <p className="whitespace-nowrap font-medium text-gray-700">
          Total de homens : {totalAttendedMenPercentage.length}
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

        <p className="whitespace-nowrap font-medium text-gray-700">
          Total de planos Basicos:{" "}
          {totalAttendedAppointments.reduce((prev, curr) => {
            return curr.planType?.toLowerCase() === "basico" ? prev + 1 : prev;
          }, 0)}
        </p>
        <p className="whitespace-nowrap font-medium text-gray-700">
          Total de planos Medios:{" "}
          {totalAttendedAppointments.reduce((prev, curr) => {
            return curr.planType?.toLowerCase() === "medio" ? prev + 1 : prev;
          }, 0)}
        </p>
        <p className="whitespace-nowrap font-medium text-gray-700">
          Total de planos Avançados:{" "}
          {totalAttendedAppointments.reduce((prev, curr) => {
            return curr.planType?.toLowerCase() === "avançado"
              ? prev + 1
              : prev;
          }, 0)}
        </p>
        <p className="whitespace-nowrap font-medium text-gray-700">
          Total de planos Premium:{" "}
          {totalAttendedAppointments.reduce((prev, curr) => {
            return curr.planType?.toLowerCase() === "premium" ? prev + 1 : prev;
          }, 0)}
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [18,25[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                18 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 25
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [25,30[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                25 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 30
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [30,35[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                30 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 35
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [35,40[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                35 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 40
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [40,45[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                40 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 45
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades [45,50[ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >=
                45 && Number(calculateAgeFormatYYYY(curr.user.birthDate!)) < 50
                ? prev + 1
                : prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idades 50+ ={" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              return Number(calculateAgeFormatYYYY(curr.user.birthDate!)) >= 50
                ? prev + 1
                : prev;
            }, 0)}
          </p>
        </div>
        <div>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+120 || +80):{" "}
            {(
              (totalAttendedAppointments.reduce((prev, curr) => {
                const values = curr.triage?.arterialTension.split("/");
                if (!values) return prev;
                if (!values[0]) return prev;
                if (Number(values[0]) > 120) return prev + 1;
                if (!values[1]) return prev;
                if (Number(values[1]) > 80) return prev + 1;
                return prev;
              }, 0) /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+130 || +90):{" "}
            {(
              (totalAttendedAppointments.reduce((prev, curr) => {
                const values = curr.triage?.arterialTension.split("/");
                if (!values) return prev;
                if (!values[0]) return prev;
                if (Number(values[0]) > 130) return prev + 1;
                if (!values[1]) return prev;
                if (Number(values[1]) > 90) return prev + 1;
                return prev;
              }, 0) /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+140 || +100):{" "}
            {(
              (totalAttendedAppointments.reduce((prev, curr) => {
                const values = curr.triage?.arterialTension.split("/");
                if (!values) return prev;
                if (!values[0]) return prev;
                if (Number(values[0]) > 140) return prev + 1;
                if (!values[1]) return prev;
                if (Number(values[1]) > 100) return prev + 1;
                return prev;
              }, 0) /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+150 || +110):{" "}
            {(
              (totalAttendedAppointments.reduce((prev, curr) => {
                const values = curr.triage?.arterialTension.split("/");
                if (!values) return prev;
                if (!values[0]) return prev;
                if (Number(values[0]) > 150) return prev + 1;
                if (!values[1]) return prev;
                if (Number(values[1]) > 110) return prev + 1;
                return prev;
              }, 0) /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+160 || +120):{" "}
            {(
              (totalAttendedAppointments.reduce((prev, curr) => {
                const values = curr.triage?.arterialTension.split("/");
                if (!values) return prev;
                if (!values[0]) return prev;
                if (Number(values[0]) > 160) return prev + 1;
                if (!values[1]) return prev;
                if (Number(values[1]) > 120) return prev + 1;
                return prev;
              }, 0) /
                totalAttendedAppointments.length) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
