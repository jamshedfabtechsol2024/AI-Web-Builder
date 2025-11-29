import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { threadApi } from "@/api/thread";

const invalidateDependentData = async (queryClient) => {
  const keysToTouch = [
    ["thread-details"],
    ["requests"],
    ["request-details"],
    ["admin-projects"],
    ["admin-project-details"],
    ["thread-projects"],
    ["review-list"],
    ["earnings-list"],
    ["user-projects"],
  ];

  await Promise.all(
    keysToTouch.map((key) =>
      queryClient.invalidateQueries({ queryKey: key, refetchType: "all" })
    )
  );
};

export const useGetAllThreadsList = (params) =>
  useQuery({
    queryKey: ["threads", params],
    queryFn: () => threadApi.getAllThreadsList(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

export const useGetThreadDetails = (threadId) =>
  useQuery({
    queryKey: ["thread-details", threadId],
    queryFn: () => threadApi.getThreadDetails(threadId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!threadId,
  });

export const useCreateThreadOffer = (threadId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => threadApi.createThreadOffer(threadId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
  });
};

export const useWithdrawOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.withdrawOffer(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useAcceptOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.acceptOffer(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useRejectOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.rejectOffer(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useMakePaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.makePayment(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetThreadProjects = (threadId, open, params = {}) => {
  return useQuery({
    queryKey: ["thread-projects", threadId],
    queryFn: () => threadApi.getThreadProjects(threadId, params),
    enabled: !!threadId && open,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });
};

export const useCompleteProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (offerId) => threadApi.completeProject(offerId),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useCancelProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.cancelProject(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useRejectProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.rejectProject(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useAcceptProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.acceptProject(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useAddFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, payload }) =>
      threadApi.addFeedback(offerId, payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useAddFeedbackToSystemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => threadApi.addFeedbackToSystem(payload),
    onSuccess: async () => {
      await invalidateDependentData(queryClient);
      toast.success("Feedback submitted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useGetReviewList = (params) => {
  return useQuery({
    queryKey: ["review-list", params],
    queryFn: () => threadApi.getReviewList(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};

export const useGetReviewDetails = (reviewId) => {
  return useQuery({
    queryKey: ["review-details", reviewId],
    queryFn: () => threadApi.getReviewDetails(reviewId),
    enabled: !!reviewId,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useGetEarnings = (params) => {
  return useQuery({
    queryKey: ["earnings-list", params],
    queryFn: () => threadApi.getEarnings(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useGetSystemFeedbacks = (params) => {
  return useQuery({
    queryKey: ["system-feedbacks", params],
    queryFn: () => threadApi.getSystemFeedbacks(params),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
  });
};
