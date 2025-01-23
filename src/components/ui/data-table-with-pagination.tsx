"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SkeletonTable } from "@/components/ui/skeleton-table";

interface DataTableWithPaginationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  current: number;
  pageSize: number;
  totalPages: number;
}

export function DataTableWithPagination<TData, TValue>(
  props: DataTableWithPaginationProps<TData, TValue>
) {
  const { replace } = useRouter();

  const { columns, data, current, pageSize, totalPages } = props;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: current - 1,
    pageSize: pageSize,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      setPagination(newPagination);

      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("current", (newPagination.pageIndex + 1).toString());
      newSearchParams.set("pageSize", newPagination.pageSize.toString());
      replace(`?${newSearchParams.toString()}`);
    },
  });

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow key="loading-table" className="py-4">
                <TableCell colSpan={columns.length}>
                  <SkeletonTable />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} setLoading={setLoading} />
    </div>
  );
}
