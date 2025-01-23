"use client";

import DialogDeletePermission from "@/components/admin/permission/dialog-delete-permission";
import DialogEditPermission from "@/components/admin/permission/dialog-edit-permission";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPermission } from "@/models/permission/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const permissionColumns: ColumnDef<IPermission>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "action",
    header: "Thao tác",
  },
  {
    accessorKey: "subject.name",
    header: "Đối tượng",
  },
  {
    accessorKey: "condition",
    header: "Điều kiện",
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <>
          {permission.condition &&
            Object.entries(permission.condition).map(
              ([key, value], index, array) => (
                <span key={key}>
                  <strong>{key}:</strong> {value}
                  {index < array.length - 1 && ", "}
                </span>
              )
            )}
        </>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const permission = row.original;

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
              <DialogEditPermission permission={permission} />
              <DialogDeletePermission permission={permission} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
