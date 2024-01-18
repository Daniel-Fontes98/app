import {
  Company,
  CompanyAppointment,
  LabExams,
  NurseryExam,
  User,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { formatarHora } from "../Hooks/useNurseryColumns";
import EyeIcon from "../../../public/eye.png";
import CheckIcon from "../../../public/check.png";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

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
      accessorKey: "createdAt",
      header: () => (
        <div className="flex  whitespace-nowrap text-emerald-600">
          Hora de chegada
        </div>
      ),
      accessorFn: (props) => {
        return formatarHora(props.createdAt);
      },
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
