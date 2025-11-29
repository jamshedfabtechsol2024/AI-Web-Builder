export const ADMIN_NOTIFICATION_DATA = [
  {
    title: "General Settings",
    fields: [
      { name: "enable_all", label: "Enable All Notifications" },
      { name: "product_updates", label: "Product Updates" },
      {
        name: "email_alerts_subscriptions",
        label: "Email alerts for new subscriptions",
      },
      { name: "developer_assignment", label: "Developer assignment alerts" },
      { name: "weekly_reports", label: "Weekly reports summary" },
    ],
  },
  {
    title: "Platform Alerts",
    fields: [
      // { name: "system_downtime", label: "System Downtime Alerts" },
      { name: "billing_notifications", label: "Billing Notifications" },
      { name: "ai_assistant_tips", label: "AI Assistant Tips" },
    ],
  },
];

export const USER_NOTIFICATION_DATA = [
  {
    title: "General Settings",
    fields: [
      { name: "enable_all", label: "Enable All Notifications" },
      { name: "product_updates", label: "Product Updates" },
      { name: "messages_alert", label: "Messages Alert" },
    ],
  },
  {
    title: "Platform Alerts",
    fields: [
      // { name: "system_downtime", label: "System Downtime Alerts" },
      { name: "billing_notifications", label: "Billing Notifications" },
      { name: "ai_assistant_tips", label: "AI Assistant Tips" },
    ],
  },
];

export const DEV_NOTIFICATION_DATA = [
  {
    title: "",
    fields: [
      { name: "enable_all", label: "Enable All Notifications" },
      { name: "project_assigned", label: "Project Assigned" },
      { name: "project_status_updates", label: "Project Status Updates" },
      { name: "messages_alert", label: "Messages Alert" },
      { name: "payout_updates", label: "Payout / Earnings Updates" },
      { name: "platform_announcements", label: "Platform Announcements" },
    ],
  },
];
