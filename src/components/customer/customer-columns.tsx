"use client";

import DialogDeleteCustomer from "@/components/customer/dialog-delete-customer";
import DialogDetailsCustomer from "@/components/customer/dialog-details-customer";
import DialogEditCustomer from "@/components/customer/dialog-edit-customer";
import { Button } from "@/components/ui/button";
import CellOrdinal from "@/components/ui/cell-ordinal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ICustomer } from "@/models/customer/definition";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const customerColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "ordinal",
    header: "STT",
    cell: ({ row }) => <CellOrdinal rowIndex={row.index} />,
  },
  {
    accessorKey: "taxCode",
    header: "Mã số thuế",
  },
  {
    accessorKey: "shortName",
    header: "Tên rút gọn",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{customer.shortName}</div>
              </TooltipTrigger>
              <TooltipContent>
                <span>{customer.fullName}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let permissions = [];

      if (typeof window !== "undefined") {
        permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
      }

      const hasUpdateCustomerPermission = permissions.some(
        (perm: IPermission) =>
          perm.action === "update" && perm.subject === "Customer"
      );

      const hasDeleteCustomerPermission = permissions.some(
        (perm: IPermission) =>
          perm.action === "delete" && perm.subject === "Customer"
      );

      const customer = row.original;

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
              <DialogDetailsCustomer customer={customer} />

              {hasUpdateCustomerPermission === true ||
              hasDeleteCustomerPermission === true ? (
                <DropdownMenuSeparator />
              ) : (
                <></>
              )}

              {hasUpdateCustomerPermission === true ? (
                <DialogEditCustomer customer={customer} />
              ) : (
                <></>
              )}

              {hasDeleteCustomerPermission === true ? (
                <DialogDeleteCustomer customer={customer} />
              ) : (
                <></>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
