import type {
  User,
  CompanyAppointment,
  Company,
  NurseryExam,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CheckIcon from "~/../public/check.png";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

export function formatarHora(data: Date): string {
  const horas: string = String(data.getHours()).padStart(2, "0");
  const minutos: string = String(data.getMinutes()).padStart(2, "0");
  const segundos: string = String(data.getSeconds()).padStart(2, "0");

  return `${horas}:${minutos}:${segundos}`;
}

export type CompanyAppointmentType = CompanyAppointment & {
  company: Company;
  user: User;
  nurseryExams: NurseryExam[];
};

const useNurseryColumns = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedCompanyAppointment: Dispatch<SetStateAction<string>>
) => {
  const handleSubmitButton = (companyAppointmentId: string) => {
    setIsModalOpen(true);
    setSelectedCompanyAppointment(companyAppointmentId);
  };

  const router = useRouter();

  const awaitingNurseryColumns: ColumnDef<CompanyAppointmentType>[] = [
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
      accessorKey: "id",
      header: ({}) => <div></div>,
      cell: ({ cell }) => {
        return (
          <div className="flex gap-4">
            <button
              onClick={() => handleSubmitButton(cell.renderValue() as string)}
            >
              <Image src={CheckIcon} alt="Done button" className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
  return { awaitingNurseryColumns };
};

export default useNurseryColumns;
