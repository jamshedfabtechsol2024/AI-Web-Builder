import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { SEOMeta } from "@/components/seo/seo-meta";
import { Icons } from "@/components/shared/icons";
import NotificationsSettings from "../../admin/settings/notifications-settings";
import ProfileSettings from "../../admin/settings/profile-settings";
import SecuritySettings from "../../admin/settings/security-settings";
import SettingsSidebar from "../../admin/settings/settings-sidebar";
import IntegrationSettings from "../../developer/settings/integration-settings";
import TwoFactorSettings from "../../developer/settings/two-factor-settings";
import SubscriptionSettings from "./subscription-settings";
import { useSearchParams } from "react-router-dom";

const menuItems = [
  { key: "profile", label: "Profile", icon: Icons.User },
  { key: "2fa", label: "2 Factor Authentication", icon: Icons.Lock },
  { key: "security", label: "Security(Password Settings)", icon: Icons.Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "integrations", label: "Integrations", icon: Icons.Integrations },
  {
    key: "subscription",
    label: "Subscription Plans",
    icon: Icons.Subscription,
  },
];

const UserSettings = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const afterPayment = searchParams.get("afterPayment");
    if (afterPayment === "true") {
      setActiveSection("subscription");
    }
  }, [searchParams]);

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
      case "integrations":
        return <IntegrationSettings />;
      case "subscription":
        return <SubscriptionSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <>
      <SEOMeta
        description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
        imagePath=""
        keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
        path="/settings"
        title="Settings - Staron AI"
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

export default UserSettings;
