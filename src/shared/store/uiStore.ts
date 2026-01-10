import { create } from "zustand";

export type ModalType = 
  'inventory' 
  | 'pickaxes'
  | null

type UIState = {
  modal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}))