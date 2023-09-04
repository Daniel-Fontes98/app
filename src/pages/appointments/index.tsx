import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import {
  daysOfTheWeek,
  getCurrentMonthFromIndex,
  getCurrentMonthIndex,
  getCurrentYear,
  obterDiaSemanaInicioMes,
} from "~/utils/calendar";

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthIndex());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const personalAppointmentsQuery = api.personalAppointment.getAll.useQuery();
  const companyAppointmentsQuery = api.companyAppointment.getAll.useQuery();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const totalAppointmentsPerDay: number[] = Array(31).fill(0);
  personalAppointmentsQuery.data?.map((personalAppointment) => {
    if (
      personalAppointment.appointmentDate.getMonth() === selectedMonth &&
      personalAppointment.appointmentDate.getFullYear() === selectedYear
    )
      totalAppointmentsPerDay[
        personalAppointment.appointmentDate.getDate() - 1
      ] += 1;
  });

  companyAppointmentsQuery.data?.map((companyAppointment) => {
    if (
      companyAppointment.date.getMonth() === selectedMonth &&
      companyAppointment.date.getFullYear() === selectedYear
    )
      totalAppointmentsPerDay[companyAppointment.date.getDate() - 1] += 1;
  });

  const CalendarDay = ({ dayNumber, totalAppointments }: CalendarDayProps) => {
    if (dayNumber === -1) {
      return <div className="h-20 w-28"></div>;
    } else {
      return (
        <div
          className="h-20 w-28 rounded-tl-xl border border-slate-300 bg-white shadow-sm hover:cursor-pointer"
          onClick={() =>
            router.push(
              `/appointments/view/${dayNumber + 1}-${
                selectedMonth + 1
              }-${selectedYear}`
            )
          }
        >
          <span className="ml-1 text-xs">{dayNumber + 1}</span>
          {totalAppointments !== 0 && (
            <div className="flex items-center justify-center text-emerald-600">
              {totalAppointments}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-8 bg-slate-100">
      <div className="flex  items-center justify-center">
        <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
          Calendário de Agendamentos
        </div>
      </div>
      <div className="flex items-center justify-center gap-16">
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setSelectedMonth(selectedMonth - 1 < 0 ? 11 : selectedMonth - 1)
            }
          >
            <span className="h-2 w-2 text-emerald-600 hover:bg-slate-300">
              &lt;
            </span>
          </button>
          <div className="w-20 text-center">
            {getCurrentMonthFromIndex(selectedMonth)?.name}
          </div>
          <button onClick={() => setSelectedMonth((selectedMonth + 1) % 11)}>
            <span className="h-2 w-2 text-emerald-600 hover:bg-slate-300 ">
              &gt;
            </span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setSelectedYear(selectedYear - 1)}>
            <span className="h-2 w-2 text-emerald-600 hover:bg-slate-300">
              &lt;
            </span>
          </button>
          <div className="w-20 text-center">{selectedYear}</div>
          <button onClick={() => setSelectedYear(selectedYear + 1)}>
            <span className="h-2 w-2 text-emerald-600 hover:bg-slate-300">
              &gt;
            </span>
          </button>
        </div>
      </div>
      <section className="flex flex-col gap-6">
        <div className="flex justify-center gap-4">
          {daysOfTheWeek.map((day) => (
            <div
              className="flex w-28 justify-center border border-emerald-400 shadow-md"
              key={day}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-7 gap-4">
            {[
              ...Array(
                obterDiaSemanaInicioMes(selectedMonth, selectedYear)
              ).keys(),
            ].map((day) => (
              <div key={day}>
                <CalendarDay dayNumber={-1} />{" "}
              </div>
            ))}
            {[
              //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ...Array(getCurrentMonthFromIndex(selectedMonth)!.days).keys(),
            ].map((day) => (
              <div key={day}>
                <CalendarDay
                  dayNumber={day}
                  totalAppointments={totalAppointmentsPerDay[day]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface CalendarDayProps {
  dayNumber: number;
  totalAppointments?: number;
}

export default Calendar;
