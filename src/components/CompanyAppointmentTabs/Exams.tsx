import type { LabExams, NurseryExam } from "@prisma/client";
import { DataTable } from "../DataTable";
import { doctorLabExams } from "../TableColumns/DoctorLabExams";
import { doctorNurseExams } from "../TableColumns/DoctorNurseExams";

interface ExamsProps {
  labExams: LabExams[];
  nurseExams: NurseryExam[];
}

const Exams = (props: ExamsProps) => {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0">
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          type="button"
        >
          Requisitar Exames
        </button>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div>
          <DataTable columns={doctorNurseExams} data={props.nurseExams} />
        </div>
        <div>
          <DataTable columns={doctorLabExams} data={props.labExams} />
        </div>
      </div>
    </div>
  );
};

export default Exams;
