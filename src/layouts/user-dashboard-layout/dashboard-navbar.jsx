import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, Menu, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/hooks/use-auth";
import { useCreateConversation } from "@/hooks/use-conversation";
import { useAuthStore } from "@/store/use-auth-store";
import { getInitials } from "@/utils/get-intials";
import NavbarDropdown from "./navbar-dropdown";
import NotificationsDropdown from "@/components/dropdowns/notifications-dropdown";

function DashboardNavbar({ onSidebarToggle }) {
  const navigate = useNavigate();
  const { id: workspaceId } = useParams();
  const user = useAuthStore((s) => s.user);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: logout, isPending: isLogoutPending } = useLogoutMutation();
  const { mutate: createConversation, isPending: isCreatingConversation } =
    useCreateConversation();

  return (
    <>
      {/* ==== NAVBAR ==== */}
      <nav className="fixed flex h-20 w-full items-center justify-between border-[var(--border)] border-b px-4 sm:px-6">
        {/* LEFT – Menu + NavbarDropdown (desktop) */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-md p-2 hover:bg-[var(--border)] lg:hidden"
            onClick={onSidebarToggle}
            type="button"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <NavbarDropdown />
          </div>
        </div>

        {/* ==== DESKTOP ACTIONS (≥ lg) ==== */}
        <div className="hidden items-center gap-4 lg:flex">
          <NotificationsDropdown />
          <PrimaryButton
            className="border border-white/10 bg-white/10"
            onClick={() => navigate("/hire-developer")}
            title="Hire Developer"
          />
          <PrimaryButton
            className="min-w-24"
            loading={isCreatingConversation}
            onClick={() =>
              createConversation(
                workspaceId ? { workspace_id: workspaceId } : {}
              )
            }
            title="Create Project"
          />
        </div>

        {/* ==== MOBILE ACTIONS (< lg) ==== */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto px-2 lg:hidden">
          {/* 1. Notifications */}
          <div className="min-w-0 flex-shrink-0">
            <NotificationsDropdown />
          </div>

          {/* 2. Hire Developer */}
          <div className="min-w-0 flex-shrink-0">
            <PrimaryButton
              className="border border-white/10 bg-white/10 text-xs sm:text-sm"
              onClick={() => navigate("/hire-developer")}
              title="Hire Dev"
            />
          </div>

          {/* 3. Create Project */}
          <div className="min-w-0 flex-shrink-0">
            <PrimaryButton
              className="min-w-20 text-xs sm:text-sm"
              loading={isCreatingConversation}
              onClick={() =>
                createConversation(
                  workspaceId ? { workspace_id: workspaceId } : {}
                )
              }
              title="Create Project"
            />
          </div>

          {/* 4. Profile Dropdown */}
          <div className="min-w-0 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-md p-2 transition-colors hover:bg-[var(--border)]"
                  type="button"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      alt="User Profile"
                      className="rounded-full object-cover"
                      src={user?.profile_image}
                    />
                    <AvatarFallback className="flex items-center justify-center text-[var(--text)] text-xs">
                      {getInitials(user?.first_name, user?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 border border-[var(--border)] bg-[var(--background)] text-[var(--text)]"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm leading-none">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/hire-developer")}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Hire Developer</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    createConversation(
                      workspaceId ? { workspace_id: workspaceId } : {}
                    )
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Project</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer text-red-400 focus:text-red-400"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* ==== LOGOUT CONFIRM MODAL ==== */}
      <ConfirmModal
        confirmText="Logout"
        description="Are you sure you want to log out?"
        loading={isLogoutPending}
        onConfirm={() => {
          logout(undefined, {
            onSuccess: () => setDeleteModalOpen(false),
          });
        }}
        onOpenChange={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        title="Confirm Logout"
      />
    </>
  );
}

export default DashboardNavbar;
