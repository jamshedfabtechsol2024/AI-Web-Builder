import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userManagementAPI } from "@/api/user-management";

export const useGetAllUsers = (params) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: () => userManagementAPI.getAllUsers(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => userManagementAPI.updateStatus(payload),

    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Error updating user status:", error);
    },
  });
};

export const useGetAllAdminDevelopers = (params) =>
  useQuery({
    queryKey: ["developers", params],
    queryFn: () => userManagementAPI.getAllAdminDevelopers(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useGetAllDevelopersList = (params) =>
  useQuery({
    queryKey: ["developers", params],
    queryFn: () => userManagementAPI.getAllDevelopersList(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useGetDeveloperDetails = (id) =>
  useQuery({
    queryKey: ["developer", id],
    queryFn: () => userManagementAPI.getDeveloperDetails(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useUpdateDeveloperStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => userManagementAPI.updateDeveloperStatus(payload),

    onSuccess: () => {
      toast.success("Developer status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["developers"] });
    },

    onError: (error) => {
      console.error("Error updating developer status:", error);
    },
  });
};
