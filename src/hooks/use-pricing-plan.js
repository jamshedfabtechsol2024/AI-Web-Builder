import { pricingPlan } from "@/api/pricing-plan";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useStartPlanMutation = () => {
  return useMutation({
    mutationFn: (payload) => pricingPlan.startPlan(payload),

    onSuccess: (data) => {
      window.location.href = data.checkout_url;
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetPlansHistoryQuery = () => {
  return useQuery({
    queryKey: ["plans-history"],
    queryFn: () => pricingPlan.getPlansHistory(),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};
