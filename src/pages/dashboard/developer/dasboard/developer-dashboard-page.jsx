import { SEOMeta } from "@/components/seo/seo-meta";
import DevelopersProjectsTable from "../projects/dev-projects-table";

function DeveloperDashboardPage() {
  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/developer/dashboard"
        title="Developer Dashboard - Staron AI"
      />

      <main>
        <DevelopersProjectsTable type="active" />
      </main>
    </>
  );
}

export default DeveloperDashboardPage;
