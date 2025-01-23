"use client";

import DialogDeleteRole from "@/components/admin/role/dialog-delete-role";
import DialogEditRole from "@/components/admin/role/dialog-edit-role";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRole } from "@/models/role/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const roleColumns: ColumnDef<IRole>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "name",
    header: "Vai trò",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original;

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
              <DialogEditRole role={role} />
              <DialogDeleteRole role={role} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
