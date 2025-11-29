import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isTokenValid } from "../utils/auth-utils";

const storageKey = "auth_state_v1";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, email, role }
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setSession: ({ user, accessToken, refreshToken }) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(
            accessToken && user && isTokenValid(accessToken)
          ),
        });
      },
      setUser: (user) => {
        set((state) => ({
          user: { ...state.user, ...user },
          isAuthenticated: Boolean(
            state.accessToken && user && isTokenValid(state.accessToken)
          ),
        }));
      },

      clearSession: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        localStorage.removeItem(storageKey);
      },

      // Enhanced authentication check that validates both user and token
      checkAuthStatus: () => {
        const state = get();
        const isValid = Boolean(
          state.user && state.accessToken && isTokenValid(state.accessToken)
        );

        if (state.isAuthenticated !== isValid) {
          set({ isAuthenticated: isValid });
        }

        return isValid;
      },

      hasRole: (roles) => {
        const currentRole = get().user?.role;
        if (!currentRole) {
          return false;
        }
        if (Array.isArray(roles)) {
          return roles.includes(currentRole);
        }
        return roles === currentRole;
      },
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 1,
    }
  )
);
