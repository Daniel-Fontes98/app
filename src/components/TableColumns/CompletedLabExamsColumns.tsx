import { Company, CompanyAppointment, LabExams, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { processString } from "../ConsultTabs/UrgencyConsumables";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";

export type labExamsType = LabExams & {
  companyAppointment: CompanyAppointment & {
    user: User;
    company: Company;
  };
};

export const completedLabExamsColumns: ColumnDef<labExamsType>[] = [
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex  whitespace-nowrap text-emerald-600">Data</div>
    ),
    accessorFn: (props) => {
      return formatDate(props.createdAt);
    },
  },
  {
    accessorKey: "companyAppointment.user.name",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Nome</div>
    ),
  },
  {
    accessorKey: "companyAppointment.user.birthDate",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">
        Data de Nascimento
      </div>
    ),
  },
  {
    accessorKey: "companyAppointment.company.name",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Empresa</div>
    ),
  },
  {
    accessorKey: "examName",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Exame</div>
    ),
  },
  {
    accessorKey: "fileLocation",
    header: () => <div></div>,
    cell: ({ cell }) => {
      return (
        <a
          href={processString(cell.renderValue() as string)}
          className="rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          target="_blank"
          download
        >
          Ver
        </a>
      );
    },
  },
];
