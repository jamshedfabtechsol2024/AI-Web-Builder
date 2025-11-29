import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { conversationAPI } from "../api/conversation";

const CONVERSATION_KEYS = {
  messages: (userId) => ["conversation", "messages", userId],
};

export const useConversationMessages = (userId) =>
  useQuery({
    queryKey: CONVERSATION_KEYS.messages(userId),
    queryFn: () => conversationAPI.getMessages(userId),
    enabled: !!userId,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    retry: 1,
    refetchOnMount: true, // Always refetch on mount
    refetchOnReconnect: true, // Refetch when reconnecting
  });

// Hook to get current active JSON from conversation
export const useCurrentJson = (userId) => {
  const { data: conversationData } = useConversationMessages(userId);

  // Priority: current_json > latest message with generated_json
  const currentJson =
    conversationData?.current_json &&
    Object.keys(conversationData.current_json).length > 0
      ? conversationData.current_json
      : conversationData?.messages
          ?.filter(
            (msg) =>
              msg.generated_json && Object.keys(msg.generated_json).length > 0
          )
          ?.at(-1)?.generated_json || null;

  return currentJson;
};

// Hook to get messages with JSON indicators
export const useConversationHistory = (userId) => {
  const {
    data: conversationData,
    isLoading,
    isFetching,
  } = useConversationMessages(userId);

  const messagesWithJson =
    conversationData?.messages?.map((message) => ({
      ...message,
      hasJson:
        message.generated_json &&
        Object.keys(message.generated_json).length > 0,
    })) || [];

  return {
    messages: messagesWithJson,
    currentJson: conversationData?.current_json,
    conversationId: conversationData?.conversation_id,
    conversationData,
    isLoading: isLoading || isFetching,
  };
};

export const useGetAllConversations = (params) =>
  useQuery({
    queryKey: ["conversations", params],
    queryFn: () => conversationAPI.getAllConversations(params),
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    retry: 1,
    refetchOnMount: true, // Always refetch on mount
    refetchOnReconnect: true, // Refetch when reconnecting
  });

export const useCreateConversation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => conversationAPI.createConversation(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // navigate to conversation page using returned ID
      if (data?.conversation_id) {
        navigate(`/project/${data.conversation_id}`);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};
