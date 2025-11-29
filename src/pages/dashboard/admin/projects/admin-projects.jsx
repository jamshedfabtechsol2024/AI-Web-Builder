import { SEOMeta } from "@/components/seo/seo-meta";
import ProjectTable from "./project-table";

const AdminProjects = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/admin/developers"
      title="Projects - Staron AI"
    />

    <main>
      <ProjectTable />
    </main>
  </>
);

export default AdminProjects;
