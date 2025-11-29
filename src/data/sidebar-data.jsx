import { Bell, Settings } from "lucide-react";
import { Icons } from "@/components/shared/icons";

export const MENU_ITEMS = [
  {
    title: "Dashboard ds",
    url: "/dashboard",
    icon: "/svg/dashboard/sidebar/dashboard-icon.svg",
  },
  {
    title: "Home",
    url: "/dashboard/home",
    icon: "/svg/dashboard/sidebar/home-icon.svg",
  },
  {
    title: "Brand Template",
    url: "/dashboard/brand-template",
    icon: "/svg/dashboard/sidebar/template-icon.svg",
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: "/svg/dashboard/sidebar/project-icon.svg",
  },
  {
    title: "Team Member",
    url: "/dashboard/team-member",
    icon: "/svg/dashboard/sidebar/team-icon.svg",
  },
  {
    title: "Schedule",
    url: "/dashboard/schedule",
    icon: "/svg/dashboard/sidebar/schedule-icon.svg",
  },
  {
    title: "Analysis",
    url: "/dashboard/analysis",
    icon: "/svg/dashboard/sidebar/analysis-icon.svg",
  },
  {
    title: "A/B Testing",
    url: "/dashboard/ab-testing",
    icon: "/svg/dashboard/sidebar/ab-testing-icon.svg",
  },
  {
    title: "View Library",
    url: "/dashboard/view-library",
    icon: "/svg/dashboard/sidebar/view-library-icon.svg",
  },
  {
    title: "Asset Library",
    url: "/dashboard/asset-library",
    icon: "/svg/dashboard/sidebar/asset-library-icon.svg",
  },
  {
    title: "Affiliate & Community Hub",
    url: "/dashboard/community",
    icon: "/svg/dashboard/sidebar/community-icon.svg",
  },
];

export const BOTTOM_MENU_ITEMS = [
  {
    title: "Help & Support",
    url: "/dashboard/help",
    icon: "/svg/dashboard/sidebar/support-icon.svg",
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: "/svg/dashboard/sidebar/setting-icon.svg",
  },
  {
    title: "Subscription",
    url: "/dashboard/subscription",
    icon: "/svg/dashboard/sidebar/subscription-icon.svg",
  },
];

/**
 *  Developer Routes Data
 */

// Constants
const centralClass = "!text-[var(--text)] !w-5 !h-5";

export const DEVELOPER_SIDEBAR = [
  {
    title: "Dashboard",
    url: "/developer/dashboard",
    icon: <Icons.Dashboard className={centralClass} />,
  },
  {
    title: "Projects",
    url: "/developer/projects",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Requests",
    url: "/developer/requests",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Service Plans",
    url: "/developer/service-plans",
    icon: <Icons.Service className={centralClass} />,
  },
  {
    title: "Chats",
    url: "/developer/chats",
    icon: <Icons.Chat className={centralClass} />,
  },
  {
    title: "Earnings",
    url: "/developer/earnings",
    icon: <Icons.Earning className={centralClass} />,
  },
  {
    title: "Reviews & Feedback",
    url: "/developer/reviews",
    icon: <Icons.Feedback className={centralClass} />,
  },
  {
    title: "Support",
    url: "/developer/support",
    icon: <Icons.Support className={centralClass} />,
  },
  {
    title: "Settings",
    url: "/developer/settings",
    icon: <Icons.Setting className={centralClass} />,
    children: [
      {
        key: "profile",
        title: "Profile",
        url: "/developer/settings/profile",
        icon: <Icons.User className="h-4 w-4" />,
      },
      {
        key: "2fa",
        title: "2FA",
        url: "/developer/settings/2fa",
        icon: <Icons.Lock className="h-4 w-4" />,
      },
      {
        key: "security",
        title: "Security",
        url: "/developer/settings/security",
        icon: <Icons.Lock className="h-4 w-4" />,
      },
      {
        key: "notifications",
        title: "Notifications",
        url: "/developer/settings/notifications",
        icon: <Bell className="h-4 w-4" />,
      },
      {
        key: "integrations",
        title: "Integrations",
        url: "/developer/settings/integrations",
        icon: <Icons.Integrations className="h-4 w-4" />,
      },
    ],
  },
];

/**
 * Admin Routes Data
 */
export const ADMIN_SIDEBAR = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <Icons.Dashboard className={centralClass} />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Developers",
    url: "/admin/developers",
    icon: <Icons.Developer className={centralClass} />,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Requests",
    url: "/admin/requests",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Subscription",
    url: "/admin/subscription",
    icon: <Icons.Earning className={centralClass} />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Icons.Setting className={centralClass} />,
    children: [
      {
        key: "profile",
        title: "Profile",
        url: "/admin/settings/profile",
        icon: <Icons.User className="h-4 w-4" />,
      },
      {
        key: "2fa",
        title: "2FA",
        url: "/admin/settings/2fa",
        icon: <Icons.Lock className="h-4 w-4" />,
      },
      {
        key: "security",
        title: "Security (Password Settings)",
        url: "/admin/settings/security",
        icon: <Icons.Lock className="h-4 w-4" />,
      },
      {
        key: "notifications",
        title: "Notifications",
        url: "/admin/settings/notifications",
        icon: <Bell className="h-4 w-4" />,
      },
      // {
      //   key: "platform",
      //   title: "Platform Configuration",
      //   url: "/admin/settings/platform",
      //   icon: <Settings className="h-4 w-4" />,
      // },
    ],
  },
];

/**
 * Admin Routes Data
 */
export const USER_SIDEBAR = [
  {
    title: "Rcently",
    url: "/recently",
    icon: <Icons.Dashboard className={centralClass} />,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Work Space",
    url: "/work-space",
    icon: <Icons.Developer className={centralClass} />,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: <Icons.Report className={centralClass} />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Icons.Report className={centralClass} />,
  },
];
