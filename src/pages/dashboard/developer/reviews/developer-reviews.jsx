import { SEOMeta } from "@/components/seo/seo-meta";
import ReviewsTable from "./reviews-table";

const DeveloperReviews = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/developer/dashboard"
      title="Developer Reviews - Staron AI"
    />

    <main>
      <ReviewsTable />
    </main>
  </>
);

export default DeveloperReviews;
