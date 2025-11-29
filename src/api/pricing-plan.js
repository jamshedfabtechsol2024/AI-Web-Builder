import client from "./client";

export const pricingPlan = {
  startPlan: async (payload) => {
    const { data } = await client.post(`billing/checkout/`, payload);
    return data;
  },
  getPlansHistory: async () => {
    const { data } = await client.get(`billing/user/plans/`);
    return data;
  },
};
