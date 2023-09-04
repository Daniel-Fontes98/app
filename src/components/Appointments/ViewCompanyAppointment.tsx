interface ViewCompanyAppointmentProps {
  name: string;
  company: string;
  planType: string | null;
}

export const ViewCompanyAppointment = ({
  name,
  company,
  planType,
}: ViewCompanyAppointmentProps) => {
  return (
    <div className="mt-1 flex h-10 w-full items-center rounded-lg bg-white shadow-md hover:cursor-pointer">
      <div className="ml-4 w-2/6">
        <span>{name}</span>
      </div>
      <div className="ml-11 w-1/6">
        <span>{company}</span>
      </div>
      <div className="ml-10">
        <div>{planType}</div>
      </div>
    </div>
  );
};
