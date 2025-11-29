import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TablePagination({
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, totalItems);

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Rows per page:</Label>
        <Select
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
          value={rowsPerPage.toString()}
        >
          <SelectTrigger className="border border-slate-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[var(--card-bg)]">
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-muted-foreground text-sm">
          {start}-{end} of {totalItems}
        </span>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                aria-label="Previous page"
                className="cursor-pointer"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                aria-label="Next page"
                className="cursor-pointer"
                disabled={page * rowsPerPage >= totalItems}
                onClick={() => onPageChange(page + 1)}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
