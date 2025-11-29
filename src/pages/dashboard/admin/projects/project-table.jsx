import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import CentralizedTable from "@/components/tables/centeral-table";
import { ImageLoader } from "@/components/ui/image-loader";
import { usePagination } from "@/hooks/use-pagination";
import { useGetAdminProjects } from "@/hooks/use-project";
import ProjectStats from "./project-stats";

const TABLE_HEADINGS = {
  project_id: "Proj ID",
  project_name: "Project Name",
  description: "Description",
  amount: "Price",
  deadline: "Deadline",
  media_url: "Media",
  payment_status: "Payment Status",
  project_status: "Status",
  action: "Action",
};
const ProjectTable = ({ mode = "admin", type = "all" }) => {
  const navigate = useNavigate();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const { data, isLoading } = useGetAdminProjects({
    page,
    page_size: rowsPerPage,
  });

  const idColumn = useMemo(
    () => ({
      name: "request_id",
      data: (value) => <div>#{value}</div>,
    }),
    []
  );

  const priceColumn = useMemo(
    () => ({
      name: "amount",
      data: (value) => <div>${value}</div>,
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

  const mediaColumn = useMemo(
    () => ({
      name: "media_url",
      data: (value) => (
        <div className="flex items-center justify-center">
          <div className="h-10 w-10">
            <ImageLoader
              alt={"proj-img"}
              className="rounded-md"
              height="100%"
              src={value}
              width="100%"
            />
          </div>
        </div>
      ),
    }),
    []
  );

  const paymentStatusColumn = useMemo(
    () => ({
      name: "payment_status",
      data: (value) => (
        <div className="flex items-center justify-center">
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

  const statusColumn = useMemo(
    () => ({
      name: "project_status",
      data: (value) => (
        <div className="flex items-center justify-center">
          {getStatusDisplay(value)}
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
          <PrimaryButton
            className="bg-transparent text-[var(--light-blue)] hover:underline"
            onClick={() => navigate(`/${mode}/projects/${data?.request_id}`)}
            title="View Details "
          />
        </div>
      ),
    }),
    []
  );
  return (
    <div>
      <ProjectStats data={data} isLoading={isLoading} />
      <div className="py-6">
        <CentralizedTable
          customFields={[
            idColumn,
            priceColumn,
            descriptionColumn,
            mediaColumn,
            paymentStatusColumn,
            statusColumn,
            actionColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={data?.results?.project_data || []}
          totalItems={data?.count || 0}
        />
      </div>
    </div>
  );
};

export default ProjectTable;
