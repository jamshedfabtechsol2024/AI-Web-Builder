import { useMemo } from "react";
import { Icons } from "@/components/shared/icons";
import CentralizedTable from "@/components/tables/centeral-table";
import { usePagination } from "@/hooks/use-pagination";

const MOCK_DATA = {
  data: [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      city: "Karachi",
      contact: "+92 300 1234567",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      city: "Lahore",
      contact: "+92 301 7654321",
    },
    {
      _id: "3",
      name: "Ali Khan",
      email: "ali@example.com",
      city: "Islamabad",
      contact: "+92 302 9876543",
    },
  ],
};

const TABLE_HEADINGS = {
  name: "Patient Name",
  email: "Email",
  city: "City",
  contact: "Contact",
  action: "Action",
};

export default function ProjectRequests() {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const actionColumn = useMemo(
    () => ({
      name: "action",
      data: () => (
        <div className="flex items-center gap-3">
          <Icons.Done />
          <Icons.Close />
        </div>
      ),
    }),
    []
  );

  const tableData = useMemo(() => MOCK_DATA?.data || [], []);

  return (
    <div className="py-6">
      <h1 className="mb-2 text-lg">Project Requests</h1>
      <CentralizedTable
        customFields={[actionColumn]}
        headings={TABLE_HEADINGS}
        loading={false}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        td={tableData}
        totalItems={50}
      />
    </div>
  );
}
