import { notificationsApi } from "@/api/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetNotificationsPreferences = () => {
  return useQuery({
    queryKey: ["notifications-preferences"],
    queryFn: () => notificationsApi.getNotificationsPreferences(),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useUpdateNotificationsPreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      notificationsApi.updateNotificationsPreferences(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-preferences"],
      });
      toast.success("Notification preferences updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetNotificationsList = () => {
  return useQuery({
    queryKey: ["notifications-list"],
    queryFn: () => notificationsApi.getNotificationsList(),
    retry: 1,
    refetchInterval: 10000,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchIntervalInBackground: true,
  });
};

export const useMarkReadAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markReadAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-list"],
      });
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) =>
      notificationsApi.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-list"],
      });
      toast.success("Notification deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};
