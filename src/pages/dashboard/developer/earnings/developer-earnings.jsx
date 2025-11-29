import { SEOMeta } from "@/components/seo/seo-meta";
import EarningStats from "./earning-stats";
import EarningsTable from "./earnings-table";

const DeveloperEarnings = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/developer/dashboard"
      title="Developer Earnings - Staron AI"
    />

    <main>
      <EarningsTable />
    </main>
  </>
);

export default DeveloperEarnings;
