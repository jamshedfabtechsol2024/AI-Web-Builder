import { SEOMeta } from "@/components/seo/seo-meta";
import DeveloperTable from "./developer-table";

const AdminDevelopers = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/admin/developers"
      title="Developers - Staron AI"
    />

    <main>
      <DeveloperTable />
    </main>
  </>
);

export default AdminDevelopers;
