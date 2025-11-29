import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/shared/icons";
import CentralizedTable from "@/components/tables/centeral-table";
import { usePagination } from "@/hooks/use-pagination";
import {
  useAcceptRequest,
  useGetRequests,
  useRejectRequest,
} from "@/hooks/use-request";

const TABLE_HEADINGS = {
  request_id: "Request ID",
  request_by: "Requested By",
  project_name: "Project",
  short_description: "Description",
  created_at: "Requested Date",
  assigned_to: "Assigned Dev",
  status: "Status",
  action: "Action",
};

const RequestTable = ({ type = "admin" }) => {
  const navigate = useNavigate();

  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const { data, isLoading } = useGetRequests({ page, rowsPerPage });

  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    useAcceptRequest();
  const { mutate: rejectRequest, isPending: isRejectingRequest } =
    useRejectRequest();

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

    if (normalized === "withdraw") {
      return (
        <span className="rounded-full bg-[#3B82F61A] px-3 py-1 font-medium text-[#3B82F6] text-sm">
          Withdrawn
        </span>
      );
    }

    if (normalized === "delivered") {
      return (
        <span className="rounded-full bg-[#8B5CF61A] px-3 py-1 font-medium text-[#8B5CF6] text-sm">
          Delivered
        </span>
      );
    }

    if (normalized === "revision_required") {
      return (
        <span className="rounded-full bg-[#F973161A] px-3 py-1 font-medium text-[#F97316] text-sm">
          Revision Required
        </span>
      );
    }

    if (normalized === "completed") {
      return (
        <span className="rounded-full bg-[#0EA5E91A] px-3 py-1 font-medium text-[#0EA5E9] text-sm">
          Completed
        </span>
      );
    }

    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 text-sm">
        {value}
      </span>
    );
  };

  const idColumn = useMemo(
    () => ({
      name: "request_id",
      data: (value) => <div>#{value}</div>,
    }),
    []
  );

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

  const requestedDateColumn = useMemo(
    () => ({
      name: "created_at",
      data: (value) => (
        <div>
          <p> {new Date(value).toISOString().split("T")[0]}</p>
        </div>
      ),
    }),
    []
  );
  const descriptionColumn = useMemo(
    () => ({
      name: "description",
      data: (value) => (
        <div className="flex max-w-[200px]">
          <p className="truncate">{value}</p>
        </div>
      ),
    }),
    []
  );

  const actionColumn = useMemo(
    () => ({
      name: "action",
      data: (_, data) => (
        <div className="flex items-center gap-3">
          <Icons.Eye
            className="cursor-pointer"
            onClick={() =>
              navigate(
                `/${type === "admin" ? "admin" : "developer"}/requests/${
                  data?.request_id
                }`
              )
            }
          />
          {type === "developer" && data?.status === "pending" && (
            <>
              <button
                type="button"
                onClick={() => acceptRequest(data?.request_id)}
                disabled={isAcceptingRequest}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Icons.Done />
              </button>

              <button
                type="button"
                onClick={() => rejectRequest(data?.request_id)}
                disabled={isRejectingRequest}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Icons.Close />
              </button>
            </>
          )}
        </div>
      ),
    }),
    []
  );

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Requests</h1>
        <p className="text-[#696969] text-xs">
          Requests Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="py-6">
        <CentralizedTable
          customFields={[
            idColumn,
            statusColumn,
            descriptionColumn,
            actionColumn,
            requestedDateColumn,
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

export default RequestTable;
