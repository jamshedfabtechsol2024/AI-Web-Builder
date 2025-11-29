import { SEOMeta } from "@/components/seo/seo-meta";
import HireDeveloperCards from "./hire-developer-cards";

const HireDeveloper = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/hire-developer"
      title="Hire Developer - Staron AI"
    />

    <main>
      <HireDeveloperCards />
    </main>
  </>
);

export default HireDeveloper;
