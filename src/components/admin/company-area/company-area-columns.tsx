"use client";

import DialogDeleteCompanyArea from "@/components/admin/company-area/dialog-delete-company-area";
import DialogEditCompanyArea from "@/components/admin/company-area/dialog-edit-company-area";

import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICompanyArea } from "@/models/company-area/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const companyAreaColumns: ColumnDef<ICompanyArea>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "name",
    header: "Tên khu vực",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const companyArea = row.original;

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
              <DialogEditCompanyArea companyArea={companyArea} />
              <DialogDeleteCompanyArea companyArea={companyArea} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
