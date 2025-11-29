import client from "./client";

export const notificationsApi = {
  getNotificationsPreferences: async () => {
    const { data } = await client.get("notifications/preferences/");
    return data;
  },
  updateNotificationsPreferences: async (payload) => {
    const { data } = await client.put("notifications/preferences/", payload);
    return data;
  },
  getNotificationsList: async () => {
    const { data } = await client.get("notifications/");
    return data;
  },
  markReadAllNotifications: async () => {
    const { data } = await client.post("notifications/mark-all-read/");
    return data;
  },
  deleteNotification: async (notificationId) => {
    const { data } = await client.delete(
      `notifications/delete/${notificationId}/`
    );
    return data;
  },
};
