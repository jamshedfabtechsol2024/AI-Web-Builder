import { useMemo } from "react";
import CentralizedTable from "@/components/tables/centeral-table";
import { usePagination } from "@/hooks/use-pagination";
import { useGetSubscribersList } from "@/hooks/use-serviceplan";

const TABLE_HEADINGS = {
  user_id: "User ID",
  username: "User Name",
  plan_type: "Plan Name",
  start_date: "Start Date",
  end_date: "Expiry Date",
  price_amount: "Amount",
  status: "Status",
};

const SubscriptionTable = () => {
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const { data, isLoading } = useGetSubscribersList({
    page: page,
    pageSize: rowsPerPage,
  });

  const getStatusDisplay = (value) => {
    if (value === "active" || value === "Active") {
      return (
        <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
          Active
        </span>
      );
    }
    if (value === "Expired" || value === "expired") {
      return (
        <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
          Expired
        </span>
      );
    }
    return (
      <span className="rounded-full bg-[#FACC151A] px-3 py-1 font-medium text-[#EAB308] text-sm">
        {value}
      </span>
    );
  };

  const statusColumn = useMemo(
    () => ({
      name: "status",
      data: (value) => (
        <div className="flex items-center justify-center">
          {getStatusDisplay(value)}
        </div>
      ),
    }),
    []
  );

  const userIdColumn = useMemo(
    () => ({
      name: "user_id",
      data: (value) => <div>#{value}</div>,
    }),
    []
  );

  const startDateColumn = useMemo(
    () => ({
      name: "start_date",
      data: (value) => (
        <div>
          {" "}
          {new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long", // full month name
            day: "numeric",
          })}
        </div>
      ),
    }),
    []
  );

  const endDateColumn = useMemo(
    () => ({
      name: "end_date",
      data: (value) => (
        <div>
          {" "}
          {new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long", // full month name
            day: "numeric",
          })}
        </div>
      ),
    }),
    []
  );

  const priceColumn = useMemo(
    () => ({
      name: "price_amount",
      data: (value) => <div>${value}</div>,
    }),
    []
  );

  const planColumn = useMemo(
    () => ({
      name: "plan_type",
      data: (value) => (
        <div>{value.charAt(0).toUpperCase() + value.slice(1)}</div>
      ),
    }),
    []
  );

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Subscriptions</h1>
        <p className="text-[#696969] text-xs">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="py-6">
        <CentralizedTable
          customFields={[
            userIdColumn,
            startDateColumn,
            endDateColumn,
            priceColumn,
            planColumn,
            statusColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={data?.results || []}
          totalItems={data?.count || 0}
        />
      </div>
    </div>
  );
};

export default SubscriptionTable;
