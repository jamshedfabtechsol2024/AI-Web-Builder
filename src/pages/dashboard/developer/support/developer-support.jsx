import { SEOMeta } from "@/components/seo/seo-meta";
import SupportForm from "./support-form";

const DeveloperSupport = () => (
  <>
    <SEOMeta
      description="Get help with Staron AI through Developer Support. Access documentation, troubleshoot issues, and find guidance to optimize your projects."
      imagePath=""
      keywords="developer support, Staron AI help, troubleshooting, documentation, developer guide, technical support"
      path="/developer/support"
      title="Developer Support - Staron AI"
    />

    <main>
      <SupportForm />
    </main>
  </>
);

export default DeveloperSupport;
