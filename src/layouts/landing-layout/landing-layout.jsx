import { memo } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import LayoutFooter from "./layout-footer";
import LayoutNavbar from "./layout-navbar";

const VerticalLines = memo(({ position }) => (
  <div
    className={cn(
      "absolute top-0 z-60 h-full w-[1px] bg-[var(--border)]",
      position === "left"
        ? "left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 2xl:left-14"
        : "right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 2xl:right-14"
    )}
  />
));
VerticalLines.displayName = "VerticalLines";

function LandingLayout() {
  return (
    <div className="relative h-full min-h-screen w-full bg-[var(--background)]">
      {/* <VerticalLines position="left" />
      <VerticalLines position="right" /> */}

      <LayoutNavbar />

      {/* Main content area */}
      <main className="relative z-10 w-full">
        <Outlet />
      </main>

      {/* Footer at bottom */}
      <div>
        <LayoutFooter />
      </div>
    </div>
  );
}

export default LandingLayout;
