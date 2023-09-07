import type {
  User,
  CompanyAppointment,
  Company,
  NurseryExam,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import PlusIcon from "~/../public/plus.png";
import CheckIcon from "~/../public/check.png";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { formatarHora } from "./useNurseryColumns";

export type CompanyAppointmentType = CompanyAppointment & {
  company: Company;
  user: User;
  labExams: NurseryExam[];
};

const useLabColumns = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedCompanyAppointment: Dispatch<SetStateAction<string>>
) => {
  const handleSubmitButton = (companyAppointmentId: string) => {
    setIsModalOpen(true);
    setSelectedCompanyAppointment(companyAppointmentId);
  };

  const router = useRouter();

  const awaitingLabExamsColumns: ColumnDef<CompanyAppointmentType>[] = [
    {
      accessorKey: "presentAt",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">
          Hora de Chegada
        </div>
      ),
      accessorFn: (props) => {
        return formatarHora(props.presentAt!);
      },
    },
    {
      accessorKey: "user.name",
      header: () => (
        <div className="flex  whitespace-nowrap  text-emerald-600">Nome</div>
      ),
    },
    {
      accessorKey: "company.name",
      header: () => (
        <div className="flex  whitespace-nowrap  text-emerald-600">Empresa</div>
      ),
    },
    {
      accessorKey: "labExams.length",
      header: () => (
        <div className="flex  whitespace-nowrap  text-emerald-600">
          Nº exames
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: ({}) => <div></div>,
      cell: ({ cell }) => {
        return (
          <div className="flex gap-4">
            <button
              onClick={() =>
                router.push(`/lab/addExam/${cell.renderValue() as string}`)
              }
            >
              <Image src={PlusIcon} alt="Add exam button" className="h-4 w-4" />
            </button>
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
  return { awaitingLabExamsColumns };
};

export default useLabColumns;