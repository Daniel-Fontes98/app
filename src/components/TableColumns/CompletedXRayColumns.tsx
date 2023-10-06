import type { XRayRequisition, User, XRayObject } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { processString } from "../ConsultTabs/UrgencyConsumables";
import { formatDate } from "../Forms/CreateCompanyAppointmentExcel";

export type xRayObjectType = XRayObject & {
  xRayRequisition: XRayRequisition & { user: User };
};

export const completedXRayColumns: ColumnDef<xRayObjectType>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex  whitespace-nowrap text-emerald-600">Data</div>
    ),
    accessorFn: (props) => {
      return formatDate(props.createdAt);
    },
  },
  {
    accessorKey: "xRayRequisition.user.name",
    header: ({ column }) => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Nome</div>
    ),
  },
  {
    accessorKey: "xRayRequisition.user.birthDate",
    header: ({ column }) => (
      <div className="flex  whitespace-nowrap  text-emerald-600">
        Data de Nascimento
      </div>
    ),
  },
  {
    accessorKey: "xRayRequisition.company",
    header: ({ column }) => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Empresa</div>
    ),
  },
  {
    accessorKey: "addInfo",
    header: ({ column }) => (
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
