import client from "./client";

export const threadApi = {
  getAllThreadsList: async (params) => {
    const { data } = await client.get("chat/threads/list/", { params });
    return data;
  },
  getThreadDetails: async (threadId) => {
    const { data } = await client.get(`chat/threads/${threadId}/messages/`);
    return data;
  },
  createThreadOffer: async (threadId, payload) => {
    const { data } = await client.post(
      `chat/threads/${threadId}/offers/`,
      payload
    );
    return data;
  },
  withdrawOffer: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/offers/${offerId}/withdraw/`,
      payload
    );
    return data;
  },
  acceptOffer: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/offers/${offerId}/accept/`,
      payload
    );
    return data;
  },
  rejectOffer: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/offers/${offerId}/reject/`,
      payload
    );
    return data;
  },
  makePayment: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/offers/${offerId}/create-checkout-session/`,
      payload
    );
    return data;
  },
  getThreadProjects: async (threadId, params = {}) => {
    const { data } = await client.get(`chat/offers/${threadId}/projects/`, {
      params: params,
    });
    return data;
  },
  completeProject: async (offerId) => {
    const { data } = await client.post(`chat/complete-project/${offerId}/`);
    return data;
  },
  cancelProject: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/cancel-project/${offerId}/`,
      payload
    );
    return data;
  },
  rejectProject: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/reject-project/${offerId}/`,
      payload
    );
    return data;
  },
  acceptProject: async (offerId, payload) => {
    const { data } = await client.post(
      `chat/accept-project/${offerId}/`,
      payload
    );
    return data;
  },
  addFeedback: async (offerId, payload) => {
    const { data } = await client.post(`chat/reviews/${offerId}/`, payload);
    return data;
  },
  addFeedbackToSystem: async (payload) => {
    const { data } = await client.post(`staron-reviews/`, payload);
    return data;
  },
  getSystemFeedbacks: async (params) => {
    const { data } = await client.get(`staron-reviews/`, {
      params: params,
    });
    return data;
  },
  getReviewList: async (params) => {
    const { data } = await client.get(`developers/reviews/list/`, {
      params: params,
    });
    return data;
  },
  getReviewDetails: async (reviewId) => {
    const { data } = await client.get(`developers/reviews/${reviewId}/`);
    return data;
  },
  getEarnings: async (params) => {
    const { data } = await client.get(`chat/developers/earnings/`, {
      params: params,
    });
    return data;
  },
};
