import type { LabExams } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { processString } from "../ConsultTabs/UrgencyConsumables";

export const doctorLabExams: ColumnDef<LabExams>[] = [
  {
    accessorKey: "examName",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">Exame</div>
    ),
  },
  {
    accessorKey: "addInfo",
    header: () => (
      <div className="flex  whitespace-nowrap  text-emerald-600">
        Informação Adicional
      </div>
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
