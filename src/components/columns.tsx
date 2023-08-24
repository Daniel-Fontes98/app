import { Button } from "@/components/ui/button";
import type { EmergencyConsult, EmergencyTriage, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export type Consulta = EmergencyConsult & {
  user: User;
  emergencyTriage: EmergencyTriage | null;
};

export const columns: ColumnDef<Consulta>[] = [
  {
    accessorKey: "entryDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Entrada
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "entryTime",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hora de Entrada
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "exitDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Saida
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "exitTime",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hora de Saida
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">{row.getValue("user_name")}</div>
      );
    },
  },
  {
    accessorKey: "user.birthDate",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Nascimento
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "user.gender",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sexo
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "user.nacionality",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nacionalidade
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "user.number",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contacto
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("user_number")}</div>;
    },
  },
  {
    accessorKey: "user.idNumber",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            BI
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">{row.getValue("user_email")}</div>
      );
    },
  },
  {
    accessorKey: "user.address",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Morada
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">{row.getValue("user_address")}</div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.manchesterDegree",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cor Triagem
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_manchesterDegree")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.weight",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Peso
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_weight")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.height",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Altura
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_height")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.bloodType",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo Sanguineo
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_bloodType")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.tMin",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tensao Minima
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_tMin")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.tMax",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tensao Maxima
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_tMax")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.degrees",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Temperatura
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_degrees")}
        </div>
      );
    },
  },
  {
    accessorKey: "emergencyTriage.oxygen",
    header: ({ column }) => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Saturacao PO2
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {row.getValue("emergencyTriage_oxygen")}
        </div>
      );
    },
  },
];
