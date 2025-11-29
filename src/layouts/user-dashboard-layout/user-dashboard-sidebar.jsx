import {
  Clock,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddWorkplaceModal from "@/components/modals/add-workplace-modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteWorkSpaceMutation,
  useGetWorkspaces,
} from "@/hooks/use-workplace";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllConversations } from "@/hooks/use-conversation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmModal from "@/components/modals/confirm-modal";
import MoveTrashModal from "@/components/modals/move-trash-modal";
import { toast } from "sonner";

export default function UserDashboardSidebar() {
  const location = useLocation();
  const [workPlaceModal, setWorkPlaceModal] = useState(false);
  const [deleteProjectConfirmOpen, setDeleteProjectConfirmOpen] =
    useState(false);
  const [deleteWorkspaceConfirmOpen, setDeleteWorkspaceConfirmOpen] =
    useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { data: conversations, isLoading: loadingConversations } =
    useGetAllConversations({
      workspace_filter: "without_workspace",
    });
  const { data, isLoading } = useGetWorkspaces();

  const { mutate: deleteWorkSpace, isPending: isDeleteWorkSpacePending } =
    useDeleteWorkSpaceMutation();

  // Sidebar static routes
  const routes = [
    { name: "Recents", icon: Clock, route: "/recently" },
    { name: "Messages", icon: MessageCircle, route: "/messages" },
  ];

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden w-72 flex-col border-[var(--border)] border-r bg-background md:flex h-full">
      <div className="flex flex-col h-full">
        {/* Scrollable Middle Section */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4">
          {/* Top Section */}
          <div className="space-y-2">
            {routes.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 ${
                  isActive(item.route)
                    ? "bg-blue-600 text-white"
                    : "border border-[var(--border)] text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <Separator className="bg-gray-800" />

          {/* Projects */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-[var(--border)] border-b px-2 pb-2 font-medium text-muted-foreground text-sm">
              <span>Projects</span>
            </div>
            <div className="space-y-1">
              {loadingConversations ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-full rounded-xl bg-white/10"
                  />
                ))
              ) : conversations?.conversations?.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No projects found
                </div>
              ) : (
                conversations?.conversations?.map((project) => (
                  <div
                    key={project.id}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 ${
                      isActive(`/project/${project.id}`)
                        ? "bg-blue-600 text-white"
                        : "border border-[var(--border)] text-muted-foreground"
                    }`}
                  >
                    {/* Project Title */}
                    <Link
                      to={`/project/${project.id}`}
                      className="flex-1 truncate"
                    >
                      {project?.title || "Untitled Project"}
                    </Link>

                    {/* Three-dot menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="w-32 bg-black text-white border border-[var(--border)]"
                      >
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setDeleteProjectConfirmOpen(true);
                          }}
                        >
                          Move to Trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          </div>

          <Separator className="bg-gray-800" />

          {/* Workspaces */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-[var(--border)] border-b px-2 pb-2 font-medium text-muted-foreground text-sm">
              <span>Workspaces</span>
              <Button
                className="h-6 w-6 cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--light-blue)]/80 hover:bg-[var(--dark-blue)] hover:text-white"
                onClick={() => setWorkPlaceModal(true)}
                size="icon"
                variant="ghost"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-full rounded-xl bg-white/10"
                  />
                ))
              ) : data?.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No workspaces found
                </div>
              ) : (
                data?.map((workspace) => (
                  <div
                    key={workspace.id}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 ${
                      isActive(`/workspace/${workspace.id}`)
                        ? "bg-blue-600 text-white"
                        : "border border-[var(--border)] text-muted-foreground"
                    }`}
                  >
                    {/* Workspace name */}
                    <Link
                      to={`/workspace/${workspace.id}`}
                      className="flex-1 truncate"
                    >
                      {workspace?.name}
                    </Link>

                    {/* Three-dot menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="w-32 bg-black text-white border border-[var(--border)]"
                      >
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                          onClick={() => {
                            setSelectedWorkspaceId(workspace.id);
                            setDeleteWorkspaceConfirmOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="px-3 py-4 space-y-2 border-t border-[var(--border)]">
          <Link
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 ${
              isActive("/trash")
                ? "bg-blue-600 text-white"
                : "border border-[var(--border)] text-muted-foreground"
            }`}
            to="/trash"
          >
            <Trash2 className="h-4 w-4" />
            Trash
          </Link>
          <Link
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 ${
              isActive("/settings")
                ? "bg-blue-600 text-white"
                : "border border-[var(--border)] text-muted-foreground"
            }`}
            to="/settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

      {/* Work Place Modal */}
      {workPlaceModal && (
        <AddWorkplaceModal
          onOpenChange={() => setWorkPlaceModal(false)}
          open={workPlaceModal}
        />
      )}

      {/* Confirm Move to Trash  Modal */}

      <MoveTrashModal
        onOpenChange={() => setDeleteProjectConfirmOpen(false)}
        open={deleteProjectConfirmOpen}
        id={selectedProjectId}
      />

      {/* Confirm Delete Workspace Modal */}
      <ConfirmModal
        open={deleteWorkspaceConfirmOpen}
        onOpenChange={() => setDeleteWorkspaceConfirmOpen(false)}
        title="Delete Workspace"
        description="Are you sure you want to delete this workspace?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleteWorkSpacePending}
        onConfirm={() => {
          deleteWorkSpace(selectedWorkspaceId, {
            onSuccess: () => {
              toast.success("Workspace deleted successfully");
              setDeleteWorkspaceConfirmOpen(false);
            },
          });
        }}
        onCancel={() => setDeleteWorkspaceConfirmOpen(false)}
      />
    </aside>
  );
}
