import { memo, useMemo } from "react";
import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

/**
 * Configuration for user and dropdown menu.
 */
const USER = {
  name: "Sohail Khan",
  email: "sohail@example.com",
  initials: "SK",
};

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
  // Memoize menu and theme options for performance and clarity.
  const themeMenu = useMemo(
    () =>
      THEME_OPTIONS.map((theme) => (
        <DropdownMenuItem className="cursor-pointer" key={theme.key}>
          {theme.label}
        </DropdownMenuItem>
      )),
    []
  );

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
          >
            {item.label}
          </DropdownMenuItem>
          {idx < MENU_ITEMS.length - 1 && (
            <DropdownMenuSeparator className="bg-gray-300" />
          )}
        </div>
      )),
    []
  );

  return (
    <DropdownMenu>
      {/* Dropdown Trigger: User avatar and info */}
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-[var(--glassic)] px-4 py-1">
        <Avatar className="!border !border-white/10 !p-5">
          <AvatarFallback>{USER.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-start">
          <p className="font-medium text-sm">{USER.name}</p>
          <p className="text-muted-foreground text-xs">{USER.email}</p>
        </div>
        <Icons.ArrowDown />
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        align="start"
        className="mt-2 w-72 border-white/10 bg-white font-semibold text-black"
      >
        {/* User Info */}
        <DropdownMenuItem className="my-1 cursor-pointer">
          <Avatar className="!border !border-black/10 !p-5">
            <AvatarFallback className="text-black">
              {USER.initials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="font-medium text-black text-sm">{USER.name}</p>
            <p className="font-medium text-muted-foreground text-xs">
              {USER.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300" />

        {/* Theme Selector */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="!py-3 cursor-pointer">
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="mt-2 w-72 border-white/10 bg-white text-black">
            {themeMenu}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator className="bg-gray-300" />

        {/* Dynamic Menu Items */}
        {menuItems}

        <DropdownMenuSeparator className="bg-gray-300" />

        {/* Sign Out */}
        <DropdownMenuItem className="cursor-pointer text-red-500">
          <Icons.Logout className="mr-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

NavbarDropdown.displayName = "NavbarDropdown";

export default NavbarDropdown;
