import aiClient from "./ai-client";

export const conversationAPI = {
  // Get conversation messages for a user
  getMessages: async (userId) => {
    const { data } = await aiClient.get(`/conversation/${userId}`);
    return data;
  },
  getAllConversations: async (params) => {
    const { data } = await aiClient.get("/conversations", { params });
    return data;
  },
  createConversation: async (payload) => {
    const { data } = await aiClient.post("/create_project", payload);
    return data;
  },
};
