import client from "./client";

export const userManagementAPI = {
  getAllUsers: async (params) => {
    const { data } = await client.get("admin/users/", { params });
    return data;
  },
  updateStatus: async (payload) => {
    const { data } = await client.post("admin/users/status/", payload);
    return data;
  },
  getAllAdminDevelopers: async (params) => {
    const { data } = await client.get("admin/developers/", { params });
    return data;
  },
  updateDeveloperStatus: async (payload) => {
    const { data } = await client.post("admin/developers/vetting/", payload);
    return data;
  },
  getAllDevelopersList: async (params) => {
    const { data } = await client.get("developers/list-developers/", {
      params,
    });
    return data;
  },
  getDeveloperDetails: async (id) => {
    const { data } = await client.get(`developers/developer-detail/${id}/`);
    return data;
  },
};
