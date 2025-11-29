import { useMemo } from "react";
import CentralizedTable from "@/components/tables/centeral-table";
import { usePagination } from "@/hooks/use-pagination";
import { useGetEarnings } from "@/hooks/use-thread";
import EarningStats from "./earning-stats";

const MOCK_DATA = {
  data: [
    {
      projectId: "#PRJ-101",
      projectName: "Chatbot Integration",
      price: "$60",
      paymentDate: "Aug 4, 2025",
      paymentStatus: true, // Paid
      projectStatus: "In Progress",
    },
    {
      projectId: "#PRJ-101",
      projectName: "Chatbot Integration",
      price: "$60",
      paymentDate: "Aug 4, 2025",
      paymentStatus: true, // Paid
      projectStatus: "Completed",
    },
    {
      projectId: "#PRJ-101",
      projectName: "Chatbot Integration",
      price: "$60",
      paymentDate: "Aug 4, 2025",
      paymentStatus: true, // Paid
      projectStatus: "In Progress",
    },
    {
      projectId: "#PRJ-101",
      projectName: "Chatbot Integration",
      price: "$60",
      paymentDate: "Aug 4, 2025",
      paymentStatus: false, // Unpaid
      projectStatus: "In Progress",
    },
    {
      projectId: "#PRJ-101",
      projectName: "Chatbot Integration",
      price: "$60",
      paymentDate: "Aug 4, 2025",
      paymentStatus: false, // Unpaid
      projectStatus: "In Progress",
    },
  ],
};

const TABLE_HEADINGS = {
  project_id: "Project ID",
  project_name: "Project Name",
  amount: "Price",
  payment_date: "Payment Date",
  payment_status: "Payment Status",
  project_status: "Project Status",
};
const EarningsTable = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const { data: earningsList, isLoading: isEarningsListLoading } =
    useGetEarnings({
      page: page,
      pageSize: rowsPerPage,
    });

  const getStatusDisplay = (value) => {
    const normalized = value?.toLowerCase();

    if (normalized === "pending") {
      return (
        <span className="rounded-full bg-[#FACC151A] px-3 py-1 font-medium text-[#EAB308] text-sm">
          Pending
        </span>
      );
    }

    if (normalized === "approved") {
      return (
        <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
          Approved
        </span>
      );
    }

    if (normalized === "rejected") {
      return (
        <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#F43F5E] text-sm">
          Rejected
        </span>
      );
    }

    if (normalized === "cancelled") {
      return (
        <span className="rounded-full bg-[#9CA3AF1A] px-3 py-1 font-medium text-[#9CA3AF] text-sm">
          Cancelled
        </span>
      );
    }

    if (normalized === "completed") {
      return (
        <span className="rounded-full bg-[#10B9811A] px-3 py-1 font-medium text-[#10B981] text-sm">
          Completed
        </span>
      );
    }

    if (normalized === "in_progress") {
      return (
        <span className="rounded-full bg-[#3B82F61A] px-3 py-1 font-medium text-[#3B82F6] text-sm">
          In Progress
        </span>
      );
    }

    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 text-sm">
        {value}
      </span>
    );
  };

  const priceColumn = useMemo(
    () => ({
      name: "amount",
      data: (value) => <div className="flex items-center">${value}</div>,
    }),
    []
  );

  const paymentStatusColumn = useMemo(
    () => ({
      name: "payment_status",
      data: (value) => (
        <div className="flex items-center">
          {value === "paid" ? (
            <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
              Paid
            </span>
          ) : (
            <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
              Unpaid
            </span>
          )}
        </div>
      ),
    }),
    []
  );

  const statusColumn = useMemo(
    () => ({
      name: "project_status",
      data: (value) => (
        <div className="flex items-center ">{getStatusDisplay(value)}</div>
      ),
    }),
    []
  );

  const paymentDateColumn = useMemo(
    () => ({
      name: "payment_date",
      data: (value) => (
        <div className="flex items-center">
          {new Date(value).toISOString().split("T")[0]}
        </div>
      ),
    }),
    []
  );

  return (
    <>
      {" "}
      <EarningStats
        data={earningsList?.earning_stats}
        isLoading={isEarningsListLoading}
      />
      <div className="py-6">
        <CentralizedTable
          customFields={[
            priceColumn,
            paymentStatusColumn,
            statusColumn,
            paymentDateColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isEarningsListLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={earningsList?.results}
          totalItems={earningsList?.count}
        />
      </div>
    </>
  );
};

export default EarningsTable;
