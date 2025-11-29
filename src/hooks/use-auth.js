import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authAPI } from "../api/auth";
import { useAuthStore } from "../store/use-auth-store";

const AUTH_KEYS = {
  me: ["auth", "me"],
};

export const useAuthSession = () => {
  const { user, isAuthenticated } = useAuthStore((s) => ({
    user: s.user,
    isAuthenticated: s.isAuthenticated,
  }));
  return { user, isAuthenticated };
};

export const useMeQuery = () =>
  useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: authAPI.me,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    retry: 1,
  });

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.login,

    onSuccess: (data) => {
      console.log("data", data);

      const { access_token, refresh_token, user } = data || {};
      if (access_token) {
        Cookies.set("access_token", access_token, { sameSite: "lax" });
      }
      if (refresh_token) {
        Cookies.set("refresh_token", refresh_token, { sameSite: "lax" });
      }
      setSession({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });

      if (user?.two_factor_enabled) {
        navigate("/auth/verify-otp", {
          state: { email: user.email, type: "2fa" },
        });
        return;
      }

      if (user?.role === "developer") {
        navigate("/developer/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "user") {
        navigate("/recently");
      } else {
        navigate("/auth/login");
        toast.error("Invalid user role");
      }

      toast.success("Login successful!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      console.log("data", data);
      toast.success("Registration successful! Please Verify your email.");
      navigate("/auth/verify-otp", {
        state: { email: data.email, type: "register" },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useForgotMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ payload }) => authAPI.forgotPassword(payload),
    onSuccess: (data) => {
      toast.success("OTP sent to your email!");
      navigate("/auth/verify-otp", {
        state: { email: data.email, type: "reset" },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useResentOtpMutation = () => {
  return useMutation({
    mutationFn: ({ payload }) => authAPI.resendOtp(payload),
    onSuccess: () => {
      toast.success("OTP resent to your email!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};
export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  return useMutation({
    mutationFn: ({ payload }) => authAPI.verifyOtp(payload),
    onSuccess: (data, variables) => {
      toast.success("Email verified successfully!");

      if (variables.type === "register") {
        navigate("/auth/login");
      } else if (variables.type === "reset") {
        navigate("/auth/reset-password", {
          state: { token: data?.reset_token },
        });
      } else if (variables.type === "2fa") {
        if (user?.role === "developer") {
          navigate("/developer/dashboard");
        } else if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user?.role === "user") {
          navigate("/recently");
        } else {
          navigate("/auth/login");
          toast.error("Invalid user role");
        }
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ payload }) => authAPI.resetPassword(payload),
    onSuccess: (data) => {
      toast.success("Password reset successful! Please login.");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useUpdateMyProfileMutation = () => {
  const qc = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: authAPI.updateMyProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      setUser(data.user);

      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const getDeveloperProfile = () =>
  useQuery({
    queryKey: ["developer", "profile"],
    queryFn: authAPI.getDeveloperProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useUpdateDeveloperProfileMutation = () => {
  const qc = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: authAPI.updateDeveloperProfile,
    onSuccess: (data) => {
      console.log("data", data);

      setUser(data);
      toast.success("Profile updated successfully!");
      qc.invalidateQueries({ queryKey: ["developer", "profile"] });
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useChangePasswordMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useChangeZeroAuthPasswordMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.changeZeroAuthPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useToggle2FAMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.TwoFA,
    onSettled: () => {
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useSocialSignUpMutation = () =>
  useMutation({
    mutationFn: authAPI.socialLogin,

    onSuccess: (data) => {
      window.open(data.auth_url, "_blank");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });

export const useConnectGitHubMutation = () =>
  useMutation({
    mutationFn: authAPI.connectGitHub,
    onSuccess: (data) => {
      window.open(data.auth_url, "_blank");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });

export const useSocialAuthValidateMutation = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.socialCallback,

    onSuccess: (data) => {
      console.log("data", data);

      const { access_token, refresh_token, user } = data || {};
      if (access_token) {
        Cookies.set("access_token", access_token, { sameSite: "lax" });
      }
      if (refresh_token) {
        Cookies.set("refresh_token", refresh_token, { sameSite: "lax" });
      }
      setSession({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      qc.invalidateQueries({ queryKey: AUTH_KEYS.me });

      if (user?.two_factor_enabled) {
        navigate("/auth/verify-otp", {
          state: { email: user.email, type: "2fa" },
        });
        return;
      }

      if (user?.role === "developer") {
        navigate("/developer/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "user") {
        navigate("/recently");
      } else {
        navigate("/auth/login");
        toast.error("Invalid user role");
      }

      toast.success("You're logged in! Welcome back!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.detail || "Something went wrong");
    },
  });
};

export const useLogoutMutation = () => {
  const clearSession = useAuthStore((s) => s.clearSession);
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      toast.success("Logout successful!");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      clearSession();
      qc.removeQueries({ queryKey: AUTH_KEYS.me });
      qc.clear();
      navigate("/auth/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout failed, please try again.");
    },
  });
};
