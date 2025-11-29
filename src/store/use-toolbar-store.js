import { create } from "zustand";

export const useToolbarStore = create((set) => ({
  active: "code", // default
  setActive: (value) => {
    if (value === "code" || value === "play") {
      set({ active: value });
    }
  },
}));
