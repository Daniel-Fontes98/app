import { CompanyAppointment } from "@prisma/client";
import { useEffect, useState } from "react";
import { calculateAgeFormatYYYY } from "~/components/ConsultTabs/UserInfo";
import { api } from "~/utils/api";

function getCompanyRoleCounts(
  appointments: CompanyAppointment[]
): Map<string, number> {
  const companyRoleCounts = new Map<string, number>();

  appointments.forEach((appointment) => {
    console.log(appointment.companyRole);
    if (!appointment.companyRole) return;
    if (companyRoleCounts.has(appointment.companyRole)) {
      companyRoleCounts.set(
        appointment.companyRole,
        companyRoleCounts.get(appointment.companyRole)! + 1
      );
    } else {
      companyRoleCounts.set(appointment.companyRole, 1);
    }
  });
  return companyRoleCounts;
}

const History = () => {
  const { data } = api.companyAppointment.getAll.useQuery();
  const [companyFilter, setCompanyFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState<Date>();
  const [endDateFilter, setEndDateFilter] = useState<Date>();
  const [totalRoles, setTotalRoles] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (data) {
      const filteredAppointments = data.filter(
        (appointment) =>
          appointment.company.name
            .toLowerCase()
            .includes(companyFilter.toLowerCase()) && appointment.wasPresent
      );
      const rolesCount = getCompanyRoleCounts(filteredAppointments);
      setTotalRoles(rolesCount);
    }
  }, [data, companyFilter]);

  if (!data) return;

  let drinkers = data
    .filter(
      (appointment) =>
        appointment.wasPresent &&
        appointment.company.name
          .toLowerCase()
          .includes(companyFilter.toLowerCase())
    )
    .reduce((prev, curr) => {
      return curr.medicalFile?.etilicHabits?.toLowerCase().includes("nega")
        ? prev + 1
        : prev;
    }, 0);

  let smokers = data
    .filter(
      (appointment) =>
        appointment.wasPresent &&
        appointment.company.name
          .toLowerCase()
          .includes(companyFilter.toLowerCase())
    )
    .reduce((prev, curr) => {
      return curr.medicalFile?.tobaccoHabits?.toLowerCase().includes("nega")
        ? prev + 1
        : prev;
    }, 0);

  let imcValues = data
    .filter(
      (appointment) =>
        appointment.wasPresent &&
        appointment.company.name
          .toLowerCase()
          .includes(companyFilter.toLowerCase())
    )
    .map((appointment) => {
      const weight = appointment.triage?.weight;
      const height = appointment.triage?.height;
      if (!weight || !height || Number(height) === 0) return; // Added check for height not being zero
      return Number(
        (
          Number(weight) /
          ((Number(height) / 100) * (Number(height) / 100))
        ).toFixed(1)
      );
    })
    .filter((value) => typeof value === "number");
  console.log(imcValues);
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
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idade Máxima ={" "}
            {Math.max(
              ...totalAttendedAppointments.map((curr) => {
                return Number(calculateAgeFormatYYYY(curr.user.birthDate!));
              })
            )}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idade Minima ={" "}
            {Math.min(
              ...totalAttendedAppointments.map((curr) => {
                return Number(calculateAgeFormatYYYY(curr.user.birthDate!));
              })
            )}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Idade Média ={" "}
            {totalAttendedAppointments
              .map((curr) => {
                return Number(calculateAgeFormatYYYY(curr.user.birthDate!));
              })
              .reduce((acc, age) => age + acc, 0) / 126}
          </p>
        </div>
        <div>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+120 || +80):{" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              const values = curr.triage?.arterialTension.split("/");
              if (!values) return prev;
              if (!values[0]) return prev;
              if (Number(values[0]) >= 120 && Number(values[0]) < 130)
                return prev + 1;
              if (!values[1]) return prev;
              if (Number(values[1]) >= 80 && Number(values[1]) < 90)
                return prev + 1;
              return prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+130 || +90):{" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              const values = curr.triage?.arterialTension.split("/");
              if (!values) return prev;
              if (!values[0]) return prev;
              if (Number(values[0]) >= 130 && Number(values[0]) < 140)
                return prev + 1;
              if (!values[1]) return prev;
              if (Number(values[1]) >= 90 && Number(values[1]) < 100)
                return prev + 1;
              return prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+140 || +90):{" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              const values = curr.triage?.arterialTension.split("/");
              if (!values) return prev;
              if (!values[0]) return prev;
              if (Number(values[0]) >= 140 && Number(values[0]) < 150)
                return prev + 1;
              if (!values[1]) return prev;
              if (Number(values[1]) >= 90 && Number(values[1]) < 100)
                return prev + 1;
              return prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+150 || +100):{" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              const values = curr.triage?.arterialTension.split("/");
              if (!values) return prev;
              if (!values[0]) return prev;
              if (Number(values[0]) >= 150 && Number(values[0]) < 160)
                return prev + 1;
              if (!values[1]) return prev;
              if (Number(values[1]) >= 100 && Number(values[1]) < 110)
                return prev + 1;
              return prev;
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Percentagem de hipertensos (+160 || +110):{" "}
            {totalAttendedAppointments.reduce((prev, curr) => {
              const values = curr.triage?.arterialTension.split("/");
              if (!values) return prev;
              if (!values[0]) return prev;
              if (Number(values[0]) >= 160) return prev + 1;
              if (!values[1]) return prev;
              if (Number(values[1]) >= 110) return prev + 1;
              return prev;
            }, 0)}
          </p>
          {/*<p className="flex flex-col whitespace-nowrap font-medium text-gray-700">
            Funções:
            {Array.from(totalRoles)
              .sort(([roleA], [roleB]) => roleA.localeCompare(roleB)) // Sort roles alphabetically
              .map(([role, count]) => (
                <span key={role}>
                  {role}: {count}{" "}
                </span>
              ))}
              </p>*/}
          <p className="whitespace-nowrap font-medium text-gray-700">
            Baixo Peso:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value <= 18.4) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Peso Normal:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value >= 18.5 && value <= 24.9) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Sobrepeso:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value >= 25 && value <= 29.9) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Obesidade Grau I:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value >= 30 && value <= 34.9) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Obesidade Grau II:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value >= 35 && value <= 39.9) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Obesidade Grau III:{" "}
            {imcValues.reduce((count, value) => {
              if (typeof value === "number" && value >= 40) {
                return (count || 0) + 1;
              } else {
                return count || 0;
              }
            }, 0)}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Hábitos Tabágicos: {126 - smokers}
          </p>
          <p className="whitespace-nowrap font-medium text-gray-700">
            Hábitos Etilicos: {126 - drinkers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
