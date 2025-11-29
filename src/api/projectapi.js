import client from "./client";

export const projectAPI = {
  publishProject: async (projectId, payload) => {
    const { data } = await client.post(
      `projects/${projectId}/publish/github/`,
      payload
    );
    return data;
  },
  commitChanges: async (projectId, payload) => {
    const { data } = await client.post(
      `projects/${projectId}/update/github/`,
      payload
    );
    return data;
  },
  getUserProjects: async (userId) => {
    const { data } = await client.get(`projects/get_user_projects/${userId}/`);
    return data;
  },
  // admin projects apis

  getAdminProjects: async (params) => {
    const { data } = await client.get("admin_dashboard/projects/", { params });
    return data;
  },

  getProjectDetails: async (id) => {
    const { data } = await client.get(`admin_dashboard/projects/${id}/`);
    return data;
  },
  updateProjectName: async (id, payload) => {
    const { data } = await client.patch(`/projects/${id}/`, payload);
    return data;
  },
  deleteProject: async (id) => {
    const { data } = await client.delete(`/projects/${id}/`);
    return data;
  },
  getTrashProjects: async () => {
    const { data } = await client.get("/projects/trash/");
    return data;
  },
  restoreProject: async (id) => {
    const { data } = await client.post(`/projects/trash/${id}/restore/`);
    return data;
  },
  deleteProjectPermanently: async (id) => {
    const { data } = await client.delete(
      `/projects/trash/${id}/permanent-delete/`
    );
    return data;
  },
};
