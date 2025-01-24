"use client";

import DialogDeleteAgent from "@/components/organization/agent/dialog-delete-agent";
import DialogDetailsAgent from "@/components/organization/agent/dialog-details-agent";
import DialogEditAgent from "@/components/organization/agent/dialog-edit-agent";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAgent } from "@/models/agent/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const agentColumns: ColumnDef<IAgent>[] = [
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
      const agent = row.original;

      console.log(agent);

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
              <DialogDetailsAgent agent={agent} />

              <DropdownMenuSeparator />

              <DialogEditAgent agent={agent} />

              <DialogDeleteAgent agent={agent} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
