import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  onRowClick?: (id: any) => void;
  pageSize?: number;
};

export function DataTable<Data extends object>({
  data,
  columns,
  onRowClick,
  pageSize,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  function hasIdProperty(obj: any): obj is { id: string } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return obj && typeof obj === "object" && "id" in obj;
  }

  function handleRowClick<Data>(
    onRowClick: ((id: any) => void) | undefined,
    original: Data
  ) {
    if (onRowClick && hasIdProperty(original)) {
      onRowClick(original.id);
    }
  }

  useEffect(() => {
    pageSize ? table.setPageSize(pageSize) : table.setPageSize(10);
  }, [pageSize]);

  return (
    <>
      <div className="w-full overflow-scroll">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className=" overflow-visible whitespace-nowrap hover:cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                className=" bg-white shadow-sm"
                onClick={() => handleRowClick(onRowClick, row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="h-10" />
        <div className="sticky ">
          <div className="flex  items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              hidden={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              hidden={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
