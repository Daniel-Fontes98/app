interface ViewPersonalAppointmentProps {
  name: string;
  number: string | null;
  consultType: string | null;
}

export const ViewPersonalAppointment = ({
  name,
  number,
  consultType,
}: ViewPersonalAppointmentProps) => {
  return (
    <div className="mt-1 flex h-10 w-full items-center rounded-lg bg-white shadow-md hover:cursor-pointer">
      <div className="ml-4 w-2/6">
        <span>{name}</span>
      </div>
      <div className="ml-11 w-1/6">
        <span>{number}</span>
      </div>
      <div className="ml-10">
        <div>{consultType}</div>
      </div>
    </div>
  );
};
