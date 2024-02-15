import type {
  Company,
  CompanyAppointment,
  LabExams,
  NurseryExam,
  User,
} from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import EyeIcon from "../../../public/eye.png";
import CheckIcon from "../../../public/check.png";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";
import { customDateSort, customTimeSort, formatarHora } from "~/utils/dates";

export type companyAppointmentType = CompanyAppointment & {
  user: User;
  company: Company;
  labExams: LabExams[];
  nurseryExams: NurseryExam[];
};

const useDoctorColumns = (
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setSelectedCompanyAppointment: Dispatch<SetStateAction<string>>
) => {
  const router = useRouter();

  const handleSubmitButton = (companyAppointmentId: string) => {
    setIsModalOpen(true);
    setSelectedCompanyAppointment(companyAppointmentId);
  };

  const awaitingDoctorColumns: ColumnDef<companyAppointmentType>[] = [
    {
      accessorKey: "date",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">Data</div>
      ),
      accessorFn: (props) => {
        return formatDate(props.date);
      },
      sortingFn: (a, b) => customDateSort(a.original.date, b.original.date),
      enableMultiSort: true,
    },
    {
      accessorKey: "presentAt",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">
          Hora de chegada
        </div>
      ),
      accessorFn: (props) => {
        return formatarHora(props.presentAt!);
      },
      sortingFn: (a, b) =>
        customTimeSort(a.original.presentAt!, b.original.presentAt!),
      enableMultiSort: true,
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
          <button
            onClick={() => handleSubmitButton(cell.renderValue() as string)}
          >
            <Image src={CheckIcon} className="h-4 w-4" alt="Check icon" />
          </button>
        </div>
      ),
    },
  ];

  return { awaitingDoctorColumns };
};

export default useDoctorColumns;
