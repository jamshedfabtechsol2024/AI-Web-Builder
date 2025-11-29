import { SEOMeta } from "@/components/seo/seo-meta";
import TrashProjects from "./trash-projects";

const UserTrash = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/trash"
      title="Trash - Staron AI"
    />

    <main>
      <TrashProjects />
    </main>
  </>
);

export default UserTrash;
