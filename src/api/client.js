import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/use-auth-store";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://128.92.2.122:3000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 0,
});

client.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  const token = accessToken || Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // handle 401 or 403
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          throw new Error("Missing refresh token");
        }
        const { data } = await axios.post(
          `${API_BASE_URL}auth/refresh/`,
          {
            refresh_token: refreshToken,
          },
          { withCredentials: true }
        );
        const newToken = data?.access_token;
        if (!newToken) {
          throw new Error("Invalid refresh response");
        }
        Cookies.set("access_token", newToken, { sameSite: "lax" });
        // update store so UI stays authenticated
        try {
          const state = useAuthStore.getState();
          if (state?.setSession) {
            state.setSession({
              user: state.user,
              accessToken: newToken,
              refreshToken: Cookies.get("refresh_token") || null,
            });
          }
        } catch (_e) {
          // ignore store sync errors
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      } catch (_refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        try {
          const { clearSession } = useAuthStore.getState();
          clearSession();
        } catch (_e) {
          // ignore store cleanup errors
        }
      }
    }

    return Promise.reject(error);
  }
);

export default client;
