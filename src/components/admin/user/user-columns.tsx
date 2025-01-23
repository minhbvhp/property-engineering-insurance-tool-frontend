"use client";

import DialogDeleteUser from "@/components/admin/user/dialog-delete-user";
import DialogDetailsUser from "@/components/admin/user/dialog-details-user";
import DialogEditUser from "@/components/admin/user/dialog-edit-user";
import DynamicUserDescriptionComponent from "@/components/admin/user/dynamic-user-description-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DynamicRenderComponent from "@/components/ui/dynamic-render-component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IUser } from "@/models/user/definition";
import { getVietNameDate, getVietNameTime } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "nameVN",
    header: "Họ tên",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{user.nameVN}</div>
            </TooltipTrigger>
            <TooltipContent>
              <span>{user.nameEN}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-1 min-w-96">
          <DynamicRenderComponent
            condition={user.companyBranch.company.shortName}
          />

          <Badge className="border-sky-600" variant="outline">
            {user.companyBranch.area.name}
          </Badge>
          <Badge variant="outline">{user.companyBranch.name}</Badge>

          <DynamicUserDescriptionComponent condition={user.role.name} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="min-w-28">
          <DynamicRenderComponent condition={user.active} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              <DialogDetailsUser user={user} />

              <DropdownMenuSeparator />

              <DialogEditUser user={user} />
              <DialogDeleteUser user={user} />
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Chuyển trạng thái</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
