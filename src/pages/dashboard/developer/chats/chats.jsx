import { SEOMeta } from "@/components/seo/seo-meta";
import ChatLayout from "./chat-layout";

const Chats = () => (
  <>
    <SEOMeta
      description="Get help with Staron AI through Developer Support. Access documentation, troubleshoot issues, and find guidance to optimize your projects."
      imagePath=""
      keywords="developer support, Staron AI help, troubleshooting, documentation, developer guide, technical support"
      path="/developer/chats"
      title="Chats - Staron AI"
    />
    <main>
      <ChatLayout />
    </main>
  </>
);

export default Chats;
