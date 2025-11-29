import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { serverPlanAPI } from "@/api/serviceplan";

const invalidateServicePlans = async (queryClient) => {
  await queryClient.invalidateQueries({
    queryKey: ["developer-service-plans"],
    refetchType: "all",
  });
};

export const useGetServicePlans = () =>
  useQuery({
    queryKey: ["developer-service-plans"],
    queryFn: () => serverPlanAPI.getServicePlans(),
    retry: 1,
  });

export const useCreateServicePlans = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => serverPlanAPI.createServicePlan(payload),

    onSuccess: async () => {
      toast.success("Service Plan  successfully Created");
      await invalidateServicePlans(queryClient);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useEditServicePlans = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => serverPlanAPI.editServicePlan(payload),
    onSuccess: async () => {
      toast.success("Service Plan  successfully Updated");
      await invalidateServicePlans(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useDeleteServicePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId) => serverPlanAPI.deleteServicePlan(planId),

    onSuccess: async () => {
      toast.success("Service Plan  successfully Deleted");
      await invalidateServicePlans(queryClient);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetSubscribersList = (params) =>
  useQuery({
    queryKey: ["subscribers-list", params],
    queryFn: () => serverPlanAPI.getSubscribersList(params),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
