import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { DataTable } from "~/components/DataTable";
import useColumns from "~/hooks/useColumns";
import { api } from "~/utils/api";

const listUsers: NextPage = () => {
  const data = api.user.getAll.useQuery().data;
  const { userColumns } = useColumns();

  if (data) {
    return (
      <>
        <div className="container px-4 py-2">
          <h1 className="text-xl font-bold text-green-700">
            Historico medico do Utente
          </h1>
          <DataTable columns={userColumns} data={data} />
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default listUsers;
