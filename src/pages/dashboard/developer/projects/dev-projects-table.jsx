import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import CentralizedTable from "@/components/tables/centeral-table";
import { ImageLoader } from "@/components/ui/image-loader";
import { usePagination } from "@/hooks/use-pagination";
import DashboardStats from "../dasboard/dashboard-stats";
import { useGetDeveloperDashboardData } from "@/hooks/use-dashboard";

const MOCK_DATA = {
  data: [
    {
      id: 1,
      projId: "#PRJ-101",
      projectName: "Chatbot Integration",
      description:
        "Integration of an AI chatbot into an existing customer support platform.",
      price: "$1200",
      deadline: "July 18, 2025",
      media: "/images/dev-port.png",
      status: true,
    },
    {
      id: 2,
      projId: "#PRJ-102",
      projectName: "E-commerce Website",
      description:
        "Developing a modern e-commerce website with payment gateway support.",
      price: "$2500",
      deadline: "August 10, 2025",
      media: "/images/dev-port.png",

      status: true,
    },
    {
      id: 3,
      projId: "#PRJ-103",
      projectName: "Mobile App UI/UX",
      description:
        "Designing a user-friendly mobile app UI with responsive layouts.",
      price: "$900",
      deadline: "July 1, 2025",
      media: "/images/dev-port.png",

      status: false,
    },
    {
      id: 4,
      projId: "#PRJ-104",
      projectName: "Analytics Dashboard",
      description:
        "Building a real-time analytics dashboard for business intelligence.",
      price: "$1800",
      deadline: "September 5, 2025",
      media: "/images/dev-port.png",

      status: true,
    },
    {
      id: 5,
      projId: "#PRJ-105",
      projectName: "Learning Management System",
      description:
        "Creating an LMS with video courses, progress tracking, and quizzes.",
      price: "$3000",
      deadline: "October 12, 2025",
      media: "/images/dev-port.png",

      status: true,
    },
  ],
};

const TABLE_HEADINGS = {
  project_id: "Proj ID",
  project_name: "Project Name",
  short_description: "Description",
  amount: "Price",
  deadline: "Deadline",
  media_url: "Media",
  project_status: "Status",
  action: "Action",
};
const DevelopersProjectsTable = ({ type = "all" }) => {
  const navigate = useNavigate();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const { data, isPending } = useGetDeveloperDashboardData({
    page,
    page_size: rowsPerPage,
  });

  const descriptionColumn = useMemo(
    () => ({
      name: "short_description",
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
        <div className="flex items-center">
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

  const priceColumn = useMemo(
    () => ({
      name: "amount",
      data: (value) => <div className="flex items-center">${value}</div>,
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
            onClick={() => navigate(`/developer/projects/${data?.request_id}`)}
            title="View Details "
          />
        </div>
      ),
    }),
    []
  );

  return (
    <div className="mt-4 h-full w-full">
      <DashboardStats data={data?.stats} isLoading={isPending} />
      <div className="my-4 flex flex-col gap-1">
        <h1 className="text-lg">
          {type === "all" ? "All" : "Active"} Projects
        </h1>
        <p className="text-[#696969] text-xs">
          {type === "all"
            ? "Track all active assignments with deadlines, status, and quick access to briefs and action items."
            : "Manage your current and past projects, view deadlines, and access briefs or deliverables with ease"}
        </p>
      </div>
      <div className="py-6">
        <CentralizedTable
          customFields={[
            priceColumn,
            descriptionColumn,
            mediaColumn,
            statusColumn,
            actionColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isPending}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={data?.active_projects || []}
          totalItems={data?.count || 0}
        />
      </div>
    </div>
  );
};

export default DevelopersProjectsTable;
