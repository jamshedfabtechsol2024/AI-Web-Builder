import RunningProjectCard from "@/components/card/running-project-card";
import ConfirmModal from "@/components/modals/confirm-modal";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import {
  useDeletePermanentlyProjectMutation,
  useGetTrashProjects,
  useRestoreProjectMutation,
} from "@/hooks/use-project";
import { useState } from "react";
import staronDefault from "/images/staron_def.png";

const TrashProjects = () => {
  const { data, isLoading } = useGetTrashProjects();
  const [confirmRestoreProjectModal, setConfirmRestoreProjectModal] =
    useState(false);
  const [deletePermanentlyModal, setDeletePermanentlyModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { mutate: restoreProject, isPending: isRestoreProjectPending } =
    useRestoreProjectMutation();

  const { mutate: deletePermanently, isPending: isDeletePermanentlyPending } =
    useDeletePermanentlyProjectMutation();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          // Show skeletons with consistent size
          Array.from({ length: 5 }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
          ))
        ) : data.length === 0 ? (
          // Empty state
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <p className="font-medium text-base">No projects found in Trash</p>
          </div>
        ) : (
          // Project cards
          data.map((project) => (
            <RunningProjectCard
              key={project.id}
              image={project?.image_url || staronDefault}
              name={project?.title || "Untitled Project"}
              updatedAt={project.updated_at}
              type="trash"
              onDeletePermanently={() => {
                setDeletePermanentlyModal(true);
                setSelectedProjectId(project.id);
              }}
              onRestoreClick={() => {
                setConfirmRestoreProjectModal(true);
                setSelectedProjectId(project.id);
              }}
            />
          ))
        )}
      </div>

      {/* Modals */}

      {/* Restore Confirm Modal  */}
      <ConfirmModal
        confirmText="Restore"
        description="Are you sure you want to restore this project?"
        loading={isRestoreProjectPending}
        onConfirm={() => {
          restoreProject(selectedProjectId, {
            onSuccess: () => {
              setSelectedProjectId(null);
              setConfirmRestoreProjectModal(false);
            },
          });
        }}
        onOpenChange={() => setConfirmRestoreProjectModal(false)}
        open={confirmRestoreProjectModal}
        title="Confirm Restore"
      />

      {/* Delete Permanently Modal  */}
      <ConfirmModal
        confirmText="Delete Permanently"
        description="Are you sure you want to permanently delete this project?"
        loading={isDeletePermanentlyPending}
        onConfirm={() => {
          deletePermanently(selectedProjectId, {
            onSuccess: () => {
              setSelectedProjectId(null);
              setDeletePermanentlyModal(false);
            },
          });
        }}
        onOpenChange={() => setDeletePermanentlyModal(false)}
        open={deletePermanentlyModal}
        title="Delete Permanently"
      />
    </div>
  );
};

export default TrashProjects;
