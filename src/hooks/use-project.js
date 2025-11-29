import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectAPI } from "@/api/projectapi";

export const usePublishProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      projectAPI.publishProject(projectId, payload),

    onSuccess: () => {
      // Invalidate conversation messages to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["conversation", "messages"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useCommitChangesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      projectAPI.commitChanges(projectId, payload),

    onSuccess: () => {
      // Invalidate conversation messages to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["conversation", "messages"],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetUserProjectsQuery = (userId, open) =>
  useQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => projectAPI.getUserProjects(userId),
    enabled: !!userId && open,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });
// admin projects hook
export const useGetAdminProjects = (params) =>
  useQuery({
    queryKey: ["admin-projects", params],
    queryFn: () => projectAPI.getAdminProjects(params),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });

export const useAdminProjectDetails = (id) => {
  return useQuery({
    queryKey: ["admin-project-details", id],
    queryFn: () => projectAPI.getProjectDetails(id),
    enabled: !!id,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useUpdateProjectName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => projectAPI.updateProjectName(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", "messages"],
      });
      toast.success("Project name updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId) => projectAPI.deleteProject(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["conversation", "messages"],
        exact: false,
      });

      toast.success("Project Move to Trash successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.detail || "Failed to Move to Trash project"
      );
    },
  });
};

export const useGetTrashProjects = () => {
  return useQuery({
    queryKey: ["trash-projects"],
    queryFn: () => projectAPI.getTrashProjects(),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useRestoreProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId) => projectAPI.restoreProject(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trash-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useDeletePermanentlyProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId) => projectAPI.deleteProjectPermanently(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trash-projects"],
      });
      toast.success("Project deleted permanently");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};
