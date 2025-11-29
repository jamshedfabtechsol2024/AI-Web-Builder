import { SEOMeta } from "@/components/seo/seo-meta";
import RequestTable from "./requests-table";

const AdminRequests = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/admin/developers"
      title="Requests - Staron AI"
    />

    <main>
      <RequestTable />
    </main>
  </>
);

export default AdminRequests;
