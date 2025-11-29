import { SEOMeta } from "@/components/seo/seo-meta";
import RequestTable from "../../admin/requests/requests-table";

const DeveloperRequests = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/developer/dashboard"
      title="Requests - Staron AI"
    />

    <main>
      <RequestTable type="developer" />
    </main>
  </>
);

export default DeveloperRequests;
