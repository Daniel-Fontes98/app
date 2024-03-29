import type { Company, CompanyAppointment, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";
import { customDateSort } from "~/utils/dates";

export type completedDoctorType = CompanyAppointment & {
  user: User;
  company: Company;
};

const usePresentAtTable = () => {
  const presentAtColumns: ColumnDef<completedDoctorType>[] = [
    {
      accessorKey: "date",
      header: () => (
        <div className="flex whitespace-nowrap text-emerald-600">Data</div>
      ),
      accessorFn: (props) => {
        return formatDate(props.date);
      },
      sortingFn: (a, b) => customDateSort(a.original.date, b.original.date),
    },
    {
      accessorKey: "user.name",
      header: () => (
        <div className="flex whitespace-nowrap text-emerald-600">Nome</div>
      ),
    },
    {
      accessorKey: "company.name",
      header: () => (
        <div className="flex whitespace-nowrap  text-emerald-600">Empresa</div>
      ),
    },
  ];

  return { presentAtColumns };
};

export default usePresentAtTable;
