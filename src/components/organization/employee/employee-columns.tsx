"use client";

import DialogDeleteEmployee from "@/components/organization/employee/dialog-delete-employee";
import DialogDetailsEmployee from "@/components/organization/employee/dialog-details-employee";
import DialogEditEmployee from "@/components/organization/employee/dialog-edit-employee";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IEmployee } from "@/models/employee/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const employeeColumns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "urn",
    header: "Mã URN",
  },
  {
    accessorKey: "fullName",
    header: "Họ tên",
  },
  {
    accessorKey: "department.name",
    header: "Phòng",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      console.log(employee);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="grid grid-cols-1">
              <DialogDetailsEmployee employee={employee} />

              <DropdownMenuSeparator />

              <DialogEditEmployee employee={employee} />

              <DialogDeleteEmployee employee={employee} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
