import client from "./client";

export const supportAPI = {
  createSupportForm: async (payload) => {
    const { data } = await client.post("developers/support/", payload);
    return data;
  },
};
