import type { Company, CompanyAppointment, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import EyeIcon from "../../../public/eye.png";
import Link from "next/link";

export type completedDoctorType = CompanyAppointment & {
  user: User;
  company: Company;
};

const useCompletedDoctorTable = () => {
  const completedDoctorColumns: ColumnDef<completedDoctorType>[] = [
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">Data</div>
      ),
      accessorFn: (props) => {
        return props.createdAt.toDateString();
      },
      sortingFn: (a, b) => {
        const dateA = new Date(a.getValue("createdAt"));
        const dateB = new Date(b.getValue("createdAt"));

        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      },
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
    {
      accessorKey: "id",
      header: () => <div></div>,
      cell: ({ cell }) => (
        <div className="flex gap-4">
          <Link
            href={`/doctors/awaiting/${cell.renderValue() as string}`}
            target="_blank"
          >
            <button className="flex items-center justify-center">
              <Image src={EyeIcon} className="h-5 w-5" alt="Eye icon" />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return { completedDoctorColumns };
};

export default useCompletedDoctorTable;
