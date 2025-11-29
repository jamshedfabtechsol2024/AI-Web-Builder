import { Outlet } from "react-router-dom";
import { ProjectProvider } from "@/contexts/project-context";
import CreateProjectNavbar from "./create-project-navbar";

const CreateProjectLayout = () => {
  return (
    <ProjectProvider>
      <div className="flex h-screen flex-col">
        {/* Top Navbar */}
        <CreateProjectNavbar />

        {/* Main Content (scrollable if it overflows) */}
        <main className="flex-1 overflow-y-auto bg-[var(--glassic)] p-4">
          <Outlet />
        </main>
      </div>
    </ProjectProvider>
  );
};

export default CreateProjectLayout;
