import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./dashboard-navbar";
import MobileSidebar from "./mobile-sidebar";
import UserDashboardSidebar from "./user-dashboard-sidebar";

export default function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full text-foreground">
      {/* Navbar */}
      <DashboardNavbar onSidebarToggle={() => setSidebarOpen((v) => !v)} />

      <div className="flex h-[calc(100vh-0.2rem)] overflow-hidden pt-20">
        {/* Desktop Sidebar - Hidden on mobile/tablet */}
        <aside className="hidden w-72 flex-col border-[var(--border)] border-r bg-background lg:flex">
          <UserDashboardSidebar />
        </aside>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto bg-[#191919] px-2 py-2 md:px-4"
          id="main-content"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
