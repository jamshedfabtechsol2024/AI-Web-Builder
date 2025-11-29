import client from "./client";

export const authAPI = {
  login: async (payload) => {
    const { data } = await client.post("auth/login/", payload);
    return data;
  },
  register: async (payload) => {
    const { data } = await client.post("auth/register/", payload);
    return data;
  },

  forgotPassword: async (payload) => {
    const { data } = await client.post("auth/password/reset/", payload);
    return data;
  },
  resendOtp: async (payload) => {
    const { data } = await client.post("auth/password/reset/", payload);
    return data;
  },
  verifyOtp: async (payload) => {
    const { data } = await client.post("auth/verify-email/", payload);
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await client.post("auth/password/reset/confirm/", payload);
    return data;
  },

  me: async () => {
    const { data } = await client.get("auth/me/");
    return data;
  },
  updateMyProfile: async (payload) => {
    const { data } = await client.patch("auth/me/", payload);
    return data;
  },

  changePassword: async (payload) => {
    const { data } = await client.post("auth/password/change/", payload);
    return data;
  },
  changeZeroAuthPassword: async (payload) => {
    const { data } = await client.post("auth/add-password/", payload);
    return data;
  },
  TwoFA: async (payload) => {
    const { data } = await client.post("auth/2fa/toggle/", payload);
    return data;
  },
  getDeveloperProfile: async () => {
    const { data } = await client.get("developers/me/");
    return data;
  },
  updateDeveloperProfile: async (payload) => {
    const { data } = await client.patch("developers/me/", payload);
    return data;
  },
  socialLogin: async (payload) => {
    const { data } = await client.post("auth/social/oauth/start/", payload);
    return data;
  },

  socialCallback: async (payload) => {
    const { data } = await client.post("auth/social/oauth/validate/", payload);
    return data;
  },
  connectGitHub: async (payload) => {
    const { data } = await client.post("github/connect/start/", payload);
    return data;
  },
  logout: async () => {
    const { data } = await client.post("auth/logout/");
    return data;
  },
  refresh: async () => {
    const { data } = await client.post("auth/refresh/");
    return data;
  },
};
