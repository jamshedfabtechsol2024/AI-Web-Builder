import { useLocation, useParams } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import ProjectDetailCard from "@/components/card/project-detail-card";
import { SEOMeta } from "@/components/seo/seo-meta";
import ProjectDetailSkeleton from "@/components/skeletons/project-detail-skeleton";
import { useAdminProjectDetails } from "@/hooks/use-project";
import { getMediaType } from "@/utils/media-type";

const ProjectDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading } = useAdminProjectDetails(id);
  const isAdmin = location.pathname.startsWith("/admin");

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

  const project = {
    projectId: data?.project_id || "N/A",
    projectName: data?.project_name || "N/A",
    price: `$${data?.amount}`,
    paymentDate: data?.payment_date
      ? new Date(data.payment_date).toLocaleString()
      : "N/A",
    deadline: data?.deadline || "N/A",
    status: getStatusDisplay(data?.project_status),
    media: {
      url: data?.media_url,
      type: getMediaType(data?.media_url),
    },
    description: data?.description || "N/A",
  };
  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/admin/developers"
        title="Project Details - Staron AI"
      />

      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">Project Detail</h1>
            <p className="text-[#696969] text-xs">
              Welcome back! Here's what's happening on your platform.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-center lg:gap-4">
            {isAdmin && (
              <PrimaryButton
                className={`!py-2 w-full rounded-full px-12 text-white sm:w-auto ${
                  data?.payment_status?.toLowerCase() === "paid"
                    ? "bg-[#22C55E]"
                    : "bg-[#BF0205]"
                }`}
                title={
                  data?.payment_status?.toLowerCase() === "paid"
                    ? "Paid"
                    : "Unpaid"
                }
              />
            )}

            {/* {!isAdmin && (
              <Select>
                <SelectTrigger className="w-full border border-[#FFFFFF0F] bg-[#FFFFFF0F] text-white sm:w-auto">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent className="border border-[#FFFFFF0F] bg-[#1A1A1A] text-white">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )} */}
          </div>
        </div>
        {isLoading ? (
          <ProjectDetailSkeleton />
        ) : (
          <ProjectDetailCard {...project} />
        )}
      </main>
    </>
  );
};

export default ProjectDetail;
