import {
  Company,
  CompanyAppointment,
  EmergencyConsult,
  User,
} from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { OldDataEntry, NewDataEntry } from "~/types/excelTypes";

type userWithIncludes = CompanyAppointment & {
  company: Company;
  user: User;
};

type emergencyWithIncludes = EmergencyConsult & {
  user: User;
};

export default function useColumns() {
  const companyColumnHelper = createColumnHelper<Company>();
  const router = useRouter();

  const companyColumns = [
    companyColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    companyColumnHelper.accessor("industry", {
      cell: (info) => info.getValue(),
      header: "Industria",
    }),
    companyColumnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    companyColumnHelper.accessor("number", {
      cell: (info) => info.getValue(),
      header: "Number",
    }),
  ];

  const columnHelper = createColumnHelper<userWithIncludes>();

  const userWithIncludesColumns = [
    columnHelper.accessor("user.id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("user.name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    columnHelper.accessor("company.name", {
      cell: (info) => info.getValue(),
      header: "Nome da Empresa",
    }),
    columnHelper.accessor("user.idNumber", {
      cell: (info) => info.getValue(),
      header: "Numero BI",
    }),
    columnHelper.accessor("user.birthDate", {
      cell: (info) => info.getValue(),
      header: "Data de Nascimento",
    }),
    columnHelper.accessor("user.gender", {
      cell: (info) => info.getValue(),
      header: "Genero",
    }),
    columnHelper.accessor("user.nacionality", {
      cell: (info) => info.getValue(),
      header: "Nacionalidade",
    }),
    columnHelper.accessor("user.number", {
      cell: (info) => info.getValue(),
      header: "Contacto",
    }),
  ];

  const oldColumnHelper = createColumnHelper<OldDataEntry>();

  const oldDataEntryColumns = [
    oldColumnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: "Data Agendada",
    }),
    oldColumnHelper.accessor("nome", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    oldColumnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Genero",
    }),
    oldColumnHelper.accessor("nacionality", {
      cell: (info) => info.getValue(),
      header: "Nacionalidade",
    }),
    oldColumnHelper.accessor("birthDate", {
      cell: (info) => info.getValue(),
      header: "Data de Nascimento",
    }),
    oldColumnHelper.accessor("idnumber", {
      cell: (info) => info.getValue(),
      header: "Numero BI",
    }),
    oldColumnHelper.accessor("number", {
      cell: (info) => info.getValue(),
      header: "Contacto",
    }),
    oldColumnHelper.accessor("role", {
      cell: (info) => info.getValue(),
      header: "Categoria Profissional",
    }),
    oldColumnHelper.accessor("companyName", {
      cell: (info) => info.getValue(),
      header: "Nome da Entidade",
    }),
    oldColumnHelper.accessor("industry", {
      cell: (info) => info.getValue(),
      header: "Tipo de Entidade",
    }),
    oldColumnHelper.accessor("location", {
      cell: (info) => info.getValue(),
      header: "Consulta",
    }),
    oldColumnHelper.accessor("examType", {
      cell: (info) => info.getValue(),
      header: "Tipo Mt",
    }),
    oldColumnHelper.accessor("covid", {
      cell: (info) => info.getValue(),
      header: "Covid",
    }),
  ];

  const newColumnHelper = createColumnHelper<NewDataEntry>();

  const newDataEntryColumns = [
    newColumnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: "Data Agendada",
    }),
    newColumnHelper.accessor("nome", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    newColumnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Genero",
    }),
    newColumnHelper.accessor("nacionality", {
      cell: (info) => info.getValue(),
      header: "Nacionalidade",
    }),
    newColumnHelper.accessor("birthDate", {
      cell: (info) => info.getValue(),
      header: "Data de Nascimento",
    }),
    newColumnHelper.accessor("idnumber", {
      cell: (info) => info.getValue(),
      header: "Numero BI",
    }),
    newColumnHelper.accessor("number", {
      cell: (info) => info.getValue(),
      header: "Contacto",
    }),
    newColumnHelper.accessor("role", {
      cell: (info) => info.getValue(),
      header: "Funcao",
    }),
    newColumnHelper.accessor("companyName", {
      cell: (info) => info.getValue(),
      header: "Nome da Entidade",
    }),
    newColumnHelper.accessor("industry", {
      cell: (info) => info.getValue(),
      header: "Industria",
    }),
    newColumnHelper.accessor("location", {
      cell: (info) => info.getValue(),
      header: "Servico",
    }),
    newColumnHelper.accessor("examType", {
      cell: (info) => info.getValue(),
      header: "Tipo Mt",
    }),
  ];

  const userColumnHelper = createColumnHelper<User>();
  const handleClick = (id: string) => {
    void router.push(`/appointments/view/${id}`);
  };

  const userColumns = [
    userColumnHelper.accessor("id", {
      cell: (info) => (
        <div
          className="text-green-600 hover:cursor-pointer"
          onClick={() => handleClick(info.getValue())}
        >
          +
        </div>
      ),
      header: "",
    }),
    userColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Nome",
    }),
    userColumnHelper.accessor("idNumber", {
      cell: (info) => info.getValue(),
      header: "Numero BI",
    }),
    userColumnHelper.accessor("birthDate", {
      cell: (info) => info.getValue(),
      header: "Data de Nascimento",
    }),
    userColumnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Genero",
    }),
    userColumnHelper.accessor("nacionality", {
      cell: (info) => info.getValue(),
      header: "Nacionalidade",
    }),
    userColumnHelper.accessor("number", {
      cell: (info) => info.getValue(),
      header: "Contacto",
    }),
  ];

  return {
    userWithIncludesColumns,
    newDataEntryColumns,
    oldDataEntryColumns,
    userColumns,
    companyColumns,
  };
}
