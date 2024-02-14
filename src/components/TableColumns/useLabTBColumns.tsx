import type {
  User,
  CompanyAppointment,
  Company,
  NurseryExam,
} from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import PlusIcon from "~/../public/plus.png";
import CheckIcon from "~/../public/check.png";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

export type CompanyAppointmentType = CompanyAppointment & {
  company: Company;
  user: User;
  labExams: NurseryExam[];
};

const useLabTbColumns = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedCompanyAppointment: Dispatch<SetStateAction<string>>
) => {
  const handleSubmitButton = (companyAppointmentId: string) => {
    setIsModalOpen(true);
    setSelectedCompanyAppointment(companyAppointmentId);
  };

  const router = useRouter();

  const awaitingLabTbColumns: ColumnDef<CompanyAppointmentType>[] = [
    {
      accessorKey: "orderOfPresence",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">Ordem</div>
      ),
    },
    {
      accessorKey: "company.name",
      header: () => (
        <div className="flex  whitespace-nowrap  text-emerald-600">Empresa</div>
      ),
    },
    {
      accessorKey: "user.name",
      header: () => (
        <div className="flex whitespace-nowrap  text-emerald-600">Nome</div>
      ),
    },
    {
      accessorKey: "user.birthDate",
      header: () => (
        <div className="flex whitespace-nowrap text-emerald-600">
          Data de Nascimento
        </div>
      ),
    },
    {
      accessorKey: "planType",
      header: () => (
        <div className="flex  whitespace-nowrap  text-emerald-600">
          Tipo de Plano
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
                router.push(`/lab/addTbExam/${cell.renderValue() as string}`)
              }
            >
              <Image
                src={PlusIcon}
                alt="Add tb exam button"
                className="h-4 w-4"
              />
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
  return { awaitingLabTbColumns };
};

export default useLabTbColumns;
