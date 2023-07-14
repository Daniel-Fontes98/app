import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();
  const id = router.query.id;
  const data = api.user.getById.useQuery({ id: id as string });
  const [date, setDate] = useState("");
  let appointment;
  let role;

  if (date !== "") {
    appointment = data.data?.appointments.find(
      (appointment) => appointment.date === date
    );
    if (appointment)
      role = data.data?.companyRoles.find(
        (companyRole) => companyRole.userId === data.data?.id
      );
  }

  if (data.data) {
    return (
      <>
        <div className="container px-4 py-2">
          <h1 className="text-xl font-bold text-green-700">
            Historico medico do Utente
          </h1>
          <div className="mt-2 grid grid-flow-col  bg-green-50 p-2">
            <div>
              <h1 className="text-base font-bold text-green-600">
                Informacao do Utente:
              </h1>
              <h3 className="mb-2 font-semibold">{data.data.name}</h3>
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-green-600">Genero:</h1>
                <h3>{data.data.gender ? data.data.gender : "N/A"}</h3>
                <h1 className="mt-2 text-base font-bold text-green-600">
                  Nacionalidade:
                </h1>
                <h3>{data.data.nacionality ? data.data.nacionality : "N/A"}</h3>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="text-base font-bold text-green-600">
                  Data de Nascimento:
                </h1>
                <h3 className="font-semibold">{data.data.birthDate}</h3>
              </div>
              <div className="mb-2">
                <h1 className="text-base font-bold text-green-600">
                  Contacto:
                </h1>
                <h3 className="font-semibold">
                  {data.data.number ? data.data.number : "N/A"}
                </h3>
              </div>
              <div className="mb-2">
                <h1 className="text-base font-bold text-green-600">
                  Numero Bi:
                </h1>
                <h3 className="font-semibold">
                  {data.data.idNumber ? data.data.idNumber : "N/A"}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <div className="divide mt-6 divide-y-2 divide-solid divide-green-600">
              <h1 className="pb-1 text-lg font-bold text-green-600">
                Historico de consultas
              </h1>
              <div className="pt-4">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecionar uma opcao
                </label>
                <select
                  className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option value="" selected>
                    Selecionar uma data
                  </option>
                  {data.data.appointments.map((appointment, idx) => (
                    <option key={idx} value={appointment.date}>
                      {appointment.date}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {appointment && (
            <div>
              <div className="divide mt-6 divide-y-2 divide-solid divide-red-500">
                <h1 className="pb-1 text-lg text-red-500">
                  Informação da Empresa
                </h1>
                <div className="grid grid-flow-col">
                  <div className="mt-4">
                    <h3>{appointment.company.name}</h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Numero
                    </h1>
                    <h3>
                      {appointment.company.number
                        ? appointment.company.number
                        : "N/A"}
                    </h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Funcao
                    </h1>
                    <h3>{role?.role}</h3>
                  </div>
                  <div className="mt-2">
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Email
                    </h1>
                    <h3>
                      {appointment.company.email
                        ? appointment.company.email
                        : "N/A"}
                    </h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Industria
                    </h1>
                    <h3>{appointment.company.industry}</h3>
                  </div>
                </div>
              </div>
              <h1 className="mt-4 pb-1 text-lg font-bold text-green-600">
                Informação da Consulta
              </h1>
              <div className=" bg-green-50 p-2">
                <div className="grid grid-flow-col">
                  <div className="">
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Criada dia:
                    </h1>
                    <h3>{appointment.createdAt.toLocaleDateString("en-GB")}</h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Tipo de Exame:
                    </h1>
                    <h3>{appointment.examType}</h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Plano:
                    </h1>
                    <h3>
                      {appointment.planType ? appointment.planType : "N/A"}
                    </h3>
                  </div>
                  <div className="mt-2">
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Local da consulta:
                    </h1>
                    <h3>{appointment.local ? appointment.local : "N/A"}</h3>
                    <h1 className="mt-2 text-base font-bold text-green-600">
                      Localizacao/Serviço:
                    </h1>
                    <h3>{appointment.location}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <>Loading data...</>;
  }
}
