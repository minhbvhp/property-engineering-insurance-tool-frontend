"use client";

import DialogDeleteDepartment from "@/components/organization/department/dialog-delete-department";
import DialogDetailsDepartment from "@/components/organization/department/dialog-details-department";
import DialogEditDepartment from "@/components/organization/department/dialog-edit-department";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDepartment } from "@/models/department/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const departmentColumns: ColumnDef<IDepartment>[] = [
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
    accessorKey: "name",
    header: "Tên Phòng",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;

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
              <DialogDetailsDepartment department={department} />

              <DropdownMenuSeparator />

              <DialogEditDepartment department={department} />

              <DialogDeleteDepartment department={department} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
