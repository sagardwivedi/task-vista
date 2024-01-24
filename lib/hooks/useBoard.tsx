import { create } from 'zustand';

interface BoardState {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useBoard = create<BoardState>()((set) => ({
  isOpen: false,
  setClose: () => set({ isOpen: false }),
  setOpen: () => set({ isOpen: true }),
}));
