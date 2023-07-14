import { Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { DataTable } from "~/components/DataTable";
import useColumns from "~/hooks/useColumns";
import { api } from "~/utils/api";

const ListAppointments = () => {
  const [date, setDate] = useState("");
  const data = api.companyAppointments.getAllByDate.useQuery({ date: date });
  const { userWithIncludesColumns } = useColumns();

  return (
    <>
      <div className=" min-h-screen items-center justify-center">
        <div className="flex w-full  flex-col ">
          <div>
            <Input
              placeholder="Selecionar data"
              size="md"
              type="date"
              onChange={(event) =>
                setDate(
                  new Date(event.target.value).toLocaleDateString("en-GB")
                )
              }
            />
          </div>
          <div>
            {date === "" ? (
              <div className="mt-5">Selecionar uma data</div>
            ) : data.data && data.data.length !== 0 ? (
              <div>
                <div>Total agendamentos: {data.data.length}</div>
                <div className="ml-10 mr-10 mt-5">
                  <Heading className="my-3">Tabela de Agendamentos</Heading>
                  <DataTable
                    columns={userWithIncludesColumns}
                    data={data.data}
                  />
                </div>
              </div>
            ) : (
              <div>Loading data...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAppointments;
