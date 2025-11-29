import client from "./client";

export const serverPlanAPI = {
  createServicePlan: async (payload) => {
    const { data } = await client.post(
      "developers/plans/developer_plans/",
      payload
    );
    return data;
  },
  getServicePlans: async () => {
    const { data } = await client.get(
      "developers/plans/developer_plans/my_plan/"
    );
    return data;
  },

  editServicePlan: async (payload) => {
    const { data } = await client.patch(
      `developers/plans/developer_plans/${payload.id}/`,
      payload
    );
    return data;
  },

  deleteServicePlan: async (planId) => {
    const { data } = await client.delete(
      `developers/plans/developer_plans/${planId}/`
    );
    return data;
  },
  getSubscribersList: async (params) => {
    const { data } = await client.get(`admin_dashboard/subscriptions/`, {
      params,
    });
    return data;
  },
};
