import { dasboardApi } from "@/api/dasboardApi";
import { useQuery } from "@tanstack/react-query";

export const useGetDeveloperDashboardData = (params) =>
  useQuery({
    queryKey: ["developer-dashboard", params],
    queryFn: () => dasboardApi.getDeveloperDashboardData(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

export const useGetAdminDashboardData = (params) =>
  useQuery({
    queryKey: ["admin-dashboard", params],
    queryFn: () => dasboardApi.getAdminDashboardData(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
