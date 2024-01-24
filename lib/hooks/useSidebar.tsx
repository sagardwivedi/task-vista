import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useSidebar = create<SidebarState>()((set) => ({
  isOpen: false,
  setClose: () => set({ isOpen: false }),
  setOpen: () => set({ isOpen: true }),
}));
