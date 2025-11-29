import client from "./client";

export const dasboardApi = {
  getDeveloperDashboardData: async (params) => {
    const { data } = await client.get("developers/dashboard/", { params });
    return data;
  },
  getAdminDashboardData: async (params) => {
    const { data } = await client.get("admin_dashboard/dashboard/", { params });
    return data;
  },
};
