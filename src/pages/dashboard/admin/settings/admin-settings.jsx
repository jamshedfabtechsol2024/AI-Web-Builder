import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import { SEOMeta } from "@/components/seo/seo-meta";
import { Icons } from "@/components/shared/icons";
import TwoFactorSettings from "../../developer/settings/two-factor-settings";
import NotificationsSettings from "./notifications-settings";
import PlatformSettings from "./platform-settings";
import ProfileSettings from "./profile-settings";
import SecuritySettings from "./security-settings";
import SettingsSidebar from "./settings-sidebar";

const menuItems = [
  { key: "profile", label: "Profile", icon: Icons.User },
  { key: "2fa", label: "2 Factor Authentication", icon: Icons.Lock },
  { key: "security", label: "Security(Password Settings)", icon: Icons.Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  // { key: "platform", label: "Platform Configuration", icon: Settings },
];

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "2fa":
        return <TwoFactorSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "platform":
        return <PlatformSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/admin/settings"
        title="Admin Settings - Staron AI"
      />

      <main className="flex h-full gap-4 text-white">
        {/* Sidebar */}
        <SettingsSidebar
          active={activeSection}
          menuItems={menuItems}
          onChange={setActiveSection}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-[#FFFFFF1A] p-4">
          {renderSection()}
        </div>
      </main>
    </>
  );
};

export default AdminSettings;
