import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { DataTable } from "~/components/DataTable";
import useColumns from "~/hooks/useColumns";
import { api } from "~/utils/api";

const listCompanys: NextPage = () => {
  const tableData = api.company.getAll.useQuery().data;
  const { companyColumns } = useColumns();

  if (tableData) {
    return (
      <>
        <div className="m-2">
          <Heading className="mb-5">Lista de Empresas</Heading>
          <DataTable columns={companyColumns} data={tableData} />
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
};

export default listCompanys;
