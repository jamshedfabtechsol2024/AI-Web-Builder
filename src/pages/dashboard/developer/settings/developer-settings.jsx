import { Bell } from "lucide-react";
import { useState } from "react";
import { SEOMeta } from "@/components/seo/seo-meta";
import { Icons } from "@/components/shared/icons";
import SecuritySettings from "../../admin/settings/security-settings";
import SettingsSidebar from "../../admin/settings/settings-sidebar";
import DeveloperNotifications from "./developer-notifications";
import DeveloperProfile from "./developer-profile";
import IntegrationSettings from "./integration-settings";
import TwoFactorSettings from "./two-factor-settings";
import NotificationsSettings from "../../admin/settings/notifications-settings";

const menuItems = [
  { key: "profile", label: "Profile", icon: Icons.User },
  { key: "2fa", label: "2 Factor Authentication", icon: Icons.Lock },
  { key: "security", label: "Security(Password Settings)", icon: Icons.Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "integrations", label: "Integrations", icon: Icons.Integrations },
];

const DeveloperSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <DeveloperProfile />;
      case "2fa":
        return <TwoFactorSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "integrations":
        return <IntegrationSettings />;
      default:
        return <DeveloperProfile />;
    }
  };

  return (
    <>
      <SEOMeta
        description="Configure and customize your Staron AI with Developer Settings. Manage preferences, integrations, and advanced options for your projects."
        imagePath=""
        keywords="developer settings, Staron AI configuration, customization, integrations, advanced options, project settings"
        path="/developer/settings"
        title="Developer Settings - Staron AI"
      />

      <main className="flex h-full gap-4 text-white">
        {/* Sidebar */}
        <SettingsSidebar
          active={activeSection}
          menuItems={menuItems}
          onChange={setActiveSection}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-[#FFFFFF1A] bg-black p-4">
          {renderSection()}
        </div>
      </main>
    </>
  );
};

export default DeveloperSettings;
