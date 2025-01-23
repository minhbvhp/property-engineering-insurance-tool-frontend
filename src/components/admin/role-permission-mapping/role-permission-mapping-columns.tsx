"use client";

import DialogDeleteRolePermissionMapping from "@/components/admin/role-permission-mapping/dialog-delete-role-permission-mapping";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRolePermissionMapping } from "@/models/role-permission-mapping/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const rolePermissionMappingColumns: ColumnDef<IRolePermissionMapping>[] =
  [
    {
      accessorKey: "ordinal",
      header: "STT",
      cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
    },
    {
      accessorKey: "role.description",
      header: "Vai trò",
    },
    {
      accessorKey: "permission.description",
      header: "Quyền hạn",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rolePermissionMapping = row.original;

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
                <DialogDeleteRolePermissionMapping
                  rolePermissionMapping={rolePermissionMapping}
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
