import { workspacesApi } from "@/api/workspaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.getWorkspaces(),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useGetWorkSpaceProjects = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace-projects", workspaceId],
    queryFn: () => workspacesApi.getWorkSpaceProjects(workspaceId),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useCreateWorkSpaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => workspacesApi.createWorkspaces(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Failed to create project");
    },
  });
};

export const useMoveToWorkSpaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => workspacesApi.moveToWorkspace(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace-projects"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Failed to move project");
    },
  });
};

export const useDeleteWorkSpaceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceId) => workspacesApi.deleteWorkspace(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Failed to delete project");
    },
  });
};
