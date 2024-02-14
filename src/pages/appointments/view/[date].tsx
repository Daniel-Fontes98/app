import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import { ViewPersonalAppointment } from "~/components/Appointments/ViewPersonalAppointments";
import { DataTable } from "~/components/DataTable";
import useAppointmentColumns from "~/components/Hooks/useAppointmentColumns";
import { api } from "~/utils/api";

const ViewAllByDate = () => {
  const [tableFilter, setTableFilter] = useState("company");
  const router = useRouter();
  const selectedDateAsString = router.query.date as string;
  const [day, month, year] = selectedDateAsString.split("-").map(Number);
  const selectedDate = new Date(year!, month! - 1, day);
  const personalAppointmentsQuery =
    api.personalAppointment.getAllByDate.useQuery({ date: selectedDate });
  const companyAppointmentsQuery = api.companyAppointment.getAllByDate.useQuery(
    { date: selectedDate }
  );
  const { awaitingAppointmentColumns } = useAppointmentColumns();

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTableFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            {`${selectedDate.getDate()}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getFullYear()}`}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-12">
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="companyId">Empresas</label>
            <input
              name="type"
              id="companyId"
              checked={tableFilter === "company"}
              value="company"
              type="radio"
              onChange={(e) => onOptionChange(e)}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="personalId">Particulares</label>
            <input
              name="type"
              id="personalId"
              checked={tableFilter === "personal"}
              value="personal"
              type="radio"
              onChange={(e) => onOptionChange(e)}
            />
          </div>
        </div>
        {tableFilter === "company" && !companyAppointmentsQuery.isLoading ? (
          <div>
            <DataTable
              columns={awaitingAppointmentColumns}
              data={companyAppointmentsQuery.data!}
              onRowClick={(id: string) =>
                router.push(`/appointments/review/${id}`)
              }
            />
          </div>
        ) : (
          <div>
            <div className="mt-2 flex gap-4 pl-14 ">
              <div className="w-2/6 font-semibold text-emerald-600">NOME</div>
              <div className=" border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">NÚMERO</div>
              <div className="border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">
                ESPECIALIDADE
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4 px-10">
              {personalAppointmentsQuery.data?.map((appointment) => (
                <ViewPersonalAppointment
                  key={appointment.id}
                  name={appointment.user.name}
                  number={appointment.user.number}
                  consultType={appointment.consultType}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 px-10"></div>
      </div>
    </div>
  );
};

export default ViewAllByDate;
