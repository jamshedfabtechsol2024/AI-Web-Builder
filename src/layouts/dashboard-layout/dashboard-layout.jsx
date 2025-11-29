import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";
import MobileSidebar from "./mobile-sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-start text-foreground">
      {/* Desktop Sidebar - Hidden on large screens and below */}
      <aside
        aria-label="Sidebar"
        className={cn("hidden transition-all duration-200 lg:block", "w-72")}
      >
        <ScrollArea className="h-full w-full">
          <SidebarProvider>
            <DashboardSidebar />
          </SidebarProvider>
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="relative flex flex-1 flex-col overflow-hidden pt-20">
        {/* Navbar */}
        <DashboardNavbar onSidebarToggle={() => setSidebarOpen((v) => !v)} />

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto px-4 py-8"
          id="main-content"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
