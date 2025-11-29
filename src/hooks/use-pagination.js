// hooks/usePagination.js
import { useCallback, useState } from "react";

export function usePagination(initialPage = 1, initialRows = 10) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRows);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((value) => {
    setRowsPerPage(Number(value));
    setPage(1); // reset to page 1 when rows change
  }, []);

  return {
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    setPage,
    setRowsPerPage,
  };
}
