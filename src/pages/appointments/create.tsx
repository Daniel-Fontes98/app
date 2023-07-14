import { Button, Heading } from "@chakra-ui/react";
import { DataTable } from "~/components/DataTable";
import useColumns from "~/hooks/useColumns";
import useExcel from "~/hooks/useExcel";

const createAppointments = () => {
  const {
    userList,
    readUploadFile,
    handleSubmit,
    isNewDataEntry,
    setUserList,
  } = useExcel();

  const { oldDataEntryColumns, newDataEntryColumns } = useColumns();

  if (userList.length === 0) {
    return (
      <>
        <div className="mt-5">
          <label htmlFor="upload">Carregar planilha</label>
          <input
            className="ml-3"
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <div>
          <Heading className="my-5 text-center">
            São estes os dados a gravar ? (Confirmar antes de continuar)
          </Heading>
        </div>
        <div className="ml-auto mr-auto mt-5 h-full max-w-4xl overflow-scroll pb-12">
          {isNewDataEntry(userList) ? (
            <DataTable columns={newDataEntryColumns} data={userList} />
          ) : (
            <DataTable columns={oldDataEntryColumns} data={userList} />
          )}

          <div className="flex items-end justify-end gap-2">
            <Button colorScheme="red" onClick={() => setUserList([])}>
              Cancelar
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default createAppointments;
