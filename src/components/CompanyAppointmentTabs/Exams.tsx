import { LabExams, NurseryExam } from "@prisma/client";
import { DataTable } from "../DataTable";
import { doctorLabExams } from "../TableColumns/DoctorLabExams";
import { doctorNurseExams } from "../TableColumns/DoctorNurseExams";

interface ExamsProps {
  labExams: LabExams[];
  nurseExams: NurseryExam[];
}

const Exams = (props: ExamsProps) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <DataTable columns={doctorNurseExams} data={props.nurseExams} />
      <DataTable columns={doctorLabExams} data={props.labExams} />
    </div>
  );
};

export default Exams;
