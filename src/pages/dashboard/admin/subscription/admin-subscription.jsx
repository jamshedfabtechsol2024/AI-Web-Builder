import { SEOMeta } from "@/components/seo/seo-meta";
import SubscriptionTable from "./subscription-table";

const AdminSubscription = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/admin/developers"
      title="Subscriptions - Staron AI"
    />

    <main>
      <SubscriptionTable />
    </main>
  </>
);

export default AdminSubscription;
