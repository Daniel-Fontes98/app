import { useRouter } from "next/router";
import { formatDate } from "../Forms/CreateCompanyAppointment";

interface ViewXRayRequisitionProps {
  date: Date;
  name: string;
  company: string | null;
  exam: string;
  isPrinted: boolean;
  id: string;
}

export const ViewXRayRequisition = ({
  date,
  name,
  company,
  exam,
  id,
  isPrinted,
}: ViewXRayRequisitionProps) => {
  const router = useRouter();
  return (
    <div
      className="mt-1 flex h-10 w-full items-center rounded-lg bg-white shadow-md hover:cursor-pointer"
      onClick={() => router.push(`/requisition/xray/${id}`)}
    >
      <div className="ml-4 w-1/12">
        <span>{formatDate(date)}</span>
      </div>
      <div className="ml-8 w-2/6">
        <span>{name}</span>
      </div>
      <div className="ml-10 w-1/6">
        <div>{exam}</div>
      </div>
      <div className="ml-10 w-1/6">
        <div>{company}</div>
      </div>
      <div className="ml-10 w-1/12">
        {isPrinted && <div className="ml-10 font-bold text-red-600">X</div>}
      </div>
    </div>
  );
};
