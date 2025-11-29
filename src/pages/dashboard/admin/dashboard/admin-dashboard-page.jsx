import { SEOMeta } from "@/components/seo/seo-meta";
import GraphSection from "./graph-section";
import RequestTable from "../requests/requests-table";

function AdminDashboardPage() {
  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/admin/dashboard"
        title="Admin Dashboard - Staron AI"
      />

      <main className="flex flex-col gap-8">
        <GraphSection />
        <RequestTable />
      </main>
    </>
  );
}

export default AdminDashboardPage;
