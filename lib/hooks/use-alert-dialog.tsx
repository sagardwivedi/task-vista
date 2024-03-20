import { create } from "zustand";

export interface AlertDialogState {
  isOpen: boolean;
  toggleAlert: () => void;
}

export const useAlertDialogStore = create<AlertDialogState>()((set) => ({
  isOpen: false,
  toggleAlert: () => set((state) => ({ isOpen: !state.isOpen })),
}));
