import Image from "next/image";
import { useRouter } from "next/router";
import CheckIcon from "../../../public/check.png";

interface ViewCompanyAppointmentProps {
  name: string;
  company: string;
  planType: string | null;
  id: string;
  wasPresent: boolean;
  orderOfPresence: number | null;
}

export const ViewCompanyAppointment = ({
  name,
  company,
  planType,
  id,
  wasPresent,
  orderOfPresence,
}: ViewCompanyAppointmentProps) => {
  const router = useRouter();
  return (
    <div
      className="mt-1 flex h-10 w-full items-center rounded-lg bg-white shadow-md hover:cursor-pointer"
      onClick={() => router.push(`/appointments/review/${id}`)}
    >
      <div className="ml-6 w-1/12">
        <span>{orderOfPresence ? orderOfPresence.toString() : ""}</span>
      </div>
      <div className="ml-6 w-2/6">
        <span>{name}</span>
      </div>
      <div className="ml-5 w-1/6">
        <span>{company}</span>
      </div>
      <div className="ml-8 w-1/6">
        <div>{planType}</div>
      </div>
      <div className="ml-14 w-1/12">
        {wasPresent && (
          <Image src={CheckIcon} className="h-6 w-6" alt="Checkmark icon" />
        )}
      </div>
    </div>
  );
};
