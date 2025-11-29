import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/use-auth-store";

const API_BASE_URL_AI =
  import.meta.env.VITE_API_BASE_URL_AI || "http://128.92.2.122:3000/api";

const aiClient = axios.create({
  baseURL: API_BASE_URL_AI,
  withCredentials: true,
  timeout: 30_000, // Longer timeout for AI operations
});

// Request interceptor to add auth token
aiClient.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
aiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Handle 401 or 403 for AI endpoints
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          throw new Error("Missing refresh token");
        }

        // Use the main API for token refresh
        const mainAPIBase =
          import.meta.env.VITE_API_BASE_URL || "http://128.92.2.122:3000/api";

        const { data } = await axios.post(
          `${mainAPIBase}/auth/refresh/`,
          {
            refresh_token: refreshToken,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newToken = data?.access_token;
        if (!newToken) {
          throw new Error("Invalid refresh response");
        }

        Cookies.set("access_token", newToken, {
          sameSite: "lax",
          expires: 7, // 7 days
        });

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return aiClient(originalRequest);
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

export default aiClient;
