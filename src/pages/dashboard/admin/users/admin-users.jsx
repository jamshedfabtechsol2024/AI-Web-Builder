import { SEOMeta } from "@/components/seo/seo-meta";

import UserTable from "./user-table";

const AdminUsers = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/admin/users"
      title="Admin Users - Staron AI"
    />
    <main>
      <UserTable />
    </main>
  </>
);

export default AdminUsers;
