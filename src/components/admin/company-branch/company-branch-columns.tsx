"use client";

import DialogDeleteCompanyBranch from "@/components/admin/company-branch/dialog-delete-company-branch";
import DialogEditCompanyBranch from "@/components/admin/company-branch/dialog-edit-company-branch";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DynamicRenderComponent from "@/components/ui/dynamic-render-component";
import { ICompanyBranch } from "@/models/company-branch/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const companyBranchColumns: ColumnDef<ICompanyBranch>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    header: "Tên chi nhánh",
    cell: ({ row }) => {
      const companyBranch = row.original;

      return (
        <span>
          {companyBranch.company.shortName.toUpperCase()} - Chi nhánh{" "}
          {companyBranch.name}
        </span>
      );
    },
  },
  {
    header: "Trạng thái",
    cell: ({ row }) => {
      const companyBranch = row.original;

      return <DynamicRenderComponent condition={companyBranch.active} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const companyBranch = row.original;

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
              <DialogEditCompanyBranch companyBranch={companyBranch} />
              <DialogDeleteCompanyBranch companyBranch={companyBranch} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
