import { requestAPI } from "@/api/requestApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetRequests = (params) => {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: () => requestAPI.getRequests(params),
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useGetRequestDetails = (requestId) => {
  return useQuery({
    queryKey: ["request-details", requestId],
    queryFn: () => requestAPI.getRequestDetails(requestId),
    retry: 1,
    enabled: !!requestId,
  });
};

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => requestAPI.acceptRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request-details"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => requestAPI.rejectRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request-details"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};
