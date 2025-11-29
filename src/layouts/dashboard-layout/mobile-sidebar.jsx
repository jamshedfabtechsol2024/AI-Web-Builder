import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { ImageLoader } from "@/components/ui/image-loader";
import { ADMIN_SIDEBAR, DEVELOPER_SIDEBAR } from "@/data/sidebar-data";
import { useLogoutMutation } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

// GetRoleBaseSidebarData
const GetRoleBaseSidebarData = (role) => {
  switch (role) {
    case "admin":
      return ADMIN_SIDEBAR;
    case "developer":
      return DEVELOPER_SIDEBAR;
    default:
      return [];
  }
};

function MobileSidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const role = pathname.split("/")[1];
  const urlData = GetRoleBaseSidebarData(role);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: logout, isPending } = useLogoutMutation();

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (url) => pathname.startsWith(url);

  // Auto-open parent if current path is inside children
  useEffect(() => {
    for (const item of urlData) {
      if (item.children?.some((child) => pathname.startsWith(child.url))) {
        setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
      }
    }
  }, [pathname]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden">
        <div className="fixed inset-y-0 left-0 flex h-full w-[85%] max-w-xs animate-slide-in-left flex-col bg-foreground shadow-xl">
          {/* Header */}
          <div className="flex h-20 items-center justify-between border-gray-700 border-b bg-foreground px-6">
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
              className="text-white hover:bg-white/10"
              onClick={onClose}
              size="icon"
              variant="ghost"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {urlData.map((item) => (
                <div key={item.title}>
                  {/* Parent Item */}
                  <Button
                    asChild={!item.children}
                    className={cn(
                      "group relative h-14 w-full justify-start rounded-lg font-medium text-base transition-colors",
                      isActive(item.url) || openMenus[item.title]
                        ? "bg-[var(--blue)] text-white hover:bg-[var(--blue)]"
                        : "border border-white/10 bg-[#FFFFFF0D] text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={
                      item.children ? () => toggleMenu(item.title) : onClose
                    }
                    variant="ghost"
                  >
                    {item.children ? (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        {openMenus[item.title] ? (
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        ) : (
                          <ChevronRight className="h-4 w-4 opacity-70" />
                        )}
                      </div>
                    ) : (
                      <Link
                        className="flex w-full items-center gap-3 px-4"
                        to={item.url}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </Button>

                  {/* Child Items - text only */}
                  {item.children && (
                    <div
                      className={cn(
                        "ml-8 overflow-hidden transition-all duration-300",
                        openMenus[item.title]
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-400">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <Link
                              className={cn(
                                "flex items-center gap-2 py-1 text-sm transition-colors",
                                isActive(child.url)
                                  ? "font-medium text-[var(--light-blue)]"
                                  : "text-gray-400 hover:text-white"
                              )}
                              onClick={onClose}
                              to={child.url}
                            >
                              {child.icon}
                              <span>{child.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-gray-700 border-t bg-foreground p-4">
            <Button
              className={cn(
                "h-14 w-full justify-start rounded-lg font-medium text-base text-red-400 transition-colors hover:text-red-400",
                "border border-white/10 bg-[#FFFFFF0D] hover:bg-white/10"
              )}
              onClick={() => {
                setDeleteModalOpen(true);
              }}
              variant="ghost"
            >
              <div className="flex w-full items-center gap-3 px-4">
                <LogOut className="h-5 w-5 flex-shrink-0 rotate-180" />
                <span>Logout</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

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
    </>
  );
}

export default MobileSidebar;
