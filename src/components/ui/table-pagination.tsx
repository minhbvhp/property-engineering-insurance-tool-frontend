import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  setLoading: (loading: boolean) => void;
}

export function DataTablePagination<TData>({
  table,
  setLoading,
}: TablePaginationProps<TData>) {
  const handleSelectPageSize = (value: string) => {
    setLoading(true);
    table.setPageSize(Number(value));
  };

  const handleFirstPage = () => {
    setLoading(true);
    table.setPageIndex(0);
  };

  const handlePreviousPage = () => {
    setLoading(true);
    table.previousPage();
  };

  const handleNextPage = () => {
    setLoading(true);
    table.nextPage();
  };

  const handleLastPage = () => {
    setLoading(true);
    table.setPageIndex(table.getPageCount() - 1);
  };

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-0 md:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Số dòng</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => handleSelectPageSize(value)}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Trang {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => handleFirstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => handlePreviousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => handleNextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => handleLastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
