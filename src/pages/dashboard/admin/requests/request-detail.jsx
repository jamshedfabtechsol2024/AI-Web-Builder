import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import RequestDetailCard from "@/components/card/request-detail.card";
import AssignDeveloperModal from "@/components/modals/assign-developer-modal";
import { SEOMeta } from "@/components/seo/seo-meta";
import RequestDetailSkeleton from "@/components/skeletons/request-detail-skeleton";
import {
  useAcceptRequest,
  useGetRequestDetails,
  useRejectRequest,
} from "@/hooks/use-request";

const RequestDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { data, isLoading } = useGetRequestDetails(id);

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

  const requestData = {
    requestedBy: data?.request_by || "N/A",
    email: data?.email || "N/A",
    userType: "Paid Subscriber",
    projectType: data?.project_name || "N/A",
    submittedOn: data?.created_at
      ? new Date(data?.created_at).toISOString().split("T")[0]
      : "N/A",
    assignedDevelopers: data?.assigned_to || "N/A",
    currentStatus: getStatusDisplay(data?.status) || "N/A",
    description: data?.description,
  };

  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    useAcceptRequest();
  const { mutate: rejectRequest, isPending: isRejectingRequest } =
    useRejectRequest();

  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/admin/developers"
        title="Request Details - Staron AI"
      />
      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">
              #{data?.request_id} Request Detail
            </h1>
            <p className="text-[#696969] text-xs">
              Welcome back! Here's what's happening on your platform.
            </p>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:gap-4">
            {!isAdmin && data?.status === "pending" && (
              <>
                <PrimaryButton
                  className="!py-2 w-full rounded-full bg-[var(--light-blue)] px-8 text-white sm:w-auto"
                  title="Approve"
                  onClick={() => acceptRequest(data?.request_id)}
                  loading={isAcceptingRequest}
                />
                <PrimaryButton
                  className="!py-2 w-full rounded-full bg-[#BF0205] px-8 text-white sm:w-auto"
                  title="Reject"
                  onClick={() => rejectRequest(data?.request_id)}
                  loading={isRejectingRequest}
                />
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <RequestDetailSkeleton />
        ) : (
          <RequestDetailCard {...requestData} />
        )}
      </main>
    </>
  );
};

export default RequestDetail;
