import { create } from "zustand";

export const useEventStore = create((set) => ({
  errorMessage: null,
  setErrorMessage: (msg) => set({ errorMessage: msg }),
}));
