import { get } from "react-hook-form";
import client from "./client";

export const workspacesApi = {
  createWorkspaces: async (payload) => {
    const { data } = await client.post("/projects/workspaces/", payload);
    return data;
  },
  getWorkspaces: async () => {
    const { data } = await client.get("/projects/workspaces/");
    return data;
  },
  getWorkSpaceProjects: async (workspaceId) => {
    const { data } = await client.get(
      `/projects/workspaces/${workspaceId}/projects/`
    );
    return data;
  },
  moveToWorkspace: async (payload) => {
    const { data } = await client.post(`/projects/add-to-workspace/`, payload);
    return data;
  },
  deleteWorkspace: async (workspaceId) => {
    const { data } = await client.delete(
      `/projects/workspaces/${workspaceId}/`
    );
    return data;
  },
};
