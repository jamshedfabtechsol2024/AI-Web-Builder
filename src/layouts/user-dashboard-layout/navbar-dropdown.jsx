import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import ConfirmModal from "@/components/modals/confirm-modal";
import SupportModal from "@/components/modals/support-modal";
import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/use-auth-store";
import { getInitials } from "@/utils/get-intials";

/**
 * Configuration
 */

const MENU_ITEMS = [
  { key: "profile", label: "Profile Settings" },
  // { key: "developer", label: "Become a developer" },
  { key: "support", label: "Support" },
];

const THEME_OPTIONS = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

/**
 * NavbarDropdown
 */
const NavbarDropdown = memo(() => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleMenuClick = (key) => {
    if (key === "profile") {
      navigate("/settings");
    } else if (key === "support") {
      setShowSupportModal(true);
    } else if (key === "developer") {
      // console.log('Developer option clicked');
    }
  };

  // Memoize theme menu
  const themeMenu = useMemo(
    () =>
      THEME_OPTIONS.map((theme) => (
        <DropdownMenuItem className="cursor-pointer" key={theme.key}>
          {theme.label}
        </DropdownMenuItem>
      )),
    []
  );

  // Memoize menu items
  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item, idx) => (
        <div key={item.key}>
          <DropdownMenuItem
            className={
              item.key === "profile"
                ? "cursor-pointer flex-col items-start"
                : "cursor-pointer"
            }
            onClick={() => handleMenuClick(item.key)}
          >
            {item.label}
          </DropdownMenuItem>
          {idx < MENU_ITEMS.length - 1 && (
            <DropdownMenuSeparator className="bg-[var(--border)]" />
          )}
        </div>
      )),
    []
  );

  return (
    <>
      <DropdownMenu>
        {/* Dropdown Trigger */}
        <DropdownMenuTrigger className="hidden cursor-pointer items-center gap-3 rounded-[8px] border border-white/10 bg-[var(--glassic)] px-4 py-1 lg:flex">
          <Avatar className="h-11 w-11">
            <AvatarImage
              className="rounded-md object-cover"
              src={user?.profile_image}
            />
            <AvatarFallback className="bg-[var(--background)]">
              {getInitials(user?.first_name, user?.last_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-start">
            <p className="font-medium text-sm">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
          <Icons.ArrowDown />
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="start"
          className="mt-2 w-72 border-[var(--border)] bg-[var(--background)] font-semibold text-[var(--text)]"
        >
          {/* User Info */}
          <DropdownMenuItem className="my-1 cursor-pointer">
            <Avatar className="h-11 w-11">
              <AvatarImage
                className="rounded-md object-cover"
                src={user?.profile_image}
              />
              <AvatarFallback className="bg-[var(--background)] text-[var(--text)]">
                {getInitials(user?.first_name, user?.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-1 flex flex-col">
              <p className="font-medium text-[var(--text)] text-sm">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="font-medium text-muted-foreground text-xs">
                {user?.email}
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[var(--border)]" />

          {/* Theme Selector */}
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger className="!py-3 cursor-pointer">
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="mt-2 w-72 border-[var(--border)] bg-[var(--background)] text-[var(--text)]">
              {themeMenu}
            </DropdownMenuSubContent>
          </DropdownMenuSub> */}
          <DropdownMenuSeparator className="bg-[var(--border)]" />

          {/* Dynamic Menu Items */}
          {menuItems}

          <DropdownMenuSeparator className="bg-[var(--border)]" />

          {/* Sign Out */}
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Icons.Logout className="mr-1" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmModal
        confirmText="Logout"
        description="Are you sure you want to log out?"
        loading={isPending}
        onConfirm={() => {
          logout(undefined, {
            onSuccess: () => {
              setDeleteModalOpen(false);
            },
          });
        }}
        onOpenChange={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        title="Confirm Logout"
      />

      {/* Support Modal */}
      <SupportModal
        onOpenChange={() => setShowSupportModal(false)}
        open={showSupportModal}
      />
    </>
  );
});

NavbarDropdown.displayName = "NavbarDropdown";

export default NavbarDropdown;
