import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import CreateCompanyAppointment from "~/components/Forms/CreateCompanyAppointment";
import CreateCompanyAppointmentExcel from "~/components/Forms/CreateCompanyAppointmentExcel";
import CreatePersonalAppointment from "~/components/Forms/CreatePersonalAppointment";

const CreateAppointment = () => {
  const [appointmentType, setAppointmentType] = useState("Particular");
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen items-center justify-center bg-slate-100 ">
      <div className="flex items-center justify-center">
        <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
          Agendar
        </div>
      </div>
      <div className="mt-16 flex items-center justify-center">
        <section className=" w-5/6 rounded-2xl bg-white  px-8 py-6 shadow-2xl">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Formulário de Agendamento
          </h1>
          <div className="  border-slate-200 md:flex md:justify-between">
            <div className="mb-6 w-full ">
              <label
                htmlFor="appointmentType"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Tipo de agendamento
              </label>
              <select
                id="appointmentType"
                className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="Particular">Particular</option>
                <option value="EmpresaP">Empresa Planilha</option>
                <option value="EmpresaS">Empresa Único</option>
              </select>
            </div>
          </div>
          {appointmentType === "Particular" ? (
            <CreatePersonalAppointment />
          ) : appointmentType === "EmpresaP" ? (
            <CreateCompanyAppointmentExcel />
          ) : (
            <CreateCompanyAppointment />
          )}
        </section>
      </div>
    </div>
  );
};

export default CreateAppointment;
