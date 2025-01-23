"use client";

import DialogDeleteCompany from "@/components/admin/company/dialog-delete-company";
import DialogEditCompany from "@/components/admin/company/dialog-edit-company";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DynamicRenderComponent from "@/components/ui/dynamic-render-component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ICompany } from "@/models/company/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const companyColumns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "name",
    header: "Tên Công ty",
    cell: ({ row }) => {
      const company = row.original;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3">
                <DynamicRenderComponent condition={company.shortName} />
                {company.shortName}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>{company.fullName}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "registrationNumber",
    header: "Số đăng ký",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;

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
              <DialogEditCompany company={company} />
              <DialogDeleteCompany company={company} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
