import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { ImageLoader } from "@/components/ui/image-loader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ADMIN_SIDEBAR,
  DEVELOPER_SIDEBAR,
  USER_SIDEBAR,
} from "@/data/sidebar-data";
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
      return USER_SIDEBAR;
  }
};

function DashboardSidebar() {
  const { pathname } = useLocation();
  const role = pathname.split("/")[1];
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: logout, isPending } = useLogoutMutation();

  const isActive = (url) => pathname.startsWith(url);

  // const role = 'admin';
  const urlData = GetRoleBaseSidebarData(role);

  const interactionBg =
    "hover:glass-bg hover:bg-white/10 focus:glass-bg focus:bg-white/10 active:glass-bg active:bg-white/10 active:text-white";

  return (
    <>
      <Sidebar
        className="h-full w-72 border-gray-700 border-r bg-foreground"
        collapsible="icon"
        peer
      >
        <SidebarHeader className="h-20 border-gray-700 border-b bg-foreground group-data-[collapsible=icon]:h-24">
          <div className="flex h-full w-full items-center justify-between">
            <div className="flex items-center">
              <ImageLoader
                alt="ReThread AI Logo"
                className="group-data-[collapsible=icon]:hidden"
                height={60}
                loaderColor="#1A202B"
                loading="lazy"
                objectFit="contain"
                src="/images/ai-logo.png"
                width={60}
              />
              <h1 className="gradient-text font-semibold text-2xl">
                Staron AI
              </h1>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="scrollbar-hide h-full bg-foreground group-data-[collapsible=icon]:overflow-y-auto">
          <SidebarGroup className={cn("group-data-[collapsible=icon]:w-full")}>
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
                {urlData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "data-[active=true]:glass-bg h-16 rounded-[8px] font-medium text-gray-300 text-lg hover:text-white data-[active=true]:text-white",
                        "group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0",
                        isActive(item.url)
                          ? "bg-[var(--blue)] hover:bg-[var(--blue)]"
                          : "border border-white/10 bg-[#FFFFFF0D] data-[active=true]:bg-white/20"
                      )}
                      isActive={isActive(item.url)}
                    >
                      <Link
                        className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-13 flex items-center gap-4 px-4 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
                        to={item.url}
                      >
                        {item.icon}
                        <span className="font-light text-[var(--text)] text-lg group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* <Separator className="my-4 bg-gray-700 group-data-[collapsible=icon]:my-6" /> */}

          {/* <SidebarGroup className={cn('group-data-[collapsible=icon]:w-full')}>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
              {BOTTOM_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      `text-gray-300 hover:text-white ${interactionBg} data-[active=true]:glass-bg h-16 rounded-[8px] font-medium text-lg data-[active=true]:bg-white/10 data-[active=true]:text-white`,
                      'group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0',
                      isActive(item.url) && 'border border-white/20'
                    )}
                    isActive={isActive(item.url)}
                  >
                    <Link
                      className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-13 flex items-center gap-4 px-4 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
                      to={item.url}
                    >
                      <ImageLoader
                        alt={item.title}
                        className={cn(
                          '!h-5 !w-5 flex-shrink-0',
                          // Icon mode: larger icons
                          'group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5'
                        )}
                        height={20}
                        loaderColor={isActive(item.url) ? '' : '#1A202B'}
                        loading="lazy"
                        objectFit="contain"
                        src={item.icon}
                        width={20}
                      />
                      <span className="font-light text-lg group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        </SidebarContent>

        <SidebarFooter className="border-gray-700 border-t bg-foreground group-data-[collapsible=icon]:pb-6">
          <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  `cursor-pointer text-red-400 hover:text-red-400 ${interactionBg} h-16 rounded-[8px] font-medium text-lg data-[active=true]:text-white`,
                  "group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                )}
              >
                <Button
                  className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-13 flex items-center gap-4 px-4 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <LogOut
                    className={cn(
                      "!h-5 !w-5 flex-shrink-0 rotate-180",

                      "group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5"
                    )}
                  />
                  <span className="font-light text-lg group-data-[collapsible=icon]:hidden">
                    Logout
                  </span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

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

export default DashboardSidebar;
