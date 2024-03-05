import type {
  Company,
  CompanyAppointment,
  NurseryExam,
  User,
} from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { processString } from "../ConsultTabs/UrgencyConsumables";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";

export type nurseryExamsType = NurseryExam & {
  companyAppointment: CompanyAppointment & {
    user: User;
    company: Company;
  };
};

export const completedNurseryExamsColumns: ColumnDef<nurseryExamsType>[] = [
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
    accessorKey: "companyAppointment.user.name",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Nome</div>
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
