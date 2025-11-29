import {
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Dot,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddWorkplaceModal from "@/components/modals/add-workplace-modal";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { ImageLoader } from "@/components/ui/image-loader";
import { Separator } from "@/components/ui/separator";
import { useLogoutMutation } from "@/hooks/use-auth";
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
import MoveTrashModal from "@/components/modals/move-trash-modal";
import { toast } from "sonner";

function MobileSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [workPlaceModal, setWorkPlaceModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProjectConfirmOpen, setDeleteProjectConfirmOpen] =
    useState(false);
  const [deleteWorkspaceConfirmOpen, setDeleteWorkspaceConfirmOpen] =
    useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { mutate: logout, isPending } = useLogoutMutation();
  const { data, isLoading } = useGetWorkspaces();
  const { data: conversations, isLoading: loadingConversations } =
    useGetAllConversations({
      workspace_filter: "without_workspace",
    });

  const { mutate: deleteWorkSpace, isPending: isDeleteWorkSpacePending } =
    useDeleteWorkSpaceMutation();

  const isActive = (path) => location.pathname === path;

  const routes = [
    { name: "Recents", icon: Clock, route: "/recently" },
    { name: "Messages", icon: MessageCircle, route: "/messages" },
  ];

  const menuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: Icons.User,
      route: "/settings/profile",
    },
    { key: "2fa", label: "2FA", icon: Icons.Lock, route: "/settings/2fa" },
    {
      key: "security",
      label: "Security",
      icon: Icons.Lock,
      route: "/settings/security",
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: Bell,
      route: "/settings/notifications",
    },
    {
      key: "integrations",
      label: "Integrations",
      icon: Icons.Integrations,
      route: "/settings/integrations",
    },
    {
      key: "subscription",
      label: "Subscription Plans",
      icon: Icons.Subscription,
      route: "/settings/subscription",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 flex h-full w-[85%] max-w-xs animate-slide-in-left flex-col bg-background shadow-xl">
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-[var(--border)] border-b bg-background px-6">
          <ImageLoader
            alt="ReThread AI Logo"
            className="mr-3"
            height={40}
            loaderColor="#1A202B"
            loading="lazy"
            objectFit="contain"
            src="/images/ai-logo.png"
            width={40}
          />
          <Button
            className="text-white hover:bg-[var(--border)]"
            onClick={onClose}
            size="icon"
            variant="ghost"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {/* Top Section */}
          <div className="space-y-2">
            {routes.map((item) => (
              <Link
                key={item.route}
                to={item.route}
                onClick={onClose}
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

          {/* Projects Section */}
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

          {/* Workspaces Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-[var(--border)] border-b px-2 pb-2 font-medium text-muted-foreground text-sm">
              <span>Workspaces</span>
              <Button
                className="h-6 w-6 cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--light-blue)]/80 hover:bg-[var(--dark-blue)] hover:text-white"
                onClick={() => {
                  setWorkPlaceModal(true);
                  onClose();
                }}
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

          <Separator className="bg-gray-800" />

          {/* Footer Links: Trash & Settings */}
          <div className="space-y-2">
            <Link
              to="/trash"
              onClick={onClose}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 ${
                isActive("/trash")
                  ? "bg-blue-600 text-white"
                  : "border border-[var(--border)] text-muted-foreground"
              }`}
            >
              <Trash2 className="h-4 w-4" />
              Trash
            </Link>

            {/* Settings Dropdown */}
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 ${
                openSettings || location.pathname.startsWith("/settings")
                  ? "bg-blue-600 text-white"
                  : "border border-[var(--border)] text-muted-foreground"
              }`}
              onClick={() => setOpenSettings(!openSettings)}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </div>
              {openSettings ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {openSettings && (
              <div className="mt-1 ml-6 space-y-1">
                {menuItems.map((item) => {
                  const active = isActive(item.route);
                  return (
                    <Link
                      key={item.key}
                      to={item.route}
                      onClick={onClose}
                      className={`flex w-full items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm hover:text-blue-600 ${
                        active
                          ? "font-medium text-blue-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Dot
                        className={`h-8 w-8 flex-shrink-0 ${
                          active ? "text-blue-600" : "text-muted-foreground"
                        }`}
                        fill={active ? "currentColor" : "none"}
                      />
                      <div className="flex items-center gap-2">
                        <item.icon
                          className={`h-3 w-3 ${
                            active ? "text-blue-600" : "text-muted-foreground"
                          }`}
                        />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Logout Footer */}
        <div className="border-t border-[var(--border)] bg-background p-4 mt-auto">
          <Button
            variant="ghost"
            className="h-14 w-full justify-start rounded-xl border border-[var(--border)] bg-[var(--background)] font-medium text-lg text-red-400 hover:bg-[var(--border)] hover:text-red-400"
            onClick={() => setDeleteModalOpen(true)}
          >
            <div className="flex w-full items-center gap-4 px-4 py-3">
              <LogOut className="h-5 w-5 flex-shrink-0 rotate-180" />
              <span className="font-light text-lg">Logout</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Modals */}
      {workPlaceModal && (
        <AddWorkplaceModal
          open={workPlaceModal}
          onOpenChange={() => setWorkPlaceModal(false)}
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

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={() => setDeleteModalOpen(false)}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        loading={isPending}
        onConfirm={() => {
          logout(undefined, {
            onSuccess: () => setDeleteModalOpen(false),
          });
        }}
      />
    </div>
  );
}

export default MobileSidebar;
