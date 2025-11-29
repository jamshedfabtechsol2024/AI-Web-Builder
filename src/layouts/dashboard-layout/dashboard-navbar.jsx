import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import NotificationsDropdown from "@/components/dropdowns/notifications-dropdown";
import { AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/use-auth-store";
import { getInitials } from "@/utils/get-intials";
import dummyImg from "/images/default-image.jpg";

function DashboardNavbar({ onSidebarToggle }) {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between border-[var(--border)] border-b bg-[var(--background)] px-6 lg:left-72">
      {/* Left side - Menu Icon for large screens and below */}
      <div className="flex items-center">
        <button
          className="rounded-md p-2 hover:bg-[var(--border)] lg:hidden"
          onClick={onSidebarToggle}
          type="button"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right side - Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications dropdown */}
        <NotificationsDropdown />

        <div className="flex items-center gap-2">
          <div>
            <h1 className="font-medium text-[var(--text)] text-base">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-[var(--light-white)] text-xs capitalize">
              {user?.role}
            </p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="rounded-md object-cover"
              src={user?.profile_image || dummyImg}
            />
            <AvatarFallback className="text-[var(--text)]">
              {" "}
              {getInitials(user?.first_name, user?.last_name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
