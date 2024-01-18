import type { User, CompanyAppointment, Company } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CheckIcon from "../../../public/check.png";
import Image from "next/image";

export type CompanyAppointmentType = CompanyAppointment & {
  company: Company;
  user: User;
};

const useAppointmentColumns = () => {
  const awaitingAppointmentColumns: ColumnDef<CompanyAppointmentType>[] = [
    {
      accessorKey: "orderOfPresence",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">Ordem</div>
      ),
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
        <div className="flex whitespace-nowrap text-emerald-600">Empresa</div>
      ),
    },
    {
      accessorKey: "planType",
      header: () => (
        <div className="flex whitespace-nowrap text-emerald-600">Plano</div>
      ),
    },
    {
      accessorKey: "wasPresent",
      header: () => (
        <div className="flex whitespace-nowrap text-emerald-600">Presente</div>
      ),
      cell: ({ cell }) => {
        if (cell.renderValue() as boolean)
          return (
            <div>
              <Image src={CheckIcon} className="h-6 w-6" alt="Checkmark icon" />
            </div>
          );
      },
    },
  ];
  return { awaitingAppointmentColumns };
};

export default useAppointmentColumns;
