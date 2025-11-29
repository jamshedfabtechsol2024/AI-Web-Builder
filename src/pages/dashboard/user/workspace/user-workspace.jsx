import { SEOMeta } from "@/components/seo/seo-meta";
import WorkSpaceProjects from "./workspace-projects";

const UserWorkspace = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/recently"
      title="Workspace - Staron AI"
    />

    <main>
      <WorkSpaceProjects />
    </main>
  </>
);

export default UserWorkspace;
