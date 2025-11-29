import client from "./client";

export const requestAPI = {
  getRequests: async (params) => {
    const { data } = await client.get(`/request/`, { params });
    return data;
  },
  getRequestDetails: async (requestId) => {
    const { data } = await client.get(`/request/${requestId}/`);
    return data;
  },
  acceptRequest: async (requestId) => {
    const { data } = await client.post(`/request/${requestId}/accept/`);
    return data;
  },
  rejectRequest: async (requestId) => {
    const { data } = await client.post(`/request/${requestId}/reject/`);
    return data;
  },
};
