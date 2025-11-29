import { create } from "zustand";

export const useWebSocketStore = create((set) => ({
  readyState: 0, // WebSocket.CLOSED default before init
  setReadyState: (state) => set({ readyState: state }),

  isConnected: false,
  setIsConnected: (connected) => set({ isConnected: connected }),

  lastMessageTs: null,
  setLastMessageTs: (ts) => set({ lastMessageTs: ts }),

  // Loading states for specific actions
  loadingActions: {}, // { "init": true, "message": false }
  setLoadingAction: (action, loading) =>
    set((state) => ({
      loadingActions: { ...state.loadingActions, [action]: loading },
    })),
  clearLoadingAction: (action) =>
    set((state) => {
      const { [action]: _, ...rest } = state.loadingActions;
      return { loadingActions: rest };
    }),
}));
