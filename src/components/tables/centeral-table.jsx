import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "../pagination/table-pagination";

const CentralizedTable = ({
  headings,
  td = [],
  customFields = [],
  loading,
  onRowsPerPageChange,
  page = 1,
  rowsPerPage,
  onPageChange,
  totalItems = 0,
}) => {
  // Create a lookup for custom fields
  const customFieldMap = customFields.reduce((acc, field) => {
    acc[field.name] = field.data;
    return acc;
  }, {});

  const columns = Object.keys(headings);

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border-2 border-[var(--table-border)] shadow-sm">
        <Table>
          {/* Header */}
          <TableHeader className="bg-[var(--table-header)]">
            <TableRow className="h-14">
              {Object.entries(headings).map(([key, label]) => (
                <TableHead
                  className="border-[var(--table-border)] border-b px-4 py-3 text-left text-[var(--text)] text-sm"
                  key={key}
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {(() => {
              if (loading) {
                return Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow
                    className="h-12 border-[var(--table-border)] border-b"
                    key={`skeleton-row-${columns.length}-${idx}`}
                  >
                    {columns.map((colKey) => (
                      <TableCell className="px-4 py-2" key={colKey}>
                        <Skeleton className="h-4 w-3/4 rounded bg-[var(--skeleton)]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ));
              }
              if (td.length > 0) {
                return td.map((row, rowIndex) => (
                  <TableRow
                    className="h-16 border-[var(--table-border)] border-b bg-[var(--table-row)] transition-colors hover:bg-[var(--table-row-hover)]"
                    key={row._id || rowIndex}
                  >
                    {columns.map((colKey) => (
                      <TableCell
                        className="px-4 py-2 text-[var(--text)] text-sm"
                        key={colKey}
                      >
                        {customFieldMap[colKey]
                          ? customFieldMap[colKey](row[colKey], row)
                          : row[colKey] !== undefined &&
                            row[colKey] !== null &&
                            row[colKey] !== ""
                          ? row[colKey]
                          : "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ));
              }
              return (
                <TableRow className="h-16 border-[var(--table-border)] border-b">
                  <TableCell
                    className="bg-[var(--table-row)] text-center text-gray-400"
                    colSpan={columns.length}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              );
            })()}
          </TableBody>
        </Table>
      </div>
      {!loading && page && rowsPerPage && (
        <TablePagination
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
        />
      )}
    </>
  );
};

export default CentralizedTable;
