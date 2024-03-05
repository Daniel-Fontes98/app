import type { NurseryExam } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import MinusIcon from "~/../public/minus.png";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import EyeIcon from "../../../public/eye.png";
import { processString } from "../ConsultTabs/UrgencyConsumables";

const useDoctorNurseColumns = (
  setSelectedNurseryExam: Dispatch<SetStateAction<string>>,
  setIsRemoveModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const handleRemoveButton = (
    nurseryExamId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsRemoveModalOpen(true);
    setSelectedNurseryExam(nurseryExamId);
  };

  const doctorNurseryExams: ColumnDef<NurseryExam>[] = [
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
      cell: (props) => {
        return (
          <div className="flex gap-4">
            <a
              href={processString(props.cell.renderValue() as string)}
              className="flex items-center justify-center"
              target="_blank"
              download
            >
              <Image src={EyeIcon} className="h-5 w-5" alt="Eye icon" />
            </a>
            <button
              onClick={(event) =>
                handleRemoveButton(props.row.getValue("id"), event)
              }
            >
              <Image
                src={MinusIcon}
                alt="Remove exam button"
                className="h-4 w-4"
              />
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <div></div>,
      cell: () => <div></div>,
    },
  ];

  return { doctorNurseryExams };
};

export default useDoctorNurseColumns;
