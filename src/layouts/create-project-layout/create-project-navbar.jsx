import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import CommitModal from "@/components/modals/commit-modal";
import PublishModal from "@/components/modals/publish-modal";
import ShareModal from "@/components/modals/share-modal";
import { Icons } from "@/components/shared/icons";
import VersionIndicator from "@/components/shared/version-indicator";
import { useProjectContext } from "@/contexts/project-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProjectNavigation } from "@/hooks/use-project-navigation";
import { useToolbarStore } from "@/store/use-toolbar-store";
import NavbarDropdown from "./navbar-dropdown";

const CreateProjectNavbar = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [publishModal, setPublishModal] = useState(false);
  const { active, setActive } = useToolbarStore();
  const [shareModal, setShareModal] = useState(false);
  const [commitModal, setCommitModal] = useState(false);
  const isMobile = useIsMobile();
  const { liveProjectName } = useProjectContext();
  const {
    canGoPrevious,
    canGoNext,
    goToPreviousVersion,
    goToNextVersion,
    currentVersionNumber,
    totalVersions,
    isLoading,
    project_repo_info,
  } = useProjectNavigation(projectId, liveProjectName);

  // ✅ Mobile navbar
  if (isMobile) {
    return (
      <>
        <div className="flex flex-col gap-3 border-[var(--border)] border-b bg-[var(--background)] p-3">
          {/* Top row (dropdown + arrows + icons) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <NavbarDropdown />
              <button
                className={`rounded-md border border-[var(--border)] bg-[var(--input)] p-2 transition-colors ${
                  canGoPrevious
                    ? "cursor-pointer hover:bg-[var(--accent)]"
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={!canGoPrevious}
                onClick={goToPreviousVersion}
                title={`Previous version (${
                  currentVersionNumber - 1
                }/${totalVersions})`}
                type="button"
              >
                <Icons.ArrowLeft className="h-4 w-4" />
              </button>
              <button
                className={`rounded-md border border-[var(--border)] bg-[var(--input)] p-2 transition-colors ${
                  canGoNext
                    ? "cursor-pointer hover:bg-[var(--accent)]"
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={!canGoNext}
                onClick={goToNextVersion}
                title={`Next version (${
                  currentVersionNumber + 1
                }/${totalVersions})`}
                type="button"
              >
                <Icons.ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className={`rounded-md border border-[var(--border)] p-2 transition-colors ${
                    project_repo_info?.is_published
                      ? "cursor-pointer bg-[var(--input)] hover:bg-[var(--accent)]"
                      : "cursor-not-allowed bg-[var(--input)] opacity-50"
                  }`}
                  disabled={!project_repo_info?.is_published}
                  onClick={() => {
                    if (project_repo_info?.git_repo_url) {
                      window.open(
                        project_repo_info.git_repo_url,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  title={
                    project_repo_info?.is_published
                      ? "Open GitHub Repository"
                      : "Repository not published"
                  }
                  type="button"
                >
                  <Icons.GitHub2 className="h-4 w-4" />
                </button>
                {/* Status dot indicator */}
                {project_repo_info?.is_published && (
                  <div className="-right-1 -top-1 absolute h-3 w-3 rounded-full border-2 border-[var(--background)] bg-green-500" />
                )}
                {!project_repo_info?.is_published &&
                  project_repo_info !== undefined && (
                    <div className="-right-1 -top-1 absolute h-3 w-3 rounded-full border-2 border-[var(--background)] bg-red-500" />
                  )}
              </div>
              {/* <button
                className="rounded-md border border-[var(--border)] bg-[var(--input)] p-2"
                onClick={() => setShareModal(true)}
                type="button"
              >
                <Icons.Share className="h-4 w-4" />
              </button> */}
            </div>
          </div>

          {/* ✅ Bottom row (Version indicator + Hire + Publish buttons) */}
          <div className="flex items-center justify-between gap-2">
            <VersionIndicator
              currentVersion={currentVersionNumber}
              isLoading={isLoading}
              totalVersions={totalVersions}
            />
            <div className="flex items-center gap-2">
              <PrimaryButton
                className="!h-10 flex-1 border border-[var(--border)] bg-[var(--input)] text-[var(--text)]"
                onClick={() => navigate("/hire-developer")}
                title="Hire a Developer"
              />
              {project_repo_info?.is_published ? (
                <PrimaryButton
                  className="!h-10 flex-1"
                  onClick={() => setCommitModal(true)}
                  title="Commit Changes"
                />
              ) : (
                <PrimaryButton
                  className="!h-10 flex-1"
                  onClick={() => setPublishModal(true)}
                  title="Publish"
                />
              )}
            </div>
          </div>
        </div>

        <ShareModal
          onOpenChange={() => setShareModal(false)}
          open={shareModal}
        />

        <PublishModal
          onOpenChange={() => setPublishModal(false)}
          open={publishModal}
        />
      </>
    );
  }

  // ✅ Desktop navbar (unchanged)
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 bg-[var(--background)] p-4 lg:flex-row">
        <div className="flex items-center gap-2">
          <NavbarDropdown />
          <button
            className={`rounded-md border border-[var(--border)] bg-[var(--input)] p-[10px] transition-colors ${
              canGoPrevious
                ? "cursor-pointer hover:bg-[var(--accent)]"
                : "cursor-not-allowed opacity-50"
            }`}
            disabled={!canGoPrevious}
            onClick={goToPreviousVersion}
            title={`Previous version (${
              currentVersionNumber - 1
            }/${totalVersions})`}
            type="button"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
          </button>
          <button
            className={`rounded-md border border-[var(--border)] bg-[var(--input)] p-[10px] transition-colors ${
              canGoNext
                ? "cursor-pointer hover:bg-[var(--accent)]"
                : "cursor-not-allowed opacity-50"
            }`}
            disabled={!canGoNext}
            onClick={goToNextVersion}
            title={`Next version (${
              currentVersionNumber + 1
            }/${totalVersions})`}
            type="button"
          >
            <Icons.ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <div className="flex items-center gap-2">
            <button
              className={`cursor-pointer rounded-md border border-[var(--border)] bg-[var(--input)] p-[10px] transition-colors ${
                active === "play" ? "text-blue-700" : "text-foreground"
              }`}
              onClick={() => setActive("play")}
              type="button"
            >
              <Icons.Play className="h-4 w-4" />
            </button>

            <button
              className={`cursor-pointer rounded-md border border-[var(--border)] bg-[var(--input)] p-[10px] transition-colors ${
                active === "code" ? "text-blue-700" : "text-foreground"
              }`}
              onClick={() => setActive("code")}
              type="button"
            >
              <Icons.Code className="h-4 w-4" />
            </button>

            <div className="relative">
              <button
                className={`rounded-md border border-[var(--border)] p-[10px] transition-colors ${
                  project_repo_info?.is_published
                    ? "cursor-pointer bg-[var(--input)] hover:bg-[var(--accent)]"
                    : "cursor-not-allowed bg-[var(--input)] opacity-50"
                }`}
                disabled={!project_repo_info?.is_published}
                onClick={() => {
                  if (project_repo_info?.git_repo_url) {
                    window.open(
                      project_repo_info.git_repo_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
                title={
                  project_repo_info?.is_published
                    ? "Open GitHub Repository"
                    : "Repository not published"
                }
                type="button"
              >
                <Icons.GitHub2 className="h-4 w-4" />
              </button>
              {/* Status dot indicator */}
              {project_repo_info?.is_published && (
                <div className="-right-1 -top-1 absolute h-3 w-3 rounded-full border-2 border-[var(--background)] bg-green-500" />
              )}
              {!project_repo_info?.is_published &&
                project_repo_info !== undefined && (
                  <div className="-right-1 -top-1 absolute h-3 w-3 rounded-full border-2 border-[var(--background)] bg-red-500" />
                )}
            </div>

            {/* <button
              className="cursor-pointer rounded-md border border-[var(--border)] bg-[var(--input)] p-[10px]"
              onClick={() => setShareModal(true)}
              type="button"
            >
              <Icons.Share className="h-4 w-4" />
            </button> */}
          </div>

          <div className="flex items-center gap-2">
            <PrimaryButton
              className="!h-10 border border-[var(--border)] bg-[var(--input)] text-[var(--text)]"
              onClick={() => navigate("/hire-developer")}
              title="Hire a Developer"
            />
            {project_repo_info?.is_published ? (
              <PrimaryButton
                className="!h-10"
                onClick={() => setCommitModal(true)}
                title="Commit Changes"
              />
            ) : (
              <PrimaryButton
                className="!h-10"
                onClick={() => setPublishModal(true)}
                title="Publish"
              />
            )}
          </div>
        </div>
      </div>

      <ShareModal onOpenChange={() => setShareModal(false)} open={shareModal} />
      <PublishModal
        onOpenChange={() => setPublishModal(false)}
        open={publishModal}
      />
      <CommitModal
        onOpenChange={() => setCommitModal(false)}
        open={commitModal}
      />
    </>
  );
};

export default CreateProjectNavbar;
