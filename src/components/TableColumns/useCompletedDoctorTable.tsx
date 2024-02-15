import type { Company, CompanyAppointment, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/router";
import EyeIcon from "../../../public/eye.png";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";
import { customDateSort } from "~/utils/dates";

export type completedDoctorType = CompanyAppointment & {
  user: User;
  company: Company;
};

const useCompletedDoctorTable = () => {
  const router = useRouter();
  const completedDoctorColumns: ColumnDef<completedDoctorType>[] = [
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
      accessorKey: "user.birthDate",
      header: () => (
        <div className="flex whitespace-nowrap  text-emerald-600">
          Data de Nascimento
        </div>
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
          <button
            className="flex items-center justify-center"
            onClick={() =>
              router.push(`/doctors/awaiting/${cell.renderValue() as string}`)
            }
          >
            <Image src={EyeIcon} className="h-5 w-5" alt="Eye icon" />
          </button>
        </div>
      ),
    },
  ];

  return { completedDoctorColumns };
};

export default useCompletedDoctorTable;
