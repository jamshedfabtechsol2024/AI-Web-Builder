import { SEOMeta } from "@/components/seo/seo-meta";
import RecentProjects from "./recent-projects";

const UserRecent = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/recently"
      title="User Recent - Staron AI"
    />

    <main>
      <RecentProjects />
    </main>
  </>
);

export default UserRecent;
