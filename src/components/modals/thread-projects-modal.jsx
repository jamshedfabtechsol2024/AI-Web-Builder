import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCancelProjectMutation,
  useCompleteProjectMutation,
  useGetThreadProjects,
} from "@/hooks/use-thread";
import { useMemo, useState } from "react";
import PrimaryButton from "../buttons/primary-button";
import { Skeleton } from "../ui/skeleton";

const ThreadProjectsModal = ({
  open,
  onOpenChange,
  threadId,
  type = "cancel",
}) => {
  const { mutate: completeProject, isPending: isCompletingProject } =
    useCompleteProjectMutation();
  const { mutate: cancelProject, isPending: isCancellingProject } =
    useCancelProjectMutation();
  const { data: projects, isPending: isLoadingProjects } = useGetThreadProjects(
    threadId,
    open,
    type === "complete" ? { status: "in_progress" } : undefined
  );
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectMessageId, setSelectedProjectMessageId] =
    useState(null);
  const [query, setQuery] = useState("");
  const isMutating = isCompletingProject || isCancellingProject;

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
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 text-sm">
        {value}
      </span>
    );
  };

  const getProjectStatusDisplay = (value) => {
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

  const actionLabel = useMemo(() => {
    if (type === "complete") return "Complete Project";
    if (type === "cancel") return "Cancel Project";
    return "Confirm";
  }, [type]);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects) || query.trim() === "") return projects ?? [];
    const q = query.toLowerCase();
    return projects.filter((p) => {
      const fields = [
        p?.project_name,
        p?.title,
        p?.request_id,
        p?.status,
        p?.payment_status,
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase());
      return fields.some((f) => f.includes(q));
    });
  }, [projects, query]);

  const handleConfirm = () => {
    if (!selectedProjectId) return;
    const onSuccess = () => {
      setSelectedProjectId(null);
      setQuery("");
      onOpenChange(false);
    };
    if (type === "complete") {
      completeProject(selectedProjectId, { onSuccess });
    } else if (type === "cancel") {
      cancelProject(
        {
          offerId: selectedProjectId,
          payload: { message_id: selectedProjectMessageId },
        },
        { onSuccess }
      );
    }
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Projects</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="project-search" className="text-sm text-gray-300">
              Search by project name, title, request or status
            </label>
            <input
              id="project-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
              className="w-full rounded-md border border-[#FFFFFF1A] bg-[#0A0A0A] px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-[#3B82F6]"
              autoComplete="off"
              disabled={isMutating}
            />
          </div>

          <div className="max-h-[50vh] overflow-y-auto rounded-md border border-[#FFFFFF0F]">
            {isLoadingProjects ? (
              <ul className="space-y-2 p-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="bg-transparent">
                    <div className="flex items-start gap-3 p-4 rounded-md bg-[#0B0B0B]">
                      <Skeleton className="h-4 w-4 rounded-full bg-white/10" />

                      <div className="flex w-full flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div className="space-y-1">
                            <Skeleton className="h-4 bg-white/10 w-40" />
                            <Skeleton className="h-3 bg-white/10 w-24" />
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <Skeleton className="h-5 w-12 bg-white/10 rounded-full" />
                            <Skeleton className="h-5 w-14 bg-white/10 rounded-full" />
                            <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                          <Skeleton className="h-3 bg-white/10 w-24" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : filteredProjects.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-400">
                No projects found.
              </div>
            ) : (
              <ul role="list" className="divide-y divide-[#FFFFFF08]">
                {filteredProjects.map((p) => {
                  const isSelected = selectedProjectId === p.request_id;
                  return (
                    <li key={p.id} className="bg-transparent">
                      <label
                        htmlFor={`project-${p.id}`}
                        className={`flex cursor-pointer items-start gap-3 p-4 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-[#3B82F6] ${
                          isSelected ? "bg-[#0F172A]" : "hover:bg-[#0B0B0B]"
                        }`}
                      >
                        <input
                          id={`project-${p.id}`}
                          name="selected-project"
                          type="radio"
                          className="mt-1 h-4 w-4 accent-[#3B82F6]"
                          aria-describedby={`project-desc-${p.id}`}
                          checked={isSelected}
                          onChange={() => {
                            setSelectedProjectId(p.request_id);
                            setSelectedProjectMessageId(p.message_id);
                          }}
                          disabled={isMutating}
                        />

                        <div
                          className="flex w-full flex-col gap-1"
                          id={`project-desc-${p.id}`}
                        >
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-white">
                                {p.project_name ?? "Untitled Project"}
                              </p>
                              {p.title ? (
                                <p className="truncate text-xs text-gray-400">
                                  {p.title}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                              {p.amount ? (
                                <span className="rounded-full border border-[#FFFFFF1A] px-2 py-0.5 text-xs text-gray-200">
                                  ${p.amount}
                                </span>
                              ) : null}
                              {p.payment_status ? (
                                <span className="rounded-full bg-[#0A1F0A] px-2 py-0.5 text-xs text-green-400">
                                  {String(p.payment_status).toLowerCase()}
                                </span>
                              ) : null}
                              {p.status ? (
                                <span className="text-xs">
                                  {getStatusDisplay(p.status)}
                                </span>
                              ) : null}
                              {p.project_status ? (
                                <span className="text-xs">
                                  {getProjectStatusDisplay(p.project_status)}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="mt-1 grid grid-cols-1 gap-2 text-xs text-gray-400 sm:grid-cols-3">
                            {p.request_id ? (
                              <div>
                                <span className="text-gray-500">Request:</span>{" "}
                                {p.request_id}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-[#FFFFFF1A] px-4 py-2 text-sm text-gray-200 hover:bg-[#0B0B0B]"
              onClick={() => {
                onOpenChange(false);
                setSelectedProjectId(null);
                setQuery("");
              }}
              disabled={isMutating}
            >
              Close
            </button>

            <PrimaryButton
              disabled={!selectedProjectId || isMutating}
              loading={isMutating}
              onClick={handleConfirm}
              title={actionLabel}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadProjectsModal;
